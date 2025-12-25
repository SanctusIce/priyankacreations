import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  Loader2, 
  Tags, 
  Plus, 
  Pencil, 
  Trash2, 
  Copy, 
  Percent, 
  IndianRupee,
  Calendar,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { format } from 'date-fns';

interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discount_type: string;
  discount_value: number;
  min_order_amount: number;
  max_discount: number | null;
  max_uses: number | null;
  used_count: number;
  is_active: boolean;
  valid_from: string;
  valid_until: string | null;
  created_at: string;
}

const defaultCoupon = {
  code: '',
  description: '',
  discount_type: 'percentage',
  discount_value: 10,
  min_order_amount: 0,
  max_discount: null as number | null,
  max_uses: null as number | null,
  is_active: true,
  valid_from: new Date().toISOString().split('T')[0],
  valid_until: '',
};

const AdminCoupons = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState(defaultCoupon);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: coupons, isLoading } = useQuery({
    queryKey: ['adminCoupons'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Coupon[];
    },
  });

  const openCreateDialog = () => {
    setEditingCoupon(null);
    setFormData(defaultCoupon);
    setIsDialogOpen(true);
  };

  const openEditDialog = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      description: coupon.description || '',
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
      min_order_amount: coupon.min_order_amount,
      max_discount: coupon.max_discount,
      max_uses: coupon.max_uses,
      is_active: coupon.is_active,
      valid_from: coupon.valid_from.split('T')[0],
      valid_until: coupon.valid_until ? coupon.valid_until.split('T')[0] : '',
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.code.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    if (formData.discount_value <= 0) {
      toast.error('Discount value must be greater than 0');
      return;
    }

    setIsSaving(true);
    try {
      const couponData = {
        code: formData.code.toUpperCase().trim(),
        description: formData.description || null,
        discount_type: formData.discount_type,
        discount_value: formData.discount_value,
        min_order_amount: formData.min_order_amount || 0,
        max_discount: formData.max_discount || null,
        max_uses: formData.max_uses || null,
        is_active: formData.is_active,
        valid_from: formData.valid_from,
        valid_until: formData.valid_until || null,
      };

      if (editingCoupon) {
        const { error } = await supabase
          .from('coupons')
          .update(couponData)
          .eq('id', editingCoupon.id);
        
        if (error) throw error;
        toast.success('Coupon updated successfully');
      } else {
        const { error } = await supabase
          .from('coupons')
          .insert(couponData);
        
        if (error) {
          if (error.code === '23505') {
            toast.error('A coupon with this code already exists');
            return;
          }
          throw error;
        }
        toast.success('Coupon created successfully');
      }

      queryClient.invalidateQueries({ queryKey: ['adminCoupons'] });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving coupon:', error);
      toast.error('Failed to save coupon');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Coupon deleted');
      queryClient.invalidateQueries({ queryKey: ['adminCoupons'] });
    } catch (error) {
      console.error('Error deleting coupon:', error);
      toast.error('Failed to delete coupon');
    } finally {
      setDeleteConfirm(null);
    }
  };

  const toggleActive = async (coupon: Coupon) => {
    try {
      const { error } = await supabase
        .from('coupons')
        .update({ is_active: !coupon.is_active })
        .eq('id', coupon.id);
      
      if (error) throw error;
      toast.success(coupon.is_active ? 'Coupon deactivated' : 'Coupon activated');
      queryClient.invalidateQueries({ queryKey: ['adminCoupons'] });
    } catch (error) {
      console.error('Error toggling coupon:', error);
      toast.error('Failed to update coupon');
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Coupon code copied!');
  };

  const getDiscountDisplay = (coupon: Coupon) => {
    if (coupon.discount_type === 'percentage') {
      return `${coupon.discount_value}% OFF`;
    }
    return `₹${coupon.discount_value} OFF`;
  };

  const isExpired = (coupon: Coupon) => {
    if (!coupon.valid_until) return false;
    return new Date(coupon.valid_until) < new Date();
  };

  const isMaxedOut = (coupon: Coupon) => {
    if (!coupon.max_uses) return false;
    return coupon.used_count >= coupon.max_uses;
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Coupons Management</h1>
        
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Create Coupon
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : coupons?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Tags className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-lg font-bold mb-2">No Coupons Yet</h2>
              <p className="text-muted-foreground mb-4">Create your first discount coupon.</p>
              <Button onClick={openCreateDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Create Coupon
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead className="hidden md:table-cell">Min Order</TableHead>
                    <TableHead className="hidden lg:table-cell">Usage</TableHead>
                    <TableHead className="hidden md:table-cell">Valid Until</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons?.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="bg-secondary px-2 py-1 rounded text-sm font-mono font-bold">
                            {coupon.code}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyCode(coupon.code)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        {coupon.description && (
                          <p className="text-xs text-muted-foreground mt-1">{coupon.description}</p>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-bold">
                          {coupon.discount_type === 'percentage' ? (
                            <Percent className="h-3 w-3 mr-1" />
                          ) : (
                            <IndianRupee className="h-3 w-3 mr-1" />
                          )}
                          {getDiscountDisplay(coupon)}
                        </Badge>
                        {coupon.max_discount && coupon.discount_type === 'percentage' && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Max: ₹{coupon.max_discount}
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {coupon.min_order_amount > 0 ? `₹${coupon.min_order_amount}` : 'None'}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className={coupon.max_uses && isMaxedOut(coupon) ? 'text-destructive' : ''}>
                          {coupon.used_count}{coupon.max_uses ? `/${coupon.max_uses}` : ''}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {coupon.valid_until ? (
                          <span className={isExpired(coupon) ? 'text-destructive' : ''}>
                            {format(new Date(coupon.valid_until), 'PP')}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">No expiry</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {isExpired(coupon) ? (
                          <Badge variant="destructive">Expired</Badge>
                        ) : isMaxedOut(coupon) ? (
                          <Badge variant="secondary">Maxed Out</Badge>
                        ) : coupon.is_active ? (
                          <Badge className="bg-success/10 text-success border-success/20">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <XCircle className="h-3 w-3 mr-1" />
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEditDialog(coupon)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => setDeleteConfirm(coupon.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
            </DialogTitle>
            <DialogDescription>
              {editingCoupon 
                ? 'Update the coupon details below.' 
                : 'Fill in the details to create a new discount coupon.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="code">Coupon Code *</Label>
                <Input
                  id="code"
                  placeholder="e.g., SAVE20"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="mt-1 uppercase font-mono"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="e.g., 20% off on all items"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="discount_type">Discount Type</Label>
                <Select
                  value={formData.discount_type}
                  onValueChange={(value) => setFormData({ ...formData, discount_type: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="discount_value">
                  Discount Value *
                </Label>
                <Input
                  id="discount_value"
                  type="number"
                  min="0"
                  placeholder={formData.discount_type === 'percentage' ? '10' : '100'}
                  value={formData.discount_value}
                  onChange={(e) => setFormData({ ...formData, discount_value: Number(e.target.value) })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="min_order_amount">Min Order Amount (₹)</Label>
                <Input
                  id="min_order_amount"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.min_order_amount}
                  onChange={(e) => setFormData({ ...formData, min_order_amount: Number(e.target.value) })}
                  className="mt-1"
                />
              </div>

              {formData.discount_type === 'percentage' && (
                <div>
                  <Label htmlFor="max_discount">Max Discount (₹)</Label>
                  <Input
                    id="max_discount"
                    type="number"
                    min="0"
                    placeholder="No limit"
                    value={formData.max_discount || ''}
                    onChange={(e) => setFormData({ ...formData, max_discount: e.target.value ? Number(e.target.value) : null })}
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="max_uses">Max Uses</Label>
                <Input
                  id="max_uses"
                  type="number"
                  min="0"
                  placeholder="Unlimited"
                  value={formData.max_uses || ''}
                  onChange={(e) => setFormData({ ...formData, max_uses: e.target.value ? Number(e.target.value) : null })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="valid_from">Valid From *</Label>
                <Input
                  id="valid_from"
                  type="date"
                  value={formData.valid_from}
                  onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="valid_until">Valid Until</Label>
                <Input
                  id="valid_until"
                  type="date"
                  value={formData.valid_until}
                  onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="col-span-2 flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div>
                  <Label htmlFor="is_active" className="cursor-pointer">Active</Label>
                  <p className="text-xs text-muted-foreground">Enable this coupon for customers</p>
                </div>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : editingCoupon ? (
                'Update Coupon'
              ) : (
                'Create Coupon'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Coupon</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this coupon? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCoupons;