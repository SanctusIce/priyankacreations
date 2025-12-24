import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderSmsRequest {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: Array<{
    name: string;
    quantity: number;
    size?: string;
    color?: string;
  }>;
  total: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderNumber, customerName, customerPhone, customerAddress, items, total }: OrderSmsRequest = await req.json();

    const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioPhone = Deno.env.get("TWILIO_PHONE_NUMBER");
    const adminPhone = Deno.env.get("ADMIN_PHONE_NUMBER");

    if (!accountSid || !authToken || !twilioPhone || !adminPhone) {
      console.error("Missing Twilio configuration");
      throw new Error("SMS service not configured");
    }

    // Format items list
    const itemsList = items.map(item => {
      let details = `${item.name} x${item.quantity}`;
      if (item.size) details += ` (${item.size})`;
      if (item.color) details += ` [${item.color}]`;
      return details;
    }).join(", ");

    // Create SMS message
    const message = `🛒 NEW ORDER #${orderNumber}

Customer: ${customerName}
Phone: ${customerPhone}

Items: ${itemsList}

Total: ₹${total.toLocaleString('en-IN')}

Delivery Address:
${customerAddress}

Reply CONFIRM to confirm this order.`;

    console.log("Sending SMS to admin:", adminPhone);
    console.log("Message:", message);

    // Send SMS via Twilio
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    
    const response = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${btoa(`${accountSid}:${authToken}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: adminPhone,
        From: twilioPhone,
        Body: message,
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error("Twilio error:", result);
      throw new Error(result.message || "Failed to send SMS");
    }

    console.log("SMS sent successfully:", result.sid);

    return new Response(JSON.stringify({ success: true, messageSid: result.sid }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-order-sms function:", error);
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
