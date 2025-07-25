'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { realProducts } from '@/lib/product-data'
import Image from 'next/image'
import Link from 'next/link'
import {
  Share2,
  Facebook,
  Instagram,
  ClipboardCopy,
  Phone,
} from 'lucide-react'

export default function ProductPage() {
  const { id } = useParams()
  const product = realProducts.find((p) => p.id === Number(id))
  const [showPopup, setShowPopup] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState('')

  if (!product) return <div className="text-center py-10">Product not found</div>

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Sending...')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: form.name,
        lastName: '',
        email: form.email,
        phone: form.phone,
        service: product.name,
        message: form.message,
      }),
    })

    if (res.ok) {
      setStatus('Message Sent!')
      setForm({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setShowPopup(false), 1500)
    } else {
      setStatus('Failed. Try again.')
    }
  }

  useEffect(() => {
    const closeTooltip = () => setShowTooltip(false)
    if (showTooltip) {
      window.addEventListener('click', closeTooltip)
    }
    return () => window.removeEventListener('click', closeTooltip)
  }, [showTooltip])

  return (
    <div className="bg-gradient-to-br from-[#f8e6c0] via-[#f2cc8f] to-[#e8b05e] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link href="/" className="text-sm text-amber-700 hover:underline mb-6 inline-block">
          ← Back
        </Link>

        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <Image
              src={product.image}
              alt={product.name}
              width={350}
              height={350}
              className="rounded-xl shadow-md mx-auto"
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
            <h1 className="text-3xl font-bold text-amber-800">{product.name}</h1>
            <p className="text-gray-700 text-sm">{product.description}</p>
            <p className="text-xl font-semibold text-amber-600">₹{product.price.toFixed(2)}</p>

            <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start relative">
              <button
                onClick={() => setShowPopup(true)}
                className="px-6 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition"
              >
                Enquire Now
              </button>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowTooltip((prev) => !prev)
                  }}
                  className="px-6 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition flex items-center gap-2"
                >
                  <Share2 size={16} />
                  Share
                </button>

                {showTooltip && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-full right-0 mt-2 bg-amber-600 text-white border border-amber-600 rounded shadow-lg p-3 z-50 min-w-[220px]"
                  >
                    <p className="text-sm text-white mb-2">Share this product:</p>
                    <div className="flex justify-between items-center gap-4">
                      <a
                        href={`https://api.whatsapp.com/send?text=Check this out: ${typeof window !== 'undefined' ? window.location.href : ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                      >
                        <Phone size={20} />
                      </a>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                      >
                        <Facebook size={20} />
                      </a>
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                      >
                        <Instagram size={20} />
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href)
                          setCopied(true)
                          setTimeout(() => setCopied(false), 2000)
                        }}
                        className="hover:text-white flex items-center gap-1"
                      >
                        <ClipboardCopy size={20} />
                        {copied && <span className="text-xs">Copied ✓</span>}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Form Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-yellow-100 rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-red-500"
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-amber-800">Enquire About "{product.name}"</h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                className="w-full p-2 border rounded"
                placeholder="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Message"
                rows={3}
                name="message"
                value={form.message}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
              >
                Submit
              </button>
              {status && (
                <p className="text-center text-sm text-gray-700 mt-2">{status}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
