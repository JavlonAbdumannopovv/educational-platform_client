import { CourseType } from "src/interfaces/course.interface";
import { StudentType } from "src/interfaces/instructor.interface";

export interface InstructorProvideProps {
  courses: CourseType[];
  course: CourseType;
  students: StudentType[];
}
