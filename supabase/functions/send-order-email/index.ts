import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: Array<{
    name: string;
    quantity: number;
    size?: string;
    color?: string;
    price: number;
  }>;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      orderNumber, 
      customerName, 
      customerEmail,
      customerPhone, 
      customerAddress, 
      items, 
      subtotal,
      shippingCost,
      discount,
      total 
    }: OrderEmailRequest = await req.json();

    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "admin@vastra.com";

    console.log("Sending order notification email to admin:", adminEmail);

    // Format items list for email
    const itemsHtml = items.map(item => {
      let details = `<tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">
          <strong>${item.name}</strong>
          ${item.size ? `<br><span style="color: #666;">Size: ${item.size}</span>` : ''}
          ${item.color ? `<br><span style="color: #666;">Color: ${item.color}</span>` : ''}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toLocaleString('en-IN')}</td>
      </tr>`;
      return details;
    }).join('');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #8B4513, #D2691E); padding: 30px; text-align: center;">
              <h1 style="color: #fff; margin: 0; font-size: 28px;">🛍️ New Order Received!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Order #${orderNumber}</p>
            </div>

            <!-- Customer Details -->
            <div style="padding: 30px;">
              <h2 style="color: #333; margin: 0 0 20px; font-size: 18px; border-bottom: 2px solid #8B4513; padding-bottom: 10px;">Customer Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666;">Name:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 600;">${customerName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Email:</td>
                  <td style="padding: 8px 0; color: #333;">${customerEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Phone:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 600;">${customerPhone}</td>
                </tr>
              </table>

              <!-- Delivery Address -->
              <h2 style="color: #333; margin: 30px 0 15px; font-size: 18px; border-bottom: 2px solid #8B4513; padding-bottom: 10px;">Delivery Address</h2>
              <p style="color: #333; margin: 0; line-height: 1.6; background: #f9f9f9; padding: 15px; border-radius: 8px;">${customerAddress.replace(/\n/g, '<br>')}</p>

              <!-- Order Items -->
              <h2 style="color: #333; margin: 30px 0 15px; font-size: 18px; border-bottom: 2px solid #8B4513; padding-bottom: 10px;">Order Items</h2>
              <table style="width: 100%; border-collapse: collapse; background: #f9f9f9; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background: #eee;">
                    <th style="padding: 12px; text-align: left; color: #666;">Product</th>
                    <th style="padding: 12px; text-align: center; color: #666;">Qty</th>
                    <th style="padding: 12px; text-align: right; color: #666;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <!-- Order Summary -->
              <div style="margin-top: 20px; background: #f9f9f9; padding: 20px; border-radius: 8px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666;">Subtotal:</td>
                    <td style="padding: 8px 0; color: #333; text-align: right;">₹${subtotal.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;">Shipping:</td>
                    <td style="padding: 8px 0; color: #333; text-align: right;">${shippingCost === 0 ? 'FREE' : `₹${shippingCost.toLocaleString('en-IN')}`}</td>
                  </tr>
                  ${discount > 0 ? `
                  <tr>
                    <td style="padding: 8px 0; color: #22c55e;">Discount:</td>
                    <td style="padding: 8px 0; color: #22c55e; text-align: right;">-₹${discount.toLocaleString('en-IN')}</td>
                  </tr>
                  ` : ''}
                  <tr style="border-top: 2px solid #ddd;">
                    <td style="padding: 12px 0 0; color: #333; font-size: 18px; font-weight: 700;">Total:</td>
                    <td style="padding: 12px 0 0; color: #8B4513; font-size: 18px; font-weight: 700; text-align: right;">₹${total.toLocaleString('en-IN')}</td>
                  </tr>
                </table>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #f5f5f5; padding: 20px; text-align: center;">
              <p style="color: #666; margin: 0; font-size: 14px;">This is an automated notification from Vastra</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Vastra Orders <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `🛍️ New Order #${orderNumber} - ₹${total.toLocaleString('en-IN')}`,
        html: emailHtml,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Resend error:", result);
      throw new Error(result.message || "Failed to send email");
    }

    console.log("Email sent successfully:", result.id);

    return new Response(JSON.stringify({ success: true, emailId: result.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
