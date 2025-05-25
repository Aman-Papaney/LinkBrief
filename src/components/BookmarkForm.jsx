import React, { useState } from "react";
import { fetchJinaSummary } from "../utils/fetchJinaSummary";

function parseSummary(rawSummary) {
  if (!rawSummary) return { title: "", summary: "" };
  const lines = rawSummary.split("\n");
  // Title
  let title = "";
  const titleMatch = lines[0]?.match(/^Title\s*:\s*(.+)$/i);
  if (titleMatch) title = titleMatch[1].trim();
  // Main summary (skip first two lines)
  let summaryText = lines.slice(2).join(" ").replace(/\s+/g, " ").trim();
  // Limit to 100 words
  const words = summaryText.split(" ");
  if (words.length > 100) summaryText = words.slice(0, 100).join(" ") + "...";
  return { title, summary: summaryText};
}

const BookmarkForm = ({ onAdd }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const rawSummary = await fetchJinaSummary(url);
      const parsed = parseSummary(rawSummary);
      const favicon = `https://www.google.com/s2/favicons?domain_url=${url}`;
      onAdd({
        url,
        title: parsed.title || url,
        favicon,
        summary: parsed.summary, // Only pass summaryText to the summary field
        // urlSource, images, links are parsed but not passed to the bookmark object
      });
      setUrl("");
    } catch (err) {
      console.log(err);
      
      setError("Failed to fetch summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex gap-2 mb-6 items-center" onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="Paste a URL to save"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        disabled={loading}
      >
        Save
      </button>
      {loading && !error && (
        <span className="ml-2 text-blue-500 animate-pulse">
          Fetching summary...
        </span>
      )}
      {error && (
        <span className="text-red-500 text-sm ml-2">{error}</span>
      )}
    </form>
  );
};

export default BookmarkForm;
