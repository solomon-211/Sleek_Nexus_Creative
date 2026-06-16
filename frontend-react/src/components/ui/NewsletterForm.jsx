import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function NewsletterForm({ id, dark = true }) {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    if (!data.firstName || !data.lastName || !data.email) {
      return setStatus('error:Please fill in all fields.')
    }
    setLoading(true)
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID,
        { firstName: data.firstName, lastName: data.lastName, email: data.email },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      e.target.reset()
    } catch {
      setStatus('error:Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const base = dark
    ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary'
    : 'bg-white border border-gray-200 text-dark placeholder-gray-400 focus:border-primary'

  return (
    <form id={id} onSubmit={handleSubmit} noValidate className="space-y-2">
      <div className="flex gap-2">
        <input name="firstName" type="text" placeholder="First Name"
          className={`w-1/2 rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors ${base}`} />
        <input name="lastName" type="text" placeholder="Last Name"
          className={`w-1/2 rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors ${base}`} />
      </div>
      <input name="email" type="email" placeholder="Email Address"
        className={`w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors ${base}`} />
      <button type="submit" disabled={loading}
        className="w-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60">
        {loading ? <><i className="fas fa-spinner fa-spin mr-2" />Subscribing...</> : 'Subscribe'}
      </button>
      {status === 'success' && (
        <p className="text-xs text-green-400 flex items-center gap-1"><i className="fas fa-check-circle" /> Thank you for subscribing!</p>
      )}
      {status.startsWith('error:') && (
        <p className="text-xs text-red-400 flex items-center gap-1"><i className="fas fa-exclamation-circle" /> {status.replace('error:', '')}</p>
      )}
    </form>
  )
}
