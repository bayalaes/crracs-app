/**
 * Pantalla de "Ajustes de Perfil".
 * Permite al usuario actualizar su nombre y su contraseña.
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
// --> CORRECCIÓN 1: Importar 'updatePassword' desde firebase/auth
import { updatePassword } from "firebase/auth";
import { auth, baseDeDatos } from "../configuraciones/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import estilos from "./estilos/AjustesPerfilStyles";
import { Colores } from "../configuraciones/theme";

export default function AjustesPerfil({ navigation }) {
  const usuario = auth.currentUser;
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [cargando, setCargando] = useState(true);

  /**
   * Carga el nombre actual del usuario desde Firestore
   */
  const cargarDatos = async () => {
    try {
      const ref = doc(baseDeDatos, "usuarios", usuario.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setNombre(snap.data().nombre);
      }
    } catch (e) {
      console.log("Error cargando datos:", e.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  /**
   * Actualiza el nombre en Firestore
   */
  const actualizarNombre = async () => {
    if (nombre.trim() === "") {
      Alert.alert("Error", "El nombre no puede estar vacío.");
      return;
    }

    try {
      await updateDoc(doc(baseDeDatos, "usuarios", usuario.uid), {
        nombre: nombre.trim(),
      });

      Alert.alert("✅ Nombre actualizado");
    } catch (e) {
      console.log("Error actualizando nombre:", e.message);
      Alert.alert("Error", "No se pudo actualizar el nombre.");
    }
  };

  /**
   * Actualiza la contraseña en Firebase Auth
   */
  const actualizarContrasena = async () => {
    const currentUser = auth.currentUser; // Obtener el usuario actual directamente

    if (!currentUser) {
      Alert.alert(
        "Error",
        "No hay usuario autenticado. Por favor, inicia sesión de nuevo."
      );
      return;
    }

    if (contrasena.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      // --> CORRECCIÓN 2: Usar la función importada 'updatePassword'
      await updatePassword(currentUser, contrasena);
      setContrasena("");
      Alert.alert("✅ Contraseña actualizada");
    } catch (e) {
      console.log("Error actualizando contraseña:", e.message);
      // Este error suele ocurrir si el usuario no ha iniciado sesión recientemente.
      // Firebase requiere una autenticación reciente para operaciones sensibles.
      Alert.alert(
        "Error",
        "No se pudo actualizar la contraseña.\n\nPara tu seguridad, esta operación requiere que hayas iniciado sesión recientemente. Por favor, cierra sesión y vuelve a ingresar antes de cambiar la contraseña."
      );
    }
  };

  // Loading de la pantalla
  if (cargando) {
    return (
      <View style={estilos.cargandoContenedor}>
        <ActivityIndicator size="large" color={Colores.primario} />
      </View>
    );
  }

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Ajustes de Perfil</Text>

      {/* Actualizar nombre */}
      <Text style={estilos.etiqueta}>Nombre:</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="Nombre completo"
        placeholderTextColor={Colores.textoGrisOscuro}
        value={nombre}
        onChangeText={setNombre}
      />

      <TouchableOpacity style={estilos.boton} onPress={actualizarNombre}>
        <Text style={estilos.textoBoton}>Guardar Nombre</Text>
      </TouchableOpacity>

      {/* Actualizar contraseña */}
      <Text style={[estilos.etiqueta, { marginTop: 24 }]}>
        Nueva Contraseña:
      </Text>
      <TextInput
        style={estilos.entrada}
        placeholder="Nueva contraseña"
        placeholderTextColor={Colores.textoGrisOscuro}
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
      />

      <TouchableOpacity style={estilos.boton} onPress={actualizarContrasena}>
        <Text style={estilos.textoBoton}>Cambiar Contraseña</Text>
      </TouchableOpacity>
    </View>
  );
}
