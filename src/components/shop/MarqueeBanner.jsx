import React from "react";

export default function MarqueeBanner({ marqueeRef }) {
  return (
    <div className="w-full bg-black text-white py-2 overflow-hidden">
      <div ref={marqueeRef} className="flex whitespace-nowrap">
        <span className="text-sm tracking-wide mx-8">WORLDWIDE SHIPPING</span>
        <span className="text-sm tracking-wide mx-8">WORLDWIDE SHIPPING</span>
        <span className="text-sm tracking-wide mx-8">WORLDWIDE SHIPPING</span>
      </div>
    </div>
  );
}
