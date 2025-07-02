const About = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">About Last24Hrs News</h1>

      <p>
        Last24Hrs News is a digital-first news platform established in 2024. We aim to provide credible, real-time news coverage across politics, economy, technology, health, sports, environment, and entertainment.
      </p>

      <p>
        Our team of journalists, editors, and contributors work across India and around the globe, following ethical journalism practices and industry standards.
      </p>

      <h2 className="text-xl font-semibold mt-4">Our Mission</h2>
      <p>
        To empower citizens with factual, unbiased, and comprehensive news — promoting transparency, awareness, and civic responsibility.
      </p>

      <h2 className="text-xl font-semibold mt-4">Editorial Principles</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Accuracy and fact-checking are our top priorities.</li>
        <li>We do not publish paid or promotional content without full disclosure.</li>
        <li>We encourage correction of errors and welcome reader feedback.</li>
      </ul>

      <p className="mt-4 text-sm text-gray-500">
        For more details, see our <a href="/terms" className="underline text-blue-600">Terms of Use</a> and <a href="/privacy" className="underline text-blue-600">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default About;
