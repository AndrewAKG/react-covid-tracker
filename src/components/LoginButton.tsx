import { Button } from "@mui/material";
import { lock } from "../config/Auth0";

const LoginButton = () => {
    return <Button variant="contained" onClick={() => lock.show()}>Login</Button>
};

export default LoginButton;