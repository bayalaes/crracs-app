import { StyleSheet } from "react-native";
import { Colores, Fuentes } from "../../configuraciones/theme";

export default StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Centra el contenido horizontalmente
    padding: 20, // Ajustado padding
    backgroundColor: Colores.secundario,
  },
  titulo: {
    fontSize: Fuentes.tamanoTituloPrincipal,
    fontWeight: Fuentes.pesoNegrita,
    color: Colores.textoClaro,
    textAlign: "center",
    marginBottom: 30, // Aumentado margen inferior
  },
  logo: {
    width: 150, // Aumentado tamaño del logo
    height: 150, // Aumentado tamaño del logo
    resizeMode: "contain",
    marginBottom: 20,
  },
  entrada: {
    width: "100%",
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
  contenedorEntradaConIcono: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colores.fondoSecundarioClaro,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1, // Añadido borde para consistencia
    borderColor: Colores.fondoSecundarioClaro, // Color del borde
  },
  entradaConIcono: {
    flex: 1,
    color: Colores.textoClaro,
    fontSize: Fuentes.tamanoSubtitulo, // Añadido tamaño de fuente
    padding: 12, // Ajustado padding
  },
  iconoOjo: {
    padding: 10, // Ajustado padding
  },
  textoError: {
    color: Colores.estadoRechazado,
    marginBottom: 10,
    alignSelf: "flex-start", // Alinea el error a la izquierda
    paddingLeft: 5, // Pequeño padding para el texto de error
    fontSize: Fuentes.tamanoParrafo, // Añadido tamaño de fuente
  },
  boton: {
    width: "100%",
    backgroundColor: Colores.primario,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center", // Centra el texto del botón
    marginTop: 10,
  },
  textoBoton: {
    color: Colores.textoClaro,
    fontSize: Fuentes.tamanoTitulo, // Ajustado tamaño de fuente
    fontWeight: Fuentes.pesoNegrita,
  },
  enlace: {
    color: Colores.textoClaro, // Color de texto más claro
    textAlign: "center",
    marginTop: 20, // Aumentado margen superior
    fontSize: Fuentes.tamanoParrafo, // Añadido tamaño de fuente
  },
  subrayado: {
    color: Colores.primario, // Color del subrayado
    textDecorationLine: "underline", // Asegura el subrayado
  },
});