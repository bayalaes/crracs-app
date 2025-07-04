import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0c1c17",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#22332e",
  },
  lado: {
    width: 60,
  },
  centro: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  titulo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  iconosDerecha: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  // --- Estilos para el badge de notificación ---
  notificationBadge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red', // Color del badge
    borderRadius: 10, // Para hacerlo circular
    width: 20, // Ancho del badge
    height: 20, // Alto del badge
    justifyContent: 'center',
    alignItems: 'center', // Asegura que esté por encima del icono
    zIndex: 1, // Asegura que esté por encima del icono
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 12, // Tamaño de la fuente del número
    fontWeight: 'bold',
  },
  // --- Fin de nuevos estilos ---
});