/**
 * Pantalla de "Ranking General".
 * Muestra el ranking de todos los usuarios ordenados por su total de puntos.
 * Los primeros 3 puestos se destacan con medallas.
 */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { baseDeDatos, auth } from "../configuraciones/firebase";
import Encabezado from "../componentes/Encabezado";
import { Colores } from "../configuraciones/theme";
import estilos from "./estilos/RankingStyles";

export default function Ranking() {
  const usuarioActual = auth.currentUser;
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Imagen por defecto para los usuarios sin foto
  const avatarDefault = require("../assets/avatar-generico.png");

  useEffect(() => {
    // Consulta para traer todos los usuarios ordenados por totalPuntos (mayor a menor)
    const q = query(
      collection(baseDeDatos, "usuarios"),
      orderBy("totalPuntos", "desc")
    );

    // Suscripción en tiempo real
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rankingLista = snapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre || "Usuario",
        urlFoto: doc.data().urlFoto || null,
        totalPuntos: doc.data().totalPuntos || 0,
      }));

      setUsuarios(rankingLista);
      setCargando(false);
    });

    // Limpieza de la suscripción al desmontar
    return () => unsubscribe();
  }, []);

  const medallas = ["🥇", "🥈", "🥉"];

  // Mostrar loading mientras se carga la info
  if (cargando) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colores.secundario }}>
        <Encabezado />
        <View style={estilos.cargandoContenedor}>
          <ActivityIndicator size="large" color={Colores.primario} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colores.secundario }}>
      <Encabezado />
      <ScrollView
        style={estilos.scroll}
        contentContainerStyle={estilos.contenido}
      >
        {/* Título */}
        <Text style={estilos.titulo}>Ranking General</Text>

        {/* TOP 3 */}
        <View style={estilos.topContainer}>
          {usuarios.slice(0, 3).map((user, index) => {
            const esActual = user.id === usuarioActual?.uid;

            return (
              <View key={user.id} style={estilos.topCard}>
                <Text style={estilos.medalla}>{medallas[index]}</Text>
                <Image
                  source={user.urlFoto ? { uri: user.urlFoto } : avatarDefault}
                  style={estilos.avatarGrande}
                />
                <Text
                  style={[
                    estilos.usuarioTop,
                    esActual && { color: Colores.primario },
                  ]}
                >
                  {user.nombre}
                </Text>
                <Text style={estilos.puntosTop}>{user.totalPuntos} pts</Text>
              </View>
            );
          })}
        </View>

        {/* Resto del ranking */}
        <View style={estilos.listaContainer}>
          {usuarios.slice(3).map((user, index) => {
            const esActual = user.id === usuarioActual?.uid;

            return (
              <View key={user.id} style={estilos.item}>
                <Text style={estilos.posicion}>{index + 4}</Text>
                <Image
                  source={user.urlFoto ? { uri: user.urlFoto } : avatarDefault}
                  style={estilos.avatar}
                />
                <Text
                  style={[
                    estilos.usuario,
                    esActual && { color: Colores.primario },
                  ]}
                >
                  {user.nombre}
                </Text>
                <Text style={estilos.puntos}>{user.totalPuntos} pts</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
