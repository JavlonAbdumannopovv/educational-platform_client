import React from "react";
import SectionTitle from "../section-title/section-title";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { loadImage } from "src/helpers/image.helper";
import { FaEdit } from "react-icons/fa";

<Divider />;

const Books = () => {
  const { t } = useTranslation();
  const { books } = useTypedSelector((state) => state.books);
  const priceBackgroundColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Stack gap={2}>
      <SectionTitle
        title={t("title", { ns: "books" })}
        subtitle={t("description", { ns: "books" })}
        pt={4}
      />
      <Grid
        gap={3}
        gridTemplateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        pb={5}
      >
        {books
          .slice(0, 3)
          .reverse()
          .map((item) => (
            <Box key={item._id} pos={"relative"}>
              <Image
                src={loadImage(item.image)}
                alt={item.title}
                borderRadius={"lg"}
                w={"full"}
                h={"250px"}
                objectFit={"cover"}
              />

              <Flex
                pos={"absolute"}
                left={2}
                right={2}
                borderRadius={"lg"}
                boxShadow={"lg"}
                bottom={"-10"}
                minH={"90px"}
                p={2}
                bg={priceBackgroundColor}
                flexDir={"column"}
              >
                <HStack justifyContent={"space-between"}>
                  <Stack>
                    <Text fontSize={"2xl"}>{item.title}</Text>
                    <Text fontSize={"xl"}>{t("free", { ns: "home" })}</Text>
                  </Stack>
                  <Button
                    // onClick={() => editOpenModal(item)}
                    w={"fit-content"}
                    rightIcon={<FaEdit />}
                    colorScheme={"facebook"}
                  >
                    {t("read", { ns: "home" })}
                  </Button>
                </HStack>
              </Flex>
            </Box>
          ))}
      </Grid>
    </Stack>
  );
};

export default Books;
