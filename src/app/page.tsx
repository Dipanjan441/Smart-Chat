"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { USERNAME } from "./constant";

export default function Home() {
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();
  const navigateToChatRoute = () => {
    if (!(name?.trim())) return;

    //save to localstorage
    localStorage.setItem(USERNAME, name.trim());

    //navigate to chat route
    router.push("/chat")
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <p className="text-3xl text-blue-800 font-extrabold">
        Smart Chat
      </p>
      <div className="flex gap-2">
        <input
          value={name ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          className="border-0 p-2 rounded-lg w-[250px] bg-blue-100"
          type="text"
          placeholder="Enter Your Name..."
          name="name"
        />
        <button
          className="bg-blue-400 p-2 rounded-lg cursor-pointer w-[100px]"
          onClick={navigateToChatRoute}
        >
          Start
        </button>
      </div>
    </div>
  );
}
