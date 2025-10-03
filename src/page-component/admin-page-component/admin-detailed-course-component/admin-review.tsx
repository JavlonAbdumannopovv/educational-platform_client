import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { uz, enUS, ru, tr } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import ReactStars from "react-stars";
import Cookies from "js-cookie";

const AdminReview = ({ reviews }) => {
  const { t } = useTranslation();

  const getLocalLanguage = () => {
    const lng = Cookies.get("i18next");
    if (lng == "tr") {
      return tr;
    }
    if (lng == "en") {
      return enUS;
    }
    if (lng == "uz") {
      return uz;
    }
    if (lng == "ru") {
      return ru;
    }
  };

  console.log(reviews);

  return (
    <>
      <Heading mt={10}>{t("review", { ns: "courses" })}</Heading>
      {!reviews.length ? (
        <Stack mt={4} pr={4}>
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
        </Stack>
      ) : (
        reviews.map((item) => (
          <Box key={item._id} mt={6} pb={2} borderBottomWidth={"1px"}>
            <HStack gap={2}>
              <Avatar
                bg={useColorModeValue("gray.200", "gray.600")}
                display={{ base: "none", md: "block" }}
                size={"md"}
                name={item.author.email}
              />
              <Box>
                <Flex
                  align={"center"}
                  gap={2}
                  mt={1}
                  direction={"column"}
                  alignItems={"flex-start"}
                >
                  <Text fontWeight={"bold"}>{item.author.email}</Text>
                  <HStack>
                    <ReactStars edit={false} value={Number(item.rating)} />
                    <Text>
                      {formatDistance(new Date(item.updatedAt), new Date(), {
                        locale: getLocalLanguage(),
                      })}{" "}
                      {t("ago", { ns: "courses" })}
                    </Text>
                  </HStack>
                </Flex>
              </Box>
            </HStack>
            <Text mt={2}>{item.summary}</Text>
          </Box>
        ))
      )}
      <Center mt={5}>
        {reviews.length >= 5 && (
          <Button
            size={"sm"}
            colorScheme={"facebook"}
            variant={"outline"}
            fontWeight={"bold"}
          >
            {t("more", { ns: "courses" })}...
          </Button>
        )}
      </Center>
    </>
  );
};

export default AdminReview;
