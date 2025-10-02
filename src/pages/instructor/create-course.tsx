import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { withInstructorLayout } from "src/layouts/instructor";
import Seo from "src/layouts/seo/seo";
import { InstructorCreateCourseComponent } from "src/page-component";

const CreateCourses: NextPage = () => {
  const {t} = useTranslation();

  return (
    <Seo
      metaTitle={`DigitalUz | ${t("instructor_create_course_title", { ns: "seo" })}`}
      metaDescription={`${t("instructor_create_course_description", { ns: "seo" })}`}
    >
      <InstructorCreateCourseComponent />;
    </Seo>
  );
};

export default withInstructorLayout(CreateCourses);
