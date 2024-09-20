import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Rating, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { LukupaivakirjaContext } from '../context/LukupaivakirjaContext';

const LisaaKirja : React.FC = () : React.ReactElement => {

    const { lisaysDialogi, setLisaysDialogi, lisaaKirja, lomakeRef} = useContext(LukupaivakirjaContext); 

    return (

        <Dialog
            open={lisaysDialogi}
            onClose={() => setLisaysDialogi(false)}
            maxWidth="xs"
            PaperProps={{ sx: { position: "fixed", top: 40} }}
        >
        <DialogTitle>
            Lisää uusi kirja
        </DialogTitle>
        <DialogContent>
            <Box
                component="form"
                onSubmit={lisaaKirja}
                ref={lomakeRef}
                sx={{ flexGrow : 1 }}
                >
                <Grid container spacing={1}>

                    <Grid item xs={12}>
                        <TextField
                            required
                            name="uusiKirjanNimi"
                            variant='outlined'
                            label="Kirjan nimi"
                            fullWidth={true}
                            sx={{ marginTop : "10px" }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            required
                            name="uusiKirjailijanEtunimi"
                            variant='outlined'
                            label="Kirjailijan etunimi"
                        />
                    </Grid>

                    <Grid item xs={6}>
                    <TextField
                        required
                        name="uusiKirjailijanSukunimi"
                        variant='outlined'
                        label="Kirjailijan sukunimi"
                    />
                    </Grid>

                    <Grid item xs={12}>               
                        <Typography sx={{ marginTop: "10px", marginLeft: "3px" }}>Arvosana</Typography>
                        <Rating
                            aria-required
                            name="uusiArvostelu"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            name="uusiSanallinenArvostelu"
                            variant='outlined'
                            label="Sanallinen arvostelu"
                            fullWidth={true}
                            multiline
                            rows={4}
                            sx={{ marginTop : "10px" }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <DialogActions>
                            <Button
                                type="submit"
                                variant="contained"
                            >Lisää
                            </Button>
                            <Button onClick={() => setLisaysDialogi(false)}>Peruuta</Button>
                        </DialogActions>
                    </Grid>
                    
                </Grid>
            </Box>
        </DialogContent>
        </Dialog>
    )
}

export default LisaaKirja;