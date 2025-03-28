import Link from "next/link";

export default function About() {

  return (
    <div className="bg-white text-gray-900 pt-[73px] md:pt-20">
      {/* Hero Section */}
      <section className="bg-rose-500 text-white py-20 text-center px-2">
        <h1 className="text-4xl font-bold">EaseApply – Simplifying Your Applications</h1>
        <p className="text-lg mt-3 max-w-2xl mx-auto">
          At EaseApply, we understand how challenging and time-consuming it can be to fill an application form online. That's why we’re here to make it easy for you. We can apply on behalf of you for govt. job form, educational form or govt. id's like PAN card, voter id, passport etc. We offer a one-stop solution to take the hassle out of your application process.
        </p>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          We aim to eliminate the stress of form application by providing expert service in filling out and submitting applications.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose EaseApply?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold">🔹 Hassle-Free Process</h3>
              <p className="text-gray-600 mt-2">No more struggling with forms—we handle it for you.</p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold">🔹 Accuracy & Efficiency</h3>
              <p className="text-gray-600 mt-2">We ensure error-free applications, reducing rejections.</p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold">🔹 Expert Guidance</h3>
              <p className="text-gray-600 mt-2">Our team provides step-by-step assistance for all applications.</p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold">🔹 Secure & Reliable</h3>
              <p className="text-gray-600 mt-2">Your data is encrypted and handled with security.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800">How It Works?</h2>
        <div className="mt-8 space-y-6">
          <div className="p-4 bg-blue-50 rounded-lg shadow">
            <h3 className="text-xl font-semibold">1️⃣ Choose Your Service</h3>
            <p className="text-gray-600">Select the type of application you need help with.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow">
            <h3 className="text-xl font-semibold">2️⃣ Submit Your Details</h3>
            <p className="text-gray-600">Upload your information and documents through our platform.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow">
            <h3 className="text-xl font-semibold">3️⃣ We Handle the Process</h3>
            <p className="text-gray-600">Our team takes care of form submissions, verifications, and tracking.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow">
            <h3 className="text-xl font-semibold">4️⃣ Stay Updated</h3>
            <p className="text-gray-600">Fell free to contact us to get updates on your application.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-rose-500 text-white px-2 py-16 text-center">
        <h2 className="text-3xl font-bold">Hurry up! We are waiting to serve you</h2>
        <p className="text-lg mt-3 max-w-2xl mx-auto">
          Let us handle your applications while you focus on what truly matters.
        </p>
        <Link href={"/src"}>
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100">
            Explore Now
          </button>
        </Link>
      </section>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "About EaseApply - Simplifying Your Applications",
    description: "EaseApply is your one-stop solution for hassle-free form applications. Learn more about our services and how we can help you."
  };
}
