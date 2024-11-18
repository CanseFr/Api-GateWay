import React, {useEffect, useState} from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

export const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                console.log('Access Token:', accessToken);

                if (!accessToken) {
                    throw new Error('Token manquant, impossible de continuer.');
                }

                console.log('Envoi de la requête GET à http://localhost:3003/products');
                const response = await fetch('http://localhost:3003/products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${accessToken}`,
                    },
                });

                console.log('Réponse reçue:', response);

                if (!response.ok) {
                    throw new Error(`Erreur HTTP! Status: ${response.status}`);
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


    if (loading) {
        return <p>Loading pizzas...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Pizza List</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
