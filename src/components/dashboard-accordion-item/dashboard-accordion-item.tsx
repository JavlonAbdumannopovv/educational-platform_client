import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Divider,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import $axios from "src/api/axios";
import { getLessonUrl } from "src/config/api.config";
import { getLessonTime } from "src/helpers/time.helper";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { LessonType, SectionType } from "src/interfaces/instructor.interface";

<Divider />;

const DashboardAccordionItem = ({ section }: { section: SectionType }) => {
  const [isComplete, setIsComplete] = useState(false);
  const { user } = useTypedSelector((state) => state.user);
  const { course } = useTypedSelector((state) => state.course);

  const { getLesson } = useActions();
  const router = useRouter();

  const onLesson = (lesson: LessonType) => {
    getLesson(lesson);
    localStorage.setItem(`${course?._id}`, lesson._id);
    const link = `/courses/dashboard/${course?.slug}`;

    router.replace(
      { pathname: link, query: { lesson: lesson._id } },
      undefined,
      { shallow: true }
    );
  };

  const onComplete = async (
    evt: ChangeEvent<HTMLInputElement>,
    lessonID: string
  ) => {
    setIsComplete(true);

    try {
      if (evt.target.checked) {
        await $axios.put(`${getLessonUrl("complete")}/${lessonID}`);
      } else {
        await $axios.put(`${getLessonUrl("uncomplete")}/${lessonID}`);
      }
      setIsComplete(false);
    } catch (error) {
      console.log(error);
      setIsComplete(false);
    }
  };

  return (
    <AccordionItem key={section._id} borderRadius={"8px"} mt={5}>
      <AccordionButton
        height={"60px"}
        background={useColorModeValue("gray.100", "gray.700")}
        borderRadius={"md"}
        _hover={{
          backgroundColor: useColorModeValue("gray.200", "gray.600"),
        }}
        fontWeight={"bold"}
        // onClick={() => onModule(id)}
      >
        <Box flex="1" textAlign="left">
          <AccordionIcon />
          {section.title}
        </Box>
      </AccordionButton>
      <AccordionPanel px={0} pb={4}>
        {section.lessons.map((lesson) => (
          <Box
            key={lesson._id}
            _hover={{
              background: useColorModeValue("gray.100", "gray.800"),
            }}
            transition={"all .3s ease"}
            borderRadius={"md"}
            onClick={() => onLesson(lesson)}
            bg={
              router.query.lessonId === lesson._id
                ? useColorModeValue("gray.100", "gray.800")
                : "transparent"
            }
            fontWeight={router.query.lesson === lesson._id ? "bold" : "normal"}
            color={
              router.query.lesson === lesson._id ? "facebook.500" : "normal"
            }
          >
            <Flex
              justify={"space-between"}
              mt={2}
              cursor={"pointer"}
              align={"center"}
              p={4}
            >
              <Flex align={"center"} w={"8%"}>
                {user ? (
                  <Checkbox
                    colorScheme={"green"}
                    onChange={(e) => onComplete(e, lesson._id)}
                    defaultChecked={lesson.completed.includes(
                      user.id as string
                    )}
                    cursor={isComplete ? "progress" : "pointer"}
                  />
                ) : null}
              </Flex>
              <Flex w={"92%"} justify={"space-between"}>
                <Text>{lesson.name}</Text>
                <Text textDecoration={"underline"} ml={1}>
                  {getLessonTime(lesson.hour, lesson.minute, lesson.second)}
                </Text>
              </Flex>
            </Flex>
          </Box>
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default DashboardAccordionItem;
