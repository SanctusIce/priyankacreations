import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { toast } from 'sonner';
import { Loader2, Eye, MapPin, Phone, User, Package, Truck, Copy, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const AdminOrders = () => {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingUrl, setTrackingUrl] = useState('');
  const [savingTracking, setSavingTracking] = useState(false);

  const { data: orders, isLoading } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = async (orderId: string, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success('Order status updated');
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
    }
  };

  const saveTrackingInfo = async () => {
    if (!selectedOrder) return;
    setSavingTracking(true);
    
    const { error } = await supabase
      .from('orders')
      .update({ 
        tracking_number: trackingNumber,
        tracking_url: trackingUrl 
      })
      .eq('id', selectedOrder.id);

    setSavingTracking(false);
    
    if (error) {
      toast.error('Failed to save tracking info');
    } else {
      toast.success('Tracking info saved! Customer can now track their order.');
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
      setSelectedOrder({ ...selectedOrder, tracking_number: trackingNumber, tracking_url: trackingUrl });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  const openOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setTrackingNumber(order.tracking_number || '');
    setTrackingUrl(order.tracking_url || '');
  };

  return (
    <div className="p-8">
      <h1 className="font-heading text-3xl font-bold mb-8">Orders Management</h1>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : orders?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Package className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-lg font-bold mb-2">No Orders Yet</h2>
              <p className="text-muted-foreground">Orders will appear here when customers place them.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tracking</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.order_number}</TableCell>
                    <TableCell>{format(new Date(order.created_at), 'PP')}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{(order.shipping_address as any)?.full_name || 'N/A'}</p>
                        <p className="text-xs text-muted-foreground">{(order.shipping_address as any)?.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{order.order_items?.length || 0}</TableCell>
                    <TableCell className="font-bold">₹{order.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={order.payment_status === 'paid' ? 'default' : 'outline'}>
                        {order.payment_status === 'paid' ? 'Paid' : 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value) => updateStatus(order.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {order.tracking_number ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          <Truck className="h-3 w-3 mr-1" />
                          Added
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Not added
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openOrderDetails(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order #{selectedOrder?.order_number}
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer & Shipping Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-secondary/30 rounded-lg p-4">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Shipping Address
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold flex items-center gap-2">
                      <User className="h-3 w-3" />
                      {(selectedOrder.shipping_address as any)?.full_name}
                    </p>
                    <p>{(selectedOrder.shipping_address as any)?.address_line1}</p>
                    {(selectedOrder.shipping_address as any)?.address_line2 && (
                      <p>{(selectedOrder.shipping_address as any)?.address_line2}</p>
                    )}
                    <p>
                      {(selectedOrder.shipping_address as any)?.city}, {(selectedOrder.shipping_address as any)?.state}
                    </p>
                    <p className="font-medium">{(selectedOrder.shipping_address as any)?.pincode}</p>
                    <p className="flex items-center gap-2 pt-2">
                      <Phone className="h-3 w-3" />
                      {(selectedOrder.shipping_address as any)?.phone}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard((selectedOrder.shipping_address as any)?.phone, 'Phone number')}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </p>
                  </div>
                </div>
                
                <div className="bg-secondary/30 rounded-lg p-4">
                  <h4 className="font-bold mb-3">Order Info</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{format(new Date(selectedOrder.created_at), 'PPP')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment:</span>
                      <span>{selectedOrder.payment_method || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Status:</span>
                      <Badge variant={selectedOrder.payment_status === 'paid' ? 'default' : 'outline'}>
                        {selectedOrder.payment_status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order Status:</span>
                      <Badge className={statusColors[selectedOrder.status]}>
                        {selectedOrder.status}
                      </Badge>
                    </div>
                    {selectedOrder.coupon_code && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Coupon:</span>
                        <span className="font-mono">{selectedOrder.coupon_code}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Tracking Info Section */}
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Truck className="h-4 w-4 text-blue-600" />
                  Tracking Information
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Add tracking details so customers can track their shipment.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tracking-number">Tracking Number</Label>
                    <Input
                      id="tracking-number"
                      placeholder="e.g., AWB123456789"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tracking-url">Tracking URL (optional)</Label>
                    <Input
                      id="tracking-url"
                      placeholder="https://tracking.example.com/..."
                      value={trackingUrl}
                      onChange={(e) => setTrackingUrl(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <Button 
                  onClick={saveTrackingInfo} 
                  className="mt-4"
                  disabled={savingTracking || (!trackingNumber && !trackingUrl)}
                >
                  {savingTracking ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Tracking Info'
                  )}
                </Button>
              </div>

              <Separator />

              {/* Order Items */}
              <div>
                <h4 className="font-bold mb-3">Order Items ({selectedOrder.order_items?.length})</h4>
                <div className="space-y-3">
                  {selectedOrder.order_items?.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg bg-background">
                      <img
                        src={item.product_image || '/placeholder.svg'}
                        alt={item.product_name}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{item.product_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.size && `Size: ${item.size}`} {item.color && `| Color: ${item.color}`}
                        </p>
                        <p className="text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">₹{item.unit_price} × {item.quantity}</p>
                        <p className="font-bold text-lg">₹{item.total_price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Order Summary */}
              <div className="bg-secondary/30 rounded-lg p-4">
                <h4 className="font-bold mb-3">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  {selectedOrder.discount_amount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{selectedOrder.discount_amount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{selectedOrder.shipping_cost === 0 ? 'FREE' : `₹${selectedOrder.shipping_cost}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
