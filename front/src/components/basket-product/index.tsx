import Grid from "@mui/material/Grid2";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, {Dispatch, SetStateAction} from "react";
import {Product} from "../../types";
interface BasketProductProps {
    basket: Product[];
    setBasket: Dispatch<SetStateAction<Product[]>>;
}
const BasketProduct: React.FC<BasketProductProps> = ({ basket, setBasket }) => {


    const handleDeleteUnit = () => {

    }

    const handleDeleteAll = () => {
        setBasket([])
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

                {basket ?

                    basket.map((product) => (
                        <Grid>
                            <p>{product.title}</p>
                            <p>{product.price}</p>
                        </Grid>
                    )) :
                    <p>Aucun article dans votre panier</p>
                }
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