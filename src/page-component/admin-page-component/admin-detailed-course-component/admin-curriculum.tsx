import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Icon,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { CiBoxList, CiVideoOn } from "react-icons/ci";
import { getLessonTime } from "src/helpers/time.helper";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const AdminCurriculum = () => {
  const { sections, pendingSection } = useTypedSelector(
    (state) => state.section
  );

  const { t } = useTranslation();

  return (
    <>
      <Heading mt={10}>{t("curriculum", { ns: "courses" })}</Heading>
      {pendingSection ? (
        <Stack mt={4} pr={4}>
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
        </Stack>
      ) : (
        <>
          <Flex align={"center"} gap={10} mt={3}>
            <Flex alignItems={"center"} direction={"row"} gap={1}>
              <Icon as={CiBoxList} w={7} h={7} />
              <Text fontSize={20}>{t("modules", { ns: "courses" })}:</Text>
              <Text fontSize={20}>{sections.length}</Text>
            </Flex>
            <Flex alignItems={"center"} direction={"row"} gap={2}>
              <Icon as={CiVideoOn} w={7} h={7} />
              <Text fontSize={18}>{t("lessons", { ns: "courses" })}:</Text>
              <Text fontSize={18}>
                {sections
                  .map((c) => c.lessons.length)
                  .reduce((a, b) => +a + +b, 0)}
              </Text>
            </Flex>
          </Flex>
          <Accordion defaultIndex={[0]} allowToggle mr={2} mt={5}>
            {sections.map((m) => (
              <AccordionItem
                key={m.title}
                border={"1px solid facebook.500"}
                borderRadius={"8px"}
                mb={1}
              >
                <AccordionButton
                  height={"60px"}
                  background={useColorModeValue("gray.100", "gray.700")}
                  color={useColorModeValue("black", "white")}
                  borderRadius={"lg"}
                  _hover={{
                    backgroundColor: useColorModeValue("gray.200", "gray.700"),
                  }}
                  fontWeight={"bold"}
                  fontSize={18}
                >
                  <Box flex="1" textAlign="left">
                    <AccordionIcon />
                    {m.title}
                  </Box>
                  <Flex flex={0}>
                    <Text fontSize={"sm"}>{m.lessons.length}&nbsp;dars</Text>
                  </Flex>
                </AccordionButton>
                <AccordionPanel pb={4} borderLeft={"1px"} px={5}>
                  {m.lessons.map((lesson) => (
                    <Flex
                      key={lesson.name}
                      justify={"space-between"}
                      align={"center"}
                      py={2}
                    >
                      <Flex align={"center"} gap={2} w={"80%"}>
                        <Icon as={CiVideoOn} color={"gray.600"} w={5} h={5} />
                        <Text>{lesson.name}</Text>
                      </Flex>
                      <Text fontSize={"sm"}>
                        {getLessonTime(
                          lesson.hour,
                          lesson.minute,
                          lesson.second
                        )}
                      </Text>
                    </Flex>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
    </>
  );
};

export default AdminCurriculum;
