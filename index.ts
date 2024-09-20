import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken'; 
import apiKirjatRouter from './routes/apiKirjat';
import apiAuthRouter from './routes/apiAuth';
import dotenv from 'dotenv';

dotenv.config();

const app : express.Application = express();

const portti : number = Number(process.env.PORT);

// Varmistetaan, että token on olemassa ja täsmää
const checkToken = (req : express.Request, res : express.Response, next : express.NextFunction) => {

    try {

        let token : string = req.headers.authorization!.split(" ")[1];

        res.locals.kayttaja = jwt.verify(token, String(process.env.ACCESS_TOKEN_KEY));

        next();

    } catch (e: any) {
        res.status(401).json({});
    }

};

app.use(express.static(path.resolve(__dirname, "public")));

app.use("/api/auth", apiAuthRouter);

// Reitissä tokenin tarkastus
app.use("/api/kirjat", checkToken, apiKirjatRouter);

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi porttiin : ${portti}`);

});