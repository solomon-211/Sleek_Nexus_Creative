/**
 * Zigzag border divider — pure CSS gradients, no SVG.
 * Place at the bottom of a section to create a zigzag edge into the next section.
 *
 * @param {string} color   - The background color of the NEXT section (fills the zigzag teeth)
 * @param {string} bg      - The background color of THIS section (fills behind the teeth)
 * @param {number} size    - Tooth size in px (default 18)
 */
export default function Zigzag({ color = '#f9fafb', bg = 'transparent', size = 18 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: `${size}px`,
        background: bg,
        backgroundImage: `
          linear-gradient(135deg, ${color} 25%, transparent 25%),
          linear-gradient(225deg, ${color} 25%, transparent 25%)
        `,
        backgroundSize: `${size * 2}px ${size}px`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: '0 0',
        display: 'block',
        width: '100%',
      }}
    />
  );
}
