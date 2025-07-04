import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAutenticacion } from '../contextos/AutenticacionContexto';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { baseDeDatos } from '../configuraciones/firebase';
import { Colores } from '../configuraciones/theme';
import Encabezado from "../componentes/Encabezado";
import estilos from './estilos/BienvenidaStyles';
import { iniciarMedicion } from '../utilidades/medicionTiempos';


/**
 * Pantalla de Bienvenida.
 * Muestra información sobre la aplicación y un formulario de contacto.
 */
export default function Bienvenida() {
  // Hook de navegación para redirigir entre pantallas
  const navigation = useNavigation();

  // Contexto de autenticación para saber si hay un usuario logueado
  const { usuario } = useAutenticacion();

  // Estados locales para el formulario de contacto
  const [nombreContacto, setNombreContacto] = useState('');
  const [mensajeContacto, setMensajeContacto] = useState('');

  /**
   * Función para enviar un mensaje desde el formulario de contacto.
   * Guarda el mensaje en la colección 'mensajes_contacto' de Firestore.
   */
  const enviarMensaje = async () => {
    // Validación: asegurarse de que ambos campos estén completos
    if (!nombreContacto || !mensajeContacto) {
      Alert.alert('Campos requeridos', 'Por favor completa ambos campos.');
      return;
    }
    // Inicia la medición de tiempo para el envío del mensaje
    const tiempo = iniciarMedicion('Envío de mensaje de contacto');

    try {
      // Añade un nuevo documento a la colección con los datos del formulario
      await addDoc(collection(baseDeDatos, 'mensajes_contacto'), {
        nombre: nombreContacto,
        mensaje: mensajeContacto,
        fecha: Timestamp.now(),
      });

      // Notifica éxito al usuario
      Alert.alert('✅ Mensaje enviado');

      // Limpia los campos del formulario después del envío
      setNombreContacto('');
      setMensajeContacto('');
    } catch (error) {
      // Manejo de error si falla la escritura en Firestore
      console.log('❌ Error al enviar mensaje:', error.message);
      Alert.alert('Error', 'No se pudo enviar el mensaje.');
    } finally {
      // Finaliza la medición de tiempo y registra el tiempo transcurrido
      tiempo.finalizar();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colores.secundario }}>
      {/* Encabezado general con logo y botón de cerrar sesión */}
      <Encabezado />

      {/* Contenedor principal con scroll para dispositivos pequeños */}
      <ScrollView style={estilos.scroll} contentContainerStyle={estilos.contenedor}>
        
        {/* Título de la aplicación */}
        <Text style={estilos.tituloPrincipal}>Bienvenido a CRRACS</Text>

        {/* Descripción de la app */}
        <Text style={estilos.parrafo}>
          CRRACS es una plataforma innovadora diseñada para fomentar la participación
          estudiantil a través de un sistema de clasificación y desafíos basados en el
          cumplimiento de normas ciudadanas.
        </Text>

        {/* Sección "¿Quiénes somos?" */}
        <Text style={estilos.subtitulo}>¿Quiénes Somos?</Text>
        <Text style={estilos.parrafo}>
          Somos un equipo apasionado por construir una sociedad más cívica y comprometida.
          Creemos que cada acción cuenta y que, juntos, podemos hacer una diferencia.
        </Text>

        {/* Sección "Nuestros Servicios" */}
        <Text style={estilos.subtitulo}>Nuestros Servicios</Text>
        <Text style={estilos.parrafo}>
          Ofrecemos una variedad de desafíos y actividades diseñadas para promover el
          cumplimiento de normas ciudadanas y fomentar la interacción entre estudiantes.
        </Text>

        {/* Sección "Importancia de las normas" */}
        <Text style={estilos.subtitulo}>La Importancia de las Normas</Text>
        <Text style={estilos.parrafo}>
          Las normas ciudadanas son la base de una convivencia armoniosa y respetuosa. Al
          cumplirlas, contribuimos a un entorno más seguro, limpio y agradable para todos.
        </Text>

        {/* Botón "Comencemos" visible solo si no hay usuario autenticado */}
        {!usuario && (
          <TouchableOpacity
            style={estilos.botonPrincipal}
            onPress={() => navigation.navigate('InicioSesion')}
          >
            <Text style={estilos.botonTexto}>¡Comencemos!</Text>
          </TouchableOpacity>
        )}

        {/* Formulario de contacto */}
        <Text style={estilos.subtitulo}>Contáctanos</Text>

        {/* Campo de texto para el nombre */}
        <TextInput
          style={estilos.entrada}
          placeholder="Tu nombre completo"
          placeholderTextColor={Colores.textoGrisOscuro}
          value={nombreContacto}
          onChangeText={setNombreContacto}
        />

        {/* Campo de texto para el mensaje */}
        <TextInput
          style={[estilos.entrada, { height: 100 }]}
          placeholder="Escribe tu mensaje aquí..."
          placeholderTextColor={Colores.textoGrisOscuro}
          multiline
          value={mensajeContacto}
          onChangeText={setMensajeContacto}
        />

        {/* Botón para enviar el mensaje */}
        <TouchableOpacity onPress={enviarMensaje}>
          <View style={estilos.botonSecundario}>
            <Text style={estilos.botonTexto}>Enviar</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
