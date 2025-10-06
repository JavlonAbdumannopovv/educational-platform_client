import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { InstructorCoursesCard, SectionHero } from "src/components";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const CoursesPageComponent = () => {
  const { courses } = useTypedSelector((state) => state.instructor);
  const { t } = useTranslation();

  return (
    <>
      <SectionHero
        title={t("all_courses_title", { ns: "instructor" })}
        subtitle={t("all_courses_description", { ns: "instructor" })}
        imageURL="/images/manage.png"
      />

      <Tabs isFitted variant="enclosed" mt={10}>
        <TabList mb="1em">
          <Tab>{t("all_courses_title", { ns: "instructor" })}</Tab>
          <Tab>{t("active_courses", { ns: "instructor" })}</Tab>
          <Tab>{t("draft_courses", { ns: "instructor" })}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {courses.map((item) => (
              <InstructorCoursesCard key={item.slug} item={item} />
            ))}
          </TabPanel>
          <TabPanel>
            {courses
              .filter((c) => c.isActive)
              .map((item) => (
                <InstructorCoursesCard key={item.slug} item={item} />
              ))}
          </TabPanel>
          <TabPanel>
            {courses
              .filter((c) => !c.isActive)
              .map((item) => (
                <InstructorCoursesCard key={item.slug} item={item} />
              ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default CoursesPageComponent;
