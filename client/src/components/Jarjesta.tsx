import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import React, { useContext } from 'react';
import { LukupaivakirjaContext } from '../context/LukupaivakirjaContext';

const Jarjesta : React.FC = () : React.ReactElement => {

    const { ehto, asetaEhto } = useContext(LukupaivakirjaContext); 

    return (

        <Stack sx={{ marginLeft : 2, marginRight : 3, marginTop : 4 }}>

            <FormControl
                size="small"
                fullWidth={true}
                >
                <InputLabel>Järjestä</InputLabel>
                <Select
                    label="Järjestä"
                    value={ehto}
                    onChange={asetaEhto}
                >
                    <MenuItem value={"arvostelu"}>Arvostelun mukaan</MenuItem>
                    <MenuItem value={"kirjailijanNimi"}>Kirjailijan mukaan</MenuItem>
                    <MenuItem value={"kirjanNimi"}>Kirjan nimen mukaan</MenuItem>
                </Select>
            </FormControl>

        </Stack>

    )
}

export default Jarjesta;