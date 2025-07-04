import { StyleSheet } from "react-native";
import { Colores, Fuentes } from "../../configuraciones/theme";

export default StyleSheet.create({
  contenedor: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colores.secundario,
  },

  titulo: {
    fontSize: Fuentes.tamanoTitulo,
    fontWeight: Fuentes.pesoNegrita,
    color: Colores.textoClaro,
    marginBottom: 20,
    textAlign: "center",
  },

  entrada: {
    backgroundColor: Colores.fondoSecundarioClaro,
    color: Colores.textoClaro,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: Fuentes.tamanoParrafo,
    borderWidth: 1,
    borderColor: "#22332e",
  },

  etiqueta: {
    color: Colores.textoClaro,
    fontSize: Fuentes.tamanoParrafo,
    fontWeight: Fuentes.pesoNegrita,
    marginTop: 10,
    marginBottom: 8,
  },

  boton: {
    backgroundColor: Colores.primario,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  botonTexto: {
    color: "#fff",
    fontWeight: Fuentes.pesoNegrita,
    fontSize: Fuentes.tamanoBoton,
  },

  multiSelectDropdown: {
    backgroundColor: Colores.fondoSecundarioClaro,
    borderColor: "#22332e",
    borderWidth: 1,
    borderRadius: 10,
  },

  multiSelectInputGroup: {
    backgroundColor: Colores.fondoSecundarioClaro,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  multiSelectItemsContainer: {
    backgroundColor: Colores.fondoSecundarioClaro,
    maxHeight: 200, // ✅ Evita que la lista se salga de la pantalla
  },

  multiSelectSelectorContainer: {
    backgroundColor: Colores.fondoSecundarioClaro,
  },

  multiSelectRow: {
    backgroundColor: Colores.fondoSecundarioClaro,
    borderBottomColor: "#2c4038",
    borderBottomWidth: 1,
  },

  multiSelectSearchInput: {
    color: Colores.textoClaro,
  },
});
