import type { ArtSpec } from "@/lib/content";

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
export function Art({ art, bg, fg, glyph, image, alt = "", glyphSize, className = "" }: Props) {
  return (
    <div className={`art art-${art} ${className}`} style={{ background: bg, color: fg }}>
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
