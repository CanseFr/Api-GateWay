import React, {useEffect, useState} from "react";
import {io} from 'socket.io-client';
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const socket = io('http://localhost:3002');

export const DeliveryProduct = () => {

    const [alertDelivery, setAlertDelivery] = useState("");

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to the Socket.IO server');
        });

        socket.on('alert', (data: any) => {
            console.log('Received alert:', data);
            setAlertDelivery(data)

            // Traiter l'alerte (afficher à l'utilisateur, etc.)
        });

        return () => {
            socket.off('alert');
            socket.off('connect');
        };
    }, []);

    return (
        <Accordion>
            <AccordionSummary
                sx={{backgroundColor: '#0899'}}
                expandIcon={<ExpandMoreIcon/>}
            >
                Livraison
            </AccordionSummary>
            <AccordionDetails>

                {alertDelivery ? (<p>{alertDelivery}</p>) : (<p>Aucune livraison pour le moment</p>)}

            </AccordionDetails>
        </Accordion>
    );
}