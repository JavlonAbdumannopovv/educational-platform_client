import {
  Button,
  Card,
  CardBody,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { VscDebugStart } from "react-icons/vsc";

const Hero = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  return (
    <Card mt={10} background={useColorModeValue("gray.50", "gray.700")} variant={"outline"}>
      <CardBody p={10}>
        <Grid
          minH={"50vh"}
          gridTemplateColumns={{ base: "100%", md: "50% 50%" }}
          gap={5}
          justifyContent={"space-between"}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Stack spacing={3} h={"fit-content"}>
            <Heading>{t("hero_title", { ns: "home" })}</Heading>
            <Text>{t("hero_description", { ns: "home" })}</Text>
            <Grid gridTemplateColumns={{ base: "100%", md: "50% 50%" }} gap={5}>
              <Button
                h={14}
                colorScheme={"facebook"}
                rightIcon={<VscDebugStart />}
                onClick={() => push("courses")}
              >
                {t("hero_start_learning_btn", { ns: "home" })}
              </Button>
              <Button
                h={14}
                colorScheme={"facebook"}
                variant={"outline"}
                onClick={() => push("become-instructor")}
              >
                {t("hero_become_instructor_btn", { ns: "home" })}
              </Button>
            </Grid>
          </Stack>
          <Image src="/images/main-page-hero.png" alt="main-page-hero" />
        </Grid>
      </CardBody>
    </Card>
  );
};

export default Hero;
