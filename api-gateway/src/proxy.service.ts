import {HttpStatus, Injectable} from '@nestjs/common';
import {Request} from 'express';
import axios from 'axios';

@Injectable()
export class ProxyService {
    async processRequest(req: Request) {
        const authHeader = req.headers.authorization;

        // AUTH
        try {
            const authResponse = await axios.post('http://localhost:3001/auth/validate-token', {}, {
                headers: {'Authorization': authHeader},
            });

            if (authResponse.status === HttpStatus.OK) {

                // SERVICE
                try {

                    //  - get info
                    const urlAndPort = getUrlWithPort(req.url)
                    const method = req.method.toLowerCase();

                    if(method === 'post') {
                        if(req.body){
                            console.log("___ICI___")
                            await axios[method](`http://localhost:${urlAndPort.port}${req.url}`,
                               req.body,
                            );

                        }
                    } else {

                        // - process le machin
                        const productResponse = await axios[method](`http://localhost:${urlAndPort.port}${req.url}`);
                    return {
                        status: productResponse.status,
                        data: productResponse.data,
                    };
                    }



                } catch (error) {
                    throw new Error(`Erreur requête vers ${req.url}: ${error.message}`);
                }
            } else {
                throw new Error('Token non valide');
            }
        } catch (error) {
            throw new Error(`Erreur lors de la vérification du token: ${error.message}`);
        }
    }
}

interface UrlPortType {
    port: number;
    url: string;
}

// centraliser dans un point .env ?
const urlsWithPorts: UrlPortType[] = [
    {port: 3002, url: '/products'},
    {port: 3011, url: '/clients'},
    {port: 3022, url: '/livreurs'},
]

const getUrlWithPort = (req: string) => {
    return urlsWithPorts.find((u) => req.startsWith(u.url));
}
