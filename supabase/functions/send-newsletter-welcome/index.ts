import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterRequest = await req.json();

    if (!email || !email.includes('@')) {
      throw new Error("Invalid email address");
    }

    console.log("Sending welcome newsletter email to:", email);

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
            <div style="background: linear-gradient(135deg, #8B4513, #D2691E); padding: 40px 30px; text-align: center;">
              <h1 style="color: #fff; margin: 0; font-size: 32px; font-weight: bold;">Vastra</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Welcome to the family! ✨</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #333; margin: 0 0 20px; font-size: 24px; text-align: center;">Thank You for Subscribing!</h2>
              
              <p style="color: #555; line-height: 1.8; font-size: 16px; margin-bottom: 20px;">
                We're thrilled to have you join the Vastra family! Get ready to discover beautiful ethnic and western wear crafted with love for the modern woman.
              </p>

              <p style="color: #555; line-height: 1.8; font-size: 16px; margin-bottom: 30px;">
                As a subscriber, you'll be the first to know about:
              </p>

              <div style="background: #f9f9f9; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
                <ul style="color: #555; margin: 0; padding-left: 20px; line-height: 2;">
                  <li>🆕 <strong>New Arrivals</strong> - Fresh styles every week</li>
                  <li>💰 <strong>Exclusive Discounts</strong> - Subscriber-only offers</li>
                  <li>🎉 <strong>Flash Sales</strong> - Early access to sales</li>
                  <li>👗 <strong>Style Tips</strong> - Curated fashion inspiration</li>
                </ul>
              </div>

              <div style="text-align: center; margin-bottom: 30px;">
                <p style="color: #8B4513; font-size: 20px; font-weight: bold; margin-bottom: 15px;">
                  Use code WELCOME15 for 15% off your first order!
                </p>
                <a href="https://vastra.lovable.app/shop" style="display: inline-block; background: linear-gradient(135deg, #8B4513, #D2691E); color: #fff; text-decoration: none; padding: 15px 40px; border-radius: 30px; font-weight: bold; font-size: 16px;">
                  Start Shopping →
                </a>
              </div>

              <p style="color: #888; font-size: 14px; text-align: center; margin-top: 30px;">
                Follow us on Instagram for daily inspiration
              </p>
              <p style="text-align: center; margin-top: 10px;">
                <a href="https://instagram.com/priyankacreations17" style="color: #8B4513; text-decoration: none; font-weight: bold;">
                  @priyankacreations17
                </a>
              </p>
            </div>

            <!-- Footer -->
            <div style="background: #f5f5f5; padding: 25px; text-align: center;">
              <p style="color: #888; margin: 0 0 10px; font-size: 14px;">With love,</p>
              <p style="color: #333; margin: 0; font-size: 18px; font-weight: bold;">Team Vastra</p>
              <p style="color: #aaa; margin: 15px 0 0; font-size: 12px;">
                You received this email because you subscribed to our newsletter.
              </p>
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
        from: "Vastra <onboarding@resend.dev>",
        to: [email],
        subject: "Welcome to Vastra! ✨ Here's 15% off your first order",
        html: emailHtml,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Resend error:", result);
      throw new Error(result.message || "Failed to send email");
    }

    console.log("Newsletter welcome email sent successfully:", result.id);

    return new Response(JSON.stringify({ success: true, emailId: result.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-newsletter-welcome function:", error);
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
