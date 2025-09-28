import { UserAllCoursesCard } from "src/components";

const MyCourses = ({courses}) => {
  return (
    <>
      {courses.map((course) => (
        <UserAllCoursesCard course={course} />
      ))}
    </>
  );
};

export default MyCourses;
