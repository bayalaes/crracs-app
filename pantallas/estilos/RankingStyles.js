import { StyleSheet } from "react-native";
import { Colores, Fuentes } from "../../configuraciones/theme";

export default StyleSheet.create({
  cargandoContenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colores.secundario,
  },

  scroll: {
  flex: 1,
  backgroundColor: Colores.secundario,
  },

  contenido: {
    padding: 20,
    paddingBottom: 100,
  },
  titulo: {
    fontSize: Fuentes.tamanoTituloPrincipal,
    fontWeight: Fuentes.pesoNegrita,
    color: Colores.textoClaro,
    textAlign: "center",
    marginBottom: 20,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Distribuye el espacio para evitar desbordamiento
    alignItems: "flex-end", // Alinea las tarjetas en la parte inferior
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 5, // Se reduce el padding para dar más espacio
    borderRadius: 10,
    backgroundColor: Colores.fondoSecundarioClaro,
  },
  topCard: {
    flex: 1, // Permite que la tarjeta se ajuste al espacio disponible
    alignItems: "center",
    backgroundColor: Colores.secundario, // Fondo más oscuro para destacar
    padding: 8, // Se reduce el padding interno
    borderRadius: 10,
    marginHorizontal: 4, // Se reduce el margen entre tarjetas
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medalla: {
    fontSize: 28, // Tamaño de medalla reducido
    marginBottom: 5,
  },
  avatarGrande: {
    width: 70, // Tamaño de avatar reducido
    height: 70,
    borderRadius: 35,
    borderWidth: 2, // Borde para destacar
    borderColor: Colores.primario, // Color del borde
    marginBottom: 5,
  },
  usuarioTop: {
    fontSize: Fuentes.tamanoSubtitulo, // Tamaño de fuente reducido
    fontWeight: Fuentes.pesoNegrita,
    color: Colores.textoClaro,
    textAlign: "center",
  },
  puntosTop: {
    fontSize: Fuentes.tamanoParrafo, // Tamaño de fuente reducido
    color: Colores.textoGris,
  },
  listaContainer: {
    backgroundColor: Colores.fondoSecundarioClaro,
    borderRadius: 10,
    padding: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colores.secundario, // Separador sutil
  },
  posicion: {
    fontSize: Fuentes.tamanoSubtitulo,
    fontWeight: Fuentes.pesoNegrita,
    color: Colores.textoClaro,
    width: 40, // Ancho fijo para la posición
    textAlign: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  usuario: {
    flex: 1,
    fontSize: Fuentes.tamanoSubtitulo,
    color: Colores.textoClaro,
  },
  puntos: {
    fontSize: Fuentes.tamanoParrafo,
    color: Colores.textoGris,
  },
});
