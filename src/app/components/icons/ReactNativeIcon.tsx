export default function ReactNativeIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#20232A"/>
      <ellipse cx="16" cy="16" rx="8" ry="3.5" stroke="#61DAFB" strokeWidth="2" fill="none"/>
      <ellipse cx="16" cy="16" rx="3.5" ry="8" stroke="#61DAFB" strokeWidth="2" fill="none"/>
      <ellipse cx="16" cy="16" rx="6" ry="2.5" stroke="#61DAFB" strokeWidth="1" fill="none"/>
      <circle cx="16" cy="16" r="2" fill="#61DAFB"/>
    </svg>
  );
} 