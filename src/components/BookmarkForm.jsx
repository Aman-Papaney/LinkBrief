import React, { useState } from "react";
import { fetchJinaSummary } from "../utils/fetchJinaSummary";

const BookmarkForm = ({ onAdd }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const summary = await fetchJinaSummary(url);
      let title = url;
      if (summary) {
        const firstLine = summary.split("\n")[0];
        const match = firstLine.match(/^Title\s*:\s*(.+)$/i);
        if (match) {
          title = match[1].trim();
        }
      }
      const favicon = `https://www.google.com/s2/favicons?domain_url=${url}`;
      onAdd({ url, title, favicon, summary });
      setUrl("");
    } catch (err) {
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
