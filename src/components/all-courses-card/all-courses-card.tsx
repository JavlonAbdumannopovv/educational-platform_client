import {
  Avatar,
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
import { useRouter } from "next/router";
import { AiOutlineClockCircle } from "react-icons/ai";
import { CiViewList } from "react-icons/ci";
import { SiGoogleanalytics } from "react-icons/si";
import ReactStars from "react-stars";
import { AllCoursesCardProps } from "./all-courses-card.props";
import { loadImage } from "src/helpers/image.helper";
import Image from "next/image";
import { useTranslation } from "react-i18next";

<Divider />;

const AllCoursesCard = ({ course }: AllCoursesCardProps) => {
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
            <HStack>
              <Text color={"#e59819"}>{course.reviewAvg || 0}</Text>
              <ReactStars
                edit={false}
                value={course.reviewAvg || 5}
                color2={"#e59819"}
              />
              <Text opacity={".8"}>({course.reviewCount || 0})</Text>
            </HStack>
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
              <HStack>
                <Flex align={"center"} gap={1}>
                  <Icon as={CiViewList} />
                  <Text>{course.lessonCount} lesson</Text>
                </Flex>
                <Flex align={"center"} gap={1}>
                  <Icon as={AiOutlineClockCircle} />
                  <Text>{course.totalHour} hours</Text>
                </Flex>
                <Flex align={"center"} gap={1}>
                  <Icon as={SiGoogleanalytics} />
                  <Text>{course.level}</Text>
                </Flex>
              </HStack>
            </Flex>
            <Divider />
            <Flex
              align={{ base: "flex-start", md: "center" }}
              justify={"space-between"}
              direction={{ base: "column", md: "row" }}
            >
              <HStack>
                <Avatar
                  src={loadImage(course.author.avatar)}
                  name={course.author.fullName}
                />
                <Text>
                  {course.author.fullName}
                </Text>
              </HStack>
              <Flex gap={4} mt={{ base: 5, md: 0 }}>
                <Button onClick={onDetailedCourse} colorScheme={"facebook"}>
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

export default AllCoursesCard;
