import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, baseDeDatos } from "../configuraciones/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

const AutenticacionContexto = createContext({
  usuario: null,
  cargando: true,
  unreadNotificationCount: 0,
});

export function AutenticacionProveedor({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  // 🔐 Escuchar cambios de sesión (login/logout)
  useEffect(() => {
    const cancelarSuscripcionAuth = onAuthStateChanged(
      auth,
      async (usuarioFirebase) => {
        if (usuarioFirebase) {
          const refUsuario = doc(baseDeDatos, "usuarios", usuarioFirebase.uid);
          const docSnap = await getDoc(refUsuario);

          if (docSnap.exists()) {
            setUsuario({ ...usuarioFirebase, ...docSnap.data() });
          } else {
            console.warn("CONTEXTO: Usuario no encontrado en Firestore.");
            setUsuario(usuarioFirebase);
          }
        } else {
          setUsuario(null);
        }

        setCargando(false);
      }
    );

    return () => {
      cancelarSuscripcionAuth();
    };
  }, []);

  // 🔔 Escuchar notificaciones no leídas SOLO del usuario actual
  useEffect(() => {
    if (!usuario) {
      setUnreadNotificationCount(0);
      return;
    }

    const qUser = query(
      collection(baseDeDatos, "notificaciones"),
      where("idUsuario", "==", usuario.uid)
    );

    const unsubUser = onSnapshot(qUser, (snap) => {
      const personales = snap.docs.filter((doc) => doc.data().read !== true);
      setUnreadNotificationCount(personales.length);
    });

    return () => {
      unsubUser();
    };
  }, [usuario]);

  return (
    <AutenticacionContexto.Provider
      value={{ usuario, cargando, unreadNotificationCount }}
    >
      {children}
    </AutenticacionContexto.Provider>
  );
}

export function useAutenticacion() {
  return useContext(AutenticacionContexto);
}
