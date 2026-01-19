"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

const AddRepo = () => {
  const [username, setUsername] = useState<string | null>(null);

  const openRepos = async () => {
    try {
      // fetch ONLY when user clicks, not during render
      if (!username) {
        const res = await fetch("/api/github", { cache: "no-store" });
        const data = await res.json();
        setUsername(data.username);

        if (!data.username) {
          return alert("GitHub username not found");
        }

        window.open(`https://github.com/${data.username}?tab=repositories`, "_blank");
      } else {
        // username already loaded
        window.open(`https://github.com/${username}?tab=repositories`, "_blank");
      }
    } catch (err) {
      console.error("Error fetching GitHub username:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div
      onClick={openRepos}
      className="group px-6 py-6 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer 
      transition-all duration-300 ease-in-out
      hover:bg-background hover:border-[#E93F3F] hover:scale-[1.02]
      shadow-[0_2px_10px_rgba(0,0,0,0.08)]
      hover:shadow-[0_10px_30px_rgba(233,63,63,0.15)]"
    >
      <div className="flex flex-row justify-center items-start gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            openRepos();
          }}
          className="flex justify-center items-center bg-white group-hover:bg-[#fff8f8] group-hover:border-[#E93F3F] group-hover:text-[#E93F3F] transition-colors duration-300"
        >
          <ArrowDown size={30} className="transition-transform duration-300 group-hover:translate-y-1" />
        </Button>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-[#e93f3f]">Open Github Repository</h1>
          <p className="text-sm text-muted-foreground max-w-[220px]">See your repos in one click</p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <Image
          src={"/github.svg"}
          alt="Open GitHub repository"
          width={150}
          height={150}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </div>
  )
}

export default AddRepo
