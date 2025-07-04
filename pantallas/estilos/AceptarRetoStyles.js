import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#0c1c17",
    padding: 20,
  },
  etiqueta: {
    color: "#ccc",
    fontWeight: "bold",
    marginBottom: 10,
  },
  zonaCarga: {
    borderWidth: 1,
    borderColor: "#444",
    borderStyle: "dashed",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 180,
    marginBottom: 30,
  },
  textoZona: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 6,
    fontSize: 16,
  },
  textoSub: {
    color: "#ccc",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },
  botonInterno: {
    backgroundColor: "#2f3e38",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoInterno: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagen: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    resizeMode: "cover",
  },
  botonPrincipal: {
    backgroundColor: "#00B25D",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  botonSecundario: {
    backgroundColor: "#22332e",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
});