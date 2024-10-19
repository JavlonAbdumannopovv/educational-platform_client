<<<<<<< HEAD
=======
import { GetServerSideProps } from 'next';
>>>>>>> master
import { withInstructorLayout } from 'src/layouts/instructor';

const InstructorPage = () => {
	return <div>InstructorPage</div>;
};

export default withInstructorLayout(InstructorPage);
<<<<<<< HEAD
=======

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		redirect: {
			destination: '/instructor/students',
			permanent: false,
		},
	};
};
>>>>>>> master
