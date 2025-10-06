import {
  Accordion,
  Box,
  Center,
  Flex,
  Icon,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiBoxList, CiVideoOn } from "react-icons/ci";
import { DashboardAccordionItem } from "src/components";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const Sidebar = ({ ...props }) => {
  const [moduleIndex, setModuleIndex] = useState<number>(0);
  const { sections, pendingSection } = useTypedSelector(
    (state) => state.section
  );
  const { course } = useTypedSelector((state) => state.course);
  const { getSection } = useActions();
  const { t } = useTranslation();

  useEffect(() => {
    getSection({
      courseId: course?._id,
      callback: () => {
        console.log(sections);
      },
    });
  }, [course]);

  useEffect(() => {
    const lessonId = localStorage.getItem(course?._id as string);

    const currentModuleId = sections.find((item) =>
      item.lessons.map((c) => c._id).includes(lessonId as string)
    )?._id;

    const findIndex = sections
      .map((c) => c._id)
      .indexOf(currentModuleId as string);

    setModuleIndex(findIndex === -1 ? 0 : findIndex);
  }, [sections]);

  return (
    <Box
      position={"fixed"}
      borderRight={"1px"}
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      display={{ base: "none", lg: "block" }}
      top={"0"}
      left={"0"}
      bottom={"0"}
      w={"400px"}
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      boxShadow={"xl"}
      p={5}
      zIndex={9}
      transition={"all .5s"}
      overflowY={"scroll"}
      css={{
        "&::-webkit-scrollbar": { width: "1px" },
        "&::-webkit-scrollbar-track": { width: "1px" },
        "&::-webkit-scrollbar-thumb": { background: "transparent" },
      }}
      {...props}
    >
      {pendingSection ? (
        <Center alignItems={"center"} h={"full"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.600"
            color="green.200"
            size="xl"
          />
        </Center>
      ) : (
        <Stack mt={5}>
          <Flex align={"center"} gap={10} mt={3}>
            <Flex alignItems={"center"} direction={"row"} gap={1}>
              <Icon as={CiBoxList} w={5} h={5} />
              <Text fontSize={17}>{t("modules", { ns: "courses" })}:</Text>
              <Text fontSize={17}>{sections.length}</Text>
            </Flex>
            <Flex alignItems={"center"} direction={"row"} gap={2}>
              <Icon as={CiVideoOn} w={5} h={5} />
              <Text fontSize={17}>{t("lessons", { ns: "courses" })}:</Text>
              <Text fontSize={17}>
                {sections
                  .map((c) => c.lessons.length)
                  .reduce((a, b) => +a + +b, 0)}
              </Text>
            </Flex>
          </Flex>

          <Accordion mb={5} mr={2} defaultIndex={moduleIndex} allowToggle>
            {sections.map((section) => (
              <DashboardAccordionItem key={section._id} section={section} />
            ))}
          </Accordion>
        </Stack>
      )}
    </Box>
  );
};

export default Sidebar;
