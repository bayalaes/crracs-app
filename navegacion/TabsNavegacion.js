/**
 * Componente de navegación inferior (tab bar) para la app CRRACS.
 * Muestra pestañas para las pantallas principales.
 * Si el usuario es administrador, se muestra también la pestaña Admin.
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Bienvenida from '../pantallas/Bienvenida';
import Retos from '../pantallas/Retos';
import Ranking from '../pantallas/Ranking';
import Perfil from '../pantallas/Perfil';
import AdminPanel from '../pantallas/AdminPanel';

import { useAutenticacion } from '../contextos/AutenticacionContexto';

const Tab = createBottomTabNavigator();

export default function TabsNavegacion() {
  const { usuario } = useAutenticacion();
  const esAdmin = usuario?.rol === 'administrador';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: '#0c1c17', borderTopColor: '#1a2b25' },
        tabBarActiveTintColor: '#00B25D',
        tabBarInactiveTintColor: '#ccc',
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let icono;

          switch (route.name) {
            case 'Inicio':
              icono = 'home-outline';
              break;
            case 'Retos':
              icono = 'flag-outline';
              break;
            case 'Ranking':
              icono = 'trophy-outline';
              break;
            case 'Perfil':
              icono = 'person-outline';
              break;
            case 'Admin':
              icono = 'settings-outline';
              break;
            default:
              icono = 'ellipse-outline';
          }

          return <Ionicons name={icono} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Bienvenida} />
      <Tab.Screen name="Retos" component={Retos} />
      <Tab.Screen name="Ranking" component={Ranking} />
      <Tab.Screen name="Perfil" component={Perfil} />
      {esAdmin && (
        <Tab.Screen
          name="Admin"
          component={AdminPanel}
          options={{ title: 'Admin' }}
        />
      )}
    </Tab.Navigator>
  );
}
