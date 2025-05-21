import { useState } from "react";
import { motion } from "framer-motion";

interface TroubleshootingItem {
  title: string;
  problem: string;
  solution: string;
  lessons: string[];
}

interface TroubleshootingCarouselSimpleProps {
  items: TroubleshootingItem[];
  label?: string;
}

export default function TroubleshootingCarouselSimple({ items, label }: TroubleshootingCarouselSimpleProps) {
  const [slide, setSlide] = useState(0);

  return (
    <div className="relative overflow-hidden w-full min-w-0 flex flex-col justify-center items-stretch gap-6 bg-transparent p-0 rounded-none shadow-none">
      {/* Carousel */}
      <div className="flex-1 flex flex-col justify-center min-w-0 h-full">
        <div className="w-full overflow-hidden h-full">
          <motion.div
            initial={false}
            animate={{ x: `${-slide * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex w-full min-w-0 h-full"
            style={{ minWidth: 0 }}
          >
            {items.map((item, idx) => (
              <div className="w-full min-w-0 flex-shrink-0 flex flex-col" key={idx}>
                <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden p-6 flex flex-col">
                  <h5 className="text-2xl font-bold text-blue-300 mb-6">{idx + 1}. {item.title}</h5>
                  <div className="space-y-6 overflow-y-auto flex-1 pr-2">
                    <div className="bg-gray-900/80 p-4 rounded-xl border-l-4 border-red-400 mb-2">
                      <h6 className="font-semibold text-red-400 mb-2">문제</h6>
                      <p className="text-gray-200 whitespace-pre-line break-words">{item.problem}</p>
                    </div>
                    <div className="bg-gray-900/80 p-4 rounded-xl border-l-4 border-green-400 mb-2">
                      <h6 className="font-semibold text-green-400 mb-2">해결</h6>
                      <p className="text-gray-200 whitespace-pre-line break-words">{item.solution}</p>
                    </div>
                    <div className="bg-gray-900/80 p-4 rounded-xl border-l-4 border-blue-400">
                      <h6 className="font-semibold text-blue-400 mb-2">배운점</h6>
                      <ul className="list-disc list-inside text-gray-200 space-y-1 whitespace-pre-line break-words">
                        {item.lessons.map((lesson, i) => (
                          <li key={i}>{lesson}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        {/* 네비게이션 버튼 */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setSlide(prev => Math.max(0, prev - 1))}
            className={`p-3 rounded-full bg-gray-700 hover:bg-blue-500 transition-colors text-white shadow ${slide === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={slide === 0}
            aria-label="이전 트러블슈팅"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-gray-400 text-base">{slide + 1} / {items.length}</span>
          <button
            onClick={() => setSlide(prev => Math.min(items.length - 1, prev + 1))}
            className={`p-3 rounded-full bg-gray-700 hover:bg-blue-500 transition-colors text-white shadow ${slide === items.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={slide === items.length - 1}
            aria-label="다음 트러블슈팅"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 