import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { Link } from "react-router-dom";
import useWidth from "@/hooks/useWidth";

import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import MobileLogo from "@/assets/images/logo/logo-c.svg";
import MobileLogoWhite from "@/assets/images/logo/logo-c-white.svg";
import Chipmunk from "@/assets/images/logo/chipmunk.png";

const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
      <Link to="/dashboard">
        {width >= breakpoints.xl ? (
          <img className="w-20" src={isDark ? Chipmunk : Chipmunk} alt="" />
        ) : (
          <img className="w-20" src={isDark ? Chipmunk : Chipmunk} alt="" />
        )}
      </Link>
    </div>
  );
};

export default Logo;
