import {
  Avatar,
  Box,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaStar, FaUserGraduate } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { loadImage } from "src/helpers/image.helper";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const Mentor = () => {
  const { course } = useTypedSelector((state) => state.course);
  const { t } = useTranslation();

  return (
    <>
      <Heading mt={5}>{t("mentor", { ns: "courses" })}</Heading>
      <Flex mt={5} gap={5} align={"center"}>
        <Link href={`/instructors/${course?.author._id}`}>
          <Avatar
            display={{ base: "none", md: "block" }}
            src={loadImage(course?.author.avatar)}
            name={course?.author.fullName}
            size={"2xl"}
            cursor={"pointer"}
          />
        </Link>
        <Box>
          <Text fontWeight={"bold"} fontSize={"20px"}>
            {course?.author.fullName}
          </Text>
          <Text>{course?.author.job}</Text>
          <Stack
            direction={{ base: "column", md: "row" }}
            mt={2}
            gap={2}
            align={{ base: "flex-start", md: "center" }}
          >
            <Flex align={"center"} gap={1}>
              <Icon as={FaStar} color={"facebook.500"} />
              <Text as={"span"}>
                {course?.reviewAvg} ({course?.reviewCount})
              </Text>
            </Flex>
            <Flex align={"center"} gap={1}>
              <Icon as={FaUserGraduate} color={"facebook.500"} />
              <Text as={"span"}>{course?.author.students.length} O'quvchi</Text>
            </Flex>
            <Flex align={"center"} gap={1}>
              <Icon as={MdDateRange} color={"facebook.500"} />
              <Text as={"span"}>{course?.author.birthday}</Text>
            </Flex>
          </Stack>
        </Box>
      </Flex>
      <Text mt={4}>{course?.author.bio}</Text>
    </>
  );
};
export default Mentor;
