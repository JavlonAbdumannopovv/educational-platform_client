import { GetServerSideProps } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { InstructorType } from "src/interfaces/instructor.interface";
import { withLayout } from "src/layouts/layout";
import Seo from "src/layouts/seo/seo";
import { InstructorsMainPageComponent } from "src/page-component";
import { AppService } from "src/services/app.service";

const InstructorsMainPage = () => {
  const { t } = useTranslation();

  return (
    <Seo
      metaTitle={`DigitalUz | ${t("admin_instructors_title", { ns: "seo" })}`}
      metaDescription={`${t("admin_instructors_description", { ns: "seo" })}`}
    >
      <InstructorsMainPageComponent />
    </Seo>
  );
};

export default withLayout(InstructorsMainPage);

export const getServerSideProps: GetServerSideProps<
  InstructorPageType
> = async ({ req }) => {
  const instructors = await AppService.getInstructors(
    req.cookies.i18next as string
  );

  return {
    props: { instructors },
  };
};

interface InstructorPageType extends Record<string, unknown> {
  instructors: InstructorType[];
}
