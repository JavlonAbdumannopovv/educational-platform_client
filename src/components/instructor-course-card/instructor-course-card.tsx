import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { SiGoogleanalytics } from "react-icons/si";
import { loadImage } from "src/helpers/image.helper";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { IoCalendarSharp } from "react-icons/io5";
import { format } from "date-fns";

const InstructorCourseCard = ({course}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const onDetailedCourse = () => router.push(`/courses/${course.slug}`);

  return (
    <>
      <Card
        backgroundColor={useColorModeValue("gray.100", "gray.800")}
        boxShadow={useColorModeValue("lg", "dark-lg")}
        borderRadius={"lg"}
      >
        <Stack>
          <Box
            position={"relative"}
            width={"full"}
            h={"250px"}
            onClick={onDetailedCourse}
            cursor={"pointer"}
          >
            <Image
              src={loadImage(course.previewImage)}
              alt={course.title}
              fill
              style={{ objectFit: "cover", borderRadius: "10px 10px 0 0" }}
            />
          </Box>

          <Stack p={4}>
            <Heading fontSize={"2xl"}>{course.title}</Heading>
            <Text>
              {course.exerpt.length >= 100
                ? course.exerpt.slice(0, 100)
                : course.exerpt}{" "}
              ...
            </Text>
            <Flex
              gap={2}
              fontSize={"14px"}
              direction={{ base: "column", sm: "row" }}
            >
              <HStack gap={2}>
                <Flex align={"center"} gap={1}>
                  <Icon as={IoCalendarSharp} />
                  <Text>{format(new Date(course.updatedAt), "dd.MM.yyyy")}</Text>
                </Flex>
                <Flex align={"center"} gap={1}>
                  <Icon as={SiGoogleanalytics} />
                  <Text>{course.level}</Text>
                </Flex>
              </HStack>
            </Flex>
            <Divider />
            <Flex
              justify={"flex-end"}
              direction={{ base: "column", md: "row" }}
            >
              <Flex gap={4} mt={{ base: 5, md: 0 }}>
                <Button
                  onClick={onDetailedCourse}
                  colorScheme={"facebook"}
                >
                  {t("detail", { ns: "global" })}
                </Button>
              </Flex>
            </Flex>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default InstructorCourseCard;
