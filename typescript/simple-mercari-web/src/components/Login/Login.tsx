import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserType, RoleType } from "../../types";
import { AuthUserContextType, useAuthUserContext } from "../../providers";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Alert from '@mui/material/Alert';

const server = process.env.API_URL || "http://127.0.0.1:9000";

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
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));
export const Login: React.FC<{}> = () => {
  const initialState = {
    id: "",
    password: "",
  };
  const navigate = useNavigate();
  const authUser: AuthUserContextType = useAuthUserContext();
  const signin = (role: RoleType, uuid: number) => {
    const user: UserType = {
      name: values.id,
      uuid: uuid,
      role: role,
    };
    authUser.signin(user, () => {
      navigate("./content", { replace: true });
    });
  };
  const [values, setValues] = useState(initialState);
  const [is_success, setMode] = useState(true);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(values);
    const data = new FormData();
    data.append("user_id", values.id);
    data.append("password", values.password);

    fetch(server.concat("/login"), {
      method: "POST",
      mode: "cors",
      body: data,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }else{
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        console.log("POST success:", data);
        setMode(true)
        signin(RoleType.User, data.user_uuid);
      })
      .catch((error) => {
        setMode(false)
        console.error("POST error:", error);
      });
  };

  return (
    <div className="Login">
      <ThemeProvider theme={theme}>
        <Form onSubmit={onSubmit}>
          <input
            type="text"
            name="id"
            id="id"
            placeholder="id"
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="password"
            id="password"
            placeholder="password"
            onChange={onChange}
            required
          />
          <Button type="submit" variant="contained" size="small">
            Login
          </Button>
        </Form>
        {!is_success&&<Alert severity="error">Login failed</Alert>}
        <div>
          <Box sx={{ p: 1, gap: 1, display: "flex" }}>
            <Typography
              variant="body1"
              component="div"
              sx={{ m: 0.5, flexGrow: 1 }}
            >
              New here?
            </Typography>

            <Button type="button" variant="contained" size="small">
              Sign Up
            </Button>
          </Box>
        </div>
      </ThemeProvider>
    </div>
  );
};
