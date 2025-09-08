import { useState } from "react";
import axios from "axios";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function App() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  const askAI = async () => {
    try {
      const res = await axios.post("https://ai-assistant-diwj.onrender.com/api/recommend", {
        message: input,
      });
      setReply(res.data.reply);
    } catch (err) {
      console.error(err);
      setReply("❌ Error connecting to server");
    }
  };

  return (
    <div className="flex relative flex-col w-full h-screen font-sans bg-gray-100">
      {/* Top Strip */}
      <div className="flex z-10 justify-center items-center p-4 w-full bg-gradient-to-r from-blue-600 to-purple-700 shadow-md">
        <h1 className="text-xl font-bold text-white sm:text-2xl">AI Recommended Products</h1>
      </div>

      {/* Main Content Area for Replies */}
      <div className="overflow-y-auto flex-1 p-4 pt-16 pb-24">
        {!reply && (
          <div className="text-6xl text-center text-gray-400">
            ✨
          </div>
        )}
        {reply && (
          <div className="p-6 mx-auto mb-4 max-w-2xl leading-relaxed text-gray-800 bg-white rounded-lg border border-gray-200 shadow-md prose prose-sm sm:prose-base lg:prose-lg">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {reply}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* Fixed Bottom Search Bar and Button */}
      <div className="flex fixed right-0 bottom-0 left-0 z-10 flex-col items-center p-4 space-y-3 bg-white shadow-lg sm:flex-row sm:space-y-0 sm:space-x-3">
        <input
          type="text"
          placeholder="E.g., I want a phone under $500"
          className="flex-1 px-4 py-3 w-full text-base rounded-lg border border-gray-300 shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={askAI}
          className="w-full sm:w-auto px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
        >
          Ask AI
        </button>
      </div>
    </div>
  );
}
