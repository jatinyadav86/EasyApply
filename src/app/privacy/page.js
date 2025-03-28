export default function PrivacyPolicy() {
  return (
    <div className="bg-white text-gray-900 pt-[73px] md:pt-20">
      {/* Hero Section */}
      <section className="bg-rose-500 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-lg mt-2 max-w-2xl mx-auto">
          Your privacy is important to us. Learn how we collect, use, and protect your personal data.
        </p>
      </section>

      {/* Privacy Policy Content */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800">1. Information We Collect</h2>
        <p className="text-gray-600 mt-2">
          We collect personal information such as your name, phone number, email address, documents and application details when you use our services.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
          <li>To process and complete your application requests.</li>
          <li>To communicate with you regarding your application status.</li>
          <li>To improve our website and services.</li>
          <li>To ensure security and prevent fraud.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-800 mt-8">3. Data Security</h2>
        <p className="text-gray-600 mt-2">
          We use encryption and secure servers to protect your personal data. Your information is never shared with third parties without consent.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8">4. Cookies & Tracking</h2>
        <p className="text-gray-600 mt-2">
          We may use cookies to enhance your experience and track website performance. You can disable cookies in your browser settings.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8">5. Third-Party Services</h2>
        <p className="text-gray-600 mt-2">
          We may use third-party payment gateways or verification services. These services have their own privacy policies.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8">6. Your Rights</h2>
        <p className="text-gray-600 mt-2">
          You have the right to request access, modification, or deletion of your personal data. Contact us at <span className="text-blue-600 font-semibold">8383069013</span>.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8">7. Changes to This Policy</h2>
        <p className="text-gray-600 mt-2">
          We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
        </p>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 px-2 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Need Assistance?</h2>
        <p className="text-gray-600 mt-2">Contact us at <span className="text-rose-500 font-semibold">8383069013</span> for any questions.</p>
      </section>
    </div>
  );
}


export function generateMetadata() {
  return {
    title: "Privacy Policy - EaseApply",
    description: "Learn how we collect, use, and protect your personal data. Your privacy is important to us.",
  };
}
