import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configuraciones/firebase";
import { Ionicons } from "@expo/vector-icons";
import { Colores } from "../configuraciones/theme";
import estilos from "./estilos/InicioSesionStyles";
import { iniciarMedicion } from "../utilidades/medicionTiempos";

/**
 * Pantalla de Inicio de Sesión.
 * Permite al usuario autenticarse con correo y contraseña en Firebase.
 */
export default function InicioSesion() {
  // Hook de navegación
  const navigation = useNavigation();

  // Estados para el formulario
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  // Estado para mostrar un spinner durante el inicio de sesión
  const [cargando, setCargando] = useState(false);

  // Estado para mostrar u ocultar la contraseña
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  // Estados para mostrar errores en los campos
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorContrasena, setErrorContrasena] = useState("");

  /**
   * Función que maneja el proceso de inicio de sesión con Firebase Auth.
   */
  const iniciarSesion = async () => {
    // Limpia errores previos
    setErrorCorreo("");
    setErrorContrasena("");

    // Validación de campos vacíos
    if (!correo.trim()) {
      setErrorCorreo("El correo es requerido.");
      return;
    }
    if (!contrasena.trim()) {
      setErrorContrasena("La contraseña es requerida.");
      return;
    }

    setCargando(true);
    const tiempo = iniciarMedicion("Inicio de sesión"); // ⏱️ Inicia la medición de tiempo

    try {
      // Inicia sesión con correo y contraseña usando Firebase Auth
      await signInWithEmailAndPassword(auth, correo, contrasena);
      console.log("✅ Sesión iniciada con:", correo);

      // La redirección es automática gracias al contexto de autenticación
    } catch (error) {
      // Manejo de errores según el tipo
      console.log("❌ Error al iniciar sesión:", error.message);

      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/user-not-found"
      ) {
        setErrorCorreo("Correo no registrado o inválido.");
      } else if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/too-many-requests"
      ) {
        setErrorContrasena("Contraseña incorrecta o demasiados intentos.");
      } else {
        Alert.alert("Error", "No se pudo iniciar sesión. Intenta de nuevo.");
      }
    } finally {
      tiempo.finalizar(); // ⏱️ Aquí se mide y registra el tiempo
      setCargando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={estilos.contenedor}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Logo de la aplicación */}
      <Image
        source={require("../assets/logo-crracs.png")}
        style={estilos.logo}
      />

      {/* Título */}
      <Text style={estilos.titulo}>Iniciar Sesión</Text>

      {/* Campo de entrada para el correo */}
      <TextInput
        style={estilos.entrada}
        placeholder="Correo institucional"
        placeholderTextColor={Colores.textoGrisOscuro}
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
        onFocus={() => setErrorCorreo("")}
      />
      {/* Error en correo */}
      {errorCorreo ? (
        <Text style={estilos.textoError}>{errorCorreo}</Text>
      ) : null}

      {/* Campo de entrada para la contraseña con icono de mostrar/ocultar */}
      <View style={estilos.contenedorEntradaConIcono}>
        <TextInput
          style={estilos.entradaConIcono}
          placeholder="Contraseña"
          placeholderTextColor={Colores.textoGrisOscuro}
          secureTextEntry={!mostrarContrasena}
          value={contrasena}
          onChangeText={setContrasena}
          onFocus={() => setErrorContrasena("")}
        />
        {/* Botón para mostrar u ocultar contraseña */}
        <TouchableOpacity
          style={estilos.iconoOjo}
          onPress={() => setMostrarContrasena(!mostrarContrasena)}
        >
          <Ionicons
            name={mostrarContrasena ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={Colores.textoGrisOscuro}
          />
        </TouchableOpacity>
      </View>
      {/* Error en contraseña */}
      {errorContrasena ? (
        <Text style={estilos.textoError}>{errorContrasena}</Text>
      ) : null}

      {/* Botón para iniciar sesión */}
      <TouchableOpacity
        style={estilos.boton}
        onPress={iniciarSesion}
        disabled={cargando}
      >
        {cargando ? (
          <ActivityIndicator size="small" color={Colores.textoClaro} />
        ) : (
          <Text style={estilos.textoBoton}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>

      {/* Enlace a la pantalla de registro */}
      <Text
        style={estilos.enlace}
        onPress={() => navigation.navigate("Registro")}
      >
        ¿No tienes cuenta? <Text style={estilos.subrayado}>Regístrate</Text>
      </Text>
    </KeyboardAvoidingView>
  );
}
