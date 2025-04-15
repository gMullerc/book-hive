import { ReactNode } from "react";
import { CustomAppBar } from "../components/CustomAppBar";
import Box from "@mui/material/Box";

interface DefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <CustomAppBar />
      <Box component="main" sx={{ mt: 2, p: 2 }}>
        {children}
      </Box>
    </>
  );
};
