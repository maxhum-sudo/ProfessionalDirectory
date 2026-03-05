import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export const sendMagicLink = async (email: string, magicLink: string) => {
  try {
    const result = await resend.emails.send({
      from: 'noreply@calgary-directory.com',
      to: email,
      subject: 'Your Calgary Directory Magic Link',
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2>Welcome to Calgary's Remote Worker Directory</h2>
          <p>Click the link below to sign in or create your profile:</p>
          <p>
            <a href="${magicLink}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Sign In
            </a>
          </p>
          <p>If you didn't request this link, you can safely ignore this email.</p>
          <p style="color: #666; font-size: 12px;">This link expires in 24 hours.</p>
        </div>
      `,
    })
    return result
  } catch (error) {
    console.error('Error sending magic link:', error)
    throw error
  }
}
