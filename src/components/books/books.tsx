import React from "react";
import SectionTitle from "../section-title/section-title";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  Divider,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { loadImage } from "src/helpers/image.helper";
import { FaEdit } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import { courseCarousel } from "src/config/carousel";

<Divider />;

const Books = () => {
  const { t } = useTranslation();
  const { books } = useTypedSelector((state) => state.books);

  return (
    <Stack gap={2}>
      <SectionTitle
        title={t("title", { ns: "books" })}
        subtitle={t("description", { ns: "books" })}
        pt={4}
      />
      <Carousel
        responsive={courseCarousel}
        arrows={true}
        showDots={false}
        autoPlay={true}
        autoPlaySpeed={5000}
        infinite
      >
        {books.map((item) => (
          <Card
            key={item._id}
            pos={"relative"}
            mx={2}
            background={useColorModeValue("gray.50", "gray.700")}
            variant={"outline"}
          >
            <Image
              src={loadImage(item.image)}
              alt={item.title}
              borderRadius={"lg"}
              w={"full"}
              h={"250px"}
              objectFit={"cover"}
            />

            <Flex p={4} flexDir={"column"}>
              <HStack justifyContent={"space-between"}>
                <Stack>
                  <Text fontSize={"2xl"}>{item.title}</Text>
                  {/* <Text fontSize={"xl"}>{t("free", { ns: "home" })}</Text> */}
                </Stack>
                <Button
                  // onClick={() => editOpenModal(item)}
                  w={"fit-content"}
                  rightIcon={<FaEdit />}
                  colorScheme={"facebook"}
                >
                  {t("read", { ns: "books" })}
                </Button>
              </HStack>
            </Flex>
          </Card>
        ))}
      </Carousel>
    </Stack>
  );
};

export default Books;
