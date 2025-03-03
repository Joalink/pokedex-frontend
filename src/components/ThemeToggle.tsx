/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col justify-center items-center gap-4 my-4 w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pokemon Generations List</h1>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun className="text-yellow-400 cursor-pointer text-3xl" />
        ) : (
          <Moon className="text-blue-500 cursor-pointer text-3xl" />
        )}
      </button>
    </div>
  );
}
