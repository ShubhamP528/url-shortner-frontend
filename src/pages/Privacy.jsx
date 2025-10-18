import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiShield,
  FiEye,
  FiLock,
  FiDatabase,
} from "react-icons/fi";

const Privacy = () => {
  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: FiDatabase,
      content: [
        "When you use our URL shortening service, we collect minimal information necessary to provide our services:",
        "• Account information (Google OAuth profile data)",
        "• URLs you choose to shorten",
        "• Custom aliases you create",
        "• Basic analytics data (clicks, referrers, user agents)",
        "• Technical information (IP addresses, browser type, device information)",
      ],
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      icon: FiEye,
      content: [
        "We use the collected information to:",
        "• Provide URL shortening services",
        "• Generate analytics and insights",
        "• Improve our platform and user experience",
        "• Prevent abuse and maintain security",
        "• Communicate important service updates",
      ],
    },
    {
      id: "data-protection",
      title: "Data Protection & Security",
      icon: FiLock,
      content: [
        "We take data protection seriously:",
        "• All data is encrypted in transit and at rest",
        "• We use industry-standard security measures",
        "• Access to your data is strictly limited",
        "• We regularly audit our security practices",
        "• We comply with applicable data protection laws",
      ],
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: FiShield,
      content: [
        "You have the right to:",
        "• Access your personal data",
        "• Correct inaccurate information",
        "• Delete your account and associated data",
        "• Export your data",
        "• Opt-out of non-essential communications",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">Last updated: December 2024</p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Commitment to Privacy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            At URL Shortener, we respect your privacy and are committed to
            protecting your personal information. This Privacy Policy explains
            how we collect, use, and safeguard your data when you use our
            services.
          </p>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <section.icon className="text-blue-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-3">
                {section.content.map((item, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Questions About Privacy?
          </h3>
          <p className="text-gray-600 mb-6">
            If you have any questions about this Privacy Policy or our data
            practices, please don't hesitate to contact us.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
