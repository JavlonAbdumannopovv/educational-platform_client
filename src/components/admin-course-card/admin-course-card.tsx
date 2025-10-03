import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BsTrash } from "react-icons/bs";
import { VscOpenPreview } from "react-icons/vsc";
import { loadImage } from "src/helpers/image.helper";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { AdminCourseCardProps } from "./admin-course-card.prop";
import { useRouter } from "next/router";
import { IoLanguageOutline } from "react-icons/io5";
import { AiOutlineProject } from "react-icons/ai";

<Divider />;

const AdminCourseCard: FC<AdminCourseCardProps> = ({ course }): JSX.Element => {
  const { deleteAdminCourse } = useActions();
  const { isLoading } = useTypedSelector((state) => state.admin);
  const toast = useToast();
  const { t } = useTranslation();
  const router = useRouter();

  const deleteCourseHandler = () => {
    const isAgree = confirm("Are you sure?");
    if (isAgree) {
      deleteAdminCourse({
        courseId: course._id,
        callback: () => {
          toast({
            title: t("successfully_deleted", { ns: "instructor" }),
            status: "success",
            position: "top-right",
            isClosable: true,
          });
        },
      });
    }
  };

  console.log(course);

  return (
    <Card
      backgroundColor={useColorModeValue("gray.100", "gray.800")}
      boxShadow={useColorModeValue("lg", "dark-lg")}
      borderRadius={"lg"}
      mt={10}
    >
      <Box pos={"relative"} w={"100%"} h={"200px"}>
        <Image
          fill
          src={loadImage(course.previewImage)}
          style={{ objectFit: "cover", borderRadius: "10px 10px 0 0" }}
          alt={course.title}
        />
      </Box>
      <Stack spacing={4} p={5}>
        <Heading fontSize={"2xl"}>{course.title}</Heading>
        <HStack gap={4}>
          <Flex align={"center"} gap={1}>
            <Icon as={IoLanguageOutline} w={6} h={6} />
            <Text fontSize={18}>{course.language}</Text>
          </Flex>
          <Flex align={"center"} gap={1}>
            <Icon as={AiOutlineProject} w={6} h={6} />
            <Text
              color={course.isActive ? "green.500" : "red.500"}
              fontSize={18}
            >
              {course.isActive ? "Active" : "Draft"}
            </Text>
          </Flex>
        </HStack>
        <Divider />
        <ButtonGroup>
          <Button
            w={"full"}
            rightIcon={<VscOpenPreview />}
            colorScheme={"facebook"}
            onClick={() => router.push(`/admin/courses/${course.slug}`)}
          >
            {t("preview", { ns: "instructor" })}
          </Button>
          <Button
            w={"full"}
            onClick={deleteCourseHandler}
            colorScheme={"red"}
            rightIcon={<BsTrash />}
            isLoading={isLoading}
          >
            {t("delete_course", { ns: "instructor" })}
          </Button>
        </ButtonGroup>
      </Stack>
    </Card>
  );
};

export default AdminCourseCard;
