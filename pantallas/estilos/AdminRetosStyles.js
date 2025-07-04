import { StyleSheet } from "react-native";
import { Colores, Fuentes } from "../../configuraciones/theme";

export default StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: Colores.secundario,
  },
  contenido: {
    padding: 20,
    paddingBottom: 100, // Añadido para asegurar espacio en la parte inferior
  },
  titulo: {
    color: Colores.textoClaro,
    fontSize: Fuentes.tamanoTituloPrincipal,
    fontWeight: Fuentes.pesoNegrita,
    marginBottom: 20,
    textAlign: "center",
  },
  tarjeta: {
    backgroundColor: Colores.fondoSecundarioClaro,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000", // Añadido para consistencia con otras tarjetas
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tituloReto: {
    fontSize: Fuentes.tamanoSubtitulo,
    fontWeight: Fuentes.pesoNegrita,
    color: Colores.textoClaro,
    marginBottom: 10,
  },
  imagen: {
    width: "100%",
    height: 200, // Ajustado para ser más grande
    borderRadius: 8, // Ajustado para ser más pequeño
    marginBottom: 10,
    resizeMode: "cover", // Asegura que la imagen se ajuste bien
  },
  texto: {
    color: Colores.textoGris,
    fontSize: Fuentes.tamanoParrafo, // Añadido tamaño de fuente
    marginBottom: 5, // Ajustado margen
  },
  botones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  botonAceptar: {
    backgroundColor: Colores.primario,
    padding: 10,
    borderRadius: 8, // Ajustado para consistencia
    flex: 0.48,
    alignItems: "center",
  },
  botonRechazar: {
    backgroundColor: Colores.estadoRechazado,
    padding: 10,
    borderRadius: 8, // Ajustado para consistencia
    flex: 0.48,
    alignItems: "center",
  },
  textoBoton: {
    color: Colores.textoClaro,
    fontSize: Fuentes.tamanoBoton, // Añadido tamaño de fuente
    fontWeight: Fuentes.pesoNegrita,
  },
});