import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";
import { useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong.";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Page not found!";
    message = "The page you requested could not be found.";
  }

  return (
    <>
    <MainNavigation />
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
    </>
  );
}

export default ErrorPage;
