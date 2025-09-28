import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { loadImage } from "src/helpers/image.helper";
import { UserAllCoursesCardProps } from "./user-all-courses-card.props";

const UserAllCoursesCard = ({ course }: UserAllCoursesCardProps) => {
  const router = useRouter();

  const onDetailedCourse = () => router.push(`/courses/${course.slug}`);

  return (
    <>
      <Box py={4}>
        <Flex gap={4} direction={{ base: "column", md: "row" }}>
          <Image
            src={loadImage(course.previewImage)}
            alt={course.title}
            w={{ base: "full", md: "250px" }}
            h={"250px"}
            borderRadius={"lg"}
            objectFit={"cover"}
            onClick={onDetailedCourse}
            cursor={"pointer"}
          />
          <Stack>
            <Heading fontSize={"xl"}>{course.title}</Heading>
            <Text>
              {course.exerpt.length > 100
                ? course.exerpt.slice(0, 250) + " ..."
                : course.exerpt}
            </Text>
            <Divider />
            <Flex gap={4} mt={{ base: 5, md: 0 }} justifyContent={"flex-end"}>
              <Button
                onClick={onDetailedCourse}
                colorScheme={"facebook"}
                variant={"outline"}
              >
                Detail
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Box>
      <Divider />
    </>
  );
};

export default UserAllCoursesCard;
