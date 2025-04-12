import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import get from 'lodash/get';

type CustomTextFieldProps = {
  name: string;
  label: string;
  required?: boolean;
  mask?: (value: string) => string;
  maxLength?: number;
  minLength?: number;
} & TextFieldProps;

export const CustomTextField = ({ name, label, required = false, mask, maxLength, minLength, ...rest }: CustomTextFieldProps) => {
  const { control, formState: { errors } } = useFormContext();

  const fieldError = get(errors, name)?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={`${label}${required ? "*" : ""}`}
          fullWidth
          error={!!fieldError}
          helperText={fieldError}
          size='small'
          slotProps={{
            htmlInput: {
              'maxLength': maxLength,
              'minLength': minLength
            }
          }}
          onChange={(e) => {
            const maskedValue = mask ? mask(e.target.value) : e.target.value;
            field.onChange(maskedValue);
          }}
          {...rest}
        />
      )}
    />
  );
};
