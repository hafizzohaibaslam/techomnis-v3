'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  details: z.string().min(1, 'Project details are required'),
})

type FormData = z.infer<typeof contactSchema>
type FormErrors = Partial<Record<keyof FormData, string>>

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    details: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [globalError, setGlobalError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setGlobalError('')

    const result = contactSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: FormErrors = {}
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormData
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message
        }
      })
      setErrors(fieldErrors)
      setGlobalError('Please fill in the highlighted fields.')

      const firstErrorField = Object.keys(fieldErrors)[0] as keyof FormData
      const el = document.getElementById(`f-${firstErrorField}`)
      if (el) el.focus()
      return
    }

    setErrors({})
    setSubmitted(true)
  }

  return (
    <div className="inner">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="page" id="page">
        <main id="main">
          <Link
            href="/"
            className="closeb"
            data-back
            data-go="Home"
            data-hover
            aria-label="Close and go to the homepage"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" fill="none" />
            </svg>
          </Link>
          <section className="contact" aria-label="Contact">
            <div className="wrap" style={{ height: '100%' }}>
              <div className="g2">
                <div className="ct-l">
                  <div className="ttl">
                    <span className="eyebrow">Start a project</span>
                    <h1 className="h-big" data-split>
                      Let&apos;s talk.
                    </h1>
                    <p className="t-reg" style={{ marginTop: '1.5rem' }}>
                      Tell us where the product is. We&apos;ll reply within 24 hours with a clear next step.
                    </p>
                  </div>
                  <div className="ct-links">
                    <div className="lk">
                      <span className="cap3">Email us</span>
                      <a href="mailto:hello@techomnis.com" data-hover>
                        <span className="ul">hello@techomnis.com</span>
                      </a>
                    </div>
                    <div className="lk">
                      <span className="cap3">Hire us on Upwork</span>
                      <a href="https://www.upwork.com/agencies/techomnis" target="_blank" rel="noopener noreferrer" data-hover>
                        <span className="ul">Top Rated Plus agency</span>
                      </a>
                    </div>
                    <div className="lk">
                      <span className="cap3">TechOmnis</span>
                      <a href="https://linkedin.com/company/techomnis" target="_blank" rel="noopener noreferrer" data-hover>
                        <span className="ul">LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="ct-r">
                  <form
                    className={`cform ${submitted ? 'sent' : ''}`}
                    id="cform"
                    noValidate
                    aria-label="Project request"
                    onSubmit={handleSubmit}
                  >
                    <div className={`fline ${errors.name ? 'err' : ''}`}>
                      <label htmlFor="f-name">Your name</label>
                      <div className="iw">
                        <input
                          id="f-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          aria-invalid={!!errors.name}
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                        />
                      </div>
                      <span className="bar" aria-hidden="true"></span>
                    </div>
                    <div className={`fline ${errors.email ? 'err' : ''}`}>
                      <label htmlFor="f-email">Email</label>
                      <div className="iw">
                        <input
                          id="f-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          aria-invalid={!!errors.email}
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                        />
                      </div>
                      <span className="bar" aria-hidden="true"></span>
                    </div>
                    <div className={`fline ${errors.details ? 'err' : ''}`}>
                      <label htmlFor="f-msg">Project details</label>
                      <div className="iw">
                        <textarea
                          id="f-msg"
                          name="details"
                          rows={1}
                          required
                          aria-invalid={!!errors.details}
                          value={formData.details}
                          onChange={(e) => handleChange('details', e.target.value)}
                          onInput={(e) => {
                            const ta = e.currentTarget
                            ta.style.height = 'auto'
                            ta.style.height =
                              Math.min(
                                ta.scrollHeight,
                                parseFloat(getComputedStyle(ta).maxHeight) || 9999
                              ) + 'px'
                          }}
                        ></textarea>
                      </div>
                      <span className="bar" aria-hidden="true"></span>
                    </div>
                    <p className="ferr" role="alert">
                      {globalError}
                    </p>
                    <p className="fok" role="status">
                      Thanks for reaching out. We will be in touch shortly.
                    </p>
                    <button type="submit" className="bbtn" data-hover data-bbtn>
                      Submit request
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
