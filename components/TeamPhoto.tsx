"use client";

export default function TeamPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", position: "absolute", inset: 0 }}
      onError={(e) => { e.currentTarget.style.display = "none"; }}
    />
  );
}
