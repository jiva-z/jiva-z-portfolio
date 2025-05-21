'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import TroubleshootingCarousel from '../components/TroubleshootingCarousel';
import TroubleshootingCarouselSimple from '../components/TroubleshootingCarouselSimple';
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import TechStackTable from "../components/TechStackTable";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, type: 'spring' } },
  exit: { opacity: 0, y: -20 }
};

const heroFade = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 1.2, type: 'spring' } }
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

function useInView(ref: React.RefObject<HTMLDivElement>, options = { threshold: 0.5 }) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options.threshold]);
  return inView;
}

const projects = [
  {
    key: 'anju',
    title: 'AI가 만드는 편안한 안식처 "안주"',
    image: '/Anju/image.png',
    video: '/Anju/checklist.mp4',
    description: '노후주택의 결함을 AI로 자동 탐지하고, 체크리스트 기반으로 전문 보고서를 자동 생성하는 서비스입니다. 건축물 관리의 효율성과 신뢰성을 높이고, 누구나 쉽게 점검 결과를 문서화할 수 있도록 설계되었습니다.',
    features: [
      '입주민 서비스',
      'AI 결함 모델 체험 : 입주민이 AI 결함 모델을 체험함으로써 그에 대한 정보를 얻고, 노후주택 관리에 대한 관심과 자발적 참여 유도.',
      'AI 결함 탐지 및 신고 : AI 기술을 활용하여 건축물의 균열, 박리, 철근 노출 등의 결함을 자동으로 탐지하고, 입주민이 이를 확인하고 신고할 수 있는 시스템을 제공.',
      '점검자 서비스',
      '신고에 대한 분석 결과 저장 및 위험 점수 표기 : 점검자가 결함 분석 시 AI 분석 결과를 참고하여 더욱 정확한 분석 가능. 위험 점수를 확인하여 결함 위험도 파악.',
      '대시보드 및 실시간 현황 관리 시스템 : 웹 및 모바일 대시보드를 통해 점검 예약과 보고서를 자동화. 결함 통계와 예약 일정 등을 시각적으로 제공하며 지도와 연동하여 위치 기반 점검 관리 지원.',
      'LangChain 기반 AI 자동 보고서 생성 : 점검자가 작성한 점검 체크리스트를 기반으로 보고서를 생성하여 문서 업무 부담을 줄이고 효율성을 높임.'
    ],
    techStack: {
      frontend: ['React', 'TypeScript', 'Tailwind CSS', 'JWT', 'Axios', 'js-cookie'],
      backend: ['SpringBoot', 'Java', 'JPA', 'FastAPI', 'RESTful API'],
      ai: ['YOLO', 'OpenAI', 'LangChain', 'LLM', 'Prompt Engineering'],
      database: ['MySQL', 'Redis'],
      devops: ['Docker', 'AWS', 'CI/CD']
    },
    details: [
      {
        label: '[PL/Tech Lead]',
        items: [
          '서비스 비전 및 단계별 로드맵 수립',
          '와이어프레임, 기능 요구사항 정의서, 화면설계서, System Architecture 설계, 플로우 차트 등 다양한 기획 산출물 설계 및 작성',
          '주간 스프린트를 통한 프로젝트 기술 방향 설계 및 프로젝트 품질 향상'
        ]
      },
      {
        label: '[AI]',
        items: [
          'LLM 기술 활용 및 프롬프트 엔지니어링',
          'YOLO 기반 결함 분석 및 OpenAI 모델과 LangChain 프레임워크를 활용한 체크리스트 기반 자동 안전점검 보고서 생성 시스템 설계',
          '체크리스트 데이터 로딩부터 요약 및 최종 보고서 생성까지 자동화된 워크플로우 개발'
        ]
      },
      {
        label: '[Backend]',
        items: [
          '점검 예약/일정/목록/상태 관리: Inspection 도메인 중심의 RESTful API를 설계 및 구현, 점검예약·상태 전이·목록 조회·통계 등 핵심 비즈니스 로직 개발 (중복 예약 방지 및 상태 전이 검증 로직 도입으로 점검 예약 오류율 90% 감소)',
          '결함 자동 신고 및 FastAPI 연동: FastAPI 기반 YOLO 딥러닝 모델과의 비동기 RESTful 연동을 통해 이미지 결함 자동 탐지 및 신고 파이프라인 구축',
          'JPA 기반 ORM 및 트랜잭션 관리: JPA를 활용한 Inspection, Report, Checklist 등 주요 도메인 모델 설계 및 관계 매핑, 트랜잭션 기반 데이터 일관성 보장 (트랜잭션 관리 및 데이터 정합성 강화로 데이터 오류 및 중복 발생률 95% 감소)',
          'API 명세 및 글로벌 예외 처리: @RestControllerAdvice를 통한 일관된 예외 처리 및 에러 응답 표준화'
        ]
      },
      {
        label: '[Frontend]',
        items: [
          'Atomic Design 패턴 기반 UI 컴포넌트 모듈화',
          'JWT + axios 인터셉터 + React의 인증/인가플로우',
          'js-cookie 기반 토큰 관리 및 Protected Route 구현'
        ]
      }
    ],
    architectureImg: '/Anju/SA.png',
    architectureDesc: `본 프로젝트는 Azure App Service, Docker, Spring Boot, FastAPI, React, React Native, MySQL, OpenAI, LangChain 등 다양한 기술을 통합하여 설계.<ul class='list-disc list-inside text-gray-300 space-y-2 text-base'><li>모든 서비스 컴포넌트를 컨테이너화(Docker)하여 장애 격리, 독립적 배포</li><li>AI 파이프라인 서버는 YOLO 기반 결함 탐지와 LLM 기반 문서 자동화가 분리되어, 각각의 성능 최적화와 확장성 확보.</li><li>실시간 데이터 처리, 자동화된 보고서 생성, 보안(인증/인가) 등 엔터프라이즈 수준의 요구사항 반영</li></ul></div>`,
  },
  {
    key: 'emergency',
    title: '다국어 응급상황 인식 및 응급실 연계 시스템',
    image: '/Emergency/image.png',
    description: '응급 상황(한국어/영어 음성)을 자동으로 인식하고, 환자의 위치를 기반으로 가장 가까운 응급실을 추천해주는 실시간 응급 대응 서비스입니다. 누구나 쉽고 빠르게 응급상황을 신고하고, 적합한 병원을 안내받을 수 있도록 설계되었습니다.',
    features: [
      '한국어/영어 음성으로 응급상황 신고',
      '실시간 음성 인식(STT) 및 텍스트 요약',
      '응급상황 핵심 정보(증상, 부위, 심각도 등) 자동 추출',
      '환자 위치 기반 응급실 자동 추천',
      '응급실 정보(주소, 연락처, 거리 등) 실시간 안내',
      '모바일/웹에서 간편하게 신고 및 결과 확인',
      '다국어 지원 및 사용자 친화적 UI'
    ],
    details: [
      {
        label: '[AI]',
        items: [
          '음성 데이터 전처리 및 STT(Speech-to-Text) 엔진을 통한 한·영 음성 텍스트 변환 파이프라인 구축',
          '자연어 처리(NLP) 기반 텍스트 요약 및 핵심 정보 추출 알고리즘 구현',
          'BERT 기반 커스텀 분류 모델 파인튜닝을 통한 응급 상황 심각도 자동 분류',
          '데이터셋 구축, 하이퍼파라미터 튜닝, 모델 최적화 등 성능 개선 프로세스 주도'
        ]
      },
      {
        label: '[Backend]',
        items: [
          'Spring Security 기반 사용자 인증(Authentication) 및 권한 관리(Authorization) 시스템 설계',
          'FastAPI 기반 AI 추론 API 서버 연동 및 비동기 통신 구조 구현, 응답시간 3초 이내 달성',
          '환자 위치(위도/경도) 기반 공간 정보 처리 및 응급실 위치 데이터베이스 구축',
          'KTAS 등급 기반 응급실 추천 알고리즘 설계 및 최적화, 추천 정확도 45% 향상',
          'RESTful API 설계, 단위(Unit) 및 통합(Integration) 테스트 자동화, 시스템 신뢰성 및 확장성 개선'
        ]
      },
      {
        label: '[Frontend]',
        items: [
          'Mustache 템플릿 엔진 기반의 서버 사이드 렌더링(SSR) 구조 설계 및 동적 UI 컴포넌트 구현',
          '반응형 레이아웃 및 사용자 경험(UX) 강화를 위한 커스텀 CSS 스타일링',
          'RESTful API 연동을 통한 실시간 데이터 바인딩 및 사용자 입력 폼 처리',
          '토스트를 활용한 에러/상태 메시지 등 사용자 피드백 UI 컴포넌트 설계 및 구현'
        ]
      }
    ],
    troubleshooting: [
      {
        title: "KTAS 3/4등급 구분 정확도 향상",
        problem: "KTAS 등급 분류에서 3등급(응급)과 4등급(비응급) 구분이 어려워, 3등급 환자가 4등급으로 잘못 분류되는 위험한 상황이 빈번하게 발생",
        solution: "3, 4등급 라벨링 데이터의 수를 늘리고, 데이터 증강 및 하이퍼파라미터 튜닝을 통해 모델을 재학습하여 정확도를 80%에서 92%까지 향상시킴",
        lessons: [
          "임계값(경계) 구간의 데이터 품질과 양이 모델 성능에 결정적임을 경험",
          "실제 현장 데이터 기반의 라벨링/검증의 중요성 인식",
          "의료 AI에서 오분류의 위험성을 항상 고려해야 함을 체감"
        ]
      },
      {
        title: "BERT 기반 응급 상황 핵심 정보 추출 최적화",
        problem: "응급 상황 설명에서 핵심 정보(증상, 부위, 심각도 등) 추출 정확도가 낮음",
        solution: "의료 전문가와 협업하여 응급 상황별 핵심 정보 추출 규칙을 정의하고, 이를 기반으로 BERT 모델을 파인튜닝하여 정확도 92% 달성",
        lessons: [
          "도메인 전문가와의 협업이 AI 모델 성능 향상에 미치는 영향 체감",
          "규칙 기반 접근과 딥러닝의 효과적인 결합 방법 습득",
          "의료 도메인에서의 정확한 정보 추출의 중요성 인식"
        ]
      }
    ],
    architectureImg: '/Emergency/SA.png',
    architectureDesc: `<div>본 프로젝트는 Github Actions 기반 CI/CD, Docker, Spring Boot, FastAPI, Mustache, Azure, HuggingFace, OpenAI 등 다양한 기술을 통합하여 설계.<ul class='list-disc list-inside text-gray-300 space-y-2 text-base'><li>프론트엔드는 Figma로 UI 설계 후 HTML, Mustache 템플릿을 통해 SSR 구조로 구현</li><li>백엔드는 Spring Boot와 FastAPI를 Docker 이미지로 빌드하여 각각 독립적으로 컨테이너화, DockerHub를 통해 배포</li><li>AI 파이프라인은 Azure, FastAPI, HuggingFace, OpenAI를 활용해 별도 컨테이너로 운영</li><li>환자 위치 기반 응급실 추천, 실시간 음성 인식 및 텍스트 처리, 인증/인가 등 엔터프라이즈 수준의 요구사항 반영</li></ul></div>`,
  }
];

