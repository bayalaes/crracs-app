/**
 * Pantalla "Panel de Administración".
 * Contiene 3 pestañas: Retos, Mensajes y Notificaciones.
 */

import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native";
import RetosValidador from "./AdminRetos";
import MensajesRecibidos from "./AdminMensajes";
import AdminNotificaciones from "./AdminNotificaciones";
import Encabezado from "../componentes/Encabezado";
import { Colores, Fuentes } from "../configuraciones/theme";

const Tab = createMaterialTopTabNavigator();

export default function AdminPanel() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0c1c17" }}>
      <Encabezado />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: Colores.secundario },
          tabBarLabelStyle: {
            fontWeight: Fuentes.pesoNegrita,
            color: Colores.textoClaro,
          },
          tabBarIndicatorStyle: { backgroundColor: Colores.primario },
        }}
      >
        <Tab.Screen name="Retos" component={RetosValidador} />
        <Tab.Screen name="Mensajes" component={MensajesRecibidos} />
        <Tab.Screen name="Notificaciones" component={AdminNotificaciones} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
