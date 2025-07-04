import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { baseDeDatos } from "../configuraciones/firebase";
import {
  collection,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  increment,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import estilos from "./estilos/AdminRetosStyles";
import { iniciarMedicion } from "../utilidades/medicionTiempos"; // ✅

export default function AdminRetos() {
  const [retosPendientes, setRetosPendientes] = useState([]);

  /**
   * Carga en tiempo real los retos pendientes (estado "pendiente").
   */
  useEffect(() => {
    const consulta = query(
      collection(baseDeDatos, "retos_aceptados"),
      where("estado", "==", "pendiente"),
      orderBy("fechaEnvio", "desc")
    );

    const unsuscribe = onSnapshot(consulta, async (snapshot) => {
      const iniciar = iniciarMedicion("Cargar retos pendientes"); // ⏱ Inicio de medición

      const lista = [];

      for (const docReto of snapshot.docs) {
        const datosReto = docReto.data();

        // Obtener datos del usuario que aceptó el reto
        const refUsuario = doc(baseDeDatos, "usuarios", datosReto.idUsuario);
        const docUsuario = await getDoc(refUsuario);
        const datosUsuario = docUsuario.exists() ? docUsuario.data() : {};

        lista.push({
          id: docReto.id,
          ...datosReto,
          nombreUsuario: datosUsuario.nombre || "Usuario",
        });
      }

      setRetosPendientes(lista);

      console.log("⏱ Retos cargados en:", iniciar.finalizar(), "s"); // ⏱ Fin de medición
    });

    return () => unsuscribe();
  }, []);

  /**
   * Actualiza el estado de un reto (completado/rechazado).
   * Si se aprueba, suma puntos al usuario.
   */
  const actualizarEstado = async (
    idDocAceptado,
    idUsuario,
    valor,
    nuevoEstado
  ) => {
    const iniciar = iniciarMedicion(`Actualizar reto a ${nuevoEstado}`); // ⏱ Inicio

    try {
      await updateDoc(doc(baseDeDatos, "retos_aceptados", idDocAceptado), {
        estado: nuevoEstado,
      });

      if (nuevoEstado === "completado") {
        const refUsuario = doc(baseDeDatos, "usuarios", idUsuario);
        await updateDoc(refUsuario, {
          totalPuntos: increment(valor),
          ultimaActualizacionPuntos: new Date(),
        });
      }

      console.log("⏱ Estado actualizado en:", iniciar.finalizar(), "s"); // ⏱ Fin
      Alert.alert("✅ Éxito", `Reto marcado como ${nuevoEstado}`);
    } catch (e) {
      console.log("Error actualizando:", e.message);
      Alert.alert("Error", "No se pudo actualizar el reto.");
    }
  };

  return (
    <ScrollView style={estilos.scroll} contentContainerStyle={estilos.contenido}>
      <Text style={estilos.titulo}>Panel de Validación</Text>

      {retosPendientes.map((item) => (
        <View key={item.id} style={estilos.tarjeta}>
          <Text style={estilos.tituloReto}>{item.tituloReto}</Text>

          {item.urlImagen && (
            <Image source={{ uri: item.urlImagen }} style={estilos.imagen} />
          )}

          <Text style={estilos.texto}>Usuario: {item.nombreUsuario}</Text>
          <Text style={estilos.texto}>Estado: {item.estado}</Text>

          {item.estado === "pendiente" && (
            <View style={estilos.botones}>
              <TouchableOpacity
                style={estilos.botonAceptar}
                onPress={() =>
                  actualizarEstado(
                    item.id,
                    item.idUsuario,
                    item.valor,
                    "completado"
                  )
                }
              >
                <Text style={estilos.textoBoton}>Aprobar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={estilos.botonRechazar}
                onPress={() =>
                  actualizarEstado(
                    item.id,
                    item.idUsuario,
                    item.valor,
                    "rechazado"
                  )
                }
              >
                <Text style={estilos.textoBoton}>Rechazar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
