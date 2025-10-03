import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { AdminInstructorTable, ChartData } from "src/components";
import { courseusers } from "src/config/constants";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const InstructorPageComponent = () => {
  const { instructors } = useTypedSelector((state) => state.admin);
  const { t } = useTranslation();

  return (
    <>
      <ChartData
        dataArr={courseusers}
        title={t("instructors_section_title", { ns: "admin" })}
        subtitle={t("instructors_section_descr", { ns: "admin" })}
      />

      <Box mt={10} mx={"auto"}>
        <Tabs isFitted variant="enclosed" colorScheme={"facebook"}>
          <TabList mb={5}>
            <Tab>{t("approved_instructors", { ns: "admin" })}</Tab>
            <Tab>{t("applied_instructors", { ns: "admin" })}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AdminInstructorTable
                instructors={instructors.filter((c) => c.approved)}
                approved={true}
              />
            </TabPanel>
            <TabPanel>
              <AdminInstructorTable
                instructors={instructors.filter((c) => !c.approved)}
                approved={false}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default InstructorPageComponent;
