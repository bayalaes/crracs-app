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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, baseDeDatos } from "../configuraciones/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { Colores } from "../configuraciones/theme";
import estilos from "./estilos/RegistroStyles";
import { iniciarMedicion } from "../utilidades/medicionTiempos";

/**
 * Pantalla de Registro de usuario.
 * Permite crear una cuenta nueva en Firebase Auth y registrar datos en Firestore.
 */
export default function Registro() {
  // Hook de navegación
  const navigation = useNavigation();

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  // Estado para mostrar spinner de carga
  const [cargando, setCargando] = useState(false);

  // Estado para mostrar u ocultar la contraseña
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  // Estados para mostrar errores en campos
  const [errorNombre, setErrorNombre] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorContrasena, setErrorContrasena] = useState("");

  /**
   * Función para registrar un nuevo usuario.
   * Crea el usuario en Firebase Auth y un documento en Firestore.
   */
  const registrarse = async () => {
    // Limpiar errores previos
    setErrorNombre("");
    setErrorCorreo("");
    setErrorContrasena("");

    // Validación de campos
    if (!nombre.trim()) {
      setErrorNombre("El nombre es requerido.");
      return;
    }
    if (!correo.trim() || !/\S+@\S+\.\S+/.test(correo)) {
      setErrorCorreo("El correo es requerido y debe ser válido.");
      return;
    }
    if (!contrasena.trim() || contrasena.length < 6) {
      setErrorContrasena(
        "La contraseña es requerida y debe tener al menos 6 caracteres."
      );
      return;
    }

    setCargando(true);
    const tiempo = iniciarMedicion("Registro de usuario"); // ⏱️ Inicia la medición de tiempo

    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        correo.trim(),
        contrasena
      );
      const usuario = userCredential.user;

      // Crear documento en colección "usuarios" de Firestore
      await setDoc(doc(baseDeDatos, "usuarios", usuario.uid), {
        nombre: nombre.trim(),
        correo: correo.trim(),
        rol: "estudiante",
        urlFoto: null,
        creadoEn: Timestamp.now(),
        totalPuntos: 0,
        ultimaActualizacionPuntos: Timestamp.now(),
      });

      // Notificar éxito
      Alert.alert("✅ Registro exitoso", "Tu cuenta ha sido creada.");

      // 🚫 No hacer navegación manual
      // El contexto de autenticación redirige automáticamente a TabsUsuario
    } catch (error) {
      // Manejo de errores en registro
      console.log("❌ Error en registro:", error.message);
      let mensaje = "No se pudo completar el registro.";
      if (error.code === "auth/email-already-in-use") {
        mensaje = "El correo ya está en uso.";
      } else if (error.code === "auth/weak-password") {
        mensaje = "La contraseña debe tener al menos 6 caracteres.";
      } else if (error.code === "auth/invalid-email") {
        mensaje = "El correo no es válido.";
      }
      Alert.alert("Error", mensaje);
    } finally {
      tiempo.finalizar(); // ⏱️ Aquí se mide y registra el tiempo
      setCargando(false);

      // Limpiar campos si no hubo errores en validación previa
      if (!errorNombre && !errorCorreo && !errorContrasena) {
        setNombre("");
        setCorreo("");
        setContrasena("");
      }
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
      <Text style={estilos.titulo}>Registro</Text>

      {/* Campo de nombre */}
      <TextInput
        style={estilos.entrada}
        placeholder="Nombre completo"
        placeholderTextColor={Colores.textoGrisOscuro}
        value={nombre}
        onChangeText={setNombre}
        onFocus={() => setErrorNombre("")}
      />
      {/* Error en nombre */}
      {errorNombre ? (
        <Text style={estilos.textoError}>{errorNombre}</Text>
      ) : null}

      {/* Campo de correo */}
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

      {/* Campo de contraseña con icono para mostrar/ocultar */}
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
        {/* Botón de mostrar/ocultar contraseña */}
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

      {/* Botón de registro */}
      <TouchableOpacity
        style={estilos.boton}
        onPress={registrarse}
        disabled={cargando}
      >
        {cargando ? (
          <ActivityIndicator size="small" color={Colores.textoClaro} />
        ) : (
          <Text style={estilos.textoBoton}>Registrarse</Text>
        )}
      </TouchableOpacity>

      {/* Enlace para ir a Iniciar Sesión */}
      <Text
        style={estilos.enlace}
        onPress={() => navigation.navigate("InicioSesion")}
      >
        ¿Ya tienes una cuenta?{" "}
        <Text style={estilos.subrayado}>Iniciar sesión</Text>
      </Text>
    </KeyboardAvoidingView>
  );
}
