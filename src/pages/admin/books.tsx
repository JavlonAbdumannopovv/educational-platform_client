import { GetServerSideProps } from "next";
import { useTranslation } from "react-i18next";
import { BooksType } from "src/interfaces/books.interface";
import { withAdminLayout } from "src/layouts/admin";
import Seo from "src/layouts/seo/seo";
import { AdminBooksPageComponent } from "src/page-component";
import { BooksService } from "src/services/books.service";

const Books = () => {
  const { t } = useTranslation();
  return (
    <Seo
      metaTitle={`DigitalUz | ${t("admin_books_title", { ns: "seo" })}`}
      metaDescription={`${t("admin_books_description", { ns: "seo" })}`}
    >
      <AdminBooksPageComponent />
    </Seo>
  );
};

export default withAdminLayout(Books);

export const getServerSideProps: GetServerSideProps<
  BooksPageType
> = async () => {
  const books = await BooksService.get();

  return {
    props: { books },
  };
};

interface BooksPageType extends Record<string, unknown> {
  books: BooksType[];
}
