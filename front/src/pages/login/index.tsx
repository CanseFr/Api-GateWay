import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import Grid from "@mui/material/Grid2";
import {Button, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";


export interface UserLogin {
    email: string;
    password: string;
}

export const Login = () => {
    const [user, setUser] = React.useState<UserLogin>({email: "", password: ""});
    const nav = useNavigate();


    const handleSendLogin = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data && data.accessToken) {
                localStorage.setItem("accessToken", `Bearer ${data.accessToken}`);

                nav("/products");
            } else {
                console.error("No token found in response");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const handleChange = (field: keyof UserLogin) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prevUser) => ({
            ...prevUser,
            [field]: event.target.value,
        }));
    };

    return (
        <div className="App">
            <Typography component="h1" variant="h5">Login</Typography>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" width={150}/>
                <form onSubmit={handleSendLogin}>
                    <Grid container flexDirection="column" spacing={2} sx={{backgroundColor: "white", borderRadius: "15px", padding: "50px"}}>
                        <TextField onChange={handleChange("email")} label="Email" variant="outlined"/>
                        <TextField onChange={handleChange("password")} label="Password" variant="outlined" type="password"/>
                        <Button type="submit" onClick={handleSendLogin}>Login</Button>
                        <Button onClick={() => nav("register")}>Register</Button>
                    </Grid>
                </form>
            </header>
        </div>
    );
}



