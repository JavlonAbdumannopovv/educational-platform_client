import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import SectionTitle from "../section-title/section-title";
import { SectionHeroProps } from "./section-hero.props";

const SectionHero = ({ title, subtitle, imageURL }: SectionHeroProps) => {
  return (
    <Card
      mt={10}
      boxShadow={"lg"}
      background={useColorModeValue("gray.50", "gray.700")}
    >
      <CardBody>
        <HStack>
          <Box w={"30%"}>
            <SectionTitle title={title} subtitle={subtitle} />
          </Box>
          <Flex w={"70%"} justify={"flex-end"}>
            <Image
              src={imageURL}
              alt="section-hero-image"
              w={"450px"}
              h={"auto"}
            />
          </Flex>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default SectionHero;
