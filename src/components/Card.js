import React from "react";
import { Box, HStack, VStack, Image, Heading, Text, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Card = ({ title, description, imageSrc, url, status, programmingLanguage }) => {
  const color = status === "In Progress" ? "#fbbf24" : status === "Completed" ? "green.400" : "gray.400";
  const colorMap = {
      "JavaScript": "yellow.300",
      "Python": "blue.400",
      "Ruby on Rails": "red.400",
      "Java": "orange.400",
      "C++": "purple.400",
      "N/A": "gray.400"
    };
  const plColor = colorMap[programmingLanguage] || "gray.400";
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      p={5}
      _hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
    >
      <VStack align="start" spacing={4}>
        <Image src={imageSrc} alt={title} borderRadius="md" />
        <Heading style={{ color: "black" }} as="h3" size="lg">{title}</Heading>
        <Box
          borderRadius="lg"
          overflow="hidden"
          boxShadow="sm"
          bg={color}
          p={1.5}>{status}
        </Box>
        {/*<Box
          borderRadius="lg"
          overflow="hidden"
          boxShadow="sm"
          bg={plColor}
          p={2}>{programmingLanguage}
        </Box>*/}
        <Text color="gray.600" fontSize="md">{description}</Text>
        <HStack spacing={2}>
          <Button variant="link" onClick={url} colorScheme="teal" rightIcon={<FontAwesomeIcon icon={faArrowRight} size="1x" />}>
            Learn More
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Card;

