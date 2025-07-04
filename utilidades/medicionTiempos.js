/* 🟩 Importa las funciones necesarias de Firebase
import { addDoc, collection } from "firebase/firestore";
import { baseDeDatos } from "../configuraciones/firebase";
import { auth } from "../configuraciones/firebase"; // para obtener el usuario actual
*/

const mediciones = [];

/* 🟩 Guarda una medición en Firestore
async function guardarMedicionEnFirestore(etiqueta, duracion, fechaISO) {
  try {
    const usuario = auth.currentUser;

    await addDoc(collection(baseDeDatos, "mediciones"), {
      etiqueta,
      duracion,
      fecha: new Date(fechaISO),
      idUsuario: usuario?.uid || null,
    });

    console.log("✅ Medición registrada en Firestore");
  } catch (e) {
    console.error("❌ Error al guardar medición en Firestore:", e.message);
  }
}
*/

// 🟩 Inicia una medición de tiempo
export function iniciarMedicion(etiqueta = "Proceso") {
  const inicio = Date.now();

  return {
    finalizar: () => {
      const fin = Date.now();
      const duracionMs = fin - inicio;
      const duracionSeg = (duracionMs / 1000).toFixed(2);

      const registro = {
        etiqueta,
        duracion: parseFloat(duracionSeg),
        fecha: new Date().toISOString(),
      };

      mediciones.push(registro);
      console.log(`⏱ ${etiqueta}: ${duracionSeg}s`);

      /*🔁 También guarda en Firestore
      guardarMedicionEnFirestore(etiqueta, registro.duracion, registro.fecha);
      */

      return parseFloat(duracionSeg);
    },
  };
}

// 🟩 Obtiene todas las mediciones
export function obtenerMediciones() {
  return mediciones;
}

// 🟩 Limpia las mediciones almacenadas
export function limpiarMediciones() {
  mediciones.length = 0;
}
