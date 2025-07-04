import { StyleSheet } from 'react-native';
import { Colores, Fuentes } from '../../configuraciones/theme';

export default StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: Colores.secundario,
    padding: 16,
  },
  mensaje: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  mensajeLeido: {
    backgroundColor: Colores.fondoSecundarioClaro,
    borderColor: '#1f2f2a',
    opacity: 0.5,
  },
  mensajeNoLeido: {
    backgroundColor: '#2c3a36',
    borderColor: '#1f2f2a',
  },
  tituloMensaje: {
    fontSize: Fuentes.tamanoTitulo,
    fontWeight: Fuentes.pesoNegrita,
    color: Colores.textoClaro,
    marginBottom: 4,
  },
  cuerpoMensaje: {
    fontSize: Fuentes.tamanoParrafo,
    color: Colores.textoGris,
    lineHeight: 20,
    marginBottom: 6,
  },
  fecha: {
    fontSize: Fuentes.tamanoMeta,
    color: Colores.textoGrisOscuro,
    textAlign: 'right',
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  etiquetaNueva: {
    backgroundColor: '#1f3c36',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  textoEtiqueta: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
