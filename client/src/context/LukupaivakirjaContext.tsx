import { SelectChangeEvent } from '@mui/material';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

// Tilanhallintajärjestelmänä React Context API

export const LukupaivakirjaContext : React.Context<any> = createContext(undefined);

export interface Kirja {
    id : number,
    kirjanNimi : string,
    kirjailijanEtunimi : string,
    kirjailijanSukunimi : string,
    arvostelu? : number,
    sanallinenArvostelu? : string
}

interface ApiData {
    kirjat : Kirja[],
    virhe : string,
    haettu : boolean
}

interface fetchAsetukset {
    method : string
    headers? : any
    body? : string
  }

interface Props {
    children : React.ReactNode;
}

export const LukupaivakirjaProvider : React.FC<Props> = (props : Props) : React.ReactElement => {

    const navigate : NavigateFunction = useNavigate();

    const loginLomakeRef = useRef<HTMLFormElement>();

    const lomakeRef = useRef<HTMLFormElement>();

    const [token, setToken] = useState<string>(String(localStorage.getItem("token")));

    const [lisaysDialogi, setLisaysDialogi] = useState<boolean>(false);

    const [infoDialogi, setInfoDialogi] = useState<any>({
                                                          kirja : {},
                                                          auki : false
                                                       });
    
    const [poistoDialogi, setPoistoDialogi] = useState<any>({
                                                              kirja : {},
                                                              auki : false
                                                           });

    const [ehto, setEhto] = useState<string>("");

    const [hakusana, setHakusana] = useState<string>("");

    const [apiData, setApiData] = useState<ApiData>({
                                                      kirjat : [],
                                                      virhe : "",
                                                      haettu : false
                                                   });

    // Funktio kirjautumiselle - Mikäli käyttäjätunnus ja salasana ovat ok, asetetaan token ja siirrytään etusivulle
    const kirjaudu = async (e : React.FormEvent) : Promise<void> => {

        e.preventDefault();

        if (loginLomakeRef.current?.kayttajatunnus.value) {

            if (loginLomakeRef.current?.salasana.value) {

                const yhteys = await fetch("/api/auth/login", {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        kayttajatunnus : loginLomakeRef.current?.kayttajatunnus.value,
                        salasana : loginLomakeRef.current?.salasana.value
                    })
                });

                if (yhteys.status === 200) {      

                    // Otetaan vastaan token ja tallennetaan muuttujaan ja localStorageen -> käyttäjä pysyy kirjautuneena
                    let {token} = await yhteys.json();

                    setToken(token);
                    localStorage.setItem("token", token);
                  
                    // Navigoidaan etusivulle, onnistuu, mikäli token on ok
                    navigate("/");
                }
            }
        }
    };

    /* Funktio uloskirjautumiselle
       Tyhjennetään localStorage, token-, ehto-, ja hakusanamuuttujat */
    const kirjauduUlos = () => {

        localStorage.removeItem("token");

        setToken("");
        setEhto("");
        setHakusana("");

        apiKutsu();

    }

    // Funktio asettaa ehdon, minkä perusteella kirjat järjestetään
    const asetaEhto = (e : SelectChangeEvent) => {

        setEhto(e.target.value as string);

    }

    // Funktio asettaa hakusanan, minkä perusteella kirjat näytetään
    const asetaHakusana = (e : SelectChangeEvent) => {

        setHakusana(e.target.value as string);

    }

    // Funktio kirjan lisäämiselle
    const lisaaKirja = (e: React.FormEvent) => {

        e.preventDefault();

        apiKutsu("POST", {
            id : 0,
            kirjanNimi : lomakeRef.current?.uusiKirjanNimi.value,
            kirjailijanEtunimi : lomakeRef.current?.uusiKirjailijanEtunimi.value,
            kirjailijanSukunimi : lomakeRef.current?.uusiKirjailijanSukunimi.value,
            arvostelu : lomakeRef.current?.uusiArvostelu.value,
            sanallinenArvostelu : lomakeRef.current?.uusiSanallinenArvostelu.value
        });

        setLisaysDialogi(false);

        setEhto("");
        setHakusana("");

    }

    // Funktio kirjan poistamiselle
    const poistaKirja = () => {

        apiKutsu("DELETE", undefined, poistoDialogi.kirja.id);

        setPoistoDialogi({...poistoDialogi, auki : false})
        setInfoDialogi({...infoDialogi, auki : false});
      
        setEhto("");
        setHakusana("");
       
    }
    
    // Funktiolla otetaan yhteys palvelimelle, haetaan, lisätään tai poistetaan kirjoja
    const apiKutsu = async (metodi? : string, kirja? : Kirja, id? : number) : Promise<void> => {

        let url = (id) ? `/api/kirjat/${id}` : `/api/kirjat?ehto=${ehto}&hakusana=${hakusana}`;

        let asetukset : fetchAsetukset = {
            method : metodi || "GET",
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        };

        if (metodi === "POST") {

            asetukset = {
                ...asetukset,
                headers : {
                    ...asetukset.headers,
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(kirja)
            }

        }

        try {

            const yhteys = await fetch(url, asetukset);

            if (yhteys.status === 200) {

                setApiData({
                    ...apiData,
                    kirjat : await yhteys.json(),
                    haettu : true
                });

            } else {

                let virheteksti : string = "";

                switch (yhteys.status) {

                    case 400 : virheteksti = "Virhe pyynnön tiedoissa"; break;
                    case 401 : navigate("/login"); break;
                    default : virheteksti = "Palvelimella tapahtui odottamaton virhe"; break;
                }

                setApiData({
                    ...apiData,
                    virhe : virheteksti,
                    haettu : true
                });

            }
            
        } catch (e : any) {
            
            setApiData({
                ...apiData,
                virhe : "Palvelimeen ei saada yhteyttä",
                haettu : true
            });
        }

    }

    // useEffect-hookilla käynnistetään funktio apiKutsu sovelluksen käynnistyessä tai kun muuttujat token, ehto tai hakusana muuttuvat
    useEffect(() => {
        apiKutsu();
    }, [token, ehto, hakusana]);

    // Jaetaan tarvittavat funktiot ja muuttujat komponenttien käyttöön
    return (
        <LukupaivakirjaContext.Provider value={{
                                                kirjaudu,
                                                loginLomakeRef,
                                                lisaysDialogi,
                                                setLisaysDialogi,
                                                apiData,
                                                lomakeRef,
                                                lisaaKirja,
                                                ehto,
                                                asetaEhto,
                                                asetaHakusana,
                                                hakusana,
                                                kirjauduUlos,
                                                setInfoDialogi,
                                                infoDialogi,
                                                poistaKirja,
                                                poistoDialogi,
                                                setPoistoDialogi
                                              }}>
            {props.children}
        </LukupaivakirjaContext.Provider>
    )
}