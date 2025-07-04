import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { baseDeDatos } from "../configuraciones/firebase";
import { useAutenticacion } from "../contextos/AutenticacionContexto";
import estilos from "./estilos/NotificacionesStyles";
import { iniciarMedicion } from "../utilidades/medicionTiempos"; 

export default function Notificaciones() {
  const { usuario } = useAutenticacion();
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!usuario) return;

    const medirCarga = iniciarMedicion("Carga de notificaciones"); // ⏱

    const q = query(
      collection(baseDeDatos, "notificaciones"),
      where("idUsuario", "==", usuario.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotificaciones(
        datos.sort((a, b) => b.fecha?.toDate() - a.fecha?.toDate())
      );
      setCargando(false);

      console.log("⏱ Notificaciones cargadas en:", medirCarga.finalizar(), "s"); // ⏱
    });

    return () => unsubscribe();
  }, [usuario]);

  const marcarComoLeida = async (id) => {
    const medirLectura = iniciarMedicion("Marcar como leída"); // ⏱

    try {
      const ref = doc(baseDeDatos, "notificaciones", id);
      await updateDoc(ref, { read: true });
      console.log("⏱ Notificación actualizada en:", medirLectura.finalizar(), "s"); // ⏱
    } catch (error) {
      console.log("❌ Error al marcar como leída:", error.message);
    }
  };

  if (cargando) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <FlatList
      data={notificaciones}
      keyExtractor={(item) => item.id}
      contentContainerStyle={estilos.contenedor}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => !item.read && marcarComoLeida(item.id)}
          style={[
            estilos.mensaje,
            item.read ? estilos.mensajeLeido : estilos.mensajeNoLeido,
          ]}
        >
          <View style={estilos.encabezado}>
            <Text style={estilos.tituloMensaje}>{item.titulo}</Text>
            {!item.read && (
              <View style={estilos.etiquetaNueva}>
                <Text style={estilos.textoEtiqueta}>🔔 Nueva</Text>
              </View>
            )}
          </View>
          <Text style={estilos.cuerpoMensaje}>{item.mensaje}</Text>
          {item.fecha && (
            <Text style={estilos.fecha}>
              {item.fecha.toDate().toLocaleString()}
            </Text>
          )}
        </TouchableOpacity>
      )}
    />
  );
}
