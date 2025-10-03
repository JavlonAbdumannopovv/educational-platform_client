import { GetServerSideProps } from "next";
import { useTranslation } from "react-i18next";
import { InstructorType } from "src/interfaces/instructor.interface";
import { withAdminLayout } from "src/layouts/admin";
import Seo from "src/layouts/seo/seo";
import { InstructorPageComponent } from "src/page-component";
import { AdminService } from "src/services/admin.service";

const Instructor = () => {
  const { t } = useTranslation();
  return (
    <Seo
      metaTitle={`DigitalUz | ${t("admin_instructors_title", { ns: "seo" })}`}
      metaDescription={`${t("admin_instructors_description", { ns: "seo" })}`}
    >
      <InstructorPageComponent />
    </Seo>
  );
};

export default withAdminLayout(Instructor);

export const getServerSideProps: GetServerSideProps<
  InstructorPageType
> = async ({ req }) => {
  const instructors = await AdminService.getAllInstructors(req.cookies.refresh, );

  return {
    props: { instructors },
  };
};

interface InstructorPageType extends Record<string, unknown> {
  instructors: InstructorType[];
}
