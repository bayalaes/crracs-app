import React, { useState, useEffect } from "react";
import Encabezado from "../componentes/Encabezado";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { baseDeDatos, auth } from "../configuraciones/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Colores } from "../configuraciones/theme";
import estilos from "./estilos/RetosStyles";
import { iniciarMedicion } from "../utilidades/medicionTiempos";

/**
 * Pantalla de Lista de Retos.
 * Permite a los usuarios visualizar retos disponibles, su progreso
 * y aceptar o reiniciar retos según su estado.
 */
export default function Retos() {
  // Hook de navegación
  const navigation = useNavigation();

  // Usuario autenticado actual
  const usuario = auth.currentUser;

  // Definición de los retos estáticos (se podrían migrar a Firestore en un futuro)
  const retos = [
    {
      id: 1,
      titulo: "Participación académica",
      descripcion:
        "Inscribirte o asistir a foros, conferencias, ferias o talleres promovidos por la universidad.",
      valor: 5,
      dificultad: "Alta",
      imagen: require("../assets/retos/educacion.jpg"),
      estadoInicial: "disponible",
    },
    {
      id: 2,
      titulo: "Estado responsable",
      descripcion:
        "Participar en jornadas de limpieza o mantener orden en cafetería, salones y baños.",
      valor: 3,
      dificultad: "Media",
      imagen: require("../assets/retos/limpieza.jpg"),
      estadoInicial: "disponible",
    },
    {
      id: 3,
      titulo: "Reciclaje Consciente",
      descripcion:
        "Separar correctamente residuos en orgánicos, reciclables y no reciclables.",
      valor: 4,
      dificultad: "Media",
      imagen: require("../assets/retos/reciclaje.jpg"),
      estadoInicial: "disponible",
    },
    {
      id: 4,
      titulo: "Puntualidad Constante",
      descripcion: "Llegar a tiempo a todas tus clases durante una semana.",
      valor: 2,
      dificultad: "Baja",
      imagen: require("../assets/retos/puntualidad.jpg"),
      estadoInicial: "disponible",
    },
    {
      id: 5,
      titulo: "Lectura Voluntaria",
      descripcion:
        "Sacar un libro de la biblioteca y leerlo al menos parcialmente.",
      valor: 1,
      dificultad: "Baja",
      imagen: require("../assets/retos/lectura.jpg"),
      estadoInicial: "disponible",
    },
  ];

  // Estado para los estados de los retos del usuario
  const [estadoRetos, setEstadoRetos] = useState({});

  // Estado para los documentos de Firestore asociados a cada reto aceptado
  const [documentosRetos, setDocumentosRetos] = useState({});

  /**
   * useEffect que escucha en tiempo real los cambios en "retos_aceptados"
   * para el usuario autenticado.
   */
  useEffect(() => {
    if (!usuario) return;

    // Consulta: retos aceptados por el usuario
    const consulta = query(
      collection(baseDeDatos, "retos_aceptados"),
      where("idUsuario", "==", usuario.uid),
      orderBy("fechaEnvio", "desc")
    );

    // Suscripción en tiempo real
    const unsubscribe = onSnapshot(consulta, (snapshot) => {
      const estadosActualizados = {};
      const docsActualizados = {};

      snapshot.forEach((docu) => {
        const data = docu.data();

        // Conversión: si en Firestore el estado es "pendiente", se muestra como "en proceso"
        const estadoConvertido =
          data.estado === "pendiente" ? "en proceso" : data.estado;

        estadosActualizados[data.idReto] = estadoConvertido;
        docsActualizados[data.idReto] = docu.id;
      });

      setEstadoRetos(estadosActualizados);
      setDocumentosRetos(docsActualizados);
    });

    return () => unsubscribe(); // Limpieza
  }, [usuario]);

  /**
   * Cuenta cuántos retos tienen un estado específico.
   * @param {string} estadoDeseado
   * @returns {number}
   */
  const contarEstados = (estadoDeseado) => {
    return retos.filter((reto) => {
      const estadoActual = estadoRetos[reto.id] || reto.estadoInicial;
      return estadoActual === estadoDeseado;
    }).length;
  };

  /**
   * Reinicia el reto cambiando su estado en Firestore a "disponible".
   * @param {number} idReto
   */
  const reiniciarReto = async (idReto) => {
    const tiempo = iniciarMedicion("Reinicio de reto"); // ⏱️ Inicia medición
    try {
      const idDocumento = documentosRetos[idReto];
      if (!idDocumento) {
        Alert.alert("Error", "No se encontró el documento en Firestore.");
        return;
      }

      await updateDoc(doc(baseDeDatos, "retos_aceptados", idDocumento), {
        estado: "disponible",
      });

      Alert.alert("✅ Reto reiniciado", "Puedes volver a completarlo.");
    } catch (error) {
      console.log("Error reiniciando reto:", error.message);
      Alert.alert("Error", "No se pudo reiniciar el reto.");
    } finally {
      tiempo.finalizar(); // ⏱️ Finaliza medición y registra el tiempo
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colores.secundario }}>
      <Encabezado />
      <ScrollView
        style={estilos.scroll}
        contentContainerStyle={estilos.contenido}
      >
        {/* Título */}
        <Text style={estilos.titulo}>Lista de Retos</Text>

        {/* RESUMEN de retos */}
        <View style={estilos.resumen}>
          <Text style={estilos.itemResumen}>
            Disponible:{" "}
            <Text style={estilos.valorResumen}>
              {contarEstados("disponible")}
            </Text>
          </Text>
          <Text style={estilos.itemResumen}>
            En Proceso:{" "}
            <Text style={estilos.valorResumen}>
              {contarEstados("en proceso")}
            </Text>
          </Text>
          <Text style={estilos.itemResumen}>
            Completados:{" "}
            <Text style={estilos.valorResumen}>
              {contarEstados("completado")}
            </Text>
          </Text>
          <Text style={estilos.itemResumen}>
            Rechazados:{" "}
            <Text style={estilos.valorResumen}>
              {contarEstados("rechazado")}
            </Text>
          </Text>
        </View>

        {/* LISTA DE RETOS */}
        {retos.map((reto) => {
          const estadoActual = estadoRetos[reto.id] || reto.estadoInicial;

          // Determinar color de la etiqueta
          let colorEtiqueta = "#2196f3"; // azul para disponible
          if (estadoActual === "en proceso")
            colorEtiqueta = Colores.estadoEnProceso;
          if (estadoActual === "completado")
            colorEtiqueta = Colores.estadoCompletado;
          if (estadoActual === "rechazado")
            colorEtiqueta = Colores.estadoRechazado;

          // Determinar texto y color del botón
          let textoBoton = "▶ Aceptar Reto";
          let colorBoton = Colores.primario;
          let deshabilitado = false;

          if (estadoActual === "en proceso") {
            textoBoton = "⏳ En revisión";
            colorBoton = Colores.botonDeshabilitado;
            deshabilitado = true;
          } else if (
            estadoActual === "completado" ||
            estadoActual === "rechazado"
          ) {
            textoBoton = "🔄 Empezar de nuevo";
            colorBoton = Colores.primario;
            deshabilitado = false;
          }

          return (
            <View key={reto.id} style={estilos.tarjeta}>
              <View style={estilos.fila}>
                <Image source={reto.imagen} style={estilos.imagen} />
                <View style={estilos.info}>
                  <Text style={estilos.tituloReto}>{reto.titulo}</Text>
                  <Text style={estilos.descripcion}>{reto.descripcion}</Text>
                  <Text style={estilos.meta}>
                    Valor: {reto.valor} pts ‧ Dificultad: {reto.dificultad}
                  </Text>
                  <Text style={[estilos.estado, { color: colorEtiqueta }]}>
                    Estado: {estadoActual}
                  </Text>
                </View>
              </View>

              {/* Botón para aceptar o reiniciar reto */}
              <TouchableOpacity
                style={[estilos.boton, { backgroundColor: colorBoton }]}
                disabled={deshabilitado}
                onPress={() => {
                  if (
                    estadoActual === "completado" ||
                    estadoActual === "rechazado"
                  ) {
                    reiniciarReto(reto.id);
                  } else {
                    navigation.navigate("AceptarReto", { reto });
                  }
                }}
              >
                <Text style={estilos.textoBoton}>{textoBoton}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
