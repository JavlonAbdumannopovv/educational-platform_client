import { Divider, Grid } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { AdminCourseCard, ChartData, ErrorAlert } from "src/components";
import { courseusers } from "src/config/constants";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";

<Divider />;

const CoursesPageComponent = () => {
  const { courses } = useTypedSelector((state) => state.admin);
  const { error } = useTypedSelector((state) => state.admin);
  const { clearAdminError } = useActions();
  const { t } = useTranslation();

  return (
    <>
      <ChartData
        dataArr={courseusers}
        title={t("courses_section_title", { ns: "admin" })}
        subtitle={t("courses_section_descr", { ns: "admin" })}
      />
      <>
        {error && (
          <ErrorAlert title={error as string} clearHandler={clearAdminError} />
        )}
      </>
      <Grid gridTemplateColumns={"repeat(3, 1fr)"} gap={4}>
        {courses.map((c) => (
          <AdminCourseCard key={c._id} course={c} />
        ))}
      </Grid>
    </>
  );
};

export default CoursesPageComponent;
