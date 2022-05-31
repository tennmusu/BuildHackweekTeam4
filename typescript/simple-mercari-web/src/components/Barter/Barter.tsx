import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#eff7ff",
    },
  },
});
const Form = styled("form")(({ theme }) => ({
  display: "flex",
  gap: 5,
  marginBottom: 5,
  [theme.breakpoints.up("sm")]: {
    maxHeight: 30,
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const Barter: React.FC<{}> = () => {
  return (
    <>
      <Form>
        <select
          name="exchange_items"
          id="exchange_items"
          placeholder="exchange_items"
          required
        >
          <option value="">--items--</option>
          <option key={1} value={1}>
            Konjiki no GASH!!
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
            exchange
          </Button>
        </ThemeProvider>
      </Form>
    </>
  );
};
