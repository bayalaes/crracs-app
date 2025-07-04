/**
 * Pantalla de "Aceptar Reto".
 * Permite al usuario seleccionar una imagen de evidencia, subirla a Cloudinary
 * y registrar el reto aceptado en Firestore para su posterior validación.
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth, baseDeDatos } from "../configuraciones/firebase";
import {
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Colores } from "../configuraciones/theme";
import estilos from "./estilos/AceptarRetoStyles";
import { iniciarMedicion } from "../utilidades/medicionTiempos";

export default function AceptarReto() {
  const navigation = useNavigation();
  const route = useRoute();
  const { reto } = route.params;

  // Estados para manejar la imagen seleccionada y el estado de subida
  const [imagen, setImagen] = useState(null);
  const [subiendo, setSubiendo] = useState(false);

  /**
   * Permite al usuario seleccionar una imagen de su galería.
   * Solicita permisos si no han sido concedidos.
   */
  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // Verifica si el permiso fue concedido
    if (!permiso.granted) {
      alert("Permiso denegado para acceder a la galería.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      base64: true,
    });

    // Si no se canceló la selección, guarda la URI de la imagen
    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
    }
  };

  /**
   * Sube una imagen a Cloudinary.
   * @param {string} uri - La URI local de la imagen a subir.
   * @returns {Promise<string>} La URL segura de la imagen subida en Cloudinary.
   */
  const subirACloudinary = async (uri) => {
    try {
      const data = new FormData();
      data.append("file", {
        uri,
        type: "image/jpeg",
        name: "evidencia.jpg",
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

      // Validación en caso de error en Cloudinary
      if (!resultado.secure_url) {
        throw new Error("Error al subir la imagen a Cloudinary.");
      }

      return resultado.secure_url;
    } catch (error) {
      console.log("❌ Error en subirACloudinary:", error.message);
      throw error; // Propaga el error hacia enviarActividad()
    }
  };

  /**
   * Envía la actividad (reto aceptado) a Firestore.
   * Sube la imagen de evidencia a Cloudinary y guarda/actualiza el registro en Firestore.
   */
  const enviarActividad = async () => {
    // 1. Validación para asegurar que se ha seleccionado una imagen.
    if (!imagen) {
      Alert.alert(
        "Evidencia requerida",
        "Por favor, selecciona una imagen antes de enviar."
      );
      return;
    }
    const tiempo = iniciarMedicion("Envío de actividad"); // ⏱️ Inicia medición

    try {
      const usuarioActual = auth.currentUser;
      if (!usuarioActual) {
        Alert.alert("Error", "Usuario no autenticado.");
        return;
      }

      // Inicia el estado de subida para deshabilitar el botón
      setSubiendo(true);

      // Sube la imagen si hay una seleccionada
      let urlFinal = null;
      if (imagen) {
        // Llama a la función para subir la imagen a Cloudinary
        urlFinal = await subirACloudinary(imagen);
      }

      // Verificar si ya existe este reto para este usuario
      const consulta = query(
        collection(baseDeDatos, "retos_aceptados"),
        where("idUsuario", "==", usuarioActual.uid),
        where("idReto", "==", reto.id)
      );

      const snapshot = await getDocs(consulta);

      // Si no existe, se crea un nuevo documento; si ya existe, se actualiza
      if (snapshot.empty) {
        // Añade un nuevo documento a la colección 'retos_aceptados'
        await addDoc(collection(baseDeDatos, "retos_aceptados"), {
          idUsuario: usuarioActual.uid,
          idReto: reto.id,
          tituloReto: reto.titulo,
          valor: reto.valor,
          fechaEnvio: Timestamp.now(),
          urlImagen: urlFinal,
          estado: "pendiente",
        });
      } else {
        // Si ya existe un documento, lo actualiza
        const idDocExistente = snapshot.docs[0].id;
        // Actualiza el documento existente con la nueva información
        await updateDoc(doc(baseDeDatos, "retos_aceptados", idDocExistente), {
          tituloReto: reto.titulo,
          valor: reto.valor,
          fechaEnvio: Timestamp.now(),
          urlImagen: urlFinal,
          estado: "pendiente",
        });
      }

      // Muestra un mensaje de éxito y regresa a la pantalla anterior
      Alert.alert(
        "✅ Actividad enviada",
        "Tu reto fue enviado para validación."
      );
      // Regresa a la pantalla anterior
      navigation.goBack();
    } catch (error) {
      console.log("❌ Error al enviar reto:", error.message);
      // Muestra un mensaje de error si algo falla
      Alert.alert("Error", "No se pudo enviar el reto.");
    } finally {
      tiempo.finalizar(); // ⏱️ Finaliza y registra el tiempo
      setSubiendo(false);
    }
  };

  // Renderizado de la interfaz
  return (
    // Contenedor principal
    <View style={estilos.contenedor}>
      {/* Título de la sección */}
      <Text style={estilos.etiqueta}>Subir evidencia</Text>

      <TouchableOpacity style={estilos.zonaCarga} onPress={seleccionarImagen}>
        {/* Muestra la imagen seleccionada o el texto de placeholder */}
        {imagen ? (
          <Image source={{ uri: imagen }} style={estilos.imagen} />
        ) : (
          <>
            <Text style={estilos.textoZona}>Subir evidencia</Text>
            <Text style={estilos.textoSub}>
              Sube una foto como evidencia de tu actividad.
            </Text>
            <View style={estilos.botonInterno}>
              <Text style={estilos.textoInterno}>Subir foto</Text>
            </View>
          </>
        )}
      </TouchableOpacity>

      {/* Botón para enviar la actividad */}
      <TouchableOpacity
        // 3. El estilo ahora es dinámico. Cambia de color si el botón está deshabilitado.
        style={[
          estilos.botonPrincipal,
          {
            backgroundColor:
              subiendo || !imagen
                ? Colores.botonDeshabilitado
                : Colores.primario,
          },
        ]}
        onPress={enviarActividad}
        // 2. El botón se deshabilita si se está subiendo O si no hay imagen.
        disabled={subiendo || !imagen}
      >
        <Text style={estilos.textoBoton}>
          {subiendo ? "Enviando..." : "Enviar Actividad"}
        </Text>
      </TouchableOpacity>

      {/* Botón para volver a la pantalla anterior */}
      <TouchableOpacity
        style={[estilos.botonSecundario, { backgroundColor: Colores.primario }]}
        onPress={() => navigation.goBack()}
        disabled={subiendo}
      >
        <Text style={estilos.textoBoton}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
