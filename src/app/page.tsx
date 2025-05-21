'use client';

import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import TroubleshootingCarousel from "./components/TroubleshootingCarousel";
import Sidebar from "./components/Sidebar";
import Header from './components/Header';
import TroubleshootingCarouselSimple from "./components/TroubleshootingCarouselSimple";
import { Tooltip } from 'react-tooltip';

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
  scale: 1.05,
  transition: { duration: 0.3 }
};

const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
    repeatType: "reverse" as const
  }
};

const rotateAnimation = {
  rotate: [0, 5, -5, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('backend');
  const [backendSlide, setBackendSlide] = useState(0);
  const [frontendSlide, setFrontendSlide] = useState(0);
  const [emergencyTab, setEmergencyTab] = useState('ai');
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const name = '남지윤';
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  // 배경색: 검정 -> 흰색
  const bgColor = useTransform(scrollYProgress, [0, 1], ['#000', '#fff']);
  // 글자별 x축 이동 및 투명도
  const letterTransforms = name.split('').map((_, i) =>
    useTransform(scrollYProgress, [0, 0.5 + i * 0.1], [0, (i - 1) * 180])
  );
  const letterOpacities = name.split('').map((_, i) =>
    useTransform(scrollYProgress, [0, 0.3 + i * 0.1], [1, 0.2])
  );
  const [activeSection, setActiveSection] = useState('about');
  const sectionIds = ['about', 'aspiration', 'skills', 'projects', 'certifications', 'experience', 'contact'];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [fullscreenInnerSlide, setFullscreenInnerSlide] = useState(0);
  const [showArchModal, setShowArchModal] = useState(false);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const isProjectsInView = useInView(projectsSectionRef, { amount: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 400; // 배경 전환이 일어나는 스크롤 범위
      const percent = Math.min(scrollY / maxScroll, 1);
      if (introRef.current) {
        introRef.current.style.background = `linear-gradient(to bottom, rgb(${Math.round(0 + 255 * percent)},${Math.round(0 + 255 * percent)},${Math.round(0 + 255 * percent)}) 0%, #fff 100%)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sectionIds.map(id => {
        const el = document.getElementById(id);
        if (!el) return 99999;
        const rect = el.getBoundingClientRect();
        return Math.abs(rect.top - 80); // 헤더 높이 보정
      });
      const minIdx = offsets.indexOf(Math.min(...offsets));
      setActiveSection(sectionIds[minIdx]);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (openProject !== null && projects[openProject].key === 'dang' && fullscreenInnerSlide === 2) {
      setFullscreenInnerSlide(3);
    }
  }, [openProject, fullscreenInnerSlide]);

  // 트러블슈팅 데이터
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

  // 다국어 응급상황 트러블슈팅 데이터
  const emergencyAIItems = [
        {
      title: "KTAS 3/4등급 구분 정확도 향상",
      problem: "KTAS 등급 분류에서 3등급(응급)과 4등급(비응급) 구분이 어려워, 3등급 환자가 4등급으로 잘못 분류되는 위험한 상황이 빈번하게 발생",
      solution: "3, 4등급 라벨링 데이터의 수를 대폭 늘리고, 데이터 증강 및 하이퍼파라미터 튜닝을 통해 모델을 재학습하여 정확도를 80%에서 92%까지 향상시킴",
      lessons: [
        "임계값(경계) 구간의 데이터 품질과 양이 모델 성능에 결정적임을 경험",
        "실제 현장 데이터 기반의 라벨링/검증의 중요성 인식",
        "의료 AI에서 오분류의 위험성을 항상 고려해야 함을 체감"
      ]
    },
    {
      title: "Whisper 모델 한영 혼합 음성 인식 최적화",
      problem: "한국어와 영어가 혼합된 음성 데이터에서 인식 정확도가 크게 저하되는 문제 발생",
      solution: "한국어와 영어 데이터를 1:1 비율로 혼합한 커스텀 데이터셋을 구축하고, Whisper 모델을 파인튜닝하여 혼합 언어 인식 정확도를 92%까지 향상",
      lessons: [
        "다국어 음성 인식에서 데이터셋 구성의 중요성 체감",
        "도메인 특화 파인튜닝의 효과와 한계점 이해",
        "실제 서비스 환경을 고려한 데이터 수집 전략의 필요성"
      ]
    },
    {
      title: "BERT 기반 응급 상황 핵심 정보 추출 최적화",
      problem: "응급 상황 설명에서 핵심 정보(증상, 부위, 심각도 등) 추출 정확도가 낮음",
      solution: "의료 전문가와 협업하여 응급 상황별 핵심 정보 추출 규칙을 정의하고, 이를 기반으로 BERT 모델을 파인튜닝하여 F1-score 0.92 달성",
      lessons: [
        "도메인 전문가와의 협업이 AI 모델 성능 향상에 미치는 영향 체감",
        "규칙 기반 접근과 딥러닝의 효과적인 결합 방법 습득",
        "의료 도메인에서의 정확한 정보 추출의 중요성 인식"
      ]
    }
  ];

  const dangBackendItems = [
    {
      title: "FastAPI와 Spring Boot 간 비동기 통신 최적화",
      problem: "AI 모델 서버(FastAPI)와 메인 서버(Spring Boot) 간 통신 지연으로 인한 응답 시간 증가",
      solution: "비동기 통신 구조 설계 및 응답 시간 300ms 이내로 최적화",
      lessons: [
        "MSA 환경에서의 서비스 간 통신 최적화 방법 이해",
        "비동기 통신의 장단점과 구현 패턴 습득",
        "성능 모니터링과 병목 구간 식별 방법 체득"
      ]
    }
  ];
  const dangFrontendItems = [
    {
      title: "컴포넌트 모듈화 및 재사용성 향상",
      problem: "코드 중복과 유지보수 어려움",
      solution: "공통 컴포넌트 라이브러리 구축 및 Atomic Design 패턴 적용",
      lessons: [
        "재사용 가능한 컴포넌트 설계 원칙",
        "관심사 분리를 통한 코드 구조화",
        "컴포넌트 계층 구조 설계 방법"
      ]
    }
  ];
  const dangDevOpsItems = [
    {
      title: "AI 패키지 다운그레이드 및 Docker 최적화 배포",
      problem: "Cloudtype 배포 시 torch 등 대형 패키지로 인한 이미지 용량 초과 및 메모리 부족 오류",
      solution: "torch, sentence-transformers 등 AI 패키지 버전을 1.13.1+cpu 등으로 다운그레이드하고, Dockerfile에서 모델을 미리 다운로드하여 최적화",
      lessons: [
        "클라우드 환경의 리소스 한계를 고려한 패키지/모델 관리의 중요성",
        "Dockerfile 최적화 및 사전 모델 캐싱 전략 습득"
      ]
    }
  ];

  const navigationItems = [
    {
      title: "프로젝트",
      icon: "🚀",
      description: "주요 프로젝트 포트폴리오",
      path: "/projects"
    },
    {
      title: "경력",
      icon: "💼",
      description: "경력 및 업무 경험",
      path: "/experience"
    },
    {
      title: "자격증",
      icon: "🏆",
      description: "자격증 및 수상 경력",
      path: "/certifications"
    }
  ];

  // 프로젝트 데이터 복사
  const projects = [
    {
      key: 'anju',
      title: 'AI가 만드는 편안한 안식처 "안주"',
      image: '/Anju/image.png',
      period: '2025.01 - 2025.02',
      role: 'PL & Tech Lead',
      main: 'AI 기반 노후 주택 관리 시스템, 안주',
      description: '노후주택의 결함을 AI로 자동 탐지하고, 체크리스트 기반으로 전문 보고서를 자동 생성하는 서비스',
      features: [
        '🏠 입주민 서비스',
          'AI 결함 모델 체험 : 입주민이 AI 결함 모델을 체험함으로써 그에 대한 정보를 얻고, 노후주택 관리에 대한 관심과 자발적 참여 유도.',
          'AI 결함 탐지 및 신고 : AI 기술을 활용하여 건축물의 균열, 박리, 철근 노출 등의 결함을 자동으로 탐지하고, 입주민이 이를 확인하고 신고할 수 있는 시스템을 제공.',
        '🛠️ 점검자 서비스',
          '신고에 대한 분석 결과 저장 및 위험 점수 표기 : 점검자가 결함 분석 시 AI 분석 결과를 참고하여 더욱 정확한 분석 가능. 위험 점수를 확인하여 결함 위험도 파악.',
          '대시보드 및 실시간 현황 관리 시스템 : 웹 및 모바일 대시보드를 통해 점검 예약과 보고서를 자동화. 결함 통계와 예약 일정 등을 시각적으로 제공하며 지도와 연동하여 위치 기반 점검 관리 지원.',
          'LangChain 기반 AI 자동 보고서 생성 : 점검자가 작성한 점검 체크리스트를 기반으로 보고서를 생성하여 문서 업무 부담을 줄이고 효율성을 높임.'
      ],
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
      troubleshooting: {
        backendItems: backendItems,
        frontendItems: frontendItems,
        devopsItems: dangBackendItems
      },
    },
    {
      key: 'emergency',
      title: '다국어 응급상황 인식 및 응급실 연계 시스템',
      image: '/Emergency/image.png',
      period: '2024.12',
      role: 'AI & Full Stack Developer',
      main: '다국어 응급상황 인식 시스템',
      description: '응급 상황(한국어/영어 음성)을 자동으로 인식하고, 환자의 위치를 기반으로 가장 가까운 응급실을 추천해주는 실시간 응급 대응 서비스',
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
      architectureImg: '/Emergency/SA.png',
      architectureDesc: `<div>본 프로젝트는 Github Actions 기반 CI/CD, Docker, Spring Boot, FastAPI, Mustache, Azure, HuggingFace, OpenAI 등 다양한 기술을 통합하여 설계.<ul class='list-disc list-inside text-gray-300 space-y-2 text-base'><li>프론트엔드는 Figma로 UI 설계 후 HTML, Mustache 템플릿을 통해 SSR 구조로 구현</li><li>백엔드는 Spring Boot와 FastAPI를 Docker 이미지로 빌드하여 각각 독립적으로 컨테이너화, DockerHub를 통해 배포</li><li>AI 파이프라인은 Azure, FastAPI, HuggingFace, OpenAI를 활용해 별도 컨테이너로 운영</li><li>환자 위치 기반 응급실 추천, 실시간 음성 인식 및 텍스트 처리, 인증/인가 등 엔터프라이즈 수준의 요구사항 반영</li></ul></div>`,
      troubleshooting: {
        backendItems: emergencyAIItems,
        frontendItems: dangFrontendItems,
        devopsItems: dangDevOpsItems
      },
    },
    {
      key: 'dang',
      title: '산재 대체 인력 매칭 AI 플랫폼 "급구당"',
      image: '/dang/img.png',
      period: '2025.03 - 2025.05',
      role: 'PM & Full Stack Developer & DevOps',
      main: 'AI 기반 실시간 대체 인력 매칭 시스템',
      description: '산재 발생 시 AI가 요양기간을 예측하고, 대체 인력 매칭을 수행하는 AI 플랫폼',
      features: [
        'AI 기반 요양기간 예측 시스템',
        '실시간 대체 인력 매칭 플랫폼',
        '사용자별 북마크 기능',
        '지원자, 기업 채용담당자 간 채팅'
      ],
      details: [
        {
          label: '[PM/Full Stack/DevOps]',
          items: [
            '프로젝트 기획 및 요구사항 분석',
            'MSA 아키텍처 설계 및 기술 스택 선정',
            '프로젝트 일정 관리 및 산출물 품질 관리'
          ]
        },
        {
          label: '[Backend]',
          items: [
            'Spring Boot 기반 RESTful API 서버 개발',
            'JWT + HttpOnly 쿠키 기반 인증 시스템 구현',
            'FastAPI 기반 AI 모델 서버와의 비동기 통신 구조 설계',
            '요양기간 예측 API 설계 및 300ms 내 응답 최적화',
            '북마크 기능: 사용자별 채용공고 저장 시스템 구현',
            'MySQL 데이터베이스 설계 및 트랜잭션 관리'
          ]
        },
        {
          label: '[Frontend]',
          items: [
            'React 기반 SPA 프론트엔드 개발',
            'Context API를 활용한 전역 상태 관리',
            '커스텀 에러 페이지와 ErrorBoundary 구현',
            '재사용 가능한 컴포넌트 라이브러리 구축',
            '반응형 UI/UX 설계 및 구현'
          ]
        },
        {
          label: '[DevOps]',
          items: [
            'Cloudtype 환경에 서비스 배포 및 운영',
          ]
        }
      ],
      architectureImg: '',
      architectureDesc: 'Spring Boot, React, FastAPI, MySQL, Docker, Cloudtype 기반의 MSA 구조로 설계 및 배포. 각 서비스는 독립적으로 컨테이너화되어 장애 격리 및 확장성 확보.',
      troubleshooting: {
        backendItems: dangBackendItems,
        devopsItems: dangDevOpsItems
      },
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Header activeSection={activeSection} />
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* 인트로 Hero 영역 - hoongportfolio 스타일 */}
      <AnimatePresence>
        <motion.section
          key="about"
          id="about"
          className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-32 bg-black overflow-hidden"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          {/* 대형 백그라운드 도형 */}
          <div className="absolute right-0 top-1/4 w-[60vw] h-[60vw] max-w-4xl max-h-[900px] bg-white/5 rounded-3xl rotate-12 z-0" />
          {/* 메인 타이포 */}
          <div className="relative z-10 text-left w-full max-w-5xl">
            <div className="text-5xl md:text-7xl font-light leading-tight mb-4">
              <span className="font-normal">AI Solution </span>
              <span className="font-extrabold text-white">Developer</span>
            </div>
            <div className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
              <span className="text-white">Creating </span>
              <span className="italic font-light text-gray-200">Captivating</span>
            </div>
            <div className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
              <span className="italic font-extrabold text-white">WEB </span>
              <span className="font-light text-gray-200">Experience</span>
            </div>
          </div>
        </motion.section>
        <motion.section
          key="aspiration"
          id="aspiration"
          className="py-24 px-4 bg-black"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              viewport={{ once: true, amount: 0.7 }}
              className="text-lg md:text-xl text-gray-200 leading-relaxed"
            >
              👋 안녕하세요! 남지윤입니다.<br/>
              실질적인 가치와 혁신을 만드는 프로젝트에 열정을 쏟으며 개발하고 있습니다.<br/>
              <span style={{ whiteSpace: 'nowrap' }}>
                "헤맨 만큼 내 땅이다"라는 신념으로 한 줄 한 줄 쌓아, 오늘도 저만의 개발 지도를 확장하고 있습니다.
              </span>
            </motion.p>
          </div>
        </motion.section>
        <motion.section
          key="skills"
          id="skills"
          className="py-24 px-4 bg-black"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-12 text-center text-white"
            >
              핵심 역량
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div
                variants={fadeInUp}
                whileHover={cardHover}
                className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-8 rounded-xl shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">End-to-End 프로젝트 설계</h3>
                <p className="text-gray-200 leading-relaxed">아키텍처 설계부터 배포까지 전 과정 경험</p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={cardHover}
                className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 p-8 rounded-xl shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">고객 맞춤형 솔루션</h3>
                <p className="text-gray-200 leading-relaxed">고객 요구사항 분석 및 도메인 특화 프롬프트 엔지니어링 역량</p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={cardHover}
                className="bg-gradient-to-br from-pink-900/40 to-red-900/40 p-8 rounded-xl shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">Agile 개발</h3>
                <p className="text-gray-200 leading-relaxed">주간 스프린트 관리, 이슈사항 표준 문서화 작업을 통한 100% 프로젝트 일정 준수</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
        <motion.section
          key="projects"
          id="projects"
          ref={projectsSectionRef}
          className="bg-black py-32"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          {/* 화면 중앙에 고정된 PROJECT 워터마크와 blur */}
          {isProjectsInView && (
            <>
              {hoveredIndex !== null && (
                <div className="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
                  style={{ width: '60vw', height: '12vw', borderRadius: '2vw', background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(32px)' }}
                />
              )}
              <div className="fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none" style={{fontFamily:'inherit',letterSpacing:'-0.05em'}}>
                <span
                  className="text-[8vw] md:text-[6vw] font-extrabold text-white/10 tracking-tight"
                  style={hoveredIndex !== null ? { filter: 'blur(8px)' } : {}}
                >
                  PROJECT
                </span>
              </div>
            </>
          )}
          {projects.map((project, i) => (
            <section
              key={project.key}
              className={`relative flex items-center justify-${i % 2 === 0 ? 'start' : 'end'} ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} py-32 min-h-[80vh]`}
              style={{ marginBottom: i === projects.length - 1 ? 0 : '120px' }}
            >
              {/* 카드 hover 시 배경 블러 */}
              {hoveredIndex === i && (
                <div className="absolute inset-0 z-10 backdrop-blur-2xl bg-black/30 transition-all duration-300 pointer-events-none" />
              )}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative z-20 flex flex-row items-center justify-center cursor-pointer group"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => { setOpenProject(i); setFullscreenInnerSlide(0); document.body.style.overflow = 'hidden'; }}
                style={{ alignItems: i % 2 === 0 ? 'flex-start' : 'flex-end', marginLeft: i % 2 === 0 ? '8vw' : 0, marginRight: i % 2 === 1 ? '8vw' : 0 }}
              >
                {/* 이미지 */}
                <div className="rounded-3xl overflow-hidden transition-all duration-300 bg-black group-hover:shadow-[0_0_32px_8px_rgba(80,180,255,0.5)]" style={{ width: 420, height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', position: 'relative' }}>
                  <img
                    src={project.image}
                    alt={project.title + ' 대표 이미지'}
                    className="object-cover w-full h-full"
                  />
                  {/* period, role - 호버 시 오른쪽 아래에 fade-in */}
                  <div className="absolute right-4 bottom-4 flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-base text-gray-200 bg-black/70 px-3 py-1 rounded-lg mb-1">{project.period}</div>
                    <div className="text-base text-blue-300 bg-black/70 px-3 py-1 rounded-lg">{project.role}</div>
                  </div>
                </div>
              </motion.div>
            </section>
          ))}
        </motion.section>
        <motion.section
          key="certifications"
          id="certifications"
          className="py-24 px-4 bg-black"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-white">자격증 및 수상 경력</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 자격증 카드 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, type: 'spring' }}
                whileHover={{ boxShadow: '0 4px 32px 0 rgba(80,180,255,0.15)' }}
                className="bg-gray-900 rounded-2xl p-7 flex flex-col items-start gap-4 transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🎓</span>
                  <span className="text-xl font-bold text-white">자격증</span>
                </div>
                <div>
                  <div className="font-bold text-blue-300">정보처리기사</div>
                  <div className="text-gray-400 text-sm">한국산업인력공단 · 2022.06.17 취득</div>
                </div>
                <div>
                  <div className="font-bold text-blue-300">SQLD</div>
                  <div className="text-gray-400 text-sm">한국데이터산업진흥원 · 2022.09.30 취득</div>
                </div>
                <div>
                  <div className="font-bold text-blue-300">한국사능력검정시험 3급</div>
                  <div className="text-gray-400 text-sm">국사편찬위원회 · 2022.12.16 취득</div>
                </div>
              </motion.div>
              {/* 교육 이수 카드 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, type: 'spring', delay: 0.1 }}
                whileHover={{ boxShadow: '0 4px 32px 0 rgba(80,180,255,0.15)' }}
                className="bg-gray-900 rounded-2xl p-7 flex flex-col items-start gap-4 transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📚</span>
                  <span className="text-xl font-bold text-white">교육 이수</span>
                </div>
                <div>
                  <div className="font-bold text-blue-300">KT AIVLE School</div>
                  <div className="text-gray-400 text-sm">AI 개발자 양성 과정</div>
                  <div className="text-gray-400 text-sm">2024.09.03 - 2025.02.26</div>
                </div>
              </motion.div>
              {/* 수상 경력 카드 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, type: 'spring', delay: 0.2 }}
                whileHover={{ boxShadow: '0 4px 32px 0 rgba(255,215,80,0.15)' }}
                className="bg-gray-900 rounded-2xl p-7 flex flex-col items-start gap-4 transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🏆</span>
                  <span className="text-xl font-bold text-white">수상 경력</span>
                </div>
                <div>
                  <div className="font-bold text-yellow-300">Self-Motivation Award</div>
                  <div className="text-gray-400 text-sm">KT AIVLE School · 2025.02.26</div>
                </div>
              </motion.div>
              {/* 외국어 능력 카드 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, type: 'spring', delay: 0.3 }}
                whileHover={{ boxShadow: '0 4px 32px 0 rgba(80,255,180,0.15)' }}
                className="bg-gray-900 rounded-2xl p-7 flex flex-col items-start gap-4 transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🌐</span>
                  <span className="text-xl font-bold text-white">외국어 능력</span>
                </div>
                <div>
                  <div className="font-bold text-green-300">영어</div>
                  <div className="text-gray-400 text-sm">비즈니스회화</div>
                  <div className="text-gray-400 text-sm">TOEIC SPEAKING TEST 150/IH</div>
                  <div className="text-gray-400 text-sm">2025.03.08</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
        <motion.section
          key="techstack"
          id="techstack"
          className="py-24 px-4 bg-black"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-white">Tech Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 프론트엔드 */}
              <motion.div
                whileHover={{ boxShadow: '0 4px 32px 0 rgba(80,180,255,0.15)' }}
                className="bg-gray-900 rounded-2xl p-7 flex flex-col items-start gap-4 transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🎨</span>
                  <span className="text-xl font-bold text-white">Frontend</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : Atomic Design 패턴 기반 UI 컴포넌트 모듈화, JWT 인증/인가 플로우, Protected Route 구현">React</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : TypeScript 기반 컴포넌트 설계 및 인증/인가 플로우">TypeScript</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : 웹 UI 설계<br/>응급실 추천 프로젝트 : Mustache SSR 구조 설계, 사용자 입력 폼 처리">HTML</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : 반응형 레이아웃, 커스텀 CSS 스타일링<br/>응급실 추천 프로젝트 : 사용자 경험(UX) 강화">CSS</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="응급실 추천 프로젝트 : Mustache 템플릿 기반 SSR UI, 동적 컴포넌트 구현">Mustache</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="응급실 추천 프로젝트 : Figma로 UI 설계, 프로토타이핑">Figma</span>
                </div>
              </motion.div>
              {/* 백엔드 */}
              <motion.div
                whileHover={{ boxShadow: '0 4px 32px 0 rgba(80,180,255,0.15)' }}
                className="bg-gray-900 rounded-2xl p-7 flex flex-col items-start gap-4 transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🖥️</span>
                  <span className="text-xl font-bold text-white">Backend</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : Inspection 도메인 중심 RESTful API, 트랜잭션 관리, 글로벌 예외 처리<br/>응급실 추천 프로젝트 : Spring Security 기반 인증/인가, 컨테이너화, 권한 관리">Java</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : RESTful API, 트랜잭션 관리, 예외 처리, FastAPI 연동<br/>응급실 추천 프로젝트 : 인증/인가, 컨테이너화, 권한 관리">Spring Boot</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : FastAPI 기반 YOLO 딥러닝 모델 연동, 비동기 RESTful 연동<br/>응급실 추천 프로젝트 : AI 추론 API 서버, 비동기 통신 구조">FastAPI</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : RESTful API 설계, 상태 전이, 목록/통계<br/>응급실 추천 프로젝트 : RESTful API 설계, 단위/통합 테스트 자동화">RESTful API</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : JPA 기반 ORM, 트랜잭션 관리, 데이터 정합성 강화">JPA</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : Spring Security 기반 인증/인가 시스템<br/>응급실 추천 프로젝트 : Spring Security 기반 인증/인가 시스템">Spring Security</span>
                </div>
              </motion.div>
              {/* AI/데이터 */}
              <motion.div
                whileHover={{ boxShadow: '0 4px 32px 0 rgba(80,255,180,0.15)' }}
                className="bg-gray-900 rounded-2xl p-7 flex flex-col items-start gap-4 transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🤖</span>
                  <span className="text-xl font-bold text-white">AI / Data</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : LLM 기술 활용, 체크리스트 데이터 자동화<br/>응급실 추천 프로젝트 : 데이터 전처리, STT, NLP, BERT 분류">Python</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : YOLO 기반 결함 탐지 및 자동 신고 파이프라인 구축">YOLO</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : OpenAI 모델, LangChain 프레임워크로 체크리스트 기반 자동 보고서 생성<br/>응급실 추천 프로젝트 : OpenAI API 활용, LLM 기반 텍스트 처리">OpenAI</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : LangChain 기반 체크리스트 보고서 자동화 시스템">LangChain</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : LLM 기술 활용 및 프롬프트 엔지니어링">LLM</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : 도메인 특화 프롬프트 엔지니어링">Prompt Engineering</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="응급실 추천 프로젝트 : BERT 기반 응급상황 심각도 자동 분류, 핵심 정보 추출">BERT</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="응급실 추천 프로젝트 : NLP 기반 텍스트 요약, 핵심 정보 추출">NLP</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="응급실 추천 프로젝트 : HuggingFace 모델 파인튜닝 및 배포">HuggingFace</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="응급실 추천 프로젝트 : Pandas 기반 데이터 전처리 및 분석">Pandas</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="응급실 추천 프로젝트 : NumPy 기반 데이터 처리">NumPy</span>
                </div>
              </motion.div>
              {/* 데이터베이스 */}
              <motion.div
                whileHover={{ boxShadow: '0 4px 32px 0 rgba(255,215,80,0.15)' }}
                className="bg-gray-900 rounded-2xl p-7 flex flex-col items-start gap-4 transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🗄️</span>
                  <span className="text-xl font-bold text-white">Database</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : MySQL 기반 데이터베이스 설계 및 관리<br/>응급실 추천 프로젝트 : MySQL 기반 데이터베이스 설계 및 관리">MySQL</span>
                </div>
              </motion.div>
              {/* 협업/DevOps/툴 */}
              <motion.div
                whileHover={{ boxShadow: '0 4px 32px 0 rgba(80,180,255,0.15)' }}
                className="bg-gray-900 rounded-2xl p-7 flex flex-col items-start gap-4 transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🛠️</span>
                  <span className="text-xl font-bold text-white">DevOps / 협업툴</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : Git 기반 버전 관리 및 협업<br/>응급실 추천 프로젝트 : Git 기반 버전 관리 및 협업">Git</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : GitHub 기반 협업 및 코드 리뷰<br/>응급실 추천 프로젝트 : GitHub 기반 협업 및 코드 리뷰">GitHub</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : Docker 기반 컨테이너화, 장애 격리, 독립적 배포<br/>응급실 추천 프로젝트 : Docker 이미지 빌드 및 배포">Docker</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : Azure App Service, 클라우드 인프라 운영<br/>응급실 추천 프로젝트 : Azure, FastAPI, HuggingFace, OpenAI 등 클라우드 통합 운영">Azure</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : Notion 기반 문서 협업, 일정 관리<br/>응급실 추천 프로젝트 : Notion 기반 문서 협업">Notion</span>
                  <span className="text-blue-300" data-tooltip-id="stack-tooltip" data-tooltip-html="안주 프로젝트 : ERDCloud 기반 데이터 모델링<br/>응급실 추천 프로젝트 : ERDCloud 기반 데이터 모델링">ERDCloud</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
        <motion.section
          key="experience"
          id="experience"
          className="py-24 px-4 bg-black"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
        </motion.section>
        <motion.section
          key="contact"
          id="contact"
          className="py-24 px-4 bg-black"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-12 text-center text-white"
            >
              Contact
            </motion.h2>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <motion.div
                variants={fadeInUp}
                whileHover={cardHover}
                className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-8 rounded-xl shadow-lg"
              >
                <p className="text-gray-200 text-lg">010-4272-5400</p>
                <p className="text-gray-200 text-lg">jiva_z@naver.com</p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={cardHover}
                className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 p-8 rounded-xl shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">GitHub</h3>
                <a href="https://github.com/jiva-z" className="text-blue-400 hover:text-blue-200 text-lg">
                  github.com/jiva-z
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </AnimatePresence>
      <AnimatePresence>
        {openProject !== null && (
          <motion.div
            className="fixed inset-0 z-[100] w-screen h-screen flex flex-row overflow-hidden bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 닫기 버튼 */}
            <button
              className="absolute top-8 right-10 text-white bg-black/40 rounded-full p-3 hover:bg-blue-500 transition-colors z-50"
              onClick={() => { setOpenProject(null); setFullscreenInnerSlide(0); document.body.style.overflow = ''; }}
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
                    <h2 className="text-2xl font-extrabold mb-4 text-blue-400 text-center">{projects[openProject].title}</h2>
                    <p className="text-base text-gray-200 mb-8 text-center">{projects[openProject].description}</p>
                    <h3 className="text-lg font-bold text-blue-300 mb-2 text-center">주요 기능</h3>
                    <ul className="list-disc list-inside text-gray-200 space-y-2 text-base mb-4 pl-4 w-full">
                      {projects[openProject].features.map((f, idx) =>
                        f.startsWith('🏠') || f.startsWith('🛠️') ? (
                          <div key={idx} className="font-bold text-lg mt-4 mb-2">{f}</div>
                        ) : (
                          <li key={idx} className="ml-4">{f}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}
              {fullscreenInnerSlide === 1 && (
                <div className="w-full h-full px-4 md:px-12 py-8 overflow-y-auto flex items-center justify-center min-h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {projects[openProject].details.map((detail, idx) => (
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
                projects[openProject].key === 'dang'
                  ? null
                  : (
                    <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-12 py-8 overflow-y-auto">
                      <div className="flex-1 flex items-center justify-center max-w-xl mx-auto md:mx-0">
                        <img
                          src={projects[openProject].architectureImg || '/SA.png'}
                          alt="시스템 아키텍처 다이어그램"
                          className="rounded-2xl shadow-lg w-full h-auto object-contain max-h-[500px] cursor-pointer"
                          onClick={() => setShowArchModal(true)}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center items-start max-w-xl mx-auto md:mx-0">
                        <h3 className="text-2xl font-bold text-blue-300 mb-4">시스템 아키텍처 설계</h3>
                        <p
                          className="text-gray-200 text-lg mb-4"
                          dangerouslySetInnerHTML={{ __html: projects[openProject].architectureDesc || '' }}
                        />
                      </div>
                      {showArchModal && (
                        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center" onClick={() => setShowArchModal(false)}>
                          <img src={projects[openProject].architectureImg || '/SA.png'} alt="시스템 아키텍처 다이어그램 크게 보기" className="max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl border-4 border-white" />
                          <button className="absolute top-8 right-10 text-white bg-black/60 rounded-full p-3 hover:bg-blue-500 transition-colors z-50" onClick={() => setShowArchModal(false)} aria-label="닫기">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  )
              )}
              {fullscreenInnerSlide === 3 && (
                <div className="w-full h-full flex flex-col items-center justify-center px-12 bg-transparent">
                  <div className="w-full max-w-6xl">
                    <h2 className="text-2xl font-bold text-blue-400 mb-8">트러블 슈팅</h2>
                    {projects[openProject].key === 'dang' ? (
                      <TroubleshootingCarousel
                        backendItems={projects[openProject].troubleshooting.backendItems}
                        devopsItems={projects[openProject].troubleshooting.devopsItems}
                      />
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
      <Tooltip id="stack-tooltip" className="z-[9999] !text-base !rounded-lg !px-4 !py-2 !bg-gray-900 !text-blue-200 !shadow-xl" />
    </main>
  );
}
