"use client"

import React, { useState } from 'react'
import { MessageState, Sender } from './types';
import { getFormattedMessageData, handleResponse } from './utils';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const page = () => {
    const [messages, setMessages] = useState<MessageState[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async (data: string) => {
        if (!data.trim()) return;
        setLoading(true);
        const newMessage = getFormattedMessageData(data, Sender.YOU);
        const updatedMsg = [...messages, newMessage]
        setMessages(updatedMsg);
        setInput("");
        // Add an empty message placeholder for the bot
        const botMessage = getFormattedMessageData("", Sender.SMART_CHAT);
        setMessages((prev) => [...prev, botMessage]);

        // Stream response
        await handleResponse(updatedMsg, (chunk) => {
            console.log(chunk)
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === botMessage.id
                        ? { ...msg, text: msg.text + chunk } // append chunk
                        : msg
                )
            );
        });
        setLoading(false);
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Messages */}
            <div className="flex-1 flex-col p-4 space-y-3 bg-gray-50 overflow-y-auto">
                {messages.length ? messages.map((msg, i) => {
                    const isBot = msg.sender === Sender.SMART_CHAT;
                    const isLast = i === messages.length - 1; // last message
                    return (
                        <div
                            key={msg.id}
                            className={`flex ${isBot ? "justify-start" : "justify-end"}`}
                        >
                            <div
                                // key={msg.id}
                                className={`px-4 py-2 rounded-lg max-w-[90%] ${!isBot
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                                    }`}
                            >
                                <h4 className='text-2xl font-bold mb-1'>{msg.sender}</h4>
                                {/* If it's the bot's last message and still loading, show typing dots */}
                                {isBot && isLast && loading && !msg.text ? (
                                    <div className="flex gap-1">
                                        <span className="typing-dot"></span>
                                        <span className="typing-dot"></span>
                                        <span className="typing-dot"></span>
                                    </div>
                                ) : (
                                    <div className="prose max-w-none">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            rehypePlugins={[rehypeHighlight]}
                                        >
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                )}
                            </div>
                            </div>
                            )
                }) : null}
                        </div>

            {/* Input Bar */ }
                    <div className="border-t p-3 bg-white shrink-0 sticky bottom-0">
                        <div className="flex items-center gap-2">
                            <textarea
                                // type="text"
                                placeholder="Type a message..."
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                    // auto-resize
                                    e.target.style.height = "auto"; // reset height
                                    e.target.style.height = e.target.scrollHeight + "px"; // grow with content
                                }
                                }
                                rows={1}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend(input);
                                    }
                                }}
                                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none overflow-hidden"
                            />
                            <button
                                onClick={() => handleSend(input)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                disabled={loading}
                            >
                                Send
                            </button>
                        </div>
                    </div>
        </div>
            );
}

            export default page
