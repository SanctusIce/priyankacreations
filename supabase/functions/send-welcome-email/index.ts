import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");



const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  fullName: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, fullName }: WelcomeEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Vastra <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Vastra - Your Style Journey Begins! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #faf8f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #7c2d3c 0%, #a44b5b 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 36px; margin: 0; font-family: Georgia, serif;">Vastra</h1>
                <p style="color: #d4a853; font-size: 14px; margin: 10px 0 0; letter-spacing: 2px;">ELEGANCE IN EVERY THREAD</p>
              </td>
            </tr>
            
            <!-- Welcome Message -->
            <tr>
              <td style="padding: 40px 30px;">
                <h2 style="color: #7c2d3c; font-size: 24px; margin: 0 0 20px; font-family: Georgia, serif;">Welcome, ${fullName || 'Fashion Lover'}!</h2>
                <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                  Thank you for joining the Vastra family. We're thrilled to have you on this journey of discovering exquisite Indian fashion and timeless elegance.
                </p>
                <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                  As a new member, you're now part of an exclusive community that celebrates the rich heritage of Indian craftsmanship combined with contemporary style.
                </p>
              </td>
            </tr>
            
            <!-- Special Offer -->
            <tr>
              <td style="padding: 0 30px;">
                <div style="background: linear-gradient(135deg, #d4a853 0%, #e8c878 100%); border-radius: 12px; padding: 30px; text-align: center;">
                  <p style="color: #4a3010; font-size: 14px; margin: 0 0 10px; letter-spacing: 1px;">EXCLUSIVE WELCOME OFFER</p>
                  <h3 style="color: #4a3010; font-size: 32px; margin: 0 0 10px; font-family: Georgia, serif;">15% OFF</h3>
                  <p style="color: #4a3010; font-size: 16px; margin: 0 0 20px;">On your first order</p>
                  <div style="background-color: #ffffff; border-radius: 8px; padding: 15px; display: inline-block;">
                    <code style="color: #7c2d3c; font-size: 20px; font-weight: bold; letter-spacing: 3px;">WELCOME15</code>
                  </div>
                </div>
              </td>
            </tr>
            
            <!-- CTA Button -->
            <tr>
              <td style="padding: 40px 30px; text-align: center;">
                <a href="${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '')}" 
                   style="display: inline-block; background: linear-gradient(135deg, #7c2d3c 0%, #a44b5b 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                  Start Shopping
                </a>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color: #f5f2ed; padding: 30px; text-align: center;">
                <p style="color: #888888; font-size: 14px; margin: 0 0 15px;">
                  Follow us for exclusive updates and style inspiration
                </p>
                <p style="color: #888888; font-size: 12px; margin: 0;">
                  © 2024 Vastra. All rights reserved.<br>
                  Crafted with ❤️ in India
                </p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
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
