import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import { useActions } from "src/hooks/useActions";
import { CourseType } from "src/interfaces/course.interface";
import { DashboardPageComponent } from "src/page-component";
import { AppService } from "src/services/app.service";

const Index = ({ course }: MainPageProps) => {
  const { getCourse } = useActions();

  useEffect(() => {
    getCourse(course);
  }, [course]);

  return <DashboardPageComponent />;
};

export default Index;

export const getServerSideProps: GetServerSideProps<MainPageProps> = async ({
  query,
}) => {
  const course = await AppService.getDetailedCourse(query.slug as string);

  return {
    props: { course },
  };
};

interface MainPageProps {
  course: CourseType;
}
