import { StyleSheet } from "react-native";
import { Colores, Fuentes } from "../../configuraciones/theme";

export default StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: Colores.secundario,
  },
  contenido: {
    padding: 16,
    paddingBottom: 80,
  },
  titulo: {
    fontSize: Fuentes.tamanoTituloPrincipal,
    fontWeight: Fuentes.pesoNegrita,
    color: Colores.textoClaro,
    marginBottom: 20,
    textAlign: "center",
  },
  resumen: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: Colores.fondoSecundarioClaro,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  itemResumen: {
    color: Colores.textoClaro,
    fontSize: Fuentes.tamanoParrafo,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  valorResumen: {
    fontWeight: Fuentes.pesoNegrita,
  },
  tarjeta: {
    backgroundColor: Colores.fondoSecundarioClaro,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  fila: {
    flexDirection: "row",
  },
  imagen: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  tituloReto: {
    fontSize: Fuentes.tamanoSubtitulo,
    fontWeight: Fuentes.pesoNegrita,
    color: Colores.textoClaro,
    marginBottom: 5,
  },
  descripcion: {
    fontSize: Fuentes.tamanoParrafo,
    color: Colores.textoGris,
    marginBottom: 5,
  },
  meta: {
    fontSize: Fuentes.tamanoMeta,
    color: Colores.textoGrisOscuro,
    fontStyle: "italic",
    marginBottom: 5,
  },
  estado: {
    fontSize: Fuentes.tamanoParrafo,
    fontWeight: Fuentes.pesoNegrita,
    marginTop: 5,
  },
  boton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  textoBoton: {
    color: Colores.textoClaro,
    fontSize: Fuentes.tamanoBoton,
    fontWeight: Fuentes.pesoNegrita,
  },
});
