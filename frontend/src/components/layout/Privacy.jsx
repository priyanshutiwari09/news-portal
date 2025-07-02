const Privacy = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4 text-sm">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <p>
        We are committed to protecting your privacy. This policy outlines how we collect, use, and protect your information.
      </p>

      <h2 className="text-lg font-semibold">What We Collect</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Email address (for subscriptions or contact)</li>
        <li>IP address and device data (for analytics)</li>
        <li>Behavioral data (e.g., page views, time on site)</li>
      </ul>

      <h2 className="text-lg font-semibold">How We Use It</h2>
      <p>We use your data to personalize content, improve site performance, and ensure platform security.</p>

      <p className="text-gray-500">
        Your data is never sold. Read more about our cookie usage in the <a href="/cookies" className="underline text-blue-600">Cookie Policy</a>.
      </p>
    </div>
  );
};

export default Privacy;
