import Link from 'next/link'

export const metadata = {
  title: 'Terms and Conditions | Calgary Coworking Directory',
  description: 'Terms and conditions for the Calgary Coworking professional directory',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium mb-8 transition-colors"
      >
        ← Back to home
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Terms and Conditions
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Last updated: March 2025
      </p>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Calgary Coworking Directory (&quot;the Directory&quot;), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the Directory.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
          <p>
            The Calgary Coworking Directory is a private, members-only directory that connects Calgary-based professionals who work remotely. Membership is granted after completing a profile survey. The Directory facilitates networking and introductions among members.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Eligibility</h2>
          <p>
            You must be at least 18 years old and have a valid email address to join the Directory. By creating an account, you represent that you meet these requirements and that the information you provide is accurate and complete.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Member Conduct</h2>
          <p>
            As a member, you agree to:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Use the Directory only for legitimate professional networking purposes</li>
            <li>Treat other members with respect and professionalism</li>
            <li>Not use member contact information for spam, unsolicited marketing, or harassment</li>
            <li>Not share Directory access or member information with non-members</li>
            <li>Keep your profile information accurate and up to date</li>
          </ul>
          <p className="mt-4">
            We reserve the right to suspend or remove any member who violates these standards.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Your Content</h2>
          <p>
            You retain ownership of the content you submit to your profile (name, headline, bio, etc.). By submitting content, you grant us a non-exclusive license to display it within the Directory for as long as your account is active. You can update or remove your profile at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Privacy</h2>
          <p>
            Your use of the Directory is also governed by our{' '}
            <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700 underline">
              Privacy Policy
            </Link>
            . Please review it to understand how we collect, use, and protect your information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Disclaimer</h2>
          <p>
            The Directory is provided &quot;as is.&quot; We do not verify the accuracy of member profiles or the legitimacy of connections made through the Directory. You are responsible for your own due diligence when engaging with other members. We are not liable for any disputes, losses, or damages arising from your use of the Directory or interactions with other members.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes</h2>
          <p>
            We may update these Terms from time to time. We will notify members of material changes by posting the updated Terms on this page and updating the &quot;Last updated&quot; date. Your continued use of the Directory after changes constitutes acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
          <p>
            If you have questions about these Terms, please contact us through the Directory or the contact method provided when you joined.
          </p>
        </section>
      </div>
    </div>
  )
}
