import { FormProvider as Form } from "react-hook-form";
import { IFormProviderProps } from "../../types";

//This is a React component called "FormProvider" that provides a context for forms using the React Hook Form library. It takes in props of type "IFormProviderProps", which includes "children", "methods", and "onSubmit".
function FormProvider(props: IFormProviderProps) {
  const { children, methods, onSubmit } = props;
  return (
    <Form {...methods}>
      <form noValidate onSubmit={onSubmit}>
        {children}
      </form>
    </Form>
  );
}

export default FormProvider;
