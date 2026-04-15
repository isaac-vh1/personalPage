import React from "react";
import { Avatar, Heading, VStack, Text } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import isaac from "../images/isaac.jpeg";
import bgImage from "../images/IMG_9761.jpeg";

const greeting = "Hello, I am Isaac!";
const bio1 = "A Computer Science student at Seattle University";
const bio2 = "I am passionate about software development and love to create projects that solve real-world problems.";

const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="transparent"
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
  >
    <VStack spacing={4} backgroundColor="rgba(0,0,0,0.75)" padding={8} borderRadius="lg">
      <Avatar size="xl" src={isaac} alt="Isaac's Avatar" />
      <Heading as="h1" size="2xl" color="white">
        {greeting}
      </Heading>
      <Text fontSize="xl" color="white">
        {bio1}
      </Text>
      <Text fontSize="xl" color="white">
        {bio2}
      </Text>
    </VStack>
  </FullScreenSection>
);

export default LandingSection;

