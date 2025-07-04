/**
 * Componente de navegación principal de la app CRRACS.
 * Muestra el stack de pantallas según si el usuario está autenticado o no.
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Registro from "../pantallas/Registro";
import InicioSesion from "../pantallas/InicioSesion";
import Bienvenida from "../pantallas/Bienvenida";
import AceptarReto from "../pantallas/AceptarReto";
import AjustesPerfil from "../pantallas/AjustesPerfil";
import Notificaciones from "../pantallas/Notificaciones";

import TabsNavegacion from "./TabsNavegacion";
import { useAutenticacion } from "../contextos/AutenticacionContexto";

const Stack = createNativeStackNavigator();

export default function Navegacion() {
  const { usuario, cargando } = useAutenticacion();

  if (cargando) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#060f0c" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      >
        {usuario ? (
          // Si el usuario está autenticado
          <>
            <Stack.Screen
              name="TabsUsuario"
              component={TabsNavegacion}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AceptarReto"
              component={AceptarReto}
              options={{ title: "Aceptar Reto" }}
            />
            <Stack.Screen
              name="AjustesPerfil"
              component={AjustesPerfil}
              options={{ title: "Ajustes de Perfil" }}
            />
            <Stack.Screen
              name="Notificaciones"
              component={Notificaciones}
              options={{ title: "Notificaciones" }}
            />  
          </>
        ) : (
          // Si el usuario NO está autenticado
          <>
            <Stack.Screen
              name="Inicio"
              component={Bienvenida}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Registro"
              component={Registro}
            />
            <Stack.Screen
              name="InicioSesion"
              component={InicioSesion}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
