// Full-bleed background: dark field with grainy blue light rising from the
// bottom. Pure CSS (blurred gradient blobs + SVG noise), slowly drifting.
export default function Glow() {
  return (
    <div className="glow" aria-hidden>
      <span className="g g-base" />
      <span className="g g-left" />
      <span className="g g-right" />
      <span className="g g-dip" />
      <span className="g g-flare-a" />
      <span className="g g-flare-b" />
      <span className="grain" />
    </div>
  );
}
