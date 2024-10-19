import { NextPage } from 'next';
import { withInstructorLayout } from 'src/layouts/instructor';
<<<<<<< HEAD

const DraftCourses: NextPage = () => {
	return <div>DraftCourses</div>;
=======
import { InstructorDraftCourseComponent } from 'src/page-component';

const DraftCourses: NextPage = () => {
	return <InstructorDraftCourseComponent />;
>>>>>>> master
};

export default withInstructorLayout(DraftCourses);
