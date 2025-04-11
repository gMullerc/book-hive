import { Button, ButtonProps } from '@mui/material';

type Props = ButtonProps & {
  variant?: 'contained' | 'outlined';
};

export const CustomActionButton = ({ variant = 'contained', ...props }: Props) => {
  return (
    <Button
      fullWidth
      variant={variant}
      {...props}
    />
  );
};
