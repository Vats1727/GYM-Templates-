import React from 'react';

const HairDryer = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 14h6v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6Z" />
    <path d="M10 14h10a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4H4a2 2 0 0 0-2 2v6a4 4 0 0 0 4 4Z" />
    <path d="M2 10h2" />
    <path d="M22 6c-1 0-2 1-2 2v2c0 1 1 2 2 2" />
  </svg>
);

const HairClipper = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="8" y="2" width="8" height="16" rx="2" />
    <path d="M6 2h12M10 18v4a2 2 0 0 0 4 0v-4" />
    <path d="M8 6h8M8 10h8" />
  </svg>
);

const StraightRazor = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 21l18-18" />
    <path d="M6 18c0-3.3 2.7-6 6-6h6a6 6 0 0 1 6 6v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3Z" />
    <path d="M9 15h6" />
  </svg>
);

const ElectricShaver = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 2h12a2 2 0 0 1 2 2v6a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8V4a2 2 0 0 1 2-2Z" />
    <circle cx="10" cy="5" r="2" />
    <circle cx="14" cy="5" r="2" />
    <circle cx="12" cy="9" r="2" />
    <path d="M9 16h6" />
  </svg>
);

const Comb = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 4h18v4H3z" />
    <path d="M5 8v12M8 8v12M11 8v12M14 8v12M17 8v12M20 8v12" />
  </svg>
);

const DyeBrush = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 20l6-6" />
    <path d="M12 14l6 6M10 6h8l3 4H7l3-4z" />
    <path d="M10 10v4M14 10v4M18 10v4" />
  </svg>
);

const NailClipper = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 8h12a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z" />
    <path d="M12 8l8 12" />
  </svg>
);

const HairPick = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4h16v3H4z" />
    <path d="M6 7v13M9 7v13M12 7v13M15 7v13M18 7v13" />
    <path d="M12 20v2" />
  </svg>
);

const Cream = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="4" y="12" width="16" height="8" rx="2" />
    <ellipse cx="12" cy="8" rx="8" ry="4" />
    <path d="M4 8v4M20 8v4" />
  </svg>
);

const Razor = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 4h12l1 3H5l1-3Z" />
    <path d="M12 7v11a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2" />
    <path d="M8 7h8" />
  </svg>
);

const RoundBrush = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="8" r="5" />
    <path d="M12 13v9" />
    <path d="M12 3v2M12 11v2M7 8h2M15 8h2M8.5 4.5l1.5 1.5M14 10l1.5 1.5M15.5 4.5L14 6M10 10l-1.5 1.5" />
  </svg>
);

export const GROOMING_ICONS = {
  HairDryer,
  HairClipper,
  StraightRazor,
  ElectricShaver,
  Comb,
  DyeBrush,
  NailClipper,
  HairPick,
  Cream,
  Razor,
  RoundBrush
};
