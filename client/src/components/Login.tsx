import { Backdrop, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material"
import React, { useContext } from 'react';
import { LukupaivakirjaContext } from '../context/LukupaivakirjaContext';

const Login : React.FC = () : React.ReactElement => {

    const { kirjaudu, loginLomakeRef } = useContext(LukupaivakirjaContext); 

    return (

        <Backdrop open={true}>
            <Paper sx={{ padding : 2, position: "fixed", top: 100 }}>
                <Box
                    component="form"
                    onSubmit={kirjaudu}
                    ref={loginLomakeRef}
                    style={{
                        width : 300,
                        backgroundColor : "#fff",
                        padding : 20,                       
                    }}
                >
                    <Stack spacing={2}>

                        <Typography variant="h6">Kirjaudu sisään</Typography>
                        
                            <TextField
                                label="Käyttäjätunnus"
                                name="kayttajatunnus"
                            />
                            <TextField
                                label="Salasana"
                                name="salasana"
                                type="password"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                            >Kirjaudu
                            </Button>

                    </Stack>
                </Box>
            </Paper>
        </Backdrop>

    );

};

export default Login;