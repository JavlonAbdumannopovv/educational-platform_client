import { GetServerSideProps } from "next";
import { useTranslation } from "react-i18next";
import { CourseType } from "src/interfaces/course.interface";
import { withInstructorLayout } from "src/layouts/instructor";
import Seo from "src/layouts/seo/seo";
import { CurriculumPageComponent } from "src/page-component";
import { InstructorService } from "src/services/instructor.service";

const CurriculumPage = () => {
  const { t } = useTranslation();
  return (
    <Seo
      metaTitle={`DigitalUz | ${t("instructor_curriculum_title", {
        ns: "seo",
      })}`}
      metaDescription={`${t("instructor_curriculum_description", {
        ns: "seo",
      })}`}
    >
      <CurriculumPageComponent />
    </Seo>
  );
};

export default withInstructorLayout(CurriculumPage);

export const getServerSideProps: GetServerSideProps<CoursesPageType> = async ({
  req,
  query,
}) => {
  const course = await InstructorService.getDetailedCourse(
    req.cookies.refresh,
    query.slug as string
  );

  console.log(query.slug);

  return {
    props: { course },
  };
};

interface CoursesPageType extends Record<string, unknown> {
  course: CourseType;
}
