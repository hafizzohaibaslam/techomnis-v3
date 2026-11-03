'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const budgetRanges = [
  'Under $10K',
  '$10K - $25K',
  '$25K - $50K',
  '$50K - $100K',
  '$100K+',
  'Not sure yet',
]

const serviceOptions = [
  'Product Engineering',
  'AI & LLM',
  'Web Development',
  'Mobile Development',
  'MVP Rescue',
  'UI/UX Design',
  'Other',
]

const timelineOptions = [
  'ASAP',
  '1-2 months',
  '3-6 months',
  '6+ months',
  'Flexible',
]

interface FormData {
  name: string
  email: string
  company: string
  budget: string
  service: string
  timeline: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    budget: '',
    service: '',
    timeline: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us about your project'
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide more details (at least 20 characters)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          company: '',
          budget: '',
          service: '',
          timeline: '',
          message: '',
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <main className="page" id="top">
      <div className="wrap">
        <header className="contact-header">
          <span className="eyebrow">Get in Touch</span>
          <h1 className="h-large" data-split>
            Start a project
          </h1>
          <p className="t-reg contact-intro">
            Tell us about your project. We typically respond within 24 hours.
          </p>
        </header>

        <div className="contact-content g2">
          {/* Form */}
          <div className="contact-form-wrapper ln lr lb">
            {status === 'success' ? (
              <div className="success-message center">
                <span className="success-icon">✓</span>
                <h2 className="h-sub">Message sent!</h2>
                <p className="t-reg grey">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  className="t-reg ul"
                  onClick={() => setStatus('idle')}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-row g2">
                  <div className="form-group">
                    <label htmlFor="name" className="cap">
                      Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'error' : ''}
                      placeholder="Your name"
                    />
                    {errors.name && <span className="error-msg t-small">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="cap">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="you@company.com"
                    />
                    {errors.email && <span className="error-msg t-small">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="company" className="cap">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company (optional)"
                  />
                </div>

                <div className="form-row g2">
                  <div className="form-group">
                    <label htmlFor="budget" className="cap">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value="">Select budget</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="service" className="cap">
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option value="">Select service</option>
                      {serviceOptions.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="timeline" className="cap">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                  >
                    <option value="">Select timeline</option>
                    {timelineOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="cap">
                    Project Details <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    rows={6}
                  />
                  {errors.message && <span className="error-msg t-small">{errors.message}</span>}
                </div>

                {status === 'error' && (
                  <div className="form-error">
                    <p className="t-reg">Something went wrong. Please try again or email us directly.</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn submit-btn"
                  disabled={status === 'submitting'}
                >
                  <span className="lbl">
                    {status === 'submitting' ? 'Sending...' : 'Send message'}
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="contact-info ln lb">
            <div className="info-section">
              <h2 className="h-sub">Prefer email?</h2>
              <p className="t-reg">
                <a href="mailto:hello@techomnis.com" className="ul" data-hover>
                  hello@techomnis.com
                </a>
                <span className="ph" style={{ marginLeft: '0.5rem' }}>Email placeholder</span>
              </p>
            </div>

            <div className="info-section">
              <h2 className="h-sub">Book a call</h2>
              <p className="t-reg grey">
                Schedule a 30-minute discovery call to discuss your project.
              </p>
              <a href="#" className="ul t-reg" data-hover>
                View calendar
                <span className="ph" style={{ marginLeft: '0.5rem' }}>Calendly link TBC</span>
              </a>
            </div>

            <div className="info-section">
              <h2 className="h-sub">Response time</h2>
              <p className="t-reg grey">
                We typically respond within 24 hours during business days (Mon-Fri).
              </p>
            </div>

            <div className="info-section">
              <h2 className="h-sub">Location</h2>
              <p className="t-reg grey">
                Remote-first team based in Lahore, Pakistan. We work with clients globally.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-header {
          padding: 8rem 0 4rem;
        }
        .contact-intro {
          max-width: 40rem;
          margin-top: 1.5rem;
          color: var(--ink7);
        }
        .contact-content {
          padding-bottom: 6rem;
          gap: 0;
        }
        .contact-form-wrapper {
          padding: 3rem;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-row {
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          color: var(--ink7);
        }
        .required {
          color: #e74c3c;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 1rem;
          border: 1px solid var(--hair);
          border-radius: 0.5rem;
          font-size: 1rem;
          font-family: inherit;
          background: #fff;
          transition: border-color 0.2s;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--ink);
        }
        .form-group input.error,
        .form-group textarea.error {
          border-color: #e74c3c;
        }
        .error-msg {
          color: #e74c3c;
        }
        .form-error {
          padding: 1rem;
          background: #fef2f2;
          border-radius: 0.5rem;
          color: #e74c3c;
        }
        .submit-btn {
          align-self: flex-start;
          background: var(--ink);
          color: #fff;
          padding: 1rem 2rem;
          border-radius: 2rem;
          font-weight: 600;
          transition: opacity 0.2s;
        }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .success-message {
          padding: 4rem 2rem;
          gap: 1rem;
        }
        .success-icon {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          background: #10b981;
          color: #fff;
          display: grid;
          place-items: center;
          font-size: 2rem;
          font-weight: 600;
        }
        .contact-info {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
        .info-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        @media (max-width: 1023px) {
          .contact-header {
            padding: 20rem 0 8rem;
          }
          .contact-intro {
            max-width: none;
          }
          .contact-content {
            grid-template-columns: 1fr;
          }
          .contact-form-wrapper,
          .contact-info {
            padding: 6rem 0;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  )
}
