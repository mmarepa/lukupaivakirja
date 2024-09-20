import express from 'express';
import { Virhe } from '../errors/virhekasittelija';
import { PrismaClient } from '@prisma/client';

const prisma : PrismaClient = new PrismaClient();

const apiKirjatRouter : express.Router = express.Router();

apiKirjatRouter.use(express.json());

// Haetaan kirjat
apiKirjatRouter.get("/", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    
    try {
        // Haetaan kaikki kirjautuneen käyttäjän lisäämät kirjat / rajataan hakusanan mukaan
        res.json(await prisma.kirja.findMany({          
            where : {
                kayttajaId : Number(res.locals.kayttaja.id),
                OR: [
                    { kirjailijanEtunimi : { startsWith: (req.query.hakusana) ? String(req.query.hakusana) : "%" }
                    },
                    { kirjailijanSukunimi : { startsWith: (req.query.hakusana) ? String(req.query.hakusana) : "%" }
                    },
                    { kirjanNimi : { startsWith: (req.query.hakusana) ? String(req.query.hakusana) : "%" }
                    }
                ]
                

            },
            // Järjestetään kirjat valitun ehdon mukaan
            orderBy : 
            (req.query.ehto === "arvostelu")
            ? { arvostelu : "desc"}
            : (req.query.ehto === "kirjailijanNimi")
                ? { kirjailijanSukunimi : "asc"}
                : (req.query.ehto === "kirjanNimi")
                    ? { kirjanNimi : "asc"}
                    : { kirjanNimi : "asc"} // Oletuksena aakkosjärjestyksessä kirjan nimen perusteella
        }));

    } catch (e : any) {
        next(new Virhe());
    }
})

// Lisätään uusi kirja
apiKirjatRouter.post("/", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    if (req.body.kirjanNimi.length > 0 && req.body.kirjailijanEtunimi.length > 0 && req.body.kirjailijanSukunimi.length) {

        try {
            // Lisätään uusi rivi tauluun kirja
            await prisma.kirja.create({
                data : {
                    kirjanNimi : req.body.kirjanNimi,
                    kirjailijanEtunimi : req.body.kirjailijanEtunimi,
                    kirjailijanSukunimi : req.body.kirjailijanSukunimi,
                    arvostelu : Number(req.body.arvostelu),
                    sanallinenArvostelu : req.body.sanallinenArvostelu,
                    kayttajaId : Number(res.locals.kayttaja.id)
                }
            });

            // Haetaan kaikki käyttäjän kirjat
            res.json(await prisma.kirja.findMany({          
                where : {
                    kayttajaId : Number(res.locals.kayttaja.id) 
                },

                // Järjestetään
                orderBy : 
                (req.query.ehto === "arvostelu")
                ? { arvostelu : "desc"}
                : (req.query.ehto === "kirjailijanNimi")
                    ? { kirjailijanSukunimi : "asc"}
                    : (req.query.ehto === "kirjanNimi")
                        ? { kirjanNimi : "asc"}
                        : { kirjanNimi : "asc"}
            }));

        } catch (e : any) {
            next(new Virhe());
        }

    } else {
        next(new Virhe(400, "Virheellinen pyynnön body"))
    }
})

// Poistetaan kirja
apiKirjatRouter.delete("/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    if (await prisma.kirja.count({
            where : {
                id : Number(req.params.id)
            }
        })) {
        try {

            // Poistetaan id:n mukainen kirja 
            await prisma.kirja.delete({
                where : {
                    id : Number(req.params.id)
                }
            });

            // Haetaan kaikki käyttäjän kirjat
            res.json(await prisma.kirja.findMany({          
                where : {
                    kayttajaId : Number(res.locals.kayttaja.id)   
                },

                // Järjestetään
                orderBy : 
                (req.query.ehto === "arvostelu")
                ? { arvostelu : "desc"}
                : (req.query.ehto === "kirjailijanNimi")
                    ? { kirjailijanSukunimi : "asc"}
                    : (req.query.ehto === "kirjanNimi")
                        ? { kirjanNimi : "asc"}
                        : { kirjanNimi : "asc"}
            }));

        } catch (e : any) {
            next(new Virhe())
        }

    } else {
        next(new Virhe(400, "Virheellinen id"));
    }

});

export default apiKirjatRouter;