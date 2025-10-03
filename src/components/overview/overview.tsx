import { Box, Divider, Flex, Grid, Heading, Icon, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FiCheckCircle } from "react-icons/fi";
import { GoPrimitiveDot } from "react-icons/go";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const Overview = () => {
  const { t } = useTranslation();
  const { course } = useTypedSelector((state) => state.course);

  return (
    <>
      <Heading mt={10} fontSize={25}>
        {t("what_you_will_learn", { ns: "courses" })}
      </Heading>
      <Grid
        mt={5}
        gridTemplateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      >
        {course?.learn.map((text, idx) => (
          <Flex key={idx} gap={3} align={"center"} my={1}>
            <Icon as={FiCheckCircle} w={8} h={8} borderRadius={"100%"} p={1} />
            <Text>{text}</Text>
          </Flex>
        ))}
      </Grid>
      <Heading mt={10} fontSize={25}>
        {t("required", { ns: "courses" })}
      </Heading>
      <Grid mt={5} gridTemplateColumns={"repeat(1, 1fr)"}>
        {course?.requirements.map((text, idx) => (
          <Flex key={idx} gap={2} align={"center"}>
            <Icon as={GoPrimitiveDot} w={3} h={3} />
            <Text>{text}</Text>
          </Flex>
        ))}
      </Grid>
      <Divider mt={5}/>
      <Heading mt={5} fontSize={25}>
        {t("overview", { ns: "courses" })}
      </Heading>
      <Box
        dangerouslySetInnerHTML={{ __html: course?.description as string }}
      />
    </>
  );
};

export default Overview;
