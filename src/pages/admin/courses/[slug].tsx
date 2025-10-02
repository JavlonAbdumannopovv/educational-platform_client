import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { CourseType } from "src/interfaces/course.interface";
import { withAdminLayout } from "src/layouts/admin";
import Seo from "src/layouts/seo/seo";
import { AdminDetailedCourseComponent } from "src/page-component";
import { AppService } from "src/services/app.service";

const AdminDetailedCoursePage = () => {
  const router = useRouter();

  return (
    <Seo metaTitle={`DigitalUz | ${router.query.slug} dashboard`}>
      <AdminDetailedCourseComponent />
      {/* hello {router.query.slug} */}
    </Seo>
  );
};

export default withAdminLayout(AdminDetailedCoursePage);

export const getServerSideProps: GetServerSideProps<
  AdminDetailedPageProps
> = async ({ query }) => {
  const course = await AppService.getDetailedCourse(query.slug as string);
  return {
    props: { course },
  };
};

interface AdminDetailedPageProps {
  course: CourseType;
}
