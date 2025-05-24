import React from "react";

const BookmarkList = ({ bookmarks, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {bookmarks.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">No bookmarks yet.</p>
      ) : (
        bookmarks.map((bm, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <img src={bm.favicon} alt="favicon" className="w-5 h-5" />
              <a href={bm.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 hover:underline truncate">
                {bm.title}
              </a>
            </div>
            <div className="text-sm text-gray-700 mb-2 line-clamp-3">{bm.summary}</div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xs text-gray-400">{new Date(bm.timestamp).toLocaleString()}</span>
              <button onClick={() => onDelete(idx)} className="text-red-500 hover:underline text-xs">Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookmarkList;
