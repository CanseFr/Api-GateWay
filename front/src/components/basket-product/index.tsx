import Grid from "@mui/material/Grid2";
import {Accordion, AccordionDetails, AccordionSummary, Button, TextField} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, {Dispatch, SetStateAction, useState} from "react";
import {Product} from "../../types";
import CloseIcon from '@mui/icons-material/Close';

interface BasketProductProps {
    basket: Product[];
    setBasket: Dispatch<SetStateAction<Product[]>>;
}

export const BasketProduct: React.FC<BasketProductProps> = ({basket, setBasket}) => {

    const [name, setName] = useState("");
    const [adress, setAdress] = useState("");

    const handleDeleteUnit = (index: number) => {
        setBasket((prevBasket) => {
            const newBasket = [...prevBasket];
            newBasket.splice(index, 1);
            return newBasket;
        });
    }

    const handleDeleteAll = () => {
        setBasket([])
    }

    const handleBuy =() => {
        const accessToken = localStorage.getItem('accessToken');

        fetch('http://localhost:3003/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            body: JSON.stringify({
                amount: basket.reduce((total, item) => total + item.price, 0),
                name,
                adress,
            }),
        })
            .then(() => {
                setBasket([]);
            })
            .catch(error => {
                console.error('Error:', error);
            })
    };

    return (<Grid>
        <Accordion>
            <AccordionSummary
                sx={{backgroundColor: '#0999'}}
                expandIcon={<ExpandMoreIcon/>}
            >
                Panier
            </AccordionSummary>
            <AccordionDetails>
                {basket.length !== 0 ?
                    basket.map((item, index) => (
                        <Grid container key={index}>
                            <Grid key={item.id} container alignItems="center" spacing={1} width="20%" borderRadius="15px" m={1} border="1px solid black">
                                <p>{item.title}</p>
                                <p>{item.price} €</p>
                            </Grid>
                            <Grid>
                                <Button color="error" onClick={() => handleDeleteUnit(index)}><CloseIcon/></Button>
                            </Grid>
                        </Grid>
                    )) :
                    <p>Aucun article dans votre panier</p>
                }
                <Grid container justifyContent="space-between">
                    <Grid>
                        Total : {basket.reduce((total, item) => total + item.price, 0)} €
                    </Grid>
                    <Grid>
                        <Button onClick={handleBuy}>Payer</Button>
                    </Grid>
                    <Grid>

                        <Button color="error" onClick={handleDeleteAll}>Supprimer panier</Button>
                    </Grid>
                </Grid>
                <Grid>
                    <Grid>
                        <TextField onChange={(e) => setName(e.target.value)}
                                   label="Nom" variant="outlined"/>
                        <TextField onChange={(e) => setAdress(e.target.value)}
                                   label="Adresse" variant="outlined"/>
                    </Grid>
                    <Grid>
                    </Grid>

                </Grid>
            </AccordionDetails>
        </Accordion>

    </Grid>)
}

