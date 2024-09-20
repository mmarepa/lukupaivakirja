import { Stack, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { LukupaivakirjaContext } from '../context/LukupaivakirjaContext';

const Haku : React.FC = () : React.ReactElement => {

    const { asetaHakusana, hakusana } = useContext(LukupaivakirjaContext); 

    return (

        <Stack
            sx={{ marginLeft : 2, marginRight : 3 }}
        >
            <TextField
                name="hakusana"
                value={hakusana}
                variant="outlined"
                label="Rajaa kirjan tai kirjailijan nimen mukaan"
                onChange={asetaHakusana}
                size="small"
                fullWidth={true}
                sx={{ marginTop : "10px" }}/>

        </Stack>

    )
}

export default Haku;