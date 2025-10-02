import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "react-i18next";
import { CourseType } from "src/interfaces/course.interface";
import { withInstructorLayout } from "src/layouts/instructor";
import Seo from "src/layouts/seo/seo";
import { InstructorDraftCourseComponent } from "src/page-component";
import { InstructorService } from "src/services/instructor.service";

const DraftCourses: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Seo
      metaTitle={`DigitalUz | ${t("instructor_draft_active_course_title", { ns: "seo" })}`}
      metaDescription={`${t("instructor_draft_active_course_description", { ns: "seo" })}`}
    >
      <InstructorDraftCourseComponent />
    </Seo>
  );
};

export default withInstructorLayout(DraftCourses);

export const getServerSideProps: GetServerSideProps<CoursesPageType> = async ({
  req,
}) => {
  const courses = await InstructorService.getAllCourses(req.cookies.refresh);

  return {
    props: { courses },
  };
};

interface CoursesPageType extends Record<string, unknown> {
  courses: CourseType[];
}
