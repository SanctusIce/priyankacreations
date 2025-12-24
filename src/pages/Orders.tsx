import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, ChevronRight, Loader2, ShoppingBag } from 'lucide-react';
import { format } from 'date-fns';

const statusColors: Record<string, string> = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  confirmed: 'bg-info/10 text-info border-info/20',
  processing: 'bg-primary/10 text-primary border-primary/20',
  shipped: 'bg-info/10 text-info border-info/20',
  delivered: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

const Orders = () => {
  const { user } = useAuth();
  const { data: orders, isLoading } = useOrders();

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

                  {/* Order Items */}
                  <div className="p-4">
                    <div className="flex flex-wrap gap-4">
                      {order.order_items?.map((item) => (
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
                            <p className="text-sm font-bold mt-1">Rs. {item.total_price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="p-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-lg font-bold">Rs. {order.total.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      {order.tracking_url && (
                        <a href={order.tracking_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="font-bold">
                            Track Order
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

      <Footer />
    </div>
  );
};

export default Orders;
