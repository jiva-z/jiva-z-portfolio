'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardHover = {
  scale: 1.02,
  transition: { duration: 0.3 }
};

export default function Certifications() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Back to Home */}
      <Link href="/" className="fixed top-4 left-4 z-40">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="bg-gray-800 p-2 rounded-lg shadow-md"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </motion.div>
      </Link>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center text-white"
        >
          자격증 및 수상 경력
        </motion.h1>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          {/* 자격증 섹션 */}
          <motion.div
            variants={fadeInUp}
            className="bg-gray-900 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">자격증</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">정보처리기사</h3>
                  <p className="text-gray-300">한국산업인력공단</p>
                  <p className="text-gray-400">2022.06.17 취득</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">SQLD</h3>
                  <p className="text-gray-300">한국데이터산업진흥원</p>
                  <p className="text-gray-400">2022.09.30 취득</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 교육 이수 섹션 */}
          <motion.div
            variants={fadeInUp}
            className="bg-gray-900 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">교육 이수</h2>
              <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">KT AIVLE School</h3>
                  <p className="text-gray-300">AI 개발자 양성 과정</p>
                  <p className="text-gray-400">2024.09.03 - 2025.02.26</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 수상 경력 섹션 */}
          <motion.div
            variants={fadeInUp}
            className="bg-gray-900 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">수상 경력</h2>
              <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Self-Motivation Award</h3>
                  <p className="text-gray-300">KT AIVLE School</p>
                  <p className="text-gray-400">2025.02.26</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 외국어 능력 섹션 */}
          <motion.div
            variants={fadeInUp}
            className="bg-gray-900 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">외국어 능력</h2>
              <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">영어</h3>
                  <p className="text-gray-300">비즈니스회화</p>
                  <p className="text-gray-300">TOEIC SPEAKING TEST 150/IH</p>
                  <p className="text-gray-400">2025.03.08</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 