import React from "react";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#eff7ff",
    },
  },
});
//const placeholderImage = process.env.PUBLIC_URL + '/logo192.png';

export const Apply: React.FC<{}> = () => {
  return (
    <>
      <Stack sx={{width:200}} direction="column" spacing={1} justifyContent="center">
        <Typography
          variant="body1"
          align="center"
          component="div"
          sx={{ flexGrow: 1 }}
        >
         Someone wants to barter. Please send your answer.
        </Typography>
        <Typography
          variant="body1"
          align="center"
          component="div"
          sx={{ flexGrow: 1 }}
        >
         exchange item: <br/>Konjiki no GASH!!
        </Typography>
        <select  name="answer" id="answer" placeholder="answer" required>
          <option value="">
            --answer--</option>
          <option  key={1} value={1}>
            accept
          </option>
          <option key={2} value={2}>
            reject
          </option>
          <option key={3} value={3}>
            proposal
          </option>
        </select>
        <select
          name="exchange_items"
          id="exchange_items"
          placeholder="exchange_items"
          required
        >
          <option value="">--items--</option>
          <option key={1} value={1}>
            sample item 1
          </option>
          <option key={2} value={2}>
            sample item 2
          </option>
          <option key={3} value={3}>
            sample item 3
          </option>
        </select>
        <ThemeProvider theme={theme}>
        <Button type="submit" variant="contained" size="small">
          send answer
        </Button>
        </ThemeProvider>
      </Stack>
    </>
  );
};
