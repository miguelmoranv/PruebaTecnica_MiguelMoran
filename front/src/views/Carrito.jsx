import React, { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonToast,
} from "@ionic/react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { realizarCompra } from "../api/api";
import { Tab } from "../components/Tab";

const Carrito = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  

  const total = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  const handleFinalizarCompra = async () => {
  if (!user?.id_user) {
    setToastMsg("Debes iniciar sesión para realizar la compra");
    return;
  }

  setLoading(true);
  try {
    // Aquí enviamos el userId y el carrito (cartItems) al backend
    const data = await realizarCompra({
      userId: user.id_user,
      carrito: cartItems.map(item => ({
        productoId: item._id,
        cantidad: item.quantity
      }))
    });
    setToastMsg(data.message || 'Compra realizada con éxito');
    clearCart();  // Vacía carrito si la compra fue exitosa
  } catch (error) {
    const msg = error.response?.data?.message || 'Error al procesar la compra';
    setToastMsg(msg);
  }
  setLoading(false);
};


  return (
    <>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Carrito</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          <>
            <IonList>
              {cartItems.map(item => (
                <IonItem key={item._id}>
                  <IonLabel>
                    <h2>{item.nombreProducto}</h2>
                    <p>Precio: ${item.precio} x {item.quantity} = ${(item.precio * item.quantity).toFixed(2)}</p>
                  </IonLabel>
                  <IonButton color="danger" onClick={() => removeFromCart(item._id)}>Eliminar</IonButton>
                </IonItem>
              ))}
            </IonList>
            <h3>Total: ${total.toFixed(2)}</h3>
            <IonButton expand="block" color="success" onClick={handleFinalizarCompra} disabled={loading}>
              {loading ? 'Procesando...' : 'Finalizar Compra'}
            </IonButton>
            <IonButton expand="block" color="medium" onClick={clearCart} disabled={loading}>
              Vaciar Carrito
            </IonButton>
          </>
        )}
        <IonToast
          isOpen={!!toastMsg}
          message={toastMsg}
          duration={2500}
          onDidDismiss={() => setToastMsg('')}
          color={toastMsg.includes('Error') ? 'danger' : 'success'}
        />
      </IonContent>
    </IonPage>
    <Tab/>
    </>
  );
};

export default Carrito;
