"use server"

import nodemailer from "nodemailer"

interface BookingData {
  service: string
  practitioner: string
  date: string
  time: string
  sessionType: string
  name: string
  email: string
  phone: string
  notes: string
}

// Configure your email service - using a test mailer for now
// In production, replace with your actual SMTP credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.mailtrap.io",
  port: Number.parseInt(process.env.SMTP_PORT || "2525"),
  auth: {
    user: process.env.SMTP_USER || "test",
    pass: process.env.SMTP_PASSWORD || "test",
  },
})

const serviceNames: { [key: string]: string } = {
  "1": "Energy Healing (60 min)",
  "2": "Spiritual Guidance (45 min)",
  "3": "Aura Cleansing (30 min)",
  "4": "Meditation Session (30 min)",
}

const practitionerNames: { [key: string]: string } = {
  "1": "Maya Chen",
  "2": "David Rodriguez",
  "3": "Sophie Laurent",
}

const sessionTypeNames: { [key: string]: string } = {
  phone: "Phone Call",
  viber: "Viber",
  zoom: "Zoom Video",
}

export async function sendBookingConfirmation(bookingData: BookingData) {
  try {
    const serviceName = serviceNames[bookingData.service] || bookingData.service
    const practitionerName = practitionerNames[bookingData.practitioner] || bookingData.practitioner
    const sessionType = sessionTypeNames[bookingData.sessionType] || bookingData.sessionType

    // Email to client
    const clientEmailHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #8b5cf6;">Booking Confirmation ✨</h1>
            <p>Dear ${bookingData.name},</p>
            
            <p>Thank you for booking your healing session with us! Your appointment has been confirmed.</p>
            
            <div style="background-color: #f3f0ff; border-left: 4px solid #8b5cf6; padding: 15px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #8b5cf6;">Session Details</h3>
              <p><strong>Service:</strong> ${serviceName}</p>
              <p><strong>Practitioner:</strong> ${practitionerName}</p>
              <p><strong>Date:</strong> ${bookingData.date}</p>
              <p><strong>Time:</strong> ${bookingData.time}</p>
              <p><strong>Communication:</strong> ${sessionType}</p>
            </div>
            
            <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #059669;">What Happens Next</h3>
              <p>1. You'll receive a reminder email 24 hours before your session</p>
              <p>2. Connection details will be sent based on your chosen communication method</p>
              <p>3. A healer will contact you at the scheduled time</p>
            </div>
            
            ${bookingData.notes ? `<p><strong>Your Notes:</strong></p><p>${bookingData.notes}</p>` : ""}
            
            <p style="margin-top: 30px; color: #666; font-size: 12px;">
              Questions? Contact us at +1 (555) 123-4567 or reply to this email.
            </p>
            
            <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
              Spiritual Healing Center<br>
              Nurturing your soul, one session at a time
            </p>
          </div>
        </body>
      </html>
    `

    // Email to admin
    const adminEmailHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #8b5cf6;">New Booking Received</h1>
            <p>A new booking has been submitted:</p>
            
            <div style="background-color: #f3f0ff; border-left: 4px solid #8b5cf6; padding: 15px;">
              <p><strong>Client Name:</strong> ${bookingData.name}</p>
              <p><strong>Email:</strong> ${bookingData.email}</p>
              <p><strong>Phone:</strong> ${bookingData.phone}</p>
              <p><strong>Service:</strong> ${serviceName}</p>
              <p><strong>Practitioner Requested:</strong> ${practitionerName}</p>
              <p><strong>Date:</strong> ${bookingData.date}</p>
              <p><strong>Time:</strong> ${bookingData.time}</p>
              <p><strong>Communication Method:</strong> ${sessionType}</p>
              <p><strong>Special Requests:</strong> ${bookingData.notes || "None"}</p>
            </div>
            
            <p style="margin-top: 20px; color: #666; font-size: 12px;">
              Please reach out to the client to confirm this booking.
            </p>
          </div>
        </body>
      </html>
    `

    // Send email to client
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@spiritualhealing.com",
      to: bookingData.email,
      subject: `Booking Confirmation - ${serviceName}`,
      html: clientEmailHtml,
    })

    // Send notification to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@spiritualhealing.com",
      to: process.env.ADMIN_EMAIL || "admin@spiritualhealing.com",
      subject: `New Booking: ${bookingData.name} - ${serviceName}`,
      html: adminEmailHtml,
    })

    return { success: true, message: "Booking confirmation sent successfully" }
  } catch (error) {
    console.error("Error sending booking email:", error)
    return { success: false, message: "Failed to send booking confirmation" }
  }
}
