import { NextPage } from 'next';
import { withInstructorLayout } from 'src/layouts/instructor';
<<<<<<< HEAD

const Revenue: NextPage = () => {
	return <div>Revenue</div>;
=======
import { RevenuePageComponent } from 'src/page-component';

const Revenue: NextPage = () => {
	return <RevenuePageComponent />;
>>>>>>> master
};

export default withInstructorLayout(Revenue);
