import React from 'react'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex h-screen'>
            {/* left navigation */}
            <aside>
                History
            </aside>
            {/* main converstaion area */}
            {children}
        </div>
    )
}
