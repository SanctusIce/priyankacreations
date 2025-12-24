import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, ChevronRight, Loader2, ShoppingBag, Truck, CheckCircle2, Clock, MapPin, Copy, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
    <div className="py-4">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-border">
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
                } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
              </div>
              <span className={`text-xs mt-2 capitalize ${isCompleted ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Orders = () => {
  const { user } = useAuth();
  const { data: orders, isLoading } = useOrders();
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Tracking number copied!');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-secondary/30">
        <Header />
        <main className="pt-20 lg:pt-[102px]">
          <div className="container mx-auto px-4 py-16 text-center">
            <Package className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-xl font-bold mb-2">PLEASE LOG IN</h1>
            <p className="text-muted-foreground mb-8">Login to view your order history.</p>
            <Link to="/auth">
              <Button size="lg" className="font-bold">LOGIN</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              <span className="text-foreground font-medium">My Orders</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <h1 className="text-lg font-bold mb-6">My Orders</h1>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !orders || orders.length === 0 ? (
            <div className="text-center py-16 bg-background rounded-lg">
              <ShoppingBag className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-lg font-bold mb-2">NO ORDERS YET</h2>
              <p className="text-muted-foreground mb-8">Looks like you haven't placed any orders yet.</p>
              <Link to="/shop">
                <Button size="lg" className="font-bold">START SHOPPING</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-background rounded-lg border border-border overflow-hidden">
                  {/* Order Header */}
                  <div className="p-4 border-b border-border bg-secondary/30">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-bold">Order #{order.order_number}</p>
                        <p className="text-sm text-muted-foreground">
                          Placed on {format(new Date(order.created_at), 'dd MMM yyyy')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={statusColors[order.status] || ''}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="p-4">
                    <div className="flex flex-wrap gap-4">
                      {order.order_items?.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <img
                            src={item.product_image || '/placeholder.svg'}
                            alt={item.product_name}
                            className="w-16 h-20 object-cover rounded bg-secondary"
                          />
                          <div>
                            <p className="font-semibold text-sm line-clamp-1">{item.product_name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.size && `Size: ${item.size}`}
                              {item.color && ` | ${item.color}`}
                            </p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            <p className="text-sm font-bold mt-1">₹{item.total_price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                      {order.order_items && order.order_items.length > 3 && (
                        <div className="flex items-center">
                          <span className="text-sm text-muted-foreground">
                            +{order.order_items.length - 3} more items
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tracking Info Banner */}
                  {order.tracking_number && (
                    <div className="mx-4 mb-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                        <Truck className="h-4 w-4" />
                        <span className="font-medium text-sm">Tracking: {order.tracking_number}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(order.tracking_number!)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Order Footer */}
                  <div className="p-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-lg font-bold">₹{order.total.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="font-bold"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View Details
                      </Button>
                      {order.tracking_url && (
                        <a href={order.tracking_url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="font-bold">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Track Shipment
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order #{selectedOrder?.order_number}
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Timeline */}
              <div className="bg-secondary/30 rounded-lg p-4">
                <h4 className="font-bold mb-2">Order Status</h4>
                <OrderTimeline currentStatus={selectedOrder.status} />
              </div>

              {/* Tracking Info */}
              {selectedOrder.tracking_number && (
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <h4 className="font-bold text-blue-700 dark:text-blue-400">Shipment Tracking</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono bg-background px-3 py-1 rounded">
                      {selectedOrder.tracking_number}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyToClipboard(selectedOrder.tracking_number)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  {selectedOrder.tracking_url && (
                    <a 
                      href={selectedOrder.tracking_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline mt-2 text-sm"
                    >
                      Track on courier website
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              )}

              {/* Shipping Address */}
              <div className="bg-secondary/30 rounded-lg p-4">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Delivery Address
                </h4>
                <div className="text-sm space-y-1">
                  <p className="font-semibold">{(selectedOrder.shipping_address as any)?.full_name}</p>
                  <p>{(selectedOrder.shipping_address as any)?.address_line1}</p>
                  {(selectedOrder.shipping_address as any)?.address_line2 && (
                    <p>{(selectedOrder.shipping_address as any)?.address_line2}</p>
                  )}
                  <p>
                    {(selectedOrder.shipping_address as any)?.city}, {(selectedOrder.shipping_address as any)?.state} - {(selectedOrder.shipping_address as any)?.pincode}
                  </p>
                  <p>Phone: {(selectedOrder.shipping_address as any)?.phone}</p>
                </div>
              </div>

              <Separator />

              {/* All Order Items */}
              <div>
                <h4 className="font-bold mb-3">Items ({selectedOrder.order_items?.length})</h4>
                <div className="space-y-3">
                  {selectedOrder.order_items?.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <img
                        src={item.product_image || '/placeholder.svg'}
                        alt={item.product_name}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{item.product_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.size && `Size: ${item.size}`} {item.color && `| ${item.color}`}
                        </p>
                        <p className="text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold">₹{item.total_price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{selectedOrder.subtotal.toLocaleString()}</span>
                </div>
                {selectedOrder.discount_amount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{selectedOrder.discount_amount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{selectedOrder.shipping_cost === 0 ? 'FREE' : `₹${selectedOrder.shipping_cost}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Orders;
