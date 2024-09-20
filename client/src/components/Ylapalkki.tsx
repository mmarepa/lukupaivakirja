import { AppBar, Container, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import React, { useContext } from 'react';
import { LukupaivakirjaContext } from '../context/LukupaivakirjaContext';

const Ylapalkki : React.FC = () : React.ReactElement => {

    const { setLisaysDialogi, kirjauduUlos } = useContext(LukupaivakirjaContext);

    return (
        <>
        <CssBaseline />
        <AppBar position='static'>
            <Container maxWidth="xs">
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>Lukupäiväkirja</Typography>
                    <IconButton
                        color="inherit"
                        onClick={() => setLisaysDialogi(true)}
                        >
                        <AddIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        onClick={kirjauduUlos}
                    >
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
        </>
    )
}

export default Ylapalkki;