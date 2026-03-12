"use client";

import { useState } from "react";

export default function ChatBox() {

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    setResponse(data.reply);
  };

  return (

    <div className="max-w-2xl mx-auto mt-10">

      <textarea
        className="w-full border p-3"
        placeholder="Ask about taxes, passport, GST..."
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
      />

      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 py-2 mt-3"
      >
        Ask AI
      </button>

      <div className="mt-6 whitespace-pre-wrap">
        {response}
      </div>

    </div>

  );
}