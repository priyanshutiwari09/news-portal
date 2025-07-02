const Cookies = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4 text-sm">
      <h1 className="text-3xl font-bold">Cookie Policy</h1>

      <p>
        Our website uses cookies to provide better user experience, analyze traffic, and serve personalized content.
      </p>

      <h2 className="text-lg font-semibold">Types of Cookies We Use</h2>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>Essential:</strong> Required for website functionality</li>
        <li><strong>Analytics:</strong> Help us understand visitor behavior</li>
        <li><strong>Advertising:</strong> Show relevant ads and sponsored content</li>
      </ul>

      <p>
        You can manage cookie settings in your browser or clear cookies at any time.
      </p>

      <p className="text-gray-500">
        Want to learn more? Contact: <a href="mailto:support@last24hrs.com" className="underline text-blue-600">support@last24hrs.com</a>
      </p>
    </div>
  );
};

export default Cookies;
