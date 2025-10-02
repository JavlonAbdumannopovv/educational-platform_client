import { FC, ReactNode, useEffect } from "react";
import { useActions } from "src/hooks/useActions";
import { CourseType } from "src/interfaces/course.interface";
import { StudentType } from "src/interfaces/instructor.interface";

interface Props {
  children: ReactNode;
  courses: CourseType[];
  course: CourseType;
  students: StudentType[];
}

const InstructorProvider: FC<Props> = ({
  children,
  course,
  courses,
  students,
}): JSX.Element => {
  const { instructorAllCourses, instructorDetailedCourse, getStudents } =
    useActions();

  useEffect(() => {
    if (courses?.length) {
      instructorAllCourses(courses);
    } else {
      instructorAllCourses([]);
    }
    if (course) {
      instructorDetailedCourse(course);
    }
    if (students) {
      getStudents(students);
    }
  }, [courses, course, students]);

  return <>{children}</>;
};

export default InstructorProvider;
