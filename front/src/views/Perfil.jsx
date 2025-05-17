import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonSpinner, IonButtons
} from '@ionic/react';
import { useUser } from '../context/UserContext';
import { getComprasUsuario } from '../api/api';
import { Tab } from '../components/Tab';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const { user } = useUser();
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      cargarCompras();
    }
  }, [user]);

const cargarCompras = async () => {
  try {
    setLoading(true);
    const data = await getComprasUsuario(user.id_user);
    console.log("Datos recibidos:", data); // Para depuración
    if (data && Array.isArray(data)) {
      setCompras(data);
    } else {
      console.error("Datos recibidos no son un array:", data);
      setCompras([]);
    }
  } catch (error) {
    console.error('Error al cargar compras:', error);
    setCompras([]);
  } finally {
    setLoading(false);
  }
};

  // Nuevo logout con navigate y limpieza de localStorage
  const handleLogout = () => {
    localStorage.clear();  
    navigate('/', { replace: true });
  };

  if (!user) return (
    <IonPage>
      <IonContent>
        <p>No hay usuario logueado.</p>
      </IonContent>
    </IonPage>
  );

  return (
    <>
      <IonPage>
        <IonHeader>
  <IonToolbar>
    <IonTitle>Perfil de {user?.nombre}</IonTitle>
    <IonButtons slot="end">
      <IonButton color="danger" onClick={handleLogout}>
        Cerrar sesión
      </IonButton>
    </IonButtons>
  </IonToolbar>
</IonHeader>

        <IonContent className="ion-padding">
          {/* Datos del usuario */}
          <IonCard>
            <IonCardHeader>
              <h2>Datos del usuario</h2>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel><strong>Nombre:</strong> {user?.nombre || '-'}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel><strong>Email:</strong> {user?.email}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel><strong>Rol:</strong> {user?.rol}</IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Últimas Compras</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {loading ? (
                <IonSpinner name="crescent" />
              ) : compras.length === 0 ? (
                <p>No tienes compras recientes.</p>
              ) : (
               <IonList>
  {compras.map((compra) => (
    <IonItem key={compra._id} lines="none">
      <IonLabel>
        <h3>Total: ${compra.total}</h3>
        <p>Fecha: {new Date(compra.fecha).toLocaleDateString()}</p>
        <h4>Productos:</h4>
        <ul>
          {compra.productos.map((prod, idx) => (
            <li key={idx}>
              {prod.productoId?.nombreProducto || 'Producto eliminado'} - 
              Cantidad: {prod.cantidad} - 
              Precio unitario: ${prod.precioUnitario}
            </li>
          ))}
        </ul>
      </IonLabel>
    </IonItem>
  ))}
</IonList>

              )}
            </IonCardContent>
          </IonCard>

         
        </IonContent>
      </IonPage>
      <Tab />
    </>
  );
};

export default Perfil;
