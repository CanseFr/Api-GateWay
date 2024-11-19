import {HttpStatus, Injectable} from '@nestjs/common';
import {Request} from 'express';
import axios from 'axios';
import {getUrlWithPort, getValidateToken} from "./common/tool";

@Injectable()
export class ProxyService {
    async processRequest(req: Request) {

        const authHeader = req.headers.authorization;

        try {
            const authResponse = await getValidateToken(authHeader);

            if (authResponse.status === HttpStatus.OK) {
                try {
                    const urlAndPort = getUrlWithPort(req.url)
                    const method = req.method.toLowerCase()

                    const productResponse = await axios[method](`http://localhost:${urlAndPort.port}${req.url}`, req.body);
                    return {
                        status: productResponse.status,
                        data: productResponse.data,
                    };

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






