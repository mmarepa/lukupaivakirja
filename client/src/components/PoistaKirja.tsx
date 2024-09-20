import { Box, Button, Dialog, DialogActions, DialogContent, Grid, IconButton, Typography } from '@mui/material';
import React, { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { LukupaivakirjaContext } from '../context/LukupaivakirjaContext';

const PoistaKirja : React.FC = () : React.ReactElement => {

    const { poistoDialogi, setPoistoDialogi, poistaKirja } = useContext(LukupaivakirjaContext); 

    return (

        <Dialog
            open={poistoDialogi.auki}
            onClose={() => setPoistoDialogi({...poistoDialogi, auki : false})}
            maxWidth="xs"
            PaperProps={{ sx : { position: "fixed", top: 100 } }}
        >
        <DialogContent>
            <Box sx={{ flexGrow : 1 }}>
                <Grid container spacing={1}>

                    <Grid item xs={12}>
                        <Typography variant="h6">Haluatko varmasti poistaa kirjan:</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1">
                            {`${poistoDialogi.kirja.kirjanNimi},
                            ${poistoDialogi.kirja.kirjailijanEtunimi} ${poistoDialogi.kirja.kirjailijanSukunimi}`}
                        </Typography>
                    </Grid>

                    <Grid item xs={6} sx={{ marginTop : 1 }}>
                        <IconButton
                            color="error"
                            onClick={poistaKirja}
                        >
                            <DeleteIcon />
                            <Typography>Poista kirja</Typography>
                        </IconButton>
                    </Grid>

                    <Grid item xs={6} sx={{ marginTop : 1 }}>
                        <DialogActions>
                            <Button
                                variant="contained" 
                                onClick={() => setPoistoDialogi({...poistoDialogi, auki : false})}
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

export default PoistaKirja;