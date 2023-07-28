import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

//The component takes in props such as "name" and "label" to customize the checkbox field.
function FormCheckbox({ name, label, ...rest }) {
  const { control } = useFormContext();
  return (
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox {...field} checked={field.value} {...rest} />
          )}
        />
      }
      {...rest}
    />
  );
}

export default FormCheckbox;
