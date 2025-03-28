export default function TermsAndConditions() {
    return (
      <div className="bg-white text-gray-900 pt-[80px]">
        {/* Hero Section */}
        <section className="bg-rose-500 text-white py-16 text-center">
          <h1 className="text-4xl font-bold">Terms and Conditions</h1>
          <p className="text-lg mt-2 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using EaseApply.
          </p>
        </section>
  
        {/* Terms Content */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-800">1. Acceptance of Terms</h2>
          <p className="text-gray-600 mt-2">
            By accessing or using EaseApply, you agree to comply with and be bound by these Terms and Conditions.
          </p>
  
          <h2 className="text-2xl font-bold text-gray-800 mt-8">2. Services Provided</h2>
          <p className="text-gray-600 mt-2">
            EaseApply offers digital assistance for application submissions, including government job applications and admission forms. We act as a facilitator but do not guarantee acceptance by third-party institutions.
          </p>
  
          <h2 className="text-2xl font-bold text-gray-800 mt-8">3. User Responsibilities</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
            <li>You must provide accurate and complete information during the application process.</li>
            <li>You are responsible for maintaining the confidentiality of your account details.</li>
            <li>Misuse of the platform for fraudulent activities will result in account termination.</li>
          </ul>
  
          <h2 className="text-2xl font-bold text-gray-800 mt-8">4. Payment and Refund Policy</h2>
          <p className="text-gray-600 mt-2">
          Payments are received when the application form is about to be submitted due to users' trust concerns. Payments are refundable only if EaseApply fails to apply due to a technical issue in the third-party institution’s website. If an error occurs during payment, please contact <span className="text-blue-600 font-semibold">8383069013</span>.
          </p>
  
          <h2 className="text-2xl font-bold text-gray-800 mt-8">5. Limitation of Liability</h2>
          <p className="text-gray-600 mt-2">
            EaseApply is not responsible for any application rejections, processing delays, or inaccuracies in the submitted forms. Users must verify all details and documents before submission.
          </p>
  
          <h2 className="text-2xl font-bold text-gray-800 mt-8">6. Privacy Policy</h2>
          <p className="text-gray-600 mt-2">
            Your personal data is handled as per our <a href="/privacy" className="text-blue-600 font-semibold">Privacy Policy</a>. By using our services, you consent to data collection and usage practices.
          </p>
  
          <h2 className="text-2xl font-bold text-gray-800 mt-8">7. Termination of Services</h2>
          <p className="text-gray-600 mt-2">
            We reserve the right to suspend or terminate user accounts for violations of these terms or fraudulent activities.
          </p>
  
          <h2 className="text-2xl font-bold text-gray-800 mt-8">8. Changes to Terms</h2>
          <p className="text-gray-600 mt-2">
            EaseApply may update these Terms and Conditions at any time. Users will be notified of significant changes.
          </p>
        </section>
  
        {/* CTA Section */}
        <section className="bg-gray-100 px-2 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Need More Information?</h2>
          <p className="text-gray-600 mt-2">
            Contact us at <span className="text-rose-500 font-semibold">8383069013</span> for any concerns regarding these terms.
          </p>
        </section>
      </div>
    );
  }
  

export function generateMetadata() {
  return {
    title: "EaseApply - Terms and Conditions",
    description: "Read the terms and conditions for using EaseApply, your digital form submission assistant.",
  };
}