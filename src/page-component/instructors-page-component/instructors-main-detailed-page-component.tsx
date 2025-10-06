import {
  Avatar,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaUserGraduate, FaVideo } from "react-icons/fa";
import { IoCalendarSharp } from "react-icons/io5";
import {
  InstructorCourseCard,
} from "src/components";
import { loadImage } from "src/helpers/image.helper";
import { useTypedSelector } from "src/hooks/useTypedSelector";

<Divider />;

const InstructorsMainDetailedPageComponent = () => {
  const { instructor } = useTypedSelector((state) => state.instructor);

  const { t } = useTranslation();

  if (instructor) {
    return (
      <Stack gap={5}>
        <Stack w={{ base: "300px", md: "600px" }}>
          <HStack gap={4}>
            <Avatar
              w={"150px"}
              h={"150px"}
              src={loadImage(instructor?.avatar)}
              name={instructor?.fullName}
            />
            <Flex direction={"column"} alignItems={"flex-start"} gap={2}>
              <Heading>{instructor?.fullName}</Heading>
              <Text fontSize={18} color={"gray.500"}>
                {instructor?.job}
              </Text>
              <HStack gap={4}>
                <HStack>
                  <Icon as={FaUserGraduate} w={6} h={6} />
                  <Text fontSize={18}>{instructor?.studentsCount} </Text>
                </HStack>
                <HStack>
                  <Icon as={FaVideo} w={6} h={6} />
                  <Text fontSize={18}>{instructor?.totalCourses}</Text>
                </HStack>
                {instructor?.author?.birthday ? (
                  <HStack>
                    <Icon as={IoCalendarSharp} w={6} h={6} />
                    <Text fontSize={18}>{instructor?.author?.birthday}</Text>
                  </HStack>
                ) : (
                  ""
                )}
              </HStack>
            </Flex>
          </HStack>
          <Text>
            {instructor?.author?.bio ? instructor?.author?.bio : "bio..."}
          </Text>
        </Stack>
        <Divider />
        <Heading fontSize={"2xl"}>{t("title", { ns: "courses" })}</Heading>
        <Grid
          gridTemplateColumns={{
            base: "1fr",
            md: "1fr 1fr",
            lg: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          {instructor?.courses?.map((course) => (
            <InstructorCourseCard course={course} />
          ))}
        </Grid>
      </Stack>
    );
  } else {
    return <Spinner />;
  }
};

export default InstructorsMainDetailedPageComponent;
