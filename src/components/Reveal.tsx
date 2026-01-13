"use client";

import React, { useRef } from "react";
import useInView from "@/lib/useInView";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  style?: React.CSSProperties;
};

export default function Reveal({
  children,
  className = "",
  threshold = 0.12,
  rootMargin = "0px",
  once = true,
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { threshold, rootMargin });

  const isVisible = inView ? "reveal-visible" : "";

  return (
    <div
      ref={ref}
      className={["reveal", isVisible, className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
