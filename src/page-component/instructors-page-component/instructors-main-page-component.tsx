import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import SectionTitle from "src/components/section-title/section-title";
import { loadImage } from "src/helpers/image.helper";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { InstructorType } from "src/interfaces/instructor.interface";

<Divider />;

const InstructorsMainPageComponent = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [allInstructors, setAllInstructors] = useState<InstructorType[]>([]);
  const { instructors } = useTypedSelector((state) => state.instructor);

  const router = useRouter();
  const { t } = useTranslation();

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setAllInstructors(
      instructors.filter(
        (c) =>
          c.fullName.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      )
    );
  };

  useEffect(() => {
    setAllInstructors(instructors);
  }, [instructors]);

  console.log(instructors);

  return (
    <Stack gap={5}>
      <SectionTitle
        title={t("instructor_title", { ns: "home" })}
        subtitle={t("instructor_description", { ns: "home" })}
      />
      <Box pos={"relative"} mt={5}>
        <Input
          h={14}
          w={"full"}
          bg={"white"}
          color={"gray.900"}
          placeholder={t("search_input_placeholder", { ns: "courses" }) || ""}
          _placeholder={{ color: "gray.500" }}
          value={searchValue}
          onChange={searchHandler}
        />
      </Box>

      <Grid
        gap={3}
        gridTemplateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        mt={5}
      >
        {allInstructors.map((item, idx) => (
          <Card
            key={idx}
            variant={"outline"}
            background={useColorModeValue("gray.50", "gray.700")}
          >
            <Box pos={"relative"} w={"full"} h={"330px"} p={5} mx={"auto"}>
              <Image
                src={
                  item.avatar
                    ? loadImage(item.avatar)
                    : "/images/placeholder-portrait.png"
                }
                alt={item.fullName}
                fill
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
            </Box>
            <Stack spacing={3} p={3}>
              <Heading fontSize={"xl"}>{item.fullName}</Heading>
              <Text color={"gray.500"}>{item.job}</Text>
              <HStack opacity={".6"}>
                <Flex align={"center"} gap={1}>
                  <Icon as={FaUserGraduate} />
                  <Text>{item.studentsCount} students</Text>
                </Flex>
                <Flex align={"center"} gap={1}>
                  <Icon as={AiOutlinePlayCircle} />
                  <Text>{item.totalCourses} courses</Text>
                </Flex>
              </HStack>
              <Button
                colorScheme={"facebook"}
                variant={"outline"}
                onClick={() => router.push(`/instructors/${item._id}`)}
              >
                {t("detail", { ns: "global" })}
              </Button>
            </Stack>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
};

export default InstructorsMainPageComponent;
