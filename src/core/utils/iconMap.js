// src/utils/iconMap.js

// 📌 IMPORT ALL REQUIRED ICONS
import {
  FaReact,
  FaJava,
  FaAws,
  FaBug,
  FaServer,
  FaChartBar,
  FaDatabase,
  FaCode,
  FaPencilRuler,
  FaPython,
} from "react-icons/fa";

import { VscAzureDevops } from "react-icons/vsc";
import { SiGoogleanalytics, SiDotnet } from "react-icons/si";
import { ImDatabase } from "react-icons/im";
import { BsCodeSquare } from "react-icons/bs";
import { TbBrandReact } from "react-icons/tb";
import { HiOutlineCollection } from "react-icons/hi";
import { FaLaptopMedical } from "react-icons/fa6";
import { PiFileSqlBold } from "react-icons/pi";
import { MdAnalytics, MdCall, MdOutlineFactCheck } from "react-icons/md";
import { GiSprint } from "react-icons/gi";
import { FaHospital } from "react-icons/fa";
import { BiBarChartSquare } from "react-icons/bi";
import { RiFileSettingsLine } from "react-icons/ri";

// 📌 ALL ICONS ADDED HERE
const ICON_MAP = {
  FaReact,
  FaJava,
  FaAws,
  FaBug,
  FaServer,
  FaChartBar,
  FaDatabase,
  FaCode,
  FaPencilRuler,
  FaPython,
  VscAzureDevops,
  SiGoogleanalytics,
  SiDotnet,
  ImDatabase,
  BsCodeSquare,
  TbBrandReact,
  FaLaptopMedical,
  PiFileSqlBold,
  MdAnalytics,
  GiSprint,
  MdCall,
  MdOutlineFactCheck,
  FaHospital,
  BiBarChartSquare,
  RiFileSettingsLine,
};

// 🔥 FUNCTION TO GET ICON
export function getIconByName(name) {
  return ICON_MAP[name] || HiOutlineCollection; // Fallback icon
}

// 🔥 FUZZY MATCH LOGO BY SUBJECT/COURSE NAME
export function getIconBySubject(subjectName) {
  if (!subjectName) return HiOutlineCollection;
  const name = String(subjectName).toLowerCase();
  if (name.includes("python")) return FaPython;
  if (name.includes("react")) return FaReact;
  if (name.includes("java")) return FaJava;
  if (name.includes("dotnet") || name.includes(".net") || name.includes("c#") || name.includes("csharp")) return SiDotnet;
  if (name.includes("aws") || name.includes("amazon")) return FaAws;
  if (name.includes("azure") || name.includes("devops")) return VscAzureDevops;
  if (name.includes("sql") || name.includes("database") || name.includes("db")) return PiFileSqlBold;
  if (name.includes("bug") || name.includes("test")) return FaBug;
  if (name.includes("server") || name.includes("backend")) return FaServer;
  if (name.includes("analytic") || name.includes("chart")) return SiGoogleanalytics;
  return HiOutlineCollection; // Fallback
}
