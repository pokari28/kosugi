"use client";

import { useEffect } from "react";

export function SnapHome() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("snap-home");
    return () => root.classList.remove("snap-home");
  }, []);
  return null;
}