// 기존 기술스택 데이터 복원
const techStack = {
  'CV (Defect Detection)': ['PyTorch', 'YOLO'],
  'LLM & RAG': ['LangChain', 'OpenAI', 'DuckDuckGo'],
  'Data Processing & Analysis': ['Pandas', 'NumPy'],
  'Data Visualization & Image Processing': ['Matplotlib', 'Pillow'],
  'Report Automation': ['FPDF'],
  'Backend': ['FastAPI', 'Java', 'Spring Boot'],
  'Frontend': ['React', 'React Native', 'JavaScript'],
  'Database': ['MySQL'],
  'DevOps': ['Docker', 'Azure'],
  'Security': ['Spring Security', 'JWT'],
  'Tools': ['Notion', 'Figma', 'GitHub', 'ERDCloud']
};

// 트러블슈팅 데이터 추가
const backendItems = [
  {
    title: "예외처리 통합 및 체계화",
    problem: "클래스별로 분산된 예외처리와 일관성 없는 에러 응답",
    solution: "GlobalExceptionHandler와 CustomException을 통한 중앙화된 예외처리 구현",
    lessons: [
      "예외처리 로직 중앙화를 통한 코드 재사용성과 유지보수성 향상",
      "일관된 API 응답 형식으로 프론트엔드 개발 효율성 증가",
      "HTTP 상태 코드의 체계적 활용으로 RESTful API 설계 원칙 준수"
    ]
  },
  {
    title: "JWT 토큰 인증 구현",
    problem: "세션 기반 인증의 확장성 제한과 SPA 환경에서의 세션 유지 문제",
    solution: "JWT + HttpOnly 쿠키 방식으로 전환 및 토큰 블랙리스트 구현",
    lessons: [
      "무상태(Stateless) 아키텍처의 장점과 구현 방법 이해",
      "JWT 토큰의 구조와 보안 취약점에 대한 이해",
      "HttpOnly 쿠키와 토큰 블랙리스트를 통한 보안 강화 방법 습득",
      "SPA 환경에서의 인증 처리 패턴과 CORS 정책 이해"
    ]
  }
];
const frontendItems = [
  {
    title: "Context API를 통한 상태 관리",
    problem: "컴포넌트 간 데이터 공유 어려움과 props drilling",
    solution: "AlertContext 구현 및 Provider 패턴 적용",
    lessons: [
      "전역 상태 관리의 중요성과 구현 방법 이해",
      "Context API와 Provider 패턴의 효과적인 활용",
      "컴포넌트 간 데이터 흐름 최적화 방법"
    ]
  },
  {
    title: "사용자 친화적인 에러 처리",
    problem: "기본 에러 페이지의 사용자 경험 저하",
    solution: "커스텀 에러 페이지와 ErrorBoundary 구현",
    lessons: [
      "에러 상황별 맞춤형 UI/UX 설계 방법",
      "ErrorBoundary를 통한 전역 에러 처리 패턴",
      "사용자 피드백의 중요성과 구현 방법"
    ]
  },
  {
    title: "컴포넌트 모듈화",
    problem: "코드 중복과 유지보수 어려움",
    solution: "공통 컴포넌트 라이브러리 구축",
    lessons: [
      "재사용 가능한 컴포넌트 설계 원칙",
      "관심사 분리를 통한 코드 구조화",
      "컴포넌트 계층 구조 설계 방법"
    ]
  }
];

