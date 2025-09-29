'use client';

interface WebMPlayerProps {
  fileName?: string;
}

export default function WebMPlayer({ fileName }: WebMPlayerProps) {
  if (!fileName) return null;

  return (
    <video
      controls={false}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-[150px] transition-transform duration-300 group-hover:scale-105"
    >
      <source src={fileName} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
}
