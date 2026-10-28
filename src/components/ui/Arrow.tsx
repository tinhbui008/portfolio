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

/**
 * Spinning circular text badge. `id` must be unique on the page (textPath ref).
 */
export function Badge({
  id, text, ring, ink, core, children, className = "", style,
}: {
  id: string; text: string; ring: string; ink: string; core: string;
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  return (
    <div className={`badge ${className}`} style={style} aria-hidden="true">
      <svg className="ring" viewBox="0 0 200 200">
        <defs>
          <path id={id} d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <circle cx="100" cy="100" r="98" fill={ring} />
        <text fill={ink}>
          <textPath href={`#${id}`} textLength="470">{text}</textPath>
        </text>
      </svg>
      <span className="core" style={{ background: core }}>{children}</span>
    </div>
  );
}
