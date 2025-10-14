import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, Link } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto:hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {
  const [showHeader, setShowHeader] = useState(true); // 控制 Header 的顯示/隱藏
  const prevScrollY = useRef(0); // 用於記錄上一次滾動位置

  // 處理滾動事件的邏輯
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current) {
        setShowHeader(false); // 向下滾動 -> 隱藏 Header
      } else {
        setShowHeader(true); // 向上滾動 -> 顯示 Header
      }

      prevScrollY.current = currentScrollY; // 更新滾動位置
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 處理平滑滾動到指定區域
  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      transform={showHeader ? "translateY(0)" : "translateY(-200px)"} // 控制顯示/隱藏
      transition="transform 0.3s ease-in-out" // 平滑過渡動畫
      backgroundColor="#18181b"
      zIndex={1000}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack spacing={8}>
              {/* 循環渲染社交媒體鏈接 */}
              {socials.map((social, index) => (
                <Link key={index} href={social.url} isExternal>
                  <FontAwesomeIcon icon={social.icon} size="lg" />
                </Link>
              ))}
            </HStack>
          </nav>

          <nav>
            <HStack spacing={8}>
              {/* 點擊滾動到指定區域 */}
              <Link
                onClick={handleClick("projects")}
                _hover={{ textDecoration: "none" }}
                color="white"
              >
                Projects
              </Link>
              <Link
                onClick={handleClick("contact")}
                _hover={{ textDecoration: "none" }}
                color="white"
              >
                Contact Me
              </Link>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;