import React from "react";
import { Box, HStack, VStack, Image, Heading, Text, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// 接收项目的标题、描述和图片源作为 props
const Card = ({ title, description, imageSrc }) => {
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
        {/* 显示项目图片 */}
        <Image src={imageSrc} alt={title} borderRadius="md" />
        
        {/* 显示项目标题 */}
        <Heading as="h3" size="lg">
          {title}
        </Heading>
        
        {/* 显示项目描述 */}
        <Text color="gray.600" fontSize="md">
          {description}
        </Text>
        
        {/* 显示右箭头按钮 */}
        <HStack spacing={2}>
          <Button variant="link" colorScheme="teal" rightIcon={<FontAwesomeIcon icon={faArrowRight} size="1x" />}>
            Learn More
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Card;

