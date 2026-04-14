import React from "react";
import FullScreenSection from "./FullScreenSection";
import { Box, Heading } from "@chakra-ui/react";
import Card from "./Card";

const projects = [
  {
    title: "Ground Control (ERP)",
    status: "In Progress",
    programmingLanguage: "React",
    description:
      "An all-in-one Enterprise Resource Planning software to manage projects, invoicing, clients and contractors within a centralized and user-friendly interface.",
    getImageSrc: () => require("../images/photo1.jpg"),
    url: "https://github.com/isaac-vh1/ERP-demo",
    demo: "https://isaac-vh1.github.io/ERP-Demo/"
  },
  {
    title: "Titan Remote",
    status: "Completed",
    programmingLanguage: "Python",
    description:
      "Using an APK file and leveraging AI this project reverse engineered the logic used to connect to the Point Zero Titan battery system. While hosting on a local server, this allows for remote monitoring beyond Bluetooth range, improving reliability and usability.",
    url:"https://github.com/isaac-vh1/titan",
    demo: "isaacvanhorn.com/titan"
  },
  {
    title: "ERP Simulation",
    status: "Completed",
    programmingLanguage: "Ruby on Rails",
    description:
      "A Washington Business Week sponsored capstone project designed to simulate ERP functionality and enhance instruction for high school students",
    getImageSrc: () => require("../images/photo3.jpg"),
    demo: "https://isaac-vh1.github.io/ERP-Simulation/"
  }
];

const ProjectsSection = () => {
  return (
    <FullScreenSection
      backgroundColor="#1300a1ff"
      isDarkBackground
      p={8}
      alignItems="flex-start"
      spacing={8}
    >
      <Heading as="h1" id="projects-section">
        Featured Projects
      </Heading>
      <Box
        display="grid"
        gridTemplateColumns={{
          base: "repeat(1, minmax(0, 1fr))", // phones
          sm:   "repeat(2, minmax(0, 1fr))", // small tablets
          md:   "repeat(3, minmax(0, 1fr))", // tablets
          lg:   "repeat(4, minmax(0, 1fr))", // desktops
        }}
        gap={{ base: 4, md: 6, lg: 8 }}
      >
        {projects.map((project) => (
          <Card
            key={project.title}
            title={project.title}
            description={project.description}
            imageSrc={project.getImageSrc ? project.getImageSrc() : require("../images/photo2.jpg")}
            url={project.url}
            status={(project.status) ? project.status : "N/A"}
            programmingLanguage={(project.programmingLanguage) ? project.programmingLanguage : "N/A"}
            demo={project.demo}
          />
        ))}
      </Box>
    </FullScreenSection>
  );
};

export default ProjectsSection;
