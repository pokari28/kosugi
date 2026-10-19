"use client";

import { useEffect } from "react";

function useHtmlClass(className: string) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add(className);
    return () => root.classList.remove(className);
  }, [className]);
}

export function SnapHome() {
  useHtmlClass("snap-home");
  return null;
}

export function SnapPages() {
  useHtmlClass("snap-page");
  return null;
}