import React from "react";
import { Avatar, Heading, VStack, Text } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import isaac from "../images/isaac.jpeg";

const greeting = "Hello, I am Isaac!";
const bio1 = "A full-stack developer";
const bio2 = "specialised in React";

const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#693432ff"
  >
    {/* VStack to vertically stack the content */}
    <VStack spacing={4}>
      {/* Avatar Component for displaying the user's profile picture */}
      <Avatar size="xl" src={isaac} alt="Isaac's Avatar" />
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

