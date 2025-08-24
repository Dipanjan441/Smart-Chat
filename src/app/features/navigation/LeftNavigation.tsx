import React from 'react'
import { FiX } from 'react-icons/fi'

interface Props {
    setIsOpen : (v:boolean)=> void
}

const LeftNavigation = ({setIsOpen}:Props) => {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">History</h2>
                {/* Close button only on mobile */}
                <button className="md:hidden" onClick={() => setIsOpen(false)}>
                    <FiX size={24} />
                </button>
            </div>
            <ul className="space-y-2">
                <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">Chat 1</li>
                <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">Chat 2</li>
                <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">Chat 3</li>
            </ul>
        </>
    )
}

export default LeftNavigation
