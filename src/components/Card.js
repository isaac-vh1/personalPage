import React from "react";
import { Box, HStack, VStack, Image, Heading, Text, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Card = ({ title, description, imageSrc, url, status}) => {
  const color = status === "In Progress" ? "yellow" : status === "Completed" ? "green.400" : "gray.400";
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      p={5}
      _hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
    >
      <VStack align="start" spacing={4} onClick={url}>
        <Image src={imageSrc} alt={title} borderRadius="md" />
        <Heading as="h3" size="lg">{title}</Heading>
        <p style={{ fontStyle: "bold", color: color }}>{status}</p>
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

