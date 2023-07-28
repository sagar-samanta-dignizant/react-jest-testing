import { Helmet } from "react-helmet-async";
import { IPageProps } from "../types";

const Page = (props: IPageProps) => {
  const { title, meta, children } = props;

  const pageTitle = () => {
    if (!title || title === "Login") {
      return "CADcog | Business Meetings & Collaboration in VR";
    }

    return `${title} | CADcog - Business Meetings & Collaboration in VR`;
  };

  //This is a component called Page that renders a React Helmet component and children components. The React Helmet component is used to update the HTML head tag and set the page title dynamically based on the title prop passed to it. It also allows additional meta tags to be passed in via the meta prop.
  return (
    <>
      <Helmet>
        <title>{pageTitle()}</title>
        {meta}
      </Helmet>
      {children}
    </>
  );
};

export default Page;
