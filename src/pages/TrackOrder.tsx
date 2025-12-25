import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Package, 
  ChevronRight, 
  Loader2, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Copy, 
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Separator } from '@/components/ui/separator';

const statusColors: Record<string, string> = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  confirmed: 'bg-info/10 text-info border-info/20',
  processing: 'bg-primary/10 text-primary border-primary/20',
  shipped: 'bg-blue-100 text-blue-700 border-blue-200',
  delivered: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

const statusSteps = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

const OrderTimeline = ({ currentStatus }: { currentStatus: string }) => {
  const currentIndex = statusSteps.indexOf(currentStatus);
  const isCancelled = currentStatus === 'cancelled';

  if (isCancelled) {
    return (
      <div className="flex items-center justify-center py-4">
        <Badge variant="destructive" className="text-base px-4 py-2">
          Order Cancelled
        </Badge>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-1 bg-border">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(currentIndex / (statusSteps.length - 1)) * 100}%` }}
          />
        </div>
        
        {statusSteps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={step} className="flex flex-col items-center relative z-10">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-muted-foreground border-2 border-border'
                } ${isCurrent ? 'ring-4 ring-primary/20 scale-110' : ''}`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
              </div>
              <span className={`text-xs mt-2 capitalize font-medium ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TrackOrder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error('Please enter an order number or tracking number');
      return;
    }

    setIsLoading(true);
    setNotFound(false);
    setOrder(null);

    try {
      // Search by order number or tracking number
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .or(`order_number.ilike.%${searchQuery.trim()}%,tracking_number.ilike.%${searchQuery.trim()}%`)
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setOrder(data);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error searching order:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />
      
      <main className="pt-20 lg:pt-[102px]">
        {/* Breadcrumb */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <ChevronRight size={14} className="text-muted-foreground" />
              <span className="text-foreground font-medium">Track Order</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 lg:py-12">
          {/* Hero Section */}
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-3">Track Your Order</h1>
            <p className="text-muted-foreground">
              Enter your order number or tracking number to check the status of your delivery
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Enter order number (e.g., ORD-123456) or tracking number"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8 font-bold" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Track'}
              </Button>
            </div>
          </form>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Searching for your order...</p>
            </div>
          )}

          {/* Not Found State */}
          {notFound && !isLoading && (
            <div className="max-w-md mx-auto text-center py-12 bg-background rounded-lg border border-border">
              <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-lg font-bold mb-2">Order Not Found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find an order with that number. Please check and try again.
              </p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Make sure you entered the correct order number</p>
                <p>• Order numbers start with "VAS-"</p>
                <p>• Check your email for your order confirmation</p>
              </div>
            </div>
          )}

          {/* Order Result */}
          {order && !isLoading && (
            <div className="max-w-3xl mx-auto bg-background rounded-lg border border-border overflow-hidden animate-fade-in">
              {/* Order Header */}
              <div className="p-6 border-b border-border bg-secondary/30">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <Package className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-bold">Order #{order.order_number}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on {format(new Date(order.created_at), 'dd MMMM yyyy, hh:mm a')}
                    </p>
                  </div>
                  <Badge variant="outline" className={`${statusColors[order.status] || ''} text-sm px-3 py-1`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="p-6 border-b border-border">
                <h3 className="font-bold mb-2">Order Status</h3>
                <OrderTimeline currentStatus={order.status} />
              </div>

              {/* Tracking Info */}
              {order.tracking_number && (
                <div className="mx-6 my-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <h4 className="font-bold text-blue-700 dark:text-blue-400">Shipment Tracking</h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono bg-background px-3 py-2 rounded border">
                      {order.tracking_number}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(order.tracking_number)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  {order.tracking_url && (
                    <a 
                      href={order.tracking_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline mt-3 text-sm font-medium"
                    >
                      Track on courier website
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}

              {/* Shipping Address */}
              <div className="p-6 border-b border-border">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Delivery Address
                </h3>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p className="font-semibold text-foreground">{(order.shipping_address as any)?.full_name}</p>
                  <p>{(order.shipping_address as any)?.address_line1}</p>
                  {(order.shipping_address as any)?.address_line2 && (
                    <p>{(order.shipping_address as any)?.address_line2}</p>
                  )}
                  <p>
                    {(order.shipping_address as any)?.city}, {(order.shipping_address as any)?.state} - {(order.shipping_address as any)?.pincode}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 border-b border-border">
                <h3 className="font-bold mb-4">Items ({order.order_items?.length || 0})</h3>
                <div className="space-y-3">
                  {order.order_items?.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg">
                      <img
                        src={item.product_image || '/placeholder.svg'}
                        alt={item.product_name}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{item.product_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.size && `Size: ${item.size}`} {item.color && `| ${item.color}`}
                        </p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold">₹{item.total_price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{order.subtotal.toLocaleString()}</span>
                  </div>
                  {order.discount_amount > 0 && (
                    <div className="flex justify-between text-sm text-success">
                      <span>Discount</span>
                      <span>-₹{order.discount_amount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{order.shipping_cost === 0 ? 'FREE' : `₹${order.shipping_cost}`}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          {!order && !isLoading && !notFound && (
            <div className="max-w-xl mx-auto mt-12">
              <div className="bg-background rounded-lg border border-border p-6">
                <h3 className="font-bold mb-4">Need Help?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-xs">1</span>
                    </div>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Find your order number</strong> — Check your order confirmation email or SMS
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-xs">2</span>
                    </div>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Enter your order number</strong> — Type it in the search box above
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-xs">3</span>
                    </div>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">View your order status</strong> — Track your delivery in real-time
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <p className="text-sm text-muted-foreground">
                  Still have questions? <Link to="/contact" className="text-primary font-medium hover:underline">Contact our support team</Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackOrder;
