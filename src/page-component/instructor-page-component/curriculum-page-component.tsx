import {
  Accordion,
  Card,
  CardBody,
  Divider,
  Flex,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { SectionAccordion, SectionForm } from "src/components";
import SectionTitle from "src/components/section-title/section-title";
import { loadImage } from "src/helpers/image.helper";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const CurriculumPageComponent = () => {
  const [sectionTitle, setSectionTitle] = useState<{
    title: string;
    id: string;
  } | null>({
    title: "",
    id: "",
  });

  const { course } = useTypedSelector((state) => state.instructor);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getSection } = useActions();
  const { pendingSection, sections } = useTypedSelector(
    (state) => state.section
  );
  const { t } = useTranslation();

  useEffect(() => {
    getSection({
      courseId: course?._id,
      callback: () => {
        console.log(course);
      },
    });
  }, [course]);

  console.log(course);

  const onCreateSection = () => {
    onOpen();
    setSectionTitle(null);
  };

  return (
    <>
      <Card background={useColorModeValue("gray.50", "gray.700")}>
        <CardBody p={10}>
          <HStack justify={"space-around"}>
            <Stack>
              <SectionTitle
                title={course?.title as string}
                subtitle={t("curriculum_description", { ns: "instructor" })}
              />
            </Stack>
            <Image
              borderRadius={"lg"}
              width={"400px"}
              height={"auto"}
              src={loadImage(course?.previewImage)}
              alt="curriculum"
            />
          </HStack>
        </CardBody>
      </Card>

      <Card
        mt={10}
        background={useColorModeValue("gray.50", "gray.800")}
        variant={"outline"}
      >
        <CardBody>
          <Flex mb={5} justify={"space-between"} align={"center"}>
            <Text fontSize={"2xl"}>
              {t("create_section", { ns: "instructor" })}
            </Text>
            <Icon
              as={BsFillPlusCircleFill}
              w={6}
              h={6}
              cursor={"pointer"}
              onClick={onCreateSection}
            />
          </Flex>
          {pendingSection ? (
            <Stack>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          ) : (
            <Accordion allowToggle onDragOver={(e) => e.preventDefault()}>
              {sections.map((section, idx) => (
                <SectionAccordion
                  key={section._id}
                  section={section}
                  sectionIdx={idx}
                  setSectionTitle={setSectionTitle}
                  onOpen={onOpen}
                />
              ))}
            </Accordion>
          )}
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("create_section", { ns: "instructor" })}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody pb={5}>
            <SectionForm onClose={onClose} values={sectionTitle} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CurriculumPageComponent;
