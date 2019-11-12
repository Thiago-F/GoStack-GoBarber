import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
    // pegando token
    const authHeader = req.headers;

    if (!authHeader) {
        return res.status(400).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
        // verificando se o token é valido usando o metodo verify do jwt com o promisify
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        if (!decoded) {
            return res.status(401).json({ error: 'Create token error' });
        }

        req.userId = decoded.id;

        return next();
    } catch (e) {
        return res.status(401).json({ error: 'Token Invalid' });
    }
};
