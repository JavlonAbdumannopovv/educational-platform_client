import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineClockCircle } from "react-icons/ai";
import { CiViewList } from "react-icons/ci";
import { SiGoogleanalytics } from "react-icons/si";
import ReactStars from "react-stars";
import { AllCoursesCardProps } from "./all-courses-card.props";
import { loadImage } from "src/helpers/image.helper";
import Image from "next/image";

const AllCoursesCard = ({ course }: AllCoursesCardProps) => {
  const router = useRouter();

  const onDetailedCourse = () => router.push(`/courses/${course.slug}`);

  return (
    <>
      <Box py={4}>
        <Flex gap={4} direction={{ base: "column", md: "row" }}>
          <Box
            position={"relative"}
            width={{ base: "full", md: "30%" }}
            h={"250px"}
            onClick={onDetailedCourse}
            cursor={"pointer"}
          >
            <Image
              src={loadImage(course.previewImage)}
              alt={course.title}
              fill
              style={{ objectFit: "cover", borderRadius: "10px" }}
            />
          </Box>

          <Stack w={"70%"}>
            <HStack>
              <Text color={"#e59819"}>{course.reviewAvg || 0}</Text>
              <ReactStars
                edit={false}
                value={course.reviewAvg || 5}
                color2={"#e59819"}
              />
              <Text opacity={".8"}>({course.reviewCount || 0})</Text>
            </HStack>
            <Heading fontSize={"xl"}>{course.title}</Heading>
            <Text>
              {course.exerpt.length >= 200
                ? course.exerpt.slice(0, 200)
                : course.exerpt} ...
            </Text>
            <Flex
              gap={2}
              fontSize={"14px"}
              direction={{ base: "column", sm: "row" }}
            >
              <Avatar
                src={loadImage(course.author.avatar)}
                name={course.author.fullName}
              />
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
              <Text fontSize={"xl"} fontWeight={"bold"}>
                {course.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>
              <Flex gap={4} mt={{ base: 5, md: 0 }}>
                {/* <Button
                  rightIcon={<BsMinecartLoaded />}
                  colorScheme={"facebook"}
                >
                  Add to cart
                </Button> */}
                <Button
                  onClick={onDetailedCourse}
                  colorScheme={"facebook"}
                  variant={"outline"}
                >
                  Detail
                </Button>
              </Flex>
            </Flex>
          </Stack>
        </Flex>
      </Box>
      <Divider />
    </>
  );
};

export default AllCoursesCard;
