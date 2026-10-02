// Line-art hero graphics for case studies: white strokes on black, 16:9.

const W = 800
const H = 450

function Frame({ label, children }) {
  return (
    <svg
      className="case-art"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
    >
      <rect width={W} height={H} fill="#0a0a0a" />
      <g fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round">
        {children}
      </g>
    </svg>
  )
}

// Planet edge, orbits and a small satellite.
function SatelliteArt() {
  return (
    <Frame label="Line drawing of a satellite in orbit above a planet">
      <circle cx="400" cy="1180" r="900" strokeOpacity="0.9" />
      <circle cx="400" cy="1180" r="960" strokeOpacity="0.35" strokeDasharray="2 8" />
      <ellipse cx="400" cy="250" rx="330" ry="90" strokeOpacity="0.5" transform="rotate(-12 400 250)" />
      <ellipse cx="400" cy="250" rx="250" ry="62" strokeOpacity="0.25" transform="rotate(-12 400 250)" />
      <g transform="translate(560 168) rotate(-12)">
        <rect x="-14" y="-14" width="28" height="28" fill="#0a0a0a" />
        <rect x="-64" y="-8" width="42" height="16" />
        <rect x="22" y="-8" width="42" height="16" />
        <path d="M-43 -8V8M43 -8V8M-22 0H-14M14 0H22" strokeOpacity="0.6" />
      </g>
      <circle cx="210" cy="300" r="3" fill="#fff" stroke="none" />
    </Frame>
  )
}

// Constellation of dots with a rising trajectory through it.
function GrowthArt() {
  const dots = []
  for (let x = 80; x <= 720; x += 40) {
    for (let y = 70; y <= 380; y += 40) dots.push([x, y])
  }
  const path = [
    [80, 380], [200, 350], [320, 300], [440, 220], [560, 150], [680, 90],
  ]
  return (
    <Frame label="Line drawing of a rising trajectory through a constellation of points">
      {dots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#fff" fillOpacity="0.35" stroke="none" />
      ))}
      <path d="M80 380 C 260 360, 420 260, 680 90" strokeWidth="1.6" />
      <path d="M80 380 C 260 372, 420 320, 680 250" strokeOpacity="0.3" strokeDasharray="3 7" />
      {path.map(([x, y]) => (
        <circle key={`p${x}`} cx={x} cy={y} r="5" fill="#0a0a0a" />
      ))}
      <circle cx="680" cy="90" r="14" strokeOpacity="0.5" />
    </Frame>
  )
}

// Two bodies converging into one: an acquisition.
function MergeArt() {
  return (
    <Frame label="Line drawing of two shapes merging into one">
      <path d="M0 225H800" strokeOpacity="0.15" />
      <circle cx="300" cy="225" r="120" strokeOpacity="0.9" />
      <circle cx="470" cy="225" r="150" strokeOpacity="0.9" />
      <circle cx="300" cy="225" r="150" strokeOpacity="0.2" strokeDasharray="2 8" />
      <path d="M120 140 C 200 140, 210 180, 250 200" strokeOpacity="0.45" />
      <path d="M120 310 C 200 310, 210 270, 250 250" strokeOpacity="0.45" />
      <path d="M640 225H720M708 213L720 225L708 237" strokeOpacity="0.8" />
    </Frame>
  )
}

const ART = {
  'satellite-acquisition': SatelliteArt,
  'spacetech-venture': GrowthArt,
  'ai-company-sale': MergeArt,
}

export default function CaseArt({ id }) {
  const Art = ART[id]
  return Art ? <Art /> : null
}
