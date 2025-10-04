import {
  Avatar,
  Box,
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
import { AiOutlineClockCircle } from "react-icons/ai";
import { CiViewList } from "react-icons/ci";
import { SiGoogleanalytics } from "react-icons/si";
import ReactStars from "react-stars";
import { loadImage } from "src/helpers/image.helper";
import { PopularCoursesCardProps } from "./popular-courses-card.props";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const PopularCoursesCard = ({ item }: PopularCoursesCardProps) => {
  const { push } = useRouter();
  const { t } = useTranslation();

  return (
    <Card key={item.title} variant={"outline"} background={useColorModeValue("gray.50", "gray.800")}>
      <Box pos={"relative"} w={"full"} h={"210px"}>
        <Image
          src={loadImage(item.previewImage)}
          alt={item.title}
          fill
          style={{ objectFit: "cover", borderRadius: "10px" }}
        />
      </Box>
      <Stack
        spacing={3}
        p={3}
        cursor={"pointer"}
        onClick={() => push(`courses/${item.slug}`)}
      >
        <HStack>
          <Text color={"#e59819"}>{item.reviewAvg || 0}</Text>
          <ReactStars
            edit={false}
            value={item.reviewAvg || 5}
            color2={"#e59819"}
          />
          <Text opacity={".8"}>({item.reviewCount || 0})</Text>
        </HStack>
        <Heading fontSize={"2xl"}>{item.title}</Heading>
        <Text h={"100px"} overflow={"hidden"}>
          {item.exerpt}
        </Text>
        <HStack>
          <Flex align={"center"} gap={1}>
            <Icon as={CiViewList} />
            <Text>{item.lessonCount} Lesson</Text>
          </Flex>
          <Flex align={"center"} gap={1}>
            <Icon as={AiOutlineClockCircle} />
            <Text>{item.totalHour} Hour</Text>
          </Flex>
          <Flex align={"center"} gap={1}>
            <Icon as={SiGoogleanalytics} />
            <Text>{item.level}</Text>
          </Flex>
        </HStack>
        <Divider />
        <Flex justify={"space-between"} align={"center"}>
          <HStack align={"center"}>
            <Avatar
              src={loadImage(item.author.avatar)}
              name={item.author.fullName}
            />
            <Text>{item.author.fullName}</Text>
          </HStack>
          <Text>{t("free", { ns: "courses" })}</Text>
        </Flex>
      </Stack>
    </Card>
  );
};

export default PopularCoursesCard;
