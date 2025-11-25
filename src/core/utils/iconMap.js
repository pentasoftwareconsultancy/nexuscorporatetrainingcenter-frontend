// src/utils/iconMap.js
import { FaReact, FaJava, FaAws } from "react-icons/fa";
import { VscAzureDevops } from "react-icons/vsc";
import { SiGoogleanalytics, } from "react-icons/si";
import { ImDatabase } from "react-icons/im";
import { BsCodeSquare } from "react-icons/bs";
import { TbBrandReact } from "react-icons/tb";
import { HiOutlineCollection } from "react-icons/hi";
import { FaLaptopMedical } from "react-icons/fa6";
import { PiFileSqlBold } from "react-icons/pi";
import { MdAnalytics } from "react-icons/md";
import { GiSprint } from "react-icons/gi"
import { MdCall } from "react-icons/md"
import { MdOutlineFactCheck } from "react-icons/md"
import { FaHospital } from "react-icons/fa"
import { BiBarChartSquare } from "react-icons/bi";
import { RiFileSettingsLine } from "react-icons/ri";const ICON_MAP = {
  FaReact,
  FaJava,
  FaAws,
  VscAzureDevops,
  SiGoogleanalytics,
  ImDatabase,
  BsCodeSquare,
  TbBrandReact,
  FaLaptopMedical,
  PiFileSqlBold ,
  MdAnalytics,
  GiSprint,
  MdCall,
  MdOutlineFactCheck,
  FaHospital,
  BiBarChartSquare,
  RiFileSettingsLine



};

export function getIconByName(name) {
  return ICON_MAP[name] || HiOutlineCollection; // fallback icon
}
