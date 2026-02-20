import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain= process.env.NEXT_PUBLIC_APP_URL;

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

export const sendContactFormEmail = async (data: ContactFormData) => {
  try {
    const { fullName, email, phone, service, message } = data;

    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY environment variable");
    }

    console.log("Attempting to send email with Resend...");
    
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ||"onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL||"",
      subject: `New Contact Form Submission from ${fullName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service Interest:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to send email");
  }
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ||"onboarding@resend.dev",
    to: email,
    subject: "2FA code",
    html: `<p>Your 2FA code :${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;
  
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ||"onboarding@resend.dev",
      to: email,
      subject: "Reset your password ",
      html: `<p>Click <a href=${resetLink}>here</a> to reset your password  </p>`,
    });
  };


export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ||"onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href=${confirmLink}>here</a> to confirm email </p>`,
  });
};

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  sessionType: string;
  preferredDate: string;
  preferredTime: string;
  dateOfBirth?: string;
  timeOfBirth?: string;
  placeOfBirth?: string;
  message?: string;
}

export const sendBookingEmail = async (data: BookingFormData) => {
  try {
    const {
      name,
      email,
      phone,
      sessionType,
      preferredDate,
      preferredTime,
      dateOfBirth,
      timeOfBirth,
      placeOfBirth,
      message,
    } = data;

    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY environment variable");
    }

    // Format dates for email
    const formattedPreferredDate = new Date(preferredDate).toLocaleDateString();
    const formattedDateOfBirth = dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : "Not provided";

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ||"onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL||"",
      subject: `New Booking Request from ${name}`,
      html: `
        <h2>New Booking Request</h2>
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        
        <h3>Session Details</h3>
        <p><strong>Session Type:</strong> ${sessionType}</p>
        <p><strong>Preferred Date:</strong> ${formattedPreferredDate}</p>
        <p><strong>Preferred Time:</strong> ${preferredTime}</p>
        
        <h3>Birth Details</h3>
        <p><strong>Date of Birth:</strong> ${formattedDateOfBirth}</p>
        <p><strong>Time of Birth:</strong> ${timeOfBirth || "Not provided"}</p>
        <p><strong>Place of Birth:</strong> ${placeOfBirth || "Not provided"}</p>
        
        <h3>Additional Message</h3>
        <p>${message || "No message provided"}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending booking email:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to send email");
  }
};

