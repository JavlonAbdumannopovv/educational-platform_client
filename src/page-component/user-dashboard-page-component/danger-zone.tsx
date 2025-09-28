import {
  Box,
  Button,
  Divider,
  Icon,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ErrorAlert } from "src/components";
import TextFiled from "src/components/text-filed/text-filed";
import { useActions } from "src/hooks/useActions";
import { useShowPassword } from "src/hooks/useShowPassword";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { AuthValidation } from "src/validations/auth.validation";

const DangerZone = () => {
  const { isLoading, error } = useTypedSelector((state) => state.user);
  const { clearError, changeUserPassword } = useActions();

  const { show, toggleShow, showConfirm, toggleShowConfirm } =
    useShowPassword();
  const { t } = useTranslation();
  const toast = useToast();

  const onSubmit = async (formikValues: FormikValues, { resetForm }) => {
    console.log(formikValues);
    changeUserPassword({
      oldPassword: formikValues.oldPassword,
      newPassword: formikValues.confirmPassword,
      callback: () => {
        resetForm();
        toast({
          title: `${t("successfully_edited", { ns: "global" })}`,
          status: "success",
          position: "top-right",
          isClosable: true,
        });
      },
    });
  };

  return (
    <>
      <Text fontSize={"2xl"}>Change password</Text>
      <Divider my={5} />
      <Box maxW={"70%"}>
        <Formik
          onSubmit={onSubmit}
          initialValues={{ oldPassword: "", password: "", confirmPassword: "" }}
          validationSchema={AuthValidation.editPassword}
        >
          <Form>
            <>
              {error && (
                <ErrorAlert title={error as string} clearHandler={clearError} />
              )}
            </>
            <TextFiled
              name="oldPassword"
              label={"Old Password"}
              type={!show ? "password" : "text"}
              placeholder={"****"}
            >
              {" "}
              <InputRightElement pt={4}>
                <Icon
                  as={!show ? AiOutlineEye : AiOutlineEyeInvisible}
                  cursor={"pointer"}
                  onClick={toggleShow}
                />
              </InputRightElement>
            </TextFiled>
            <TextFiled
              name="password"
              label={t("account_recovery_title_form3", { ns: "global" })}
              type={!showConfirm ? "password" : "text"}
              placeholder={"****"}
            >
              <InputRightElement pt={4}>
                <Icon
                  as={!show ? AiOutlineEye : AiOutlineEyeInvisible}
                  cursor={"pointer"}
                  onClick={toggleShowConfirm}
                />
              </InputRightElement>
            </TextFiled>
            <TextFiled
              name="confirmPassword"
              label={t("register_input_confirm_password_label", {
                ns: "global",
              })}
              type={!showConfirm ? "password" : "text"}
              placeholder={"****"}
            >
              <InputRightElement pt={4}>
                <Icon
                  as={!showConfirm ? AiOutlineEye : AiOutlineEyeInvisible}
                  cursor={"pointer"}
                  onClick={toggleShowConfirm}
                />
              </InputRightElement>
            </TextFiled>
            <Button
              w={"full"}
              bgGradient="linear(to-r, facebook.400,gray.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, facebook.500,gray.500)",
                boxShadow: "xl",
              }}
              h={14}
              mt={4}
              type={"submit"}
              isLoading={isLoading}
              loadingText={`${t("loading", { ns: "global" })}`}
            >
              {t("account_recovery_btn_form3", { ns: "global" })}
            </Button>
          </Form>
        </Formik>
      </Box>
    </>
  );
};

export default DangerZone;
