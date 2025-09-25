import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik, FormikValues } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaRegCommentDots, FaTelegram } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { RiLogoutBoxLine } from "react-icons/ri";
import ReactStars from "react-stars";
import TextAreaField from "src/components/text-area-field/text-area-field";
import TextFiled from "src/components/text-filed/text-filed";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { DarkLogo, LightLogo } from "src/icons";

<Divider />;

const initialValue = {
  name: "",
  email: "",
  rating: 0,
  summary: "",
};

const Header = () => {
  const [reviewVal, setReviewVal] = useState(initialValue);
  const { colorMode, toggleColorMode } = useColorMode();
  const { course } = useTypedSelector((state) => state.course);
  const { user } = useTypedSelector((state) => state.user);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onReviewModal = (formikValues: FormikValues) => {
    console.log(formikValues);
  };

  useEffect(() => {
    setReviewVal({
      ...reviewVal,
      name: user?.fullName as string,
      email: user?.email as string,
    });
  }, [user]);

  return (
    <Box
      position={"fixed"}
      top={0}
      left={0}
      zIndex={99}
      right={0}
      h={"10vh"}
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Stack
        h={"10vh"}
        w={"90%"}
        mx={"auto"}
        direction={"row"}
        align={"center"}
        justify={"space-between"}
      >
        <Stack gap={{ base: 0, md: 2 }} direction={"row"}>
          <Link href="/">
            {colorMode === "light" ? <DarkLogo /> : <LightLogo />}
          </Link>
        </Stack>

        <Stack direction={"row"} align={"center"}>
          <IconButton
            colorScheme={"green"}
            variant={"ghost"}
            onClick={toggleColorMode}
            icon={colorMode == "light" ? <BsFillMoonStarsFill /> : <FiSun />}
            aria-label={"moon"}
          />
          <IconButton
            icon={<FaTelegram />}
            onClick={() => window.open("https://t.me/javlonabdumannopov")}
            aria-label={"comments"}
            variant={"ghost"}
            colorScheme={"telegram"}
            display={{ base: "none", md: "flex" }}
          />
          <IconButton
            onClick={onOpen}
            icon={<FaRegCommentDots />}
            aria-label={"comments"}
            variant={"outline"}
            colorScheme={"green"}
            display={{ base: "none", md: "flex" }}
          />
          <IconButton
            onClick={() => router.push(`/course/${course?.slug}`)}
            icon={<RiLogoutBoxLine />}
            aria-label={"comments"}
            variant={"outline"}
            colorScheme={"red"}
          />
        </Stack>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay
          bg={"blackAlpha.300"}
          backdropFilter={"blur(10px) hue-rotate(90deg)"}
        />
        <ModalContent>
          <ModalHeader>
            Izohingiz
          <ModalCloseButton />
          </ModalHeader>
          <Divider />
          <Formik
            onSubmit={onReviewModal}
            initialValues={reviewVal}
            enableReinitialize
          >
            {(formik) => (
              <Form>
                <ModalBody>
                  <Stack gap={4}>
                    <TextFiled name="name" label="Ismingiz" disabled={true} />
                    <TextFiled
                      name="email"
                      label="Elektron pochtangiz"
                      disabled={true}
                    />
                    <Box mt={2}>
                      <ReactStars
                        edit={true}
                        size={20}
                        value={formik.values.rating}
                        onChange={(e) => formik.setFieldValue("rating", e)}
                      />
                    </Box>
                    <Box>
                      <TextAreaField
                        name="summary"
                        label="Izohingiz"
                        resize="none"
                        height="150px"
                        placeholder="Kurs haqida fikringizni yozishingiz mumkin!"
                      />
                    </Box>
                  </Stack>
                </ModalBody>
                <ModalFooter>
                  <Button
                    h={14}
                    colorScheme={"facebook"}
                    w={"full"}
                    isActive
                    type="submit"
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Header;
