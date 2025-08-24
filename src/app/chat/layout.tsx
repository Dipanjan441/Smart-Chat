"use client"

import React, { useState } from 'react'
import { FiMenu } from 'react-icons/fi';
import LeftNavigation from '../features/navigation/LeftNavigation';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='flex h-screen'>
            {/* left navigation */}
            <aside className={`
                fixed inset-y-0 left-0 w-64 bg-gray-100 shadow rounded-lg p-4 transform 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                transition-transform duration-300 ease-in-out
                md:static md:translate-x-0 md:w-1/4
            `}>
                <LeftNavigation setIsOpen={setIsOpen} />
            </aside>
            {/* Main content */}
            <main className="flex-1 flex flex-col bg-white">
                {/* Mobile Header with toggle button */}
                <div className="md:hidden flex items-center justify-between p-3 border-b">
                    <button onClick={() => setIsOpen(true)}>
                        <FiMenu size={24} />
                    </button>
                    <h1 className="font-bold text-lg">Chat</h1>
                </div>
                {/* Chat Body */}
                <div className="flex-1 flex flex-col">
                    {children}
                </div>
            </main>

        </div>
    )
}
