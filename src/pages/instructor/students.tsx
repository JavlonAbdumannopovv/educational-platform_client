import { GetServerSideProps, NextPage } from "next";
import { StudentType } from "src/interfaces/instructor.interface";
import { withInstructorLayout } from "src/layouts/instructor";
import { InstructorStudentsPageComponent } from "src/page-component";
import { AuthService } from "src/services/auth.service";
import { InstructorService } from "src/services/instructor.service";

const Students: NextPage = () => {
  return <InstructorStudentsPageComponent />;
};

export default withInstructorLayout(Students);

export const getServerSideProps: GetServerSideProps<StudentsPageType> = async ({
  req,
}) => {
  const instructor = await AuthService.checkInstructor(req.cookies.refresh);
  const students = await InstructorService.getStudents(
    req.cookies.refresh as string,
    "10"
  );

  if (!instructor) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { students },
  };
};

interface StudentsPageType extends Record<string, unknown> {
  students: StudentType[];
}
