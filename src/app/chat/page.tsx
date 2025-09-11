"use client"

import React, { useState } from 'react'
import { MessageState, Sender } from './types';
import { getFormattedMessageData, handleResponse } from './utils';

const page = () => {
    const [messages, setMessages] = useState<MessageState[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async (data: string) => {
        if (!data.trim()) return;
        setLoading(true);
        const newMessage = getFormattedMessageData(data, Sender.YOU);
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        const response = await handleResponse(data);
        const responseNewMessage = getFormattedMessageData(response, Sender.SMART_CHAT);
        setMessages((prev) => [...prev, responseNewMessage]);
        setLoading(false);
    };

    return (
        <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 p-4 space-y-3 bg-gray-50 flex flex-col">
                {messages.length ? messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`px-4 py-2 rounded-lg max-w-[90%] ${msg.sender === Sender.YOU
                            ? "self-end bg-blue-500 text-white"
                            : "self-start bg-gray-200"
                            }`}
                    >
                        {msg.text}
                    </div>
                )) : null}
            </div>

            {/* Input Bar */}
            <div className="border-t p-3 bg-white shrink-0">
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
                            if(e.key === "Enter" && !e.shiftKey) {
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
