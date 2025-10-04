import { GetServerSideProps } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { InstructorType } from "src/interfaces/instructor.interface";
import { withLayout } from "src/layouts/layout";
import Seo from "src/layouts/seo/seo";
import { InstructorsMainDetailedPageComponent } from "src/page-component";
import { AppService } from "src/services/app.service";

const InstructorDetailedPage = ({instructor}) => {
  const { t } = useTranslation();

  return (
    <Seo
      metaTitle={`DigitalUz | ${instructor.fullName}`}
      metaDescription={`${t("admin_instructors_description", { ns: "seo" })}`}
    >
      <InstructorsMainDetailedPageComponent />
    </Seo>
  );
};

export default withLayout(InstructorDetailedPage);

export const getServerSideProps: GetServerSideProps<
  InstructorPageType
> = async ({ query }) => {
  const instructor = await AppService.getDetailedInstructor(
    query.slug as string
  );

  return {
    props: { instructor },
  };
};

interface InstructorPageType extends Record<string, unknown> {
  instructor: InstructorType;
}
