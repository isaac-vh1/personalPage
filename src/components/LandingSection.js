import React from "react";
import { Avatar, Heading, VStack, Text } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import isaac from "../images/isaac.jpeg";

const greeting = "Hello, I am Isaac!";
const bio1 = "A Computer Science student at Seattle University";
const bio2 = "I am passionate about software development and love to create projects that solve real-world problems.";

const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#693432ff"
  >
    <VStack spacing={4}>
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

