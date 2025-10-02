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
  Divider,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
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
import { ErrorAlert } from "src/components";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { loadImage } from "src/helpers/image.helper";
import { useActions } from "src/hooks/useActions";
import { ReviewService } from "src/services/review.service";
import AdminOverview from "./admin-overview";
import AdminCurriculum from "./admin-curriculum";
import AdminReview from "./admin-review";
import AdminMentor from "./admin-mentor";

<Divider />;

const AdminDetailedCourseComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const { course } = useTypedSelector((state) => state.admin);
  const { sections } = useTypedSelector((state) => state.section);
  const { error } = useTypedSelector((state) => state.admin);
  const { getSection, clearError } = useActions();

  const [media] = useMediaQuery("(min-width: 592px)");
  const { t } = useTranslation();
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

  if (course?.slug) {
    return (
      <>
        {/* Header content */}
        <Card>
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
              <Box
                w={{ base: "100%", lg: "39%" }}
                position={{ base: "relative", lg: "absolute" }}
                right={{ base: 0, lg: 2 }}
              >
                <Card variant={"outline"} boxShadow={"dark-lg"}>
                  <CardBody p={{ base: 2, lg: 5 }}>
                    <Image
                      w={"full"}
                      h={"300px"}
                      src={loadImage(course?.previewImage)}
                      alt={course?.title}
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                    <Stack
                      mt={5}
                      direction={"row"}
                      align={"flex-end"}
                      justify={"space-between"}
                    >
                      <Heading fontSize={"2xl"}>
                        {course?.price.toLocaleString("en-US", {
                          currency: "USD",
                          style: "currency",
                        })}
                      </Heading>
                    </Stack>
                    <>
                      {error && (
                        <ErrorAlert
                          title={error as string}
                          clearHandler={clearError}
                        />
                      )}
                    </>
                    {/* <Button
                    mt={5}
                    w={"full"}
                    h={14}
                    colorScheme={"facebook"}
                    onClick={enrollUserHandler}
                    isLoading={isLoading}
                    loadingText={`${t("loading", { ns: "global" })}`}
                  >
                    {t("enroll", { ns: "courses" })}
                  </Button> */}
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
                  </CardBody>
                </Card>
              </Box>
            </Stack>
          </CardBody>
        </Card>

        {/* Tabs content */}
        <Tabs
          mt={5}
          mb={"5vh"}
          w={{ base: "100%", lg: "60%" }}
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
            {tabIndex === 0 && <AdminOverview />}
            {tabIndex === 1 && <AdminCurriculum />}
            {tabIndex === 2 && <AdminReview reviews={reviews} />}
            {tabIndex === 3 && <AdminMentor />}
          </Box>
        </Tabs>
      </>
    );
  } else {
    return <>loading</>;
  }
};

export default AdminDetailedCourseComponent;

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
