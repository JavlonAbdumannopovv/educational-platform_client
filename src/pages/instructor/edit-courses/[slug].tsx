import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "react-i18next";
import { CourseType } from "src/interfaces/course.interface";
import { withInstructorLayout } from "src/layouts/instructor";
import Seo from "src/layouts/seo/seo";
import { EditDetailedCoursePageComponent } from "src/page-component";
import { InstructorService } from "src/services/instructor.service";

const EditDetailedCourses: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Seo
      metaTitle={`DigitalUz | ${t("instructor_edit_course_title", {
        ns: "seo",
      })}`}
      metaDescription={`${t("instructor_edit_course_description", {
        ns: "seo",
      })}`}
    >
      <EditDetailedCoursePageComponent />
    </Seo>
  );
};

export default withInstructorLayout(EditDetailedCourses);

export const getServerSideProps: GetServerSideProps<CoursesPageType> = async ({
  req,
  query,
}) => {
  const course = await InstructorService.getDetailedCourse(
    req.cookies.refresh,
    query.slug as string
  );

  return {
    props: { course },
  };
};

interface CoursesPageType extends Record<string, unknown> {
  course: CourseType;
}
