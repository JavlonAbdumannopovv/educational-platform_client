import {
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik, FormikValues } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ErrorAlert } from "src/components";
import SectionTitle from "src/components/section-title/section-title";
import TextAreaField from "src/components/text-area-field/text-area-field";
import TextFiled from "src/components/text-filed/text-filed";
import { API_URL, getMailUrl } from "src/config/api.config";
import { AuthValidation } from "src/validations/auth.validation";

<Divider />;

const ContactPageComponent = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  const clearError = () => {
    setError("");
  };

  const onSubmit = async (formikValues: FormikValues, {resetForm}) => {
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}${getMailUrl("contact-us")}`, {
        name: formikValues.name,
        email: formikValues.email,
        message: formikValues.message,
      });
      setIsLoading(false);
      resetForm();
      toast({
        title: "Xabaringiz muvaffaqqiyatli yuborildi!",
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      setError(error as string);
      setIsLoading(false);
    }
  };

  return (
    <Stack gap={10}>
      <SectionTitle
        w={"100%"}
        title={t("contact_title", { ns: "global" })}
        subtitle={t("contact_description", { ns: "global" })}
      />
      <Card w={{ base: "100%", lg: "100%" }}>
        <CardBody>
          <Heading fontSize={"2xl"}>
            {t("contact_heading", { ns: "global" })}
          </Heading>
          <Text fontSize={"lg"} mt={4}>
            {t("contact_text", { ns: "global" })}
          </Text>
          <Formik
            onSubmit={onSubmit}
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={AuthValidation.contactUs}
          >
            <Form>
              <>
                {error && (
                  <ErrorAlert
                    title={error as string}
                    clearHandler={clearError}
                  />
                )}
              </>
              <Stack spacing={4} mt={5}>
                <Flex gap={4}>
                  <TextFiled
                    name="name"
                    label={t("contact_name", { ns: "global" })}
                    placeholder="John Doe"
                  />
                  <TextFiled
                    name="email"
                    label={t("contact_email", { ns: "global" })}
                    placeholder="example@gmail.com"
                  />
                </Flex>
                <TextAreaField
                  name="message"
                  label={t("contact_message", { ns: "global" }) as string}
                />
                <Button
                  w={"full"}
                  h={14}
                  colorScheme={"facebook"}
                  isLoading={isLoading}
                  loadingText={`${t("loading", { ns: "global" })}`}
                  type="submit"
                >
                  {t("contact_btn", { ns: "global" })}
                </Button>
              </Stack>
            </Form>
          </Formik>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default ContactPageComponent;
