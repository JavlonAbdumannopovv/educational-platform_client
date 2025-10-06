import {
  Box,
  Grid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { DraftCourseCard, SectionHero } from "src/components";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const DraftCourseComponent = () => {
  const { courses } = useTypedSelector((state) => state.instructor);
  const { t } = useTranslation();

  console.log(courses);

  return (
    <>
      <SectionHero
        title={t("draft_courses", { ns: "instructor" })}
        subtitle={t("draft_courses_description", { ns: "instructor" })}
        imageURL="/images/draft.png"
      />

      <Box mt={10}>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>{t("draft", { ns: "instructor" })}</Tab>
            <Tab>{t("active", { ns: "instructor" })}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Grid gridTemplateColumns={"1fr 1fr"} gap={4}>
                {courses
                  .filter((c) => !c.isActive)
                  .map((item) => (
                    <DraftCourseCard key={item.slug} item={item} />
                  ))}
              </Grid>
            </TabPanel>
            <TabPanel>
              <Grid gridTemplateColumns={"1fr 1fr"} gap={4}>
                {courses
                  .filter((c) => c.isActive)
                  .map((item) => (
                    <DraftCourseCard key={item.slug} item={item} />
                  ))}
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default DraftCourseComponent;
