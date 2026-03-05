import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Calgary Coworking Directory',
  description: 'Privacy policy for the Calgary Coworking professional directory',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium mb-8 transition-colors"
      >
        ← Back to home
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Last updated: March 2025
      </p>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
          <p>
            Calgary Coworking Directory (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our private professional directory.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
          <p className="mb-2">We collect information you provide directly:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Account information:</strong> Email address (used for sign-in)</li>
            <li><strong>Profile information:</strong> Name, headline, role, domains, offering, seeking, contact link, and optional avatar</li>
            <li><strong>Preferences:</strong> Whether you wish to appear in the directory</li>
          </ul>
          <p className="mt-4">
            We also automatically collect limited technical data (e.g., IP address, browser type) for security and operational purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Create and manage your account</li>
            <li>Display your profile to other members in the directory (if you opt in)</li>
            <li>Send you sign-in links via email (magic links)</li>
            <li>Improve and operate the Directory</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Who Can See Your Information</h2>
          <p>
            Your profile is visible <strong>only to other members</strong> who have completed the survey and joined the Directory. We do not sell, rent, or share your information with third parties for marketing purposes. Your email address is not displayed in the directory; members connect via the contact link you provide.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Storage and Security</h2>
          <p>
            We store your data using Supabase, a secure cloud platform. Authentication is handled via industry-standard methods. We take reasonable measures to protect your information from unauthorized access, but no system is completely secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
          <p>You can:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Update or delete your profile at any time from your account settings</li>
            <li>Hide your profile from the directory while keeping your account</li>
            <li>Request deletion of your account and associated data</li>
          </ul>
          <p className="mt-4">
            To request account deletion, contact us through the Directory.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Cookies</h2>
          <p>
            We use essential cookies to keep you signed in and to maintain your session. We do not use tracking or advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will post changes on this page and update the &quot;Last updated&quot; date. Continued use of the Directory after changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
          <p>
            If you have questions about this Privacy Policy or your data, please contact us through the Directory.
          </p>
        </section>
      </div>
    </div>
  )
}
