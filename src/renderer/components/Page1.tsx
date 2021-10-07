import React, { ReactElement } from "react";
import { Box, Typography } from "@material-ui/core";
export interface Page1Page1Props {}

function Page1(props: Page1Page1Props): ReactElement | null {
  return (
    <Box>
      <Typography>THIS IS PAGE 1</Typography>
    </Box>
  );
}
export default Page1;
