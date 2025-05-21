import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-gray-800">남지윤 포트폴리오</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="space-y-4">
          <a href="#about" className="block text-gray-600 hover:text-blue-600 transition-colors">소개</a>
          <a href="#skills" className="block text-gray-600 hover:text-blue-600 transition-colors">핵심 역량</a>
          <a href="#projects" className="block text-gray-600 hover:text-blue-600 transition-colors">프로젝트</a>
          <a href="#contact" className="block text-gray-600 hover:text-blue-600 transition-colors">연락처</a>
        </nav>
      </div>
    </motion.div>
  );
} 