import { Box, Button, Dialog, DialogActions, DialogContent, Grid, IconButton, Rating, Typography } from '@mui/material';
import React, { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { LukupaivakirjaContext } from '../context/LukupaivakirjaContext';

const InfoDialogi : React.FC = () : React.ReactElement => {

    const { infoDialogi, setInfoDialogi, setPoistoDialogi } = useContext(LukupaivakirjaContext); 

    return (

        <Dialog
            open={infoDialogi.auki}
            onClose={() => setInfoDialogi({...infoDialogi, auki : false})}
            maxWidth="xs"
            PaperProps={{ sx : { position: "fixed", top: 40 } }}
        >
        <DialogContent>
            <Box sx={{ flexGrow : 1 }}>
                <Grid container spacing={1}>

                    <Grid item xs={12}>
                        <Typography variant="h6">
                            {`${infoDialogi.kirja.kirjailijanEtunimi} ${infoDialogi.kirja.kirjailijanSukunimi}`}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5">{infoDialogi.kirja.kirjanNimi}</Typography>
                    </Grid>

                    <Grid item xs={6} sx={{ marginTop : 1, marginBottom : 0 }}>
                        <Rating value={infoDialogi.kirja.arvostelu}/>
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop : 0 }}>
                        <Typography variant="body1">{infoDialogi.kirja.sanallinenArvostelu}</Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop : 3 }}>
                        <DialogActions>                            
                            <IconButton
                                color="default"
                                onClick={() => setPoistoDialogi({kirja : infoDialogi.kirja, auki : true})}
                            >
                                <DeleteIcon />
                                <Typography>Poista kirja</Typography>
                            </IconButton>
                            <Button
                                variant="contained"
                                onClick={() => setInfoDialogi({...infoDialogi, auki : false})}
                            >Peruuta
                            </Button>
                        </DialogActions>
                    </Grid>

                </Grid>
            </Box>
        </DialogContent>
        </Dialog>

    )
}

export default InfoDialogi;