import {
  Accordion,
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { DashboardAccordionItem } from "src/components";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const Sidebar = () => {
  const { sections, pendingSection } = useTypedSelector(
    (state) => state.section
  );
  const { course } = useTypedSelector((state) => state.course);
  const { getSection } = useActions();

  useEffect(() => {
    getSection({ courseId: course?._id, callback: () => {} });
  }, [course]);

  return (
    <Box
      position={"fixed"}
      display={{ base: "none", lg: "block" }}
      top={"12vh"}
      right={"2vh"}
      bottom={"2vh"}
      w={"400px"}
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      borderRadius={"lg"}
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
        <>
          <Heading fontSize={"2xl"}>Kurs bo'limlari</Heading>
          <Flex align={"center"} gap={2} mt={3}>
            {sections.length}ta Bo'lim <Icon as={GoPrimitiveDot} />{" "}
            {sections.map((c) => c.lessons.length).reduce((a, b) => +a + +b, 0)}
            ta Darslik
          </Flex>

          <Accordion mb={5} mr={2} allowToggle>
            {sections.map((section) => (
              <DashboardAccordionItem key={section._id} section={section} />
            ))}
          </Accordion>
        </>
      )}
    </Box>
  );
};

export default Sidebar;
