import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import BookmarkForm from "./components/BookmarkForm";
import BookmarkList from "./components/BookmarkList";
import './App.css'

const DUMMY_BOOKMARKS = [
  {
    url: "https://react.dev",
    title: "React – A JavaScript library for building user interfaces",
    favicon: "https://www.google.com/s2/favicons?domain_url=https://react.dev",
    summary: "React makes it painless to create interactive UIs. Design simple views for each state in your application.",
    timestamp: new Date().toISOString(),
  },
  {
    url: "https://firebase.google.com",
    title: "Firebase",
    favicon: "https://www.google.com/s2/favicons?domain_url=https://firebase.google.com",
    summary: "Firebase helps you build and run successful apps. Backed by Google and loved by app development teams.",
    timestamp: new Date().toISOString(),
  },
];

function App() {
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState(DUMMY_BOOKMARKS);

  const handleAuth = (email) => {
    setUser({ email });
  };

  const handleAddBookmark = (bm) => {
    setBookmarks([bm, ...bookmarks]);
  };

  const handleDeleteBookmark = (idx) => {
    setBookmarks(bookmarks.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-4">
        {!user ? (
          <AuthForm onAuth={handleAuth} />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Welcome, {user.email}</h2>
              <button onClick={() => setUser(null)} className="text-blue-600 hover:underline">Logout</button>
            </div>
            <BookmarkForm onAdd={handleAddBookmark} />
            <BookmarkList bookmarks={bookmarks} onDelete={handleDeleteBookmark} />
          </>
        )}
      </div>
    </div>
  );
}

export default App
