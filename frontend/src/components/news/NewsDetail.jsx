import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../layout/Footer";
import SkeletonNewsDetail from "./SkeletonNewsDetail";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);

  // ✅ For summarization
  const [summary, setSummary] = useState("");
  const [summarizing, setSummarizing] = useState(false);
  const [alreadySummarized, setAlreadySummarized] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/news/${id}`);
        setNews(res.data);
      } catch (err) {
        setError("Failed to load news item.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const handlePlay = () => {
    if (!news || isPlaying) return;
    const newUtterance = new SpeechSynthesisUtterance(news.content);
    newUtterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(newUtterance);
    setUtterance(newUtterance);
    setIsPlaying(true);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  // Share
  const handleShare = async () => {
    if (!news) return;

    const shareData = {
      title: news.title,
      text: news.subTitle || "Check out this news article!",
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } else {
        alert("Sharing not supported in this browser.");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  // ✅ Summarize handler
  const handleSummarize = async () => {
    if (alreadySummarized || summarizing) return;

    setSummarizing(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/news/${id}/summarize`,
        {
          content: news.content
        }
      );
      setSummary(res.data.summary);
      setAlreadySummarized(true);
    } catch (err) {
      console.error("Summarization failed", err);
    } finally {
      setSummarizing(false);
    }
  };

  if (loading) return <SkeletonNewsDetail />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!news) return null;

  return (
    <>
      <div className="flex justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl bg-white p-6 space-y-6 rounded shadow">
          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
            {news.title}
          </h1>

          {/* Meta Row */}
          <div className="flex justify-between text-sm text-gray-600">
            <div>
              <p>
                By{" "}
                <span className="font-medium text-gray-800">
                  {news.createdBy.name || "Unknown"}
                </span>
              </p>
              <p>
                Updated on:{" "}
                {new Date(news.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  timeZoneName: "short"
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleShare}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Share
              </button>
              <button className="text-blue-600 hover:underline">
                Bookmark
              </button>
              <button
                onClick={isPlaying ? handleStop : handlePlay}
                className={`text-blue-600 cursor-pointer hover:underline ${
                  isPlaying ? "text-red-600" : ""
                }`}
              >
                {isPlaying ? "⏹ Stop" : "🔊 Play"}
              </button>
            </div>
          </div>

          {/* Image */}
          {news.imageUrl && (
            <div className="aspect-video overflow-hidden">
              <img
                src={news.imageUrl}
                alt="News"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
            {news.content}
          </div>

          {/* Summarize Section */}
          <div className="mt-6 space-y-4">
            <button
              onClick={handleSummarize}
              disabled={alreadySummarized || summarizing}
              className={`px-4 py-2 rounded cursor-pointer text-white ${
                alreadySummarized || summarizing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {summarizing ? "Summarizing..." : "🧠 Summarize Article"}
            </button>

            {summary && (
              <div className="bg-gray-100 border border-gray-300 p-4 rounded">
                <h2 className="font-semibold text-gray-800 mb-2">
                  📝 Summary:
                </h2>
                <p className="text-gray-700">{summary}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsDetail;
