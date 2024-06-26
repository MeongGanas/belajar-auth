import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href=${confirmLink}>here</a> to confirm email.</p>`,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm to reset your password",
    html: `<p>Click <a href=${confirmLink}>here</a> to reset your password.</p>`,
  });
}

export async function sendTwoFactorEmail(email: string, token: string) {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two Factor Token",
    html: `<p>Your Two Factor Token: <b>${token}</b></p>`,
  });
}
