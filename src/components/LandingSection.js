import React from "react";
import { Avatar, Heading, VStack, Text } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const greeting = "Hello, I am Pete!";
const bio1 = "A frontend developer";
const bio2 = "specialised in React";

// Implement the UI for the LandingSection component according to the instructions.
// Use a combination of Avatar, Heading and VStack components.
const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
    {/* VStack to vertically stack the content */}
    <VStack spacing={4}>
      {/* Avatar Component for displaying the user's profile picture */}
      <Avatar size="xl" src="https://i.pravatar.cc/150?img=7" alt="Pete's Avatar" />
      
      {/* Heading for the greeting message */}
      <Heading as="h1" size="2xl" color="white">
        {greeting}
      </Heading>
      
      {/* Bio1 and Bio2 for the description */}
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

