import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()

    console.log("[v0] Received booking data:", bookingData)

    const smtpConfig = {
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      user: process.env.SMTP_USER,
      password: process.env.SMTP_PASSWORD,
      from: process.env.SMTP_FROM,
      adminEmail: process.env.ADMIN_EMAIL,
    }

    // Validate all required SMTP variables are present
    const missingVars = Object.entries(smtpConfig)
      .filter(([key, value]) => !value && key !== "port")
      .map(([key]) => key)

    if (missingVars.length > 0) {
      console.log("[v0] Missing SMTP variables:", missingVars)
      return NextResponse.json(
        {
          success: false,
          message: `Missing environment variables: ${missingVars.join(", ")}. Please configure SMTP settings in your Vars.`,
        },
        { status: 400 },
      )
    }

    console.log("[v0] SMTP Config:", {
      host: smtpConfig.host,
      port: smtpConfig.port,
      from: smtpConfig.from,
    })

    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.port === 465, // true for 465, false for other ports
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.password,
      },
    })

    // Prepare email content for client
    const clientEmailHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #7c3aed; margin-bottom: 20px;">✨ Booking Confirmed!</h2>
            <p style="color: #333; margin-bottom: 20px;">Dear ${bookingData.name},</p>
            <p style="color: #666; margin-bottom: 15px;">Thank you for booking a spiritual healing session with us. Here are your booking details:</p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 8px 0;"><strong>Service:</strong> ${bookingData.service}</p>
              <p style="margin: 8px 0;"><strong>Practitioner:</strong> ${bookingData.practitioner}</p>
              <p style="margin: 8px 0;"><strong>Date:</strong> ${bookingData.date}</p>
              <p style="margin: 8px 0;"><strong>Time:</strong> ${bookingData.time}</p>
              <p style="margin: 8px 0;"><strong>Communication Channel:</strong> ${bookingData.sessionType}</p>
            </div>

            <p style="color: #666; margin-bottom: 15px;">You will receive connection details shortly via the channel you selected.</p>
            
            <p style="color: #999; font-size: 12px; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
              This is an automated confirmation. Please do not reply to this email.
            </p>
          </div>
        </body>
      </html>
    `

    // Prepare email content for admin
    const adminEmailHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #7c3aed; margin-bottom: 20px;">📅 New Booking Received</h2>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Client Information:</h3>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${bookingData.name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${bookingData.email}</p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> ${bookingData.phone}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Session Details:</h3>
              <p style="margin: 8px 0;"><strong>Service:</strong> ${bookingData.service}</p>
              <p style="margin: 8px 0;"><strong>Practitioner:</strong> ${bookingData.practitioner}</p>
              <p style="margin: 8px 0;"><strong>Date:</strong> ${bookingData.date}</p>
              <p style="margin: 8px 0;"><strong>Time:</strong> ${bookingData.time}</p>
              <p style="margin: 8px 0;"><strong>Channel:</strong> ${bookingData.sessionType}</p>
              
              ${bookingData.notes ? `<h3 style="color: #333; margin-top: 20px;">Notes:</h3><p style="margin: 8px 0; color: #666;">${bookingData.notes}</p>` : ""}
            </div>
          </div>
        </body>
      </html>
    `

    await transporter.sendMail({
      from: smtpConfig.from,
      to: bookingData.email,
      subject: `Booking Confirmed: ${bookingData.service}`,
      html: clientEmailHtml,
    })

    console.log("[v0] Email sent to client:", bookingData.email)

    await transporter.sendMail({
      from: smtpConfig.from,
      to: smtpConfig.adminEmail,
      subject: `New Booking: ${bookingData.name} - ${bookingData.service}`,
      html: adminEmailHtml,
    })

    console.log("[v0] Email sent to admin:", smtpConfig.adminEmail)

    return NextResponse.json({
      success: true,
      message: "Booking confirmed! Confirmation emails have been sent.",
    })
  } catch (error) {
    console.error("[v0] Error processing booking:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process booking. Please try again.",
      },
      { status: 500 },
    )
  }
}
