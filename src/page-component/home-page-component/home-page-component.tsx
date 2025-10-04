import { Stack } from "@chakra-ui/react";
import {
  Books,
  Categories,
  Hero,
  HowItWorks,
  Instructors,
  Newsletter,
  PopularCourses,
} from "src/components";

const HomePageComponent = () => {
  return (
    <Stack spacing={20}>
      <Hero />
      <Categories />
      <PopularCourses />
      <Books />
      <HowItWorks />
      <Instructors />
      <Newsletter />
    </Stack>
  );
};

export default HomePageComponent;
