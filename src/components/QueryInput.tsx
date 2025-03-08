import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { SearchIcon } from "@/components/Icons.tsx";

export default function QueryInput({
  autoFocus = false,
  size = "md",
}: {
  autoFocus?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");

    if (query && inputRef.current) {
      setInputValue(query);
    }
  }, [location.search]);

  return (
    <Input
      ref={inputRef}
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: `text-${size}`,
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          Enter
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="搜索..."
      radius={"md"}
      size={size}
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          const value = e.currentTarget.value;

          window.location.href = `/search/?query=${value}`;
        }
      }}
    />
  );
}
