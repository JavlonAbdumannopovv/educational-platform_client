import { Divider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { InstructorManageCourse } from 'src/components';
import { SubmitValuesInterface } from 'src/components/instructor-manage-course/instructor-manage-course.props';
import SectionTitle from 'src/components/section-title/section-title';

const EditDetailedCoursePageComponent = () => {
	const router = useRouter();

	const onSubmit = (data: SubmitValuesInterface) => {
		console.log(data);
	};

	return (
		<>
			<SectionTitle title={`Edit course ${router.query.slug}`} subtitle={''} />
			<Divider mt={5} />

			<InstructorManageCourse titleBtn='Edit course' submitHandler={onSubmit} />
		</>
	);
};

export default EditDetailedCoursePageComponent;
