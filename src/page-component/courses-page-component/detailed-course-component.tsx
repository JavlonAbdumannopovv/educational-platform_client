import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Stack,
  Text,
  Icon,
  useMediaQuery,
  Image,
  Button,
  Divider,
  Tabs,
  TabList,
  Tab,
  useToast,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaBook,
  FaLanguage,
  FaRibbon,
  FaStar,
  FaUserGraduate,
  FaUserTie,
} from "react-icons/fa";
import ReactStars from "react-stars";
import { TfiAlarmClock, TfiTimer } from "react-icons/tfi";
import { format } from "date-fns";
import { MdPlayLesson } from "react-icons/md";
import { BsBarChart } from "react-icons/bs";
import { TbCertificate } from "react-icons/tb";
import { GiInfinity } from "react-icons/gi";
import {
  Curriculum,
  ErrorAlert,
  Mentor,
  Overview,
  Review,
} from "src/components";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { loadImage } from "src/helpers/image.helper";
import { useActions } from "src/hooks/useActions";
import { ReviewService } from "src/services/review.service";

<Divider />;

const DetailedCourseComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const { course } = useTypedSelector((state) => state.course);
  const { sections } = useTypedSelector((state) => state.section);
  const { user, error, isLoading } = useTypedSelector((state) => state.user);
  const { getSection, enrollUser, clearError, checkAuth } = useActions();

  const [media] = useMediaQuery("(min-width: 592px)");
  const { t } = useTranslation();
  const router = useRouter();
  const toast = useToast();
  const getAllReviews = async () => {
    try {
      const allReviews = await ReviewService.getReviews(course?._id as string);
      setReviews(allReviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllReviews();
  }, [course]);

  const tabHandler = (idx: number) => {
    if (idx === 1 && !sections.length) {
      getSection({
        courseId: course?._id,
        callback: () => {
          console.log(course);
        },
      });
    }

    setTabIndex(idx);
  };

  const enrollUserHandler = () => {
    if (!user) {
      router.push("/auth");
      toast({
        title: "Tizimga kirishingiz kerak",
        position: "top-right",
        isClosable: true,
      });
    }
    if (
      Array.isArray(user?.courses) &&
      user?.courses.includes(course?._id as string)
    ) {
      router.push(`/courses/dashboard/${course?.slug}`);
    } else {
      enrollUser({
        courseId: course?._id as string,
        callback: () => {
          checkAuth();
          router.push(`/courses/dashboard/${course?.slug}`);
          toast({
            title: "Kurs muvaffaqiyatli ro'yxatga qo'shildi",
            position: "top-right",
            isClosable: true,
          });
        },
      });
    }
  };

  return (
    <>
      {/* Header content */}
      <Card
        backgroundColor={useColorModeValue("gray.50", "gray.800")}
        boxShadow={useColorModeValue("lg", "dark-lg")}
        borderRadius={"lg"}
        variant={"outline"}
      >
        <CardBody pos={"relative"} p={{ base: 2, md: 5 }}>
          <Stack direction={{ base: "column", md: "row" }} gap={5}>
            <Box w={{ base: "100%", lg: "60%" }}>
              <Heading mt={5} fontSize={"3xl"}>
                {course?.title}
              </Heading>
              <Text mt={5}>{course?.exerpt}</Text>
              <Stack mt={5} direction={!media ? "column" : "row"} gap={1}>
                <Flex fontSize={"sm"} align={"flex-end"} gap={1}>
                  <Text>{course?.reviewAvg}</Text>
                  <ReactStars edit={false} value={course?.reviewAvg} />
                  <Text>({course?.reviewCount})</Text>
                </Flex>
                <Flex align={"center"} fontSize={"sm"} gap={1}>
                  <Icon as={FaUserGraduate} />
                  <Text>{course?.allStudents} O'quvchilar</Text>
                </Flex>
                <Flex align={"center"} fontSize={"sm"} gap={1}>
                  <Icon as={TfiAlarmClock} />
                  <Text>
                    Oxirgi yangilanish{" "}
                    {course &&
                      format(new Date(course.updatedAt), "dd MMMM, yyyy")}
                  </Text>
                </Flex>
              </Stack>
            </Box>
            <Box w={{ base: "100%", lg: "39%" }}>
              <Image
                w={"full"}
                h={"260px"}
                src={loadImage(course?.previewImage)}
                alt={course?.title}
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
            </Box>
          </Stack>
        </CardBody>
      </Card>

      {/* Tabs content */}
      <Grid
        gridTemplateColumns={{ base: "1fr", md: "3fr 2fr" }}
        mt={5}
        justifyContent={"space-between"}
        gap={5}
      >
        <Card
          w={"full"}
          backgroundColor={useColorModeValue("gray.50", "gray.800")}
          boxShadow={useColorModeValue("lg", "dark-lg")}
          borderRadius={"lg"}
          variant={"outline"}
        >
          <CardBody>
            <Tabs
              mt={5}
              mb={"5vh"}
              w={"full"}
              orientation={"horizontal"}
              onChange={tabHandler}
              defaultValue={tabIndex}
              isFitted
              colorScheme={"facebook"}
            >
              <TabList>
                {tablist.map((tab) => (
                  <Tab
                    key={tab.name}
                    fontWeight="bold"
                    textTransform="capitalize"
                    w="100%"
                    justifyContent={"center"}
                  >
                    <Icon
                      as={tab.Icon}
                      mr="2"
                      display={{ base: "none", md: "block" }}
                    />{" "}
                    {t(tab.name, { ns: "courses" })}
                  </Tab>
                ))}
              </TabList>
              <Box w={"full"}>
                {tabIndex === 0 && <Overview />}
                {tabIndex === 1 && <Curriculum />}
                {tabIndex === 2 && <Review reviews={reviews} />}
                {tabIndex === 3 && <Mentor />}
              </Box>
            </Tabs>
          </CardBody>
        </Card>
        <Card
          backgroundColor={useColorModeValue("gray.50", "gray.800")}
          boxShadow={useColorModeValue("lg", "dark-lg")}
          borderRadius={"lg"}
          variant={"outline"}
          w="full"
          h={"fit-content"}
        >
          <CardBody p={{ base: 2, lg: 5 }}>
            <Stack direction={"column"} gap={5}>
              <>
                {error && (
                  <ErrorAlert
                    title={error as string}
                    clearHandler={clearError}
                  />
                )}
              </>
              <Box mt={3}>
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  py={2}
                  px={2}
                  fontSize={"17px"}
                >
                  <Flex align={"center"} gap={3}>
                    <MdPlayLesson />
                    <Text fontWeight={"bold"}>
                      {t("lessons", { ns: "courses" })}
                    </Text>
                  </Flex>
                  <Text>{course?.lessonCount}</Text>
                </Flex>
                <Divider />
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  py={2}
                  px={2}
                  fontSize={"17px"}
                >
                  <Flex align={"center"} gap={3}>
                    <TfiTimer />
                    <Text fontWeight={"bold"}>
                      {t("total_hour", { ns: "courses" })}
                    </Text>
                  </Flex>
                  <Text>
                    {course?.totalHour} {t("hour", { ns: "courses" })}
                  </Text>
                </Flex>
                <Divider />
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  py={2}
                  px={2}
                  fontSize={"17px"}
                >
                  <Flex align={"center"} gap={3}>
                    <BsBarChart />
                    <Text fontWeight={"bold"}>
                      {t("level", { ns: "courses" })}
                    </Text>
                  </Flex>
                  <Text>{course?.level}</Text>
                </Flex>
                <Divider />
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  py={2}
                  px={2}
                  fontSize={"17px"}
                >
                  <Flex align={"center"} gap={3}>
                    <FaLanguage />
                    <Text fontWeight={"bold"}>
                      {t("language", { ns: "courses" })}
                    </Text>
                  </Flex>
                  <Text>{course?.language}</Text>
                </Flex>
                <Divider />
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  py={2}
                  px={2}
                  fontSize={"17px"}
                >
                  <Flex align={"center"} gap={3}>
                    <TbCertificate />
                    <Text fontWeight={"bold"}>
                      {t("sertificate", { ns: "courses" })}
                    </Text>
                  </Flex>
                  <Text>No</Text>
                </Flex>
                <Divider />
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  py={2}
                  px={2}
                  fontSize={"17px"}
                >
                  <Flex align={"center"} gap={3}>
                    <GiInfinity />
                    <Text fontWeight={"bold"}>
                      {t("access", { ns: "courses" })}
                    </Text>
                  </Flex>
                  <Text>Lifetime</Text>
                </Flex>
                <Divider />
              </Box>
              <Heading fontSize={"2xl"}>{t("free", { ns: "courses" })}</Heading>
              <Button
                mt={5}
                w={"full"}
                h={14}
                colorScheme={"facebook"}
                onClick={enrollUserHandler}
                isLoading={isLoading}
                loadingText={`${t("loading", { ns: "global" })}`}
              >
                {t("enroll", { ns: "courses" })}
              </Button>
            </Stack>
          </CardBody>
        </Card>
      </Grid>
    </>
  );
};

export default DetailedCourseComponent;

const tablist = [
  {
    name: "overview",
    Icon: FaRibbon,
  },
  {
    name: "curriculum",
    Icon: FaBook,
  },
  {
    name: "review",
    Icon: FaStar,
  },
  {
    name: "mentor",
    Icon: FaUserTie,
  },
];
