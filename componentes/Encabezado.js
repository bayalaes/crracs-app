import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { auth } from "../configuraciones/firebase";
import { signOut } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAutenticacion } from "../contextos/AutenticacionContexto";
import estilos from "./estilos/EncabezadoStyles";

export default function Encabezado() {
  const navigation = useNavigation();
  const { usuario, unreadNotificationCount } = useAutenticacion();
  const isLoggedIn = !!usuario;

  const cerrarSesion = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar Sesión",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
            console.log("✅ Sesión cerrada.");
          } catch (e) {
            console.log("Error al cerrar sesión:", e.message);
            Alert.alert("Error", "No se pudo cerrar la sesión.");
          }
        },
      },
    ]);
  };

  return (
    <View style={estilos.contenedor}>
      {/* Logo */}
      <View style={estilos.lado}>
        <Image
          source={require("../assets/logo-crracs.png")}
          style={estilos.logo}
        />
      </View>

      {/* Título */}
      <View style={estilos.centro}>
        <Text style={estilos.titulo}>CRRACS</Text>
      </View>

      {/* Iconos lado derecho */}
      <View style={[estilos.lado, estilos.iconosDerecha]}>
        {isLoggedIn && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Notificaciones")}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="notifications-outline" size={24} color="#fff" />
            {unreadNotificationCount > 0 && (
              <View style={estilos.notificationBadge}>
                <Text style={estilos.notificationBadgeText}>
                  {unreadNotificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={cerrarSesion}
          style={{ marginLeft: 16 }}
          disabled={!isLoggedIn}
        >
          <Ionicons
            name="log-out-outline"
            size={24}
            color={isLoggedIn ? "#fff" : "#a9a9a9"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
