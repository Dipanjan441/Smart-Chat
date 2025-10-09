"use client"

import { USERNAME } from '@/app/constant'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'

interface Props {
    setIsOpen: (v: boolean) => void
}

const LeftNavigation = ({ setIsOpen }: Props) => {
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const userName = localStorage.getItem(USERNAME) || "Anonymus"
        setName(userName)
    }, [])
    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/images/logo.png"
                            alt="App Logo"
                            width={32}
                            height={32}
                        />
                        <h1 className="text-2xl font-bold text-blue-700">Smart Chat</h1>
                    </div>
                    {/* Close button only on mobile */}
                    <button className="md:hidden" onClick={() => setIsOpen(false)}>
                        <FiX size={24} />
                    </button>
                </div>
                {/* Navigation Items */}
                <nav className="space-y-2">
                    <h2 className="font-semibold text-lg text-gray-700 mb-2">History</h2>
                    <ul className="space-y-2">
                        <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">
                            Chat 1
                        </li>
                        <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">
                            Chat 2
                        </li>
                        <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">
                            Chat 3
                        </li>
                    </ul>

                    <hr className="my-3 border-gray-300" />

                    <ul className="space-y-2">
                        <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">
                            ➕ New Chat
                        </li>
                        <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">
                            ℹ️ About Us
                        </li>
                    </ul>
                </nav>
            </div>
            {/* Bottom section: Username */}
            <div className="mt-6 border-t border-gray-300 pt-4">
                <p className="text-center text-blue-600 text-xl font-bold">
                    {name.split(" ")[0]}
                </p>
            </div>
        </div>
    )
}

export default LeftNavigation
