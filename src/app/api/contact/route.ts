import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  budget: z.string().optional(),
  service: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const result = contactSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const data = result.data

    const emailProvider = process.env.EMAIL_PROVIDER
    const emailApiKey = process.env.EMAIL_API_KEY
    const emailTo = process.env.EMAIL_TO || 'hello@techomnis.com'

    if (emailProvider === 'resend' && emailApiKey) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${emailApiKey}`,
          },
          body: JSON.stringify({
            from: 'TechOmnis Contact <noreply@techomnis.com>',
            to: emailTo,
            subject: `New Contact: ${data.name} - ${data.service || 'General Inquiry'}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
              <p><strong>Budget:</strong> ${data.budget || 'Not provided'}</p>
              <p><strong>Service:</strong> ${data.service || 'Not provided'}</p>
              <p><strong>Timeline:</strong> ${data.timeline || 'Not provided'}</p>
              <h3>Message:</h3>
              <p>${data.message.replace(/\n/g, '<br>')}</p>
            `,
          }),
        })

        if (!response.ok) {
          console.error('Resend API error:', await response.text())
        }
      } catch (emailError) {
        console.error('Email send error:', emailError)
      }
    } else {
      console.log('=== CONTACT FORM SUBMISSION ===')
      console.log('Email provider not configured. Set EMAIL_PROVIDER and EMAIL_API_KEY env vars.')
      console.log('Form data:', JSON.stringify(data, null, 2))
      console.log('================================')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
