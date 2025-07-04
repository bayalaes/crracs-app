import React from 'react';
import Navegacion from './navegacion/Navegacion';
import { AutenticacionProveedor } from './contextos/AutenticacionContexto';

export default function App() {
  return (
    <AutenticacionProveedor>
      <Navegacion />
    </AutenticacionProveedor>
  );
}
