'use client';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { width: 180, height: 40 },
  md: { width: 240, height: 52 },
  lg: { width: 300, height: 64 },
};

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const { width, height } = sizes[size];

  return (
    <svg
      viewBox="0 0 300 64"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="South Charlotte Plumbing logo"
    >
      {/* Icon: S integrated with wrench/pipe element */}
      <g>
        {/* Pipe vertical element */}
        <rect x="8" y="8" width="6" height="48" rx="3" fill="#1B2E4A" />
        {/* Pipe horizontal top */}
        <rect x="8" y="8" width="20" height="6" rx="3" fill="#1B2E4A" />
        {/* Pipe horizontal bottom */}
        <rect x="8" y="50" width="20" height="6" rx="3" fill="#1B2E4A" />

        {/* S shape built from geometric arcs */}
        <path
          d="M28 11C28 11 38 6 44 11C50 16 46 23 38 25C30 27 24 28 24 33C24 38 30 42 38 40C46 38 48 33 48 33"
          stroke="#C8963E"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Wrench head at bottom of S */}
        <circle cx="48" cy="33" r="5" stroke="#C8963E" strokeWidth="3" fill="none" />
        <line
          x1="52"
          y1="36"
          x2="56"
          y2="42"
          stroke="#C8963E"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Water droplet accent */}
        <path
          d="M18 30C18 30 22 24 22 21C22 18 18 18 18 21C18 24 18 30 18 30Z"
          fill="#C8963E"
          opacity="0.6"
        />
      </g>

      {/* "SOUTH CHARLOTTE" text */}
      <text
        x="68"
        y="28"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontWeight="700"
        fontSize="16"
        letterSpacing="3"
        fill="#1B2E4A"
      >
        SOUTH CHARLOTTE
      </text>

      {/* "PLUMBING" text */}
      <text
        x="68"
        y="50"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontWeight="800"
        fontSize="20"
        letterSpacing="5"
        fill="#C8963E"
      >
        PLUMBING
      </text>
    </svg>
  );
}
