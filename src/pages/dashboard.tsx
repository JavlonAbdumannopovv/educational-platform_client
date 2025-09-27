import { withLayout } from "src/layouts/layout";
import { UserDashboardPageComponent } from "src/page-component";

const Dashboard = () => {
  return <UserDashboardPageComponent />;
};

export default withLayout(Dashboard);
