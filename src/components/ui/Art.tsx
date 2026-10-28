import type { CSSProperties } from "react";
import type { ArtSpec, Tape as TapeColor } from "@/lib/content";

type Props = ArtSpec & {
  image?: string;
  alt?: string;
  glyphSize?: number;
  className?: string;
};

/**
 * Artwork tile. Renders the CSS placeholder from the design until a real
 * `image` is provided in the content JSON.
 */
export function Art({ art, bg, fg, c2, glyph, image, alt = "", glyphSize, className = "" }: Props) {
  const style = { background: bg, color: fg, ...(c2 && { "--c2": c2 }) } as CSSProperties;
  return (
    <div className={`art art-${art} ${className}`} style={style}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={alt} loading="lazy" decoding="async" />
      ) : glyph ? (
        <span className="glyph" style={glyphSize ? { fontSize: glyphSize } : undefined}>
          {glyph}
        </span>
      ) : null}
    </div>
  );
}

/** Strip of washi tape stuck across the top edge of a card. */
export function Tape({ color = "yellow" }: { color?: TapeColor }) {
  return <span className={`tape tape-${color}`} aria-hidden="true" />;
}
