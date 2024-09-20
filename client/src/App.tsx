import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Ylapalkki from './components/Ylapalkki';
import LisaaKirja from './components/LisaaKirja';
import Kirjalista from './components/Kirjalista';
import Login from './components/Login';
import InfoDialogi from './components/InfoDialogi';
import PoistaKirja from './components/PoistaKirja';

function App() {
  return (
    <>

    <Ylapalkki/>
    
    <Container
      maxWidth="xs"
      sx={{ marginTop : "20px"}}
    >

    <Routes>
      <Route path="/" element={<Kirjalista />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>

    <LisaaKirja/>
    <InfoDialogi/>
    <PoistaKirja/>

    </Container>

    </>    
  );
}

export default App;
