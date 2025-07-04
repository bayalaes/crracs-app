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
    fontSize: Fuentes.tamanoTituloPrincipal,
    fontWeight: Fuentes.pesoNegrita,
    color: Colores.textoClaro,
    marginBottom: 20,
    textAlign: "center",
  },
  texto: {
    fontSize: Fuentes.tamanoSubtitulo, // Añadido tamaño de fuente
    color: Colores.textoGris,
    textAlign: "center",
    marginTop: 20,
  },
  tarjeta: {
    backgroundColor: Colores.fondoSecundarioClaro,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000", // Añadido sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nombre: {
    fontSize: Fuentes.tamanoTitulo,
    fontWeight: Fuentes.pesoNegrita,
    color: Colores.textoClaro,
    marginBottom: 5,
  },
  mensaje: {
    fontSize: Fuentes.tamanoParrafo,
    color: Colores.textoGris,
    marginBottom: 10,
  },
  fecha: {
    fontSize: Fuentes.tamanoMeta,
    color: Colores.textoGrisOscuro,
    fontStyle: "italic", // Añadido estilo cursiva
    textAlign: "right",
  },
});