import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";

import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Chipmunk from "@/assets/images/logo/chipmunk.png";
const MobileLogo = () => {
  const [isDark] = useDarkMode();
  return (
    <Link to="/">
      <img className="w-20" src={isDark ? Chipmunk : Chipmunk} alt="" />
    </Link>
  );
};

export default MobileLogo;
