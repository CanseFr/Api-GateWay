import { Injectable, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthValidationService {
    async validateToken(token: string): Promise<boolean> {
        try {
            const response = await axios.post('http://localhost:3001/validate-token', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.status === HttpStatus.OK;
        } catch (error) {
            console.error('Erreur lors de la validation du token:', error.message);
            return false;
        }
    }
}
