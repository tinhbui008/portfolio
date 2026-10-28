export function Arrow({ size = 18, stroke = 2.4 }: { size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Star({ size = 64, fill = "currentColor" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 70 70" aria-hidden="true">
      <path d="M35 2 L41 29 L68 35 L41 41 L35 68 L29 41 L2 35 L29 29 Z" fill={fill} />
    </svg>
  );
}
