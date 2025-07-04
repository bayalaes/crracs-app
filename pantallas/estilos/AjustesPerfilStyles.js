import { StyleSheet } from "react-native";
import { Colores, Fuentes } from "../../configuraciones/theme";

export default StyleSheet.create({
  cargandoContenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colores.secundario,
  },
  contenedor: {
    flex: 1,
    padding: 20, // Ajustado padding
    backgroundColor: Colores.secundario,
    justifyContent: "center", // Centra el contenido verticalmente
  },
  titulo: {
    fontSize: Fuentes.tamanoTituloPrincipal,
    fontWeight: Fuentes.pesoNegrita,
    color: Colores.textoClaro,
    textAlign: "center",
    marginBottom: 30, // Aumentado margen inferior
  },
  etiqueta: {
    fontSize: Fuentes.tamanoSubtitulo, // Añadido tamaño de fuente
    color: Colores.textoClaro,
    marginBottom: 8, // Ajustado margen
  },
  entrada: {
    backgroundColor: Colores.fondoSecundarioClaro,
    color: Colores.textoClaro,
    fontSize: Fuentes.tamanoSubtitulo, // Añadido tamaño de fuente
    padding: 12, // Ajustado padding
    borderRadius: 8, // Ajustado borderRadius
    marginBottom: 15, // Ajustado margen
    borderWidth: 1, // Añadido borde para consistencia
    borderColor: Colores.fondoSecundarioClaro, // Color del borde
  },
  // placeholderTextColor se maneja directamente en el componente
  boton: {
    backgroundColor: Colores.primario,
    paddingVertical: 12, // Ajustado padding
    paddingHorizontal: 30, // Añadido padding horizontal
    borderRadius: 8, // Ajustado borderRadius
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // Ocupa todo el ancho
    shadowColor: "#000", // Añadido sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textoBoton: {
    color: Colores.textoClaro,
    fontSize: Fuentes.tamanoBoton, // Añadido tamaño de fuente
    fontWeight: Fuentes.pesoNegrita,
  },
});