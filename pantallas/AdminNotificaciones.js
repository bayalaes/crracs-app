import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { baseDeDatos } from "../configuraciones/firebase";
import estilos from "./estilos/AdminNotificacionesStyles";
import MultiSelect from "react-native-multiple-select";
import { Colores } from "../configuraciones/theme";
import { iniciarMedicion } from "../utilidades/medicionTiempos";

export default function AdminNotificaciones() {
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [destinatarios, setDestinatarios] = useState([]);

  useEffect(() => {
    const cargarUsuarios = async () => {
      const medirCarga = iniciarMedicion("Carga de usuarios");
      try {
        const querySnapshot = await getDocs(collection(baseDeDatos, "usuarios"));
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          nombre: doc.data().nombre || "Usuario sin nombre",
        }));
        setUsuarios(lista);
        console.log("⏱ Usuarios cargados en:", medirCarga.finalizar(), "s");
      } catch (error) {
        console.error("❌ Error al cargar usuarios:", error.message);
        Alert.alert("Error", "No se pudieron cargar los usuarios.");
      }
    };

    cargarUsuarios();
  }, []);

  const enviarNotificacion = async () => {
    if (!titulo.trim() || !mensaje.trim()) {
      Alert.alert("Campos requeridos", "Completa el título y mensaje.");
      return;
    }

    if (destinatarios.length === 0) {
      Alert.alert("Selecciona al menos un usuario destinatario.");
      return;
    }

    setEnviando(true);
    const medirEnvio = iniciarMedicion("Envío de notificaciones");

    try {
      const batch = destinatarios.map((uid) =>
        addDoc(collection(baseDeDatos, "notificaciones"), {
          titulo: titulo.trim(),
          mensaje: mensaje.trim(),
          read: false,
          idUsuario: uid,
          fecha: new Date(),
        })
      );

      await Promise.all(batch);
      console.log("⏱ Notificaciones enviadas en:", medirEnvio.finalizar(), "s");

      Alert.alert("✅ Notificaciones enviadas");
      setTitulo("");
      setMensaje("");
      setDestinatarios([]);
    } catch (error) {
      console.log("❌ Error al enviar:", error.message);
      Alert.alert("Error", "No se pudieron enviar las notificaciones.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[estilos.contenedor, { flex: 1 }]}>
        <Text style={estilos.titulo}>Enviar Notificación</Text>

        <TextInput
          style={estilos.entrada}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
        />

        <TextInput
          style={[estilos.entrada, { height: 100 }]}
          placeholder="Mensaje"
          multiline
          value={mensaje}
          onChangeText={setMensaje}
        />

        <Text style={estilos.etiqueta}>Seleccionar usuarios:</Text>

        <MultiSelect
          items={usuarios}
          uniqueKey="id"
          onSelectedItemsChange={setDestinatarios}
          selectedItems={destinatarios}
          selectText="Seleccionar destinatarios"
          searchInputPlaceholderText="Buscar..."
          displayKey="nombre"
          styleDropdownMenuSubsection={estilos.multiSelectDropdown}
          styleInputGroup={estilos.multiSelectInputGroup}
          styleItemsContainer={estilos.multiSelectItemsContainer}
          styleSelectorContainer={estilos.multiSelectSelectorContainer}
          styleRowList={estilos.multiSelectRow}
          itemTextColor={Colores.textoClaro}
          selectedItemTextColor={Colores.primario}
          selectedItemIconColor={Colores.primario}
          tagTextColor={Colores.textoClaro}
          tagBorderColor={Colores.primario}
          tagRemoveIconColor={Colores.textoClaro}
          searchInputStyle={estilos.multiSelectSearchInput}
          submitButtonColor={Colores.primario}
          submitButtonText="Confirmar"
        />

        <TouchableOpacity
          onPress={enviarNotificacion}
          style={[estilos.boton, enviando && { opacity: 0.6 }]}
          disabled={enviando}
        >
          {enviando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={estilos.botonTexto}>Enviar</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
