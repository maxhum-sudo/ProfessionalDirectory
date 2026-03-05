'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'What is the Calgary Coworking Directory?',
    a: "It's a private, members-only directory of Calgary professionals who work remotely. Once you join, you can browse profiles, discover who's in your industry, and connect with people for coffee chats, collaborations, or advice.",
  },
  {
    q: 'Who can join?',
    a: 'Anyone who works remotely (or hybrid) and has a connection to Calgary. Founders, operators, developers, designers, marketers—all roles are welcome. You just need to complete a short profile survey to get access.',
  },
  {
    q: 'Is it really free?',
    a: "Yes. The directory is free to join and use. We built it to help Calgary's remote worker community connect—no subscriptions or fees.",
  },
  {
    q: 'Who can see my profile?',
    a: 'Only other members who have completed the survey. Your profile is not public or searchable on the internet. Your email is never shown; members reach you via the contact link you provide (LinkedIn, Calendly, etc.).',
  },
  {
    q: 'Can I hide my profile?',
    a: "Yes. You can create an account and complete the survey without appearing in the directory. You'll still have access to browse and connect. You can toggle visibility on or off from your profile settings anytime.",
  },
  {
    q: 'How do I sign in?',
    a: "We use passwordless sign-in. Enter your email and we'll send you a magic link—click it and you're in. No password to remember.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg bg-white overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-4 py-3 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{faq.q}</span>
              <span
                className={`text-gray-500 text-xl shrink-0 transition-transform ${
                  openIndex === i ? 'rotate-45' : ''
                }`}
              >
                +
              </span>
            </button>
            {openIndex === i && (
              <div className="px-4 pb-3 pt-0">
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
