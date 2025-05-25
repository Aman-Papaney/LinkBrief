import React, { useEffect, useState } from "react";
import AuthForm from "./components/AuthForm";
import BookmarkForm from "./components/BookmarkForm";
import BookmarkList from "./components/BookmarkList";
import './App.css'
import {collection, addDoc, query, where, getDocs, orderBy, serverTimestamp, deleteDoc, doc} from "firebase/firestore"
import { db } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch bookmarks from Firestore
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const q = query(
          collection(db, "bookmarks"),
          where("uid", "==", user.uid),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookmarks(docs);
        
      } catch (err) {
        setBookmarks([]);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, [user]);

  const handleAuth = (userObj) => {
    
    setUser(userObj);
  };

  const handleAddBookmark = async (bm) => {
    if (!user) return;
    const bookmarkData = {
      ...bm,
      uid: user.uid,
      timestamp: new Date().toISOString(),
    };
    setBookmarks([bookmarkData, ...bookmarks]); // Optimistic update
    try {
      await addDoc(collection(db, "bookmarks"), {...bookmarkData,createdAt: serverTimestamp()});
      
    } catch (err) {
      console.error("Failed to save bookmark:", err)
    }
  };

  const handleDeleteBookmark = async (idx) => {
    const bookmark = bookmarks[idx];
    setBookmarks(bookmarks.filter((_, i) => i !== idx)); // Optimistic update
    if (bookmark.id) {
      try {
        await deleteDoc(doc(db, "bookmarks", bookmark.id));
      } catch (err) {
        // Optionally handle error (e.g., show a toast)
      }
    }
  };

  return (
    <div className={darkMode ? "min-h-screen bg-gray-900 text-gray-100" : "min-h-screen bg-gray-100"}>
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode((d) => !d)}
            className={
              darkMode
                ? "px-3 py-1 rounded bg-gray-700 text-gray-100 hover:bg-gray-600"
                : "px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
            }
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        {!user ? (
          <AuthForm onAuth={handleAuth} darkMode={darkMode} />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Welcome, {user.email}</h2>
              <button onClick={() => setUser(null)} className="text-blue-600 hover:underline">Logout</button>
            </div>
            <BookmarkForm onAdd={handleAddBookmark} />
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading bookmarks...</div>
            ) : (
              <BookmarkList bookmarks={bookmarks} onDelete={handleDeleteBookmark} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App
