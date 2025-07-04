import { StyleSheet } from "react-native";
import { Colores, Fuentes } from "../../configuraciones/theme";

export default StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: Colores.secundario,
  },
  contenedor: {
    flexGrow: 1, // Permite que el contenido se expanda
    padding: 20,
    backgroundColor: Colores.secundario, // Asegura el fondo en caso de contenido pequeño
  },
  // Título principal de la pantalla
  tituloPrincipal: {
    fontSize: 28, // Un poco más grande que tamanoTituloPrincipal
    fontWeight: Fuentes.pesoNegrita,
    color: Colores.textoClaro,
    textAlign: "center",
    marginBottom: 20,
  },
  // Subtítulos para secciones
  subtitulo: {
    fontSize: Fuentes.tamanoTitulo,
    fontWeight: Fuentes.pesoNegrita,
    color: Colores.textoClaro,
    marginTop: 20,
    marginBottom: 10,
  },
  // Párrafos de texto general
  parrafo: {
    fontSize: Fuentes.tamanoParrafo,
    color: Colores.textoGris,
    lineHeight: 22,
    marginBottom: 10,
  },
  botonPrincipal: {
    backgroundColor: Colores.primario,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  botonSecundario: {
    backgroundColor: Colores.primario, // Puede ser otro color si es un botón de acción diferente
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  botonTexto: {
    color: Colores.textoClaro,
    fontSize: Fuentes.tamanoBoton,
    fontWeight: Fuentes.pesoNegrita,
  },
  entrada: {
    backgroundColor: Colores.fondoSecundarioClaro,
    color: Colores.textoClaro,
    fontSize: Fuentes.tamanoSubtitulo,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1, // Añadido borde para consistencia
    borderColor: Colores.fondoSecundarioClaro, // Color del borde
  },
  // Estilos para el placeholderTextColor se manejan directamente en el componente
  // usando la prop placeholderTextColor={Colores.textoGrisOscuro}
  // ya que no es una propiedad de estilo directa de StyleSheet.create
});