import { Alert, Backdrop, CircularProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import React, { useContext } from 'react';
import { Kirja, LukupaivakirjaContext } from '../context/LukupaivakirjaContext';
import Jarjesta from './Jarjesta';
import Haku from './Haku';

const Kirjalista : React.FC = () : React.ReactElement => {

    const { apiData, setInfoDialogi } = useContext(LukupaivakirjaContext); 

    return (
        <>

        <Jarjesta/>
        <Haku/>

        {(Boolean(apiData.virhe))
            ? <Alert severity="error">{apiData.virhe}</Alert>
            : (apiData.haettu)
                ? <Stack>
                    <List>
                        {apiData.kirjat.map((kirja : Kirja, idx : number) => {
                            return (
                                    <ListItem 
                                    key={idx}
                                    disablePadding
                                    >
                                    <ListItemButton
                                        onClick={() => setInfoDialogi({kirja : kirja, auki : true})}
                                    >
                                        <ListItemText
                                            primary={kirja.kirjanNimi}
                                            secondary={`${kirja.kirjailijanSukunimi}, ${kirja.kirjailijanEtunimi}`}
                                        />
                                        <ListItemIcon>                            
                                            <StarIcon/>
                                            <Typography sx={{ marginLeft : "5px" }}>{kirja.arvostelu}</Typography>                           
                                        </ListItemIcon>
                                    </ListItemButton>
                                    </ListItem>
                                    )
                        })}
                    </List>
                  </Stack>
                : <Backdrop open={true}>
                    <CircularProgress color="inherit"/>
                  </Backdrop>
        }
              
        </>
    )
}

export default Kirjalista;