import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type CustomTextFieldProps = {
  name: string;
  label: string;
} & TextFieldProps;

export const CustomTextField = ({ name, label, ...rest }: CustomTextFieldProps) => {
  const { control, formState: { errors } } = useFormContext();

  const fieldError = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          error={!!fieldError}
          helperText={fieldError}
          {...rest}
        />
      )}
    />
  );
};
