import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CgAdd } from "react-icons/cg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BooksModal, ChartData } from "src/components";
import { courseusers } from "src/config/constants";
import { loadImage } from "src/helpers/image.helper";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { BooksType } from "src/interfaces/books.interface";

const BooksPageComponent = () => {
  const [booksValue, setBooksValue] = useState<BooksType | null>(null);

  const priceBackgroundColor = useColorModeValue("gray.200", "gray.900");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { books } = useTypedSelector((state) => state.books);
  const { deleteBooks } = useActions();
  const toast = useToast();
  const { t } = useTranslation();

  const deleteBooksHandler = (id: string) => {
    const isAgree = confirm("Are you sure?");

    if (isAgree) {
      deleteBooks({
        booksId: id,
        callback: () => {
          toast({
            title: t("successfully_deleted"),
            position: "top-right",
            isClosable: true,
            status: "success",
          });
        },
      });
    }
  };

  const editOpenModal = (book: BooksType) => {
    setBooksValue(book);
    onOpen();
  };

  const createOpenModal = () => {
    setBooksValue(null);
    onOpen();
  };

  return (
    <>
      <ChartData
        title={t("books_section_title", { ns: "admin" })}
        subtitle={t("books_section_descr", { ns: "admin" })}
        dataArr={courseusers}
      />
      <Flex mt={5} justify={"flex-end"}>
        <IconButton
          colorScheme="facebook"
          aria-label="Search database"
          icon={<CgAdd />}
          onClick={createOpenModal}
        />
      </Flex>
      <Grid
        gridTemplateColumns={{
          base: "repeat(100%)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
        rowGap={20}
        mt={5}
      >
        {books.map((item) => (
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
              boxShadow={"dark-lg"}
              bottom={"-10"}
              minH={"90px"}
              p={2}
              bg={priceBackgroundColor}
              flexDir={"column"}
            >
              <Box>
                <Text fontSize={"lg"}>{item.title}</Text>
                <Text fontSize={"2xl"}>
                  {item.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </Text>
              </Box>
              <HStack>
                <Button
                  onClick={() => editOpenModal(item)}
                  w={"full"}
                  rightIcon={<FaEdit />}
                  colorScheme={"green"}
                >
                  {t("edit_course", { ns: "instructor" })}
                </Button>
                <Button
                  w={"full"}
                  rightIcon={<FaTrash />}
                  onClick={() => deleteBooksHandler(item._id as string)}
                  colorScheme={"red"}
                >
                  {t("delete_course", { ns: "instructor" })}
                </Button>
              </HStack>
            </Flex>
          </Box>
        ))}
      </Grid>

      <BooksModal isOpen={isOpen} onClose={onClose} booksValue={booksValue} />
    </>
  );
};

export default BooksPageComponent;
