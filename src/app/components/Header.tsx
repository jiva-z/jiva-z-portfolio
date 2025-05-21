import Link from 'next/link';

export default function Header({ activeSection }: { activeSection?: string }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-black/90 backdrop-blur-md border-b border-gray-800">
      {/* 로고 */}
      <div className="flex items-center">
        <div className="mr-4">
          <img src="/git_profile.png" alt="프로필 이미지" className="w-14 h-14 object-cover" />
        </div>
        <span className="text-2xl font-bold text-white tracking-widest">Portfolio</span>
      </div>
      {/* 네비게이션 */}
      <nav className="flex space-x-6">
        <Link href="#skills" className={`px-6 py-2 font-bold tracking-widest hover:bg-white hover:text-black transition-colors duration-200 ${activeSection === 'skills' ? 'text-blue-400' : 'text-white'}`}>ABILITY</Link>
        <Link href="#projects" className={`px-6 py-2 font-bold tracking-widest hover:bg-white hover:text-black transition-colors duration-200 ${activeSection === 'projects' ? 'text-blue-400' : 'text-white'}`}>PROJECT</Link>
        <Link href="#certifications" className={`px-6 py-2 font-bold tracking-widest hover:bg-white hover:text-black transition-colors duration-200 ${activeSection === 'certifications' ? 'text-blue-400' : 'text-white'}`}>CERTIFICATIONS</Link>
        <Link href="#contact" className={`px-6 py-2 font-bold tracking-widest hover:bg-white hover:text-black transition-colors duration-200 ${activeSection === 'contact' ? 'text-blue-400' : 'text-white'}`}>CONTACT</Link>
      </nav>
    </header>
  );
} 