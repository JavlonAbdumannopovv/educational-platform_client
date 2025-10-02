import { GetServerSideProps } from "next";
import { useTranslation } from "react-i18next";
import { UserType } from "src/interfaces/user.interface";
import { withAdminLayout } from "src/layouts/admin";
import Seo from "src/layouts/seo/seo";
import { UserPageComponent } from "src/page-component";
import { AdminService } from "src/services/admin.service";

const Users = () => {
  const { t } = useTranslation();
  return (
    <Seo
      metaTitle={`DigitalUz | ${t("admin_users_title", { ns: "seo" })}`}
      metaDescription={`${t("admin_users_description", { ns: "seo" })}`}
    >
      <UserPageComponent />
    </Seo>
  );
};

export default withAdminLayout(Users);

export const getServerSideProps: GetServerSideProps<UserPageType> = async ({
  req,
}) => {
  const users = await AdminService.getUsers("10", req.cookies.refresh);

  return {
    props: { users },
  };
};

interface UserPageType extends Record<string, unknown> {
  users: UserType[];
}
