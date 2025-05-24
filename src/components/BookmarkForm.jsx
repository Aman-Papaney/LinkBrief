import React, { useState } from "react";

const BookmarkForm = ({ onAdd }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    // Dummy data for now
    onAdd({
      url,
      title: "Example Title",
      favicon: "https://www.google.com/s2/favicons?domain_url=" + url,
      summary: "This is a short summary of the page.",
      timestamp: new Date().toISOString(),
    });
    setUrl("");
  };

  return (
    <form className="flex gap-2 mb-6" onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="Paste a URL to save"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Save</button>
    </form>
  );
};

export default BookmarkForm;
