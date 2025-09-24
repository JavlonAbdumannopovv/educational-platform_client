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
import React from "react";
import { getLessonTime } from "src/helpers/time.helper";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { SectionType } from "src/interfaces/instructor.interface";

<Divider />;

const DashboardAccordionItem = ({ section }: { section: SectionType }) => {
  const { user } = useTypedSelector((state) => state.user);
  const router = useRouter();

  return (
    <AccordionItem key={section._id} borderRadius={"8px"} mt={5}>
      <AccordionButton
        height={"60px"}
        background={useColorModeValue("gray.100", "gray.700")}
        borderRadius={"md"}
        _hover={{}}
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
            // onClick={() => onLesson(lesson)}
            bg={
              router.query.lessonId === lesson._id
                ? useColorModeValue("gray.100", "gray.800")
                : "transparent"
            }
            fontWeight={
              router.query.lessonId === lesson._id ? "bold" : "normal"
            }
            color={
              router.query.lessonId === lesson._id ? "green.500" : "normal"
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
                    // onChange={e =>
                    // onComplete(e, lesson._id)
                    // }
                    defaultChecked={lesson.completed.includes(
                      user._id as string
                    )}
                    // cursor={
                    // 	isComplete ? 'progress' : 'pointer'
                    // }
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
