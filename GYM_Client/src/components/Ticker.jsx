import React from 'react';

export default function Ticker() {
  const items = [
    "Strength Training",
    "Body Recomposition",
    "Athletic Performance",
    "Nutrition Coaching",
    "Fat Loss",
    "Muscle Building",
    "Online Coaching",
    "Mobility & Recovery"
  ];

  return (
    <div className="ticker">
      <div className="ticker-inner">
        {items.map((item, idx) => (
          <span className="ticker-item" key={idx}>
            {item}
          </span>
        ))}
        {/* Duplicate items for infinite seamless scroll */}
        {items.map((item, idx) => (
          <span className="ticker-item" key={`dup-${idx}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
