import { CourseType } from "src/interfaces/course.interface";
import {
  InstructorType,
  StudentType,
} from "src/interfaces/instructor.interface";

export interface InstructorIntialStateType {
  isLoading: boolean;
  error: string | null | unknown;
  courses: CourseType[];
  course: CourseType | null;
  instructors: InstructorType[];
  students: StudentType[];
}

export interface InstructorApplyBody {
  firstName: string;
  lastName: string;
  email: string;
  socialMedia: string;
  callback: () => void;
}
