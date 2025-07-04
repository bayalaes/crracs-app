// Perfil.js

import React, { useEffect, useState } from "react";
import Encabezado from "../componentes/Encabezado";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { auth, baseDeDatos } from "../configuraciones/firebase";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import estilos from "./estilos/PerfilStyles";
import { Colores } from "../configuraciones/theme";
import { iniciarMedicion } from "../utilidades/medicionTiempos"; // ⏱

export default function Perfil({ navigation }) {
  const usuario = auth.currentUser;
  const [datos, setDatos] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [cargando, setCargando] = useState(true);
  const avatarDefault = require("../assets/avatar-generico.png");

  useEffect(() => {
    if (!usuario) return;

    const refUsuario = doc(baseDeDatos, "usuarios", usuario.uid);

    const unsuscribeUsuario = onSnapshot(
      refUsuario,
      async (snapUsuario) => {
        if (snapUsuario.exists()) {
          const datosUsuario = { id: snapUsuario.id, ...snapUsuario.data() };
          setDatos(datosUsuario);

          const misPuntos = datosUsuario.totalPuntos || 0;

          const q = query(
            collection(baseDeDatos, "usuarios"),
            where("totalPuntos", ">", misPuntos)
          );

          const snapshotRanking = await getDocs(q);
          setRanking(snapshotRanking.size + 1);
          setCargando(false);
        } else {
          setCargando(false);
        }
      },
      (error) => {
        console.log("Error cargando perfil:", error.message);
        setCargando(false);
      }
    );

    return () => unsuscribeUsuario();
  }, []);

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      alert("Permiso denegado para acceder a la galería.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      base64: true,
    });

    if (!resultado.canceled) {
      subirACloudinary(resultado.assets[0].uri);
    }
  };

  const subirACloudinary = async (uri) => {
    const medirSubida = iniciarMedicion("Subida imagen"); // ⏱
    const medirActualizacion = iniciarMedicion("Actualizar foto"); // ⏱

    try {
      const data = new FormData();
      data.append("file", {
        uri,
        type: "image/jpeg",
        name: "perfil.jpg",
      });
      data.append("upload_preset", "reto_evidencia");
      data.append("cloud_name", "dpaerjhgg");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dpaerjhgg/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const resultado = await res.json();
      console.log("⏱ Imagen subida en:", medirSubida.finalizar(), "s"); // ⏱

      const urlFinal = resultado.secure_url;

      await updateDoc(doc(baseDeDatos, "usuarios", usuario.uid), {
        urlFoto: urlFinal,
      });

      console.log(
        "⏱ Foto actualizada en:",
        medirActualizacion.finalizar(),
        "s"
      ); // ⏱
      Alert.alert("✅ Foto actualizada");
    } catch (e) {
      console.log("Error subiendo foto:", e.message);
      Alert.alert("Error", "No se pudo subir la foto.");
    }
  };

  if (cargando || !datos) {
    return (
      <View style={estilos.cargandoContenedor}>
        <ActivityIndicator size="large" color={Colores.primario} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colores.secundario }}>
      <Encabezado />
      <View style={estilos.contenedor}>
        <Image
          source={datos?.urlFoto ? { uri: datos.urlFoto } : avatarDefault}
          style={estilos.avatar}
        />

        <Text style={estilos.nombre}>{datos?.nombre}</Text>

        {ranking && (
          <Text style={estilos.rankingTexto}>Ranking: #{ranking}</Text>
        )}

        <View style={estilos.puntosContainer}>
          <Text style={estilos.puntosTexto}>
            {(datos?.totalPuntos || 0).toLocaleString()} Puntos
          </Text>
        </View>

        <TouchableOpacity style={estilos.boton} onPress={seleccionarImagen}>
          <Text style={estilos.textoBoton}>Cambiar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilos.boton, { marginTop: 16 }]}
          onPress={() => navigation.navigate("AjustesPerfil")}
        >
          <Text style={estilos.textoBoton}>Ajustes de Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
