import { GetServerSideProps } from "next";
import { useTranslation } from "react-i18next";
import { CourseType } from "src/interfaces/course.interface";
import { withAdminLayout } from "src/layouts/admin";
import Seo from "src/layouts/seo/seo";
import { AdminCoursesPageComponent } from "src/page-component";
import { AdminService } from "src/services/admin.service";

const Courses = () => {
  const { t } = useTranslation();
  return (
    <Seo
      metaTitle={`DigitalUz | ${t("admin_courses_title", { ns: "seo" })}`}
      metaDescription={`${t("admin_courses_description", { ns: "seo" })}`}
    >
      <AdminCoursesPageComponent />
    </Seo>
  );
};

export default withAdminLayout(Courses);

export const getServerSideProps: GetServerSideProps<
  AdminCoursesPageType
> = async () => {
  const courses = await AdminService.getAllCourses();

  return {
    props: { courses },
  };
};

interface AdminCoursesPageType extends Record<string, unknown> {
  courses: CourseType[];
}