export default function Projects() {
  const heroRef = useRef<HTMLDivElement>(null);
  const previewRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [fullscreenSlide, setFullscreenSlide] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenInnerSlide, setFullscreenInnerSlide] = useState(0);
  const [troubleshootingTab, setTroubleshootingTab] = useState<'Backend' | 'Frontend'>('Backend');
  const [showArchModal, setShowArchModal] = useState(false);

  // 페이지 진입 시 항상 첫 화면으로 초기화
  useEffect(() => {
    setFullscreenSlide(0);
    setFullscreenInnerSlide(0);
    setIsFullscreen(false);
    setOpenProject(null);
  }, []);

  // inView 감지
  const heroInView = useInView(heroRef, { threshold: 0.5 });
  const previewInView = previewRefs.map(ref => useInView(ref, { threshold: 0.5 }));

  // body 배경도 항상 검정
  useEffect(() => {
    document.body.classList.add('bg-black');
    return () => document.body.classList.remove('bg-black');
  }, []);

  // dot 네비게이션
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 풀스크린 슬라이드 열기
  const openFullscreen = (idx: number) => {
    setFullscreenSlide(idx);
    setIsFullscreen(true);
  };

  // 풀스크린 슬라이드 닫기
  const closeFullscreen = () => {
    setIsFullscreen(false);
    setFullscreenInnerSlide(0);
  };

  // 슬라이드 전환
  const goToSlide = (idx: number) => {
    setFullscreenSlide(idx);
  };

  return (
    <main className={`min-h-screen text-white bg-black`} style={{ minHeight: '100vh' }}>
      {/* 돌아가기 버튼 */}
      <Link href="/">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="fixed top-4 left-4 z-40 border border-white bg-transparent text-white px-3 py-2 rounded-lg shadow-none hover:bg-white hover:text-black transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </motion.div>
      </Link>

      {/* dot 네비게이션 */}
      <div className="fixed right-8 top-1/2 z-50 flex flex-col items-center space-y-4 -translate-y-1/2">
        <button onClick={() => scrollToSection(heroRef)} className={`w-4 h-4 rounded-full border-2 ${heroInView ? 'bg-white border-white' : 'bg-transparent border-white'} transition-all`} aria-label="인트로로 이동" />
        {previewRefs.map((ref, i) => (
          <button key={i} onClick={() => scrollToSection(ref)} className={`w-4 h-4 rounded-full border-2 ${previewInView[i] ? (i === 0 ? 'bg-blue-400 border-blue-400' : 'bg-purple-400 border-purple-400') : 'bg-transparent border-white'} transition-all`} aria-label={`프로젝트${i+1}로 이동`} />
        ))}
      </div>

      {/* Hero(인트로) 섹션 */}
      <section ref={heroRef} className="h-screen flex flex-col items-center justify-center text-center select-none">
        <motion.h1
          variants={heroFade}
          initial="initial"
          animate="animate"
          className="text-7xl md:text-8xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-lg"
        >
          PROJECTS
        </motion.h1>
        <motion.p
          variants={heroFade}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl text-gray-300 max-w-2xl mx-auto mb-12"
        >
          실제 현장에서 문제를 해결한 경험과<br />AI·백엔드·프론트엔드의 융합 역량을 담은 대표 프로젝트입니다.
        </motion.p>
        <motion.div
          variants={heroFade}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-500"
        >
          아래로 스크롤하거나 dot을 클릭하세요 ↓
        </motion.div>
      </section>

      {/* 프로젝트 미리보기 섹션 */}
      {/* {projects.map((project, i) => (
        <section
          key={project.key}
          ref={previewRefs[i]}
          className="h-screen flex items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center cursor-pointer"
            onClick={() => openFullscreen(i)}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, type: 'spring' } }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-black/60 hover:border-blue-400 transition-all duration-300" style={{ width: 420, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={project.image}
                alt={project.title + ' 대표 이미지'}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mt-8 text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              {project.title}
            </div>
            <div className="mt-2 text-lg text-gray-400 text-center">클릭하여 상세 보기</div>
          </motion.div>
        </section>
      ))} */}

      {/* 풀스크린 슬라이드 오버레이 */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-[100] w-screen h-screen flex flex-row overflow-hidden bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 닫기 버튼 */}
            <button
              className="absolute top-8 right-10 text-white bg-black/40 rounded-full p-3 hover:bg-blue-500 transition-colors z-50"
              onClick={closeFullscreen}
              aria-label="닫기"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* 내부 슬라이드 전환 버튼 */}
            <button
              className="absolute left-8 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-3 hover:bg-blue-500 transition-colors z-50"
              onClick={() => setFullscreenInnerSlide(Math.max(0, fullscreenInnerSlide - 1))}
              disabled={fullscreenInnerSlide === 0}
              aria-label="이전"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute right-8 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-3 hover:bg-blue-500 transition-colors z-50"
              onClick={() => setFullscreenInnerSlide(Math.min(3, fullscreenInnerSlide + 1))}
              disabled={fullscreenInnerSlide === 3}
              aria-label="다음"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {/* 내부 슬라이드 */}
            <motion.div
              key={fullscreenInnerSlide}
              initial={{ opacity: 0, x: fullscreenInnerSlide === 0 ? 120 : fullscreenInnerSlide === 1 ? 120 : fullscreenInnerSlide === 2 ? 120 : -120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: fullscreenInnerSlide === 0 ? -120 : (fullscreenInnerSlide === 2 || fullscreenInnerSlide === 3) ? 120 : 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="w-full h-full flex flex-col items-center justify-center overflow-hidden"
            >
              {fullscreenInnerSlide === 0 && (
                <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-12 py-8 overflow-y-auto">
                  <div className="max-w-2xl w-full mx-auto flex flex-col items-center">
                    <h2 className="text-2xl font-extrabold mb-4 text-blue-400 text-center">{projects[fullscreenSlide].title}</h2>
                    <p className="text-base text-gray-200 mb-8 text-center">{projects[fullscreenSlide].description}</p>
                    <h3 className="text-lg font-bold text-blue-300 mb-2 text-center">주요 기능</h3>
                    <ul className="list-disc list-inside text-gray-200 space-y-2 text-base mb-4 pl-4 w-full">
                      {projects[fullscreenSlide].features.map((f, idx) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {fullscreenInnerSlide === 1 && (
                <div className="w-full h-full px-4 md:px-12 py-8 overflow-y-auto flex items-center justify-center min-h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {projects[fullscreenSlide].details.map((detail, idx) => (
                      <div key={idx} className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden p-6 w-full">
                        <h4 className="text-xl font-bold text-blue-400 mb-3">{detail.label}</h4>
                        <ul className="list-disc list-inside text-gray-200 space-y-2 text-base whitespace-pre-line break-words">
                          {detail.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {fullscreenInnerSlide === 2 && (
                <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-12 py-8 overflow-y-auto">
                  {/* 왼쪽: 시스템 아키텍처 이미지 */}
                  <div className="flex-1 flex items-center justify-center max-w-xl mx-auto md:mx-0">
                    <img
                      src={projects[fullscreenSlide].architectureImg || '/SA.png'}
                      alt="시스템 아키텍처 다이어그램"
                      className="rounded-2xl shadow-lg w-full h-auto object-contain max-h-[500px] cursor-pointer"
                      onClick={() => setShowArchModal(true)}
                    />
                  </div>
                  {/* 오른쪽: 설명 */}
                  <div className="flex-1 flex flex-col justify-center items-start max-w-xl mx-auto md:mx-0">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">시스템 아키텍처 설계</h3>
                    <p
                      className="text-gray-200 text-lg mb-4"
                      dangerouslySetInnerHTML={{ __html: projects[fullscreenSlide].architectureDesc || '' }}
                    />
                  </div>
                  {/* 아키텍처 이미지 모달 */}
                  {showArchModal && (
                    <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center" onClick={() => setShowArchModal(false)}>
                      <img src={projects[fullscreenSlide].architectureImg || '/SA.png'} alt="시스템 아키텍처 다이어그램 크게 보기" className="max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl border-4 border-white" />
                      <button className="absolute top-8 right-10 text-white bg-black/60 rounded-full p-3 hover:bg-blue-500 transition-colors z-50" onClick={() => setShowArchModal(false)} aria-label="닫기">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              )}
              {fullscreenInnerSlide === 3 && (
                <div className="w-full h-full flex flex-col items-center justify-center px-12 bg-transparent">
                  <div className="w-full max-w-6xl">
                    <h2 className="text-2xl font-bold text-blue-400 mb-8">트러블 슈팅</h2>
                    {projects[fullscreenSlide].troubleshooting ? (
                      <TroubleshootingCarouselSimple items={projects[fullscreenSlide].troubleshooting} label="AI" />
                    ) : (
                      <TroubleshootingCarousel backendItems={backendItems} frontendItems={frontendItems} />
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
} 