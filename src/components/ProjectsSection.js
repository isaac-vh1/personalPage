import React from "react";
import FullScreenSection from "./FullScreenSection";
import { Box, Heading } from "@chakra-ui/react";
import Card from "./Card";

const projects = [
  {
    title: "Enterprise resource planning software",
    status: "In Progress",
    programmingLanguage: "React",
    description:
      "An all-in-one ERP software to manage projects, invoicing, clients and team members with a beautiful dashboard and powerful reporting tools.",
    getImageSrc: () => require("../images/photo1.jpg"),
    url: "/projects/ERP"
  },
  {
    title: "N/A",
    status: "Completed",
    description:
      "This project is not yet documented. Please check back later for more information about this exciting project.",
    getImageSrc: () => require("../images/photo2.jpg")
  },
  {
    title: "N/A",
    status: "Completed",
    description:
      "This project is not yet documented. Please check back later for more information about this exciting project.",
    getImageSrc: () => require("../images/photo3.jpg"),
  },
  {
    title: "N/A",
    status: "Completed",
    description:
      "This project is not yet documented. Please check back later for more information about this exciting project.",
    getImageSrc: () => require("../images/photo4.jpg"),
  },
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
            imageSrc={project.getImageSrc()}
            exampleUrl={project.url}
            status={(project.status) ? project.status : "N/A"}
            programmingLanguage={(project.programmingLanguage) ? project.programmingLanguage : "N/A"}
          />
        ))}
      </Box>
    </FullScreenSection>
  );
};

export default ProjectsSection;
