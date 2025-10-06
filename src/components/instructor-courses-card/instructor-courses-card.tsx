import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineClockCircle } from "react-icons/ai";
import { CiViewList } from "react-icons/ci";
import { SiGoogleanalytics } from "react-icons/si";
import { VscOpenPreview } from "react-icons/vsc";
import { loadImage } from "src/helpers/image.helper";
import { InstructoCoursesCardProps } from "./instructor-courses-card.props";

const InstructorCoursesCard: FC<InstructoCoursesCardProps> = ({
  item,
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Card
      key={item.title}
      // variant={"outline"}
      p={5}
      mt={5}
      backgroundColor={useColorModeValue("gray.50", "gray.800")}
      boxShadow={useColorModeValue("lg", "dark-lg")}
      borderRadius={"lg"}
    >
      <HStack>
        <Stack spacing={5} w={"70%"}>
          <Text fontSize={"20px"} color={"facebook.500"} fontWeight={"bold"}>
            {item.level}
          </Text>
          <Heading>{item.title}</Heading>
          <HStack gap={4}>
            <Flex align={"center"} gap={1}>
              <Icon as={CiViewList} />
              <Text>
                {item.lessonCount} {t("lessons", { ns: "courses" })}
              </Text>
            </Flex>
            <Flex align={"center"} gap={1}>
              <Icon as={AiOutlineClockCircle} />
              <Text>
                {item.totalHour} {t("hour", { ns: "courses" }).toLowerCase()}
              </Text>
            </Flex>
            <Flex align={"center"} gap={1}>
              <Icon as={SiGoogleanalytics} />
              <Text>{item.level}</Text>
            </Flex>
          </HStack>
          <Divider />
          <HStack>
            <Button
              rightIcon={<VscOpenPreview />}
              w={"full"}
              h={16}
              colorScheme={"facebook"}
            >
              {t("preview", { ns: "instructor" })}
            </Button>
          </HStack>
        </Stack>
        <Box w={"30%"} h={"300px"} position={"relative"}>
          <Image
            src={loadImage(item.previewImage)}
            alt={item.title}
            style={{ objectFit: "cover", borderRadius: "10px" }}
            fill
          />
        </Box>
      </HStack>
    </Card>
  );
};

export default InstructorCoursesCard;
