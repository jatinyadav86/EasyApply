export default function RefundPolicy() {
    return (
      <div className="bg-white text-gray-900 pt-[80px]">
        {/* Hero Section */}
        <section className="bg-rose-500 text-white px-2 py-16 text-center">
          <h1 className="text-4xl font-bold">Refund Policy</h1>
          <p className="text-lg mt-2 max-w-2xl mx-auto">
            Learn about our refund policies and how we ensure customer satisfaction.
          </p>
        </section>
  
        {/* Refund Policy Content */}
        <section className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto bg-gray-100 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">Refund Eligibility</h2>
            <p className="text-gray-700 mt-4">
              We process refunds in cases where applications could not be submitted due to technical issues
              on the third-party institution’s website. Refunds are not applicable once the application has
              been successfully submitted.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-6">Refund Process</h2>
            <p className="text-gray-700 mt-4">
              To request a refund, please contact our support team at <span className="text-blue-600 font-semibold">8383069013 </span>
              with your order details and a brief explanation of the issue. Our team will review your request
              and process eligible refunds within 7-10 business days.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-6">Non-Refundable Cases</h2>
            <ul className="list-disc list-inside text-gray-700 mt-4">
              <li>Applications successfully submitted on third-party websites.</li>
              <li>Incorrect details provided by the user during application.</li>
              <li>Change of mind after availing our service.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-6">Contact Us</h2>
            <p className="text-gray-700 mt-4">
              If you have any questions about our refund policy, feel free to reach out to us at
              <span className="text-blue-600 font-semibold"> 8383069013</span>.
            </p>
          </div>
        </section>
      </div>
    );
  }

export function generateMetadata() {
  return {
    title: "Refund Policy - EaseApply",
    description: "Learn about our refund policies and how we ensure customer satisfaction.",
  }
}
  