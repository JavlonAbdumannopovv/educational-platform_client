import { FC, ReactNode, useEffect } from "react";
import { useActions } from "src/hooks/useActions";
import { BooksType } from "src/interfaces/books.interface";
import { CourseType } from "src/interfaces/course.interface";
import { InstructorType } from "src/interfaces/instructor.interface";

interface Props {
  children: ReactNode;
  courses: CourseType[];
  course: CourseType;
  instructors: InstructorType[];
  books: BooksType[];
  instructor: InstructorType;
}

const AppProvider: FC<Props> = ({
  children,
  course,
  courses,
  instructors,
  instructor,
  books,
}): JSX.Element => {
  const {
    getCourses,
    getCourse,
    getInstructors,
    getBooks,
    getDetailedInstructor,
  } = useActions();

  useEffect(() => {
    if (courses?.length) {
      getCourses(courses);
    } else {
      getCourses([]);
    }
    if (instructors?.length) {
      getInstructors(instructors);
    } else {
      getInstructors([]);
    }
    if (instructor) {
      getDetailedInstructor(instructor);
    } else {
      getDetailedInstructor({} as InstructorType);
    }
    if (course) {
      getCourse(course);
    }
    if (books?.length) {
      getBooks(books);
    } else {
      getBooks([]);
    }
  }, [courses, course, books, instructors, instructor]);

  return <>{children}</>;
};

export default AppProvider;
