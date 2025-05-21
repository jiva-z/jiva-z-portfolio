export default function DuckDuckGoIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#DE5833"/>
      <ellipse cx="16" cy="16" rx="10" ry="10" fill="#fff"/>
      <text x="16" y="21" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#DE5833">DDG</text>
    </svg>
  );
} 