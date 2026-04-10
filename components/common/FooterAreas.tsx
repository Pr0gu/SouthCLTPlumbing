'use client';

import { useState } from 'react';
import { SERVICE_AREAS } from '@/lib/constants';

export default function FooterAreas() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? SERVICE_AREAS : SERVICE_AREAS.slice(0, 6);

  return (
    <>
      <ul className="space-y-2">
        {visible.map((area) => (
          <li key={area.name}>
            <span
              className={
                area.primary
                  ? 'text-brand-gold font-semibold text-sm'
                  : 'text-gray-400 text-sm'
              }
            >
              {area.name}
            </span>
          </li>
        ))}
      </ul>
      {SERVICE_AREAS.length > 6 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs font-semibold text-brand-gold hover:underline"
        >
          {expanded ? 'Show less' : `+ ${SERVICE_AREAS.length - 6} more areas`}
        </button>
      )}
    </>
  );
}
