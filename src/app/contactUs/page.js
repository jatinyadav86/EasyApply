import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col items-center justify-center">
      {/* Contact Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-rose-500">Contact Us</h1>
        <p className="text-lg text-gray-700 mt-4">Have questions? Chat with us on WhatsApp!</p>
        
        <p className="text-lg text-gray-800 font-semibold mt-2">Phone: 8383069013</p>
        
        <Link 
          href="https://wa.me/8383069013" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition"
        >
          Chat on WhatsApp
        </Link>
      </section>
    </div>
  );
}