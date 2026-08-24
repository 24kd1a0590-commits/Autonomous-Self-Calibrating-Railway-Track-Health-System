import React, { useState } from 'react';
import { Info } from 'lucide-react';

export default function Tooltip({ text }) {
  const [visible, setVisible] = useState(false);

  if (!text) return null;

  return (
    <span 
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={(e) => { e.stopPropagation(); setVisible(!visible); }}
    >
      <Info size={13} className="tooltip-icon" />
      {visible && (
        <span className="tooltip-popover">
          {text}
        </span>
      )}
    </span>
  );
}
