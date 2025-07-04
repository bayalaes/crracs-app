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
    alignItems: "center",
    padding: 20,
    backgroundColor: Colores.secundario,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: Colores.primario,
    marginBottom: 20,
  },
  nombre: {
    fontSize: Fuentes.tamanoTituloPrincipal,
    fontWeight: Fuentes.pesoNegrita,
    color: Colores.textoClaro,
    marginBottom: 10,
  },
  rankingTexto: {
    fontSize: Fuentes.tamanoSubtitulo,
    color: Colores.textoGris,
    marginBottom: 20,
  },
  puntosContainer: {
    backgroundColor: Colores.fondoSecundarioClaro,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 30,

  },
  puntosTexto: {
    fontSize: Fuentes.tamanoTitulo,
    fontWeight: Fuentes.pesoNegrita,
    color: Colores.primario,
  },
  boton: {
    backgroundColor: Colores.primario,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 300, // Limita el ancho máximo
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textoBoton: {
    color: Colores.textoClaro,
    fontSize: Fuentes.tamanoBoton,
    fontWeight: Fuentes.pesoNegrita,
  },
});
