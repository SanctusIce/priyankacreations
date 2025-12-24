import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X, ShoppingBag, ChevronRight, Tag, Truck } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { items, loading, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary/30">
        <Header />
        <div className="pt-20 lg:pt-[70px]">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-48 bg-secondary rounded" />
              <div className="h-64 bg-secondary rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-secondary/30">
        <Header />
        <div className="pt-20 lg:pt-[70px]">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="max-w-md mx-auto">
              <ShoppingBag className="h-20 w-20 mx-auto text-muted-foreground mb-6" />
              <h1 className="text-xl font-bold mb-2">Hey, it feels so light!</h1>
              <p className="text-muted-foreground mb-8">There is nothing in your bag. Let's add some items.</p>
              <Link to="/shop">
                <Button size="lg" className="font-bold">
                  ADD ITEMS FROM WISHLIST
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const shippingCost = cartTotal >= 499 ? 0 : 49;
  const finalTotal = cartTotal + shippingCost;
  const discount = 0; // Can be calculated based on coupons

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />

      <main className="pt-20 lg:pt-[70px]">
        {/* Breadcrumb */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <ChevronRight size={14} className="text-muted-foreground" />
              <span className="text-foreground font-medium">Shopping Bag</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Delivery Info */}
              <div className="bg-background p-4 rounded-lg border border-border flex items-center gap-3">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold">
                    {cartTotal >= 499 
                      ? 'Yay! You get FREE delivery on this order' 
                      : `Add Rs. ${499 - cartTotal} more for FREE delivery`
                    }
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="bg-background rounded-lg border border-border divide-y divide-border">
                {items.map((item) => (
                  <div key={item.id} className="p-4 flex gap-4">
                    {/* Image */}
                    <Link to={`/product/${item.product_id}`} className="flex-shrink-0">
                      <div className="w-24 h-32 rounded overflow-hidden bg-secondary">
                        <img
                          src={item.product?.images[0] || '/placeholder.svg'}
                          alt={item.product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link to={`/product/${item.product_id}`}>
                            <h3 className="font-bold text-sm hover:text-primary transition-colors">
                              {item.product?.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            VASTRA
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="text-sm text-muted-foreground mt-2 space-x-3">
                        {item.selected_size && <span>Size: {item.selected_size}</span>}
                        {item.selected_color && <span>Color: {item.selected_color}</span>}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center border border-border rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-secondary transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-secondary transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-bold">
                            Rs. {((item.product?.price || 0) * item.quantity).toLocaleString()}
                          </p>
                          {item.product?.compare_at_price && (
                            <p className="text-xs text-muted-foreground line-through">
                              Rs. {((item.product.compare_at_price) * item.quantity).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-background rounded-lg border border-border sticky top-24">
                {/* Coupons */}
                <div className="p-4 border-b border-border">
                  <button className="flex items-center justify-between w-full text-left">
                    <div className="flex items-center gap-3">
                      <Tag className="h-5 w-5 text-muted-foreground" />
                      <span className="font-bold text-sm">Apply Coupons</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Price Details */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase mb-4">
                    Price Details ({items.length} Items)
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Total MRP</span>
                      <span>Rs. {cartTotal.toLocaleString()}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-success">
                        <span>Discount on MRP</span>
                        <span>-Rs. {discount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className={shippingCost === 0 ? 'text-success' : ''}>
                        {shippingCost === 0 ? 'FREE' : `Rs. ${shippingCost}`}
                      </span>
                    </div>

                    <div className="border-t border-border pt-3 mt-3">
                      <div className="flex justify-between font-bold text-base">
                        <span>Total Amount</span>
                        <span>Rs. {finalTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Place Order */}
                <div className="p-4 border-t border-border">
                  <Button
                    onClick={() => navigate('/checkout')}
                    className="w-full h-12 font-bold"
                    size="lg"
                  >
                    PLACE ORDER
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
