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

export default function Experience() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Back to Home */}
      <Link href="/" className="fixed top-4 left-4 z-40">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="bg-white p-2 rounded-lg shadow-md"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </motion.div>
      </Link>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          경력 사항
        </motion.h1>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-12"
        >
          {/* 주식회사 스토리 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">주식회사 스토리</h2>
                  <p className="text-gray-600">인턴</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">2022.07 - 2022.12</p>
                  <p className="text-gray-500">(6개월)</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">주요 업무</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>반려동물 공공데이터 웹크롤링 및 DB 구축</li>
                    <li>현장 실측 데이터 구축 및 실측 업무</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 학력 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">울산대학교</h2>
                  <p className="text-gray-600">IT융합과</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">2017.03 - 2022.02</p>
                  <p className="text-gray-500">졸업</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">주요 수강 과목</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">IT융합개론 (2017-2학기, 2학점)</h4>
                      <p className="text-gray-600">컴퓨터 구조, 하드웨어 및 소프트웨어 이슈, 최신 IT 융합기술 동향을 사례 중심으로 분석</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">프로그래밍 응용 및 실험 (2018-1학기, 3학점)</h4>
                      <p className="text-gray-600">기본 프로그래밍 원리와 다양한 소프트웨어 구현 기법을 실습하며 실무 적용 역량을 습득</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">객체지향 프로그래밍 및 실험 (2018-2학기, 3학점)</h4>
                      <p className="text-gray-600">Java 기반 객체지향 프로그래밍 원리와 설계 방법론을 실습하며 응용 프로그램 구조를 분석</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">시스템 프로그래밍 및 실험 (2018-2학기, 3학점)</h4>
                      <p className="text-gray-600">UNIX 환경에서 문자 입출력, 유니코드, 예외처리, 메모리 관리 등 시스템 프로그래밍의 핵심 개념을 실습 및 구조적 특성 분석</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">운영체제 (2019-1학기, 3학점)</h4>
                      <p className="text-gray-600">메모리, 프로세스, 입출력, 시스템, 네트워크 관리 및 사용자 인터페이스 등 운영체제의 핵심 원리와 자원 관리 구조 분석</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">데이터베이스 관리 및 실험 (2019-1학기, 3학점)</h4>
                      <p className="text-gray-600">시스템 구조, SQL, 저장 및 인덱싱, 질의 최적화 등 데이터베이스 설계와 활용 기법 습득</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">웹기반 정보 시스템 및 실험 (2019-1학기, 4학점)</h4>
                      <p className="text-gray-600">JSP, 서블릿, 커스텀 태그, 필터, 로깅, 프레임워크 등 웹 어플리케이션 개발 및 고급 웹 기술 구조 분석</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">소프트웨어공학 (2019-2학기, 3학점)</h4>
                      <p className="text-gray-600">소프트웨어 생명주기, 개발 방법론, 품질 관리 및 공학 도구를 중심으로 대규모 소프트웨어 개발 프로세스 분석</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">알고리즘 (2019-2학기, 3학점)</h4>
                      <p className="text-gray-600">정렬, 해싱, B-트리 등 데이터 구조와 분할정복, 동적 프로그래밍 등 알고리즘 설계 및 최적화 기법 이해</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">전자상거래 (2020-1학기, 3학점)</h4>
                      <p className="text-gray-600">전자 결제 기술, 빅데이터 기반 전자상거래 트렌드 및 실무 적용 사례</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">IT융합응용 (2020-1학기, 3학점)</h4>
                      <p className="text-gray-600">자동차, 조선해양, 플랜트 등 산업 분야의 융합기술 사례를 통해 IT 확장성과 융합 가능성 탐구</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">빅데이터 응용 및 실험 (2020-2학기, 3학점)</h4>
                      <p className="text-gray-600">빅데이터 수집, 저장, 데이터 마이닝, 분석 도구 활용 등 빅데이터 실무 처리 기술 습득</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 