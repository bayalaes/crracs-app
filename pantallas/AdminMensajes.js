/**
 * Pantalla "Mensajes Recibidos".
 * Muestra los mensajes enviados desde la sección 'Contáctanos' para revisión del administrador.
 */

import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { baseDeDatos } from "../configuraciones/firebase";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import estilos from "./estilos/AdminMensajesStyles";

export default function AdminMensajes() {
  const [mensajes, setMensajes] = useState([]);

  /**
   * Hook useEffect que carga en tiempo real los mensajes de contacto.
   */
  useEffect(() => {
    const q = query(
      collection(baseDeDatos, "mensajes_contacto"),
      orderBy("fecha", "desc")
    );

    const unsuscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMensajes(lista);
    });

    return () => unsuscribe(); // Limpieza
  }, []);

  return (
    <ScrollView
      style={estilos.scroll}
      contentContainerStyle={estilos.contenido}
    >
      <Text style={estilos.titulo}>Mensajes Recibidos</Text>

      {mensajes.length === 0 && (
        <Text style={estilos.texto}>No hay mensajes aún.</Text>
      )}

      {mensajes.map((m) => (
        <View key={m.id} style={estilos.tarjeta}>
          <Text style={estilos.nombre}>{m.nombre}</Text>
          <Text style={estilos.mensaje}>{m.mensaje}</Text>
          <Text style={estilos.fecha}>
            {m.fecha?.toDate().toLocaleString() ?? "Fecha no disponible"}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
