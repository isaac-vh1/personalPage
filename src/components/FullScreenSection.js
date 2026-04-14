import { VStack } from "@chakra-ui/react";

const FullScreenSection = ({ children, isDarkBackground, ...boxProps }) => {
  const { style, backgroundColor, ...innerProps } = boxProps;
  return (
    <VStack
      width="100%"
      backgroundColor={backgroundColor}
      color={isDarkBackground ? "white" : "black"}
      style={style}
    >
      <VStack maxWidth="1280px" minHeight="100vh" {...innerProps}>
        {children}
      </VStack>
    </VStack>
  );
};

export default FullScreenSection;
