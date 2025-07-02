const Contact = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p>We’re always here to listen and help. Choose the right department for your query:</p>

      <ul className="list-disc list-inside space-y-2">
        <li><strong>News Tips & Editorial:</strong> editor@last24hrs.com</li>
        <li><strong>Technical Support:</strong> support@last24hrs.com</li>
        <li><strong>Advertising:</strong> ads@last24hrs.com</li>
        <li><strong>Press Inquiries:</strong> media@last24hrs.com</li>
        <li><strong>WhatsApp Helpline:</strong> +91-9876543210</li>
      </ul>

      <p className="text-sm text-gray-500">
        Want to send us a detailed message? Visit our <a href="/contact-form" className="underline text-blue-600">Contact Form</a>.
      </p>
    </div>
  );
};

export default Contact;
