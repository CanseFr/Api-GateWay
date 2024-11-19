import Grid from "@mui/material/Grid2";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import {Product} from "../../types";

export const BasketProduct = () => {

    const [products, setProducts] = React.useState<Product[]>([]);

    const handleDeleteUnit = () => {

    }

    const handleDeleteAll = () => {

    }

    const handleBuy = () => (event: React.ChangeEvent<HTMLInputElement>) => {

    };

    return (<Grid>
        <Accordion>
            <AccordionSummary
                sx={{backgroundColor: '#0999'}}
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                Panier
            </AccordionSummary>
            <AccordionDetails>


                {/*<form onSubmit={handleCreateProduct}>*/}
                <Grid container flexDirection="column" spacing={2} sx={{backgroundColor: "white", borderRadius: "15px", padding: "50px"}}>
                    {/*<TextField onChange={handleChange("title")} label="Titre" variant="outlined"/>*/}
                    {/*<TextField onChange={handleChange("description")} label="Description" variant="outlined"/>*/}
                    {/*<TextField onChange={handleChange("price")} label="Prix" variant="outlined"/>*/}
                    {/*<Button type="submit" onClick={handleCreateProduct}>Créer</Button>*/}
                </Grid>
                {/*</form>*/}

            </AccordionDetails>
        </Accordion>

    </Grid>)
}