import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid2";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import ClearIcon from '@mui/icons-material/Clear';
import {CreateProduct} from "../../components/create-product";
// import {BasketProduct} from "../../components/basket-product";
import {Product} from "../../types";


export const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [basket, setBasket] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const nav = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');

                if (!accessToken) {
                    throw new Error('Token manquant, impossible de continuer.')
                }

                const response = await fetch('http://localhost:3003/products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP! Status: ${response.status}`)
                }

                return await response.json();
            } catch (err: any) {
                console.error('Erreur lors de la récupération des produits:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts().then(r => setProducts(r));
    }, []);

    const handleDeleteProduct = async (id: number) => {
        console.log(id);
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                throw new Error('Token manquant, impossible de continuer.')
            }

            const response = await fetch(`http://localhost:3003/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! Status: ${response.status}`)
            }

        } catch (err: any) {
            console.error('Erreur lors de la récupération des produits:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }


    if (loading) {
        return <p>Loading pizzas...</p>;
    }

    if (error) {
        return <Grid padding={1} mt={30} textAlign="center" sx={{backgroundColor: '#0982', borderRadius: "15px"}}>
            <p>Error: {error}</p>
            <Button onClick={() => nav("/")}>Retourner au login</Button>
        </Grid>
    }

    return (
        <Grid>

            <Grid container justifyContent="space-between">
                <Grid>

                    <h1>Pizza List</h1>
                    <ul>
                        {products.map((product) => (
                            <Grid container alignItems="center" key={product.id}>

                                <Grid>
                                    <li key={product.id}>
                                        <h2>{product.title}</h2>
                                        <p>{product.description}</p>
                                        <p>Prix: {product.price} €</p>
                                    </li>
                                </Grid>
                                <Grid>
                                    <Button color="error" onClick={() => handleDeleteProduct(product.id!)}><ClearIcon/></Button>
                                </Grid>
                                {/*<Grid>*/}
                                {/*    <Button color="secondary" onClick={() => setBasket(...basket, )}><ClearIcon/></Button>*/}
                                {/*</Grid>*/}

                            </Grid>
                        ))}
                    </ul>
                </Grid>
                <Grid>
                    <Button onClick={() => localStorage.removeItem('accessToken')} color="error">
                        <AutoDeleteIcon/>
                    </Button>
                </Grid>
            </Grid>

            <CreateProduct/>
            {/*<BasketProduct  basket={basket} setBasket={setBasket}/>*/}
        </Grid>
    );
};
