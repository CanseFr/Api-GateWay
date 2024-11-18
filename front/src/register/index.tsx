import Grid from "@mui/material/Grid2";
import {Button, TextField, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {UserLogin} from "../login";

export const Register = () => {
    const [user, setUser] = React.useState<UserLogin>({email: "", password: ""});
    const [alert, setAlert] = React.useState<String>();

    const nav = useNavigate();

    const handleSendRegister = (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                nav("/")
            })
            .catch((error) => {
                console.error("Error creating user:", error);
            });
    };

    const handleChange = (field: keyof UserLogin) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prevUser) => ({
            ...prevUser,
            [field]: event.target.value,
        }));
    };
    return (
        <div className="App">
            <Typography component="h1" variant="h5">Register</Typography>
            {alert && <Typography color="error">Erreur durant l'inscription</Typography>}
            <header className="App-header">
                <form onSubmit={handleSendRegister}>
                    <Grid container flexDirection="column" spacing={2} sx={{backgroundColor: "white", borderRadius: "15px", padding: "50px"}}>
                        <TextField onChange={handleChange("email")} label="Email" variant="outlined"/>
                        <TextField onChange={handleChange("password")} label="Password" variant="outlined" type="password"/>
                        <Button type="submit" onClick={handleSendRegister}>Register</Button>
                        <Button onClick={() => nav("/")}>Back To Login</Button>
                    </Grid>
                </form>
            </header>
        </div>
    )
}