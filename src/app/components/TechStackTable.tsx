import React from "react";
import {
  SiReact, SiTypescript, SiTailwindcss, SiJavascript, SiSpringboot, SiFastapi, SiMysql, SiDocker, SiJupyter, SiPython, SiRedis, SiOpenai, SiAmazon, SiFigma, SiGithub
} from "react-icons/si";
import PyTorchIcon from "./icons/PyTorchIcon";
import YOLOIcon from "./icons/YOLOIcon";
import LangChainIcon from "./icons/LangChainIcon";
import PandasIcon from "./icons/PandasIcon";
import NumPyIcon from "./icons/NumPyIcon";
import MatplotlibIcon from "./icons/MatplotlibIcon";
import PillowIcon from "./icons/PillowIcon";
import AzureIcon from "./icons/AzureIcon";
import SpringSecurityIcon from "./icons/SpringSecurityIcon";
import JWTIcon from "./icons/JWTIcon";
import JavaIcon from "./icons/JavaIcon";
import ReactNativeIcon from "./icons/ReactNativeIcon";
import DuckDuckGoIcon from "./icons/DuckDuckGoIcon";

const iconMap: Record<string, JSX.Element> = {
  "LangChain": <LangChainIcon className="inline mr-1 w-4 h-4" />,
  "Matplotlib": <MatplotlibIcon className="inline mr-1 w-4 h-4" />,
  "React": <SiReact className="inline mr-1 text-cyan-400" />,
  "TypeScript": <SiTypescript className="inline mr-1 text-blue-400" />,
  "Tailwind CSS": <SiTailwindcss className="inline mr-1 text-sky-300" />,
  "Spring Boot": <SiSpringboot className="inline mr-1 text-green-500" />,
  "SpringBoot": <SiSpringboot className="inline mr-1 text-green-500" />,
  "FastAPI": <SiFastapi className="inline mr-1 text-green-400" />,
  "MySQL": <SiMysql className="inline mr-1 text-blue-300" />,
  "Docker": <SiDocker className="inline mr-1 text-blue-400" />,
  "JavaScript": <SiJavascript className="inline mr-1 text-yellow-300" />,
  "Redis": <SiRedis className="inline mr-1 text-red-400" />,
  "OpenAI": <SiOpenai className="inline mr-1 text-green-300" />,
  "Python": <SiPython className="inline mr-1 text-yellow-300" />,
  "Jupyter": <SiJupyter className="inline mr-1 text-orange-400" />,
  "AWS": <AzureIcon className="inline mr-1 w-4 h-4" />,
  "Azure": <AzureIcon className="inline mr-1 w-4 h-4" />,
  "Spring Security": <SpringSecurityIcon className="inline mr-1 w-4 h-4" />,
  "JWT": <JWTIcon className="inline mr-1 w-4 h-4" />,
  "Java": <JavaIcon className="inline mr-1 w-4 h-4" />,
  "React Native": <ReactNativeIcon className="inline mr-1 w-4 h-4" />,
  "Figma": <SiFigma className="inline mr-1 text-pink-400" />,
  "GitHub": <SiGithub className="inline mr-1 text-gray-300" />,
};

interface TechStackTableProps {
  stack: Record<string, string[]>;
}

export default function TechStackTable({ stack }: TechStackTableProps) {
  return (
    <div className="w-full flex justify-center">
      <table className="min-w-[800px] max-w-[800px] w-[800px] border-separate border-spacing-y-2 rounded-xl shadow-lg bg-gray-900/80">
        <thead>
          <tr>
            <th className="text-left px-6 py-3 text-blue-300 text-lg font-bold bg-gray-800 rounded-tl-xl">카테고리</th>
            <th className="text-left px-6 py-3 text-blue-300 text-lg font-bold bg-gray-800 rounded-tr-xl">기술</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stack).map(([category, techs], idx) => (
            <tr key={category} className="hover:bg-gray-800/60 transition">
              <td className="px-6 py-3 font-semibold text-blue-200 whitespace-nowrap align-top border-b border-gray-700">{category}</td>
              <td className="px-6 py-3 border-b border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech, i) => (
                    <span key={i} className="flex items-center bg-gray-800 px-3 py-1 rounded-lg text-gray-200 text-sm font-medium shadow-sm whitespace-nowrap">
                      {iconMap[tech] || null}
                      {tech}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 