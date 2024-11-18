import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import Grid from "@mui/material/Grid2";
import {Button, TextField} from "@mui/material";


interface UserLogin {
    email: string;
    password: string;
}

export const Login = () => {
    const [user, setUser] = React.useState<UserLogin>({ email: "", password: "" });

    const handleSendLogin = (event?: React.FormEvent) => {
        // Effectuer la requête
        if (event) event.preventDefault();
        console.log(user);
    };

    const handleChange = (field: keyof UserLogin) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prevUser) => ({
            ...prevUser,
            [field]: event.target.value,
        }));
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" width={150}/>
                <form onSubmit={handleSendLogin}>
                    <Grid container flexDirection="column" spacing={2} sx={{backgroundColor: "white", borderRadius: "15px", padding: "50px"}}>
                        <TextField onChange={handleChange("email")} label="Email" variant="outlined"/>
                        <TextField onChange={handleChange("password")} label="Password" variant="outlined" type="password"/>
                        <Button type="submit" onClick={handleSendLogin}>Login</Button>
                    </Grid>
                </form>
            </header>
        </div>
    );
}



