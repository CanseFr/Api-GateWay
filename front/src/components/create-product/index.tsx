import Grid from "@mui/material/Grid2";
import {Accordion, AccordionDetails, AccordionSummary, Button, TextField} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import {Product} from "../../types";


export const CreateProduct = () => {

    const [product, setProduct] = React.useState<Product>({price: 0, title: "", description: ""});

    const handleCreateProduct = () => {
        const accessToken = localStorage.getItem('accessToken');

        fetch('http://localhost:3003/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            body: JSON.stringify(product),
        });
    }

    const handleChange = (field: keyof Product) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct((prevProd) => ({
            ...prevProd,
            [field]: field === "price" ? Number(event.target.value) : event.target.value,
        }));
    };

    return (<Grid>
        <Accordion>
            <AccordionSummary
                sx={{backgroundColor: '#0982'}}
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                Creation
            </AccordionSummary>
            <AccordionDetails>


                {/*<form onSubmit={handleCreateProduct}>*/}
                <Grid container flexDirection="column" spacing={2} sx={{backgroundColor: "white", borderRadius: "15px", padding: "50px"}}>
                    <TextField onChange={handleChange("title")} label="Titre" variant="outlined"/>
                    <TextField onChange={handleChange("description")} label="Description" variant="outlined"/>
                    <TextField onChange={handleChange("price")} label="Prix" variant="outlined"/>
                    <Button type="submit" onClick={handleCreateProduct}>Créer</Button>
                </Grid>
                {/*</form>*/}

            </AccordionDetails>
        </Accordion>

    </Grid>)
}