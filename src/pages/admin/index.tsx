import { GetServerSideProps } from "next";
import { withAdminLayout } from "src/layouts/admin";

const AdminPage = () => {
  return <div>AdminPage</div>;
};

export default withAdminLayout(AdminPage);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/admin/users",
      permanent: false,
    },
  };
};
