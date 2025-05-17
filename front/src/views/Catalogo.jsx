import React, { useEffect, useState } from 'react';
import {
  IonPage, IonContent, IonList, IonItem, IonLabel, IonButton,
  IonInput, IonAlert, IonTitle, IonHeader, IonToolbar,
  IonModal, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonToast
} from '@ionic/react';

import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from '../api/api';

import { useUser } from '../context/UserContext'; 
import { useCart } from "../context/CartContext";
import { Tab } from '../components/Tab';

const Catalogo = () => {
    const { addToCart } = useCart();
  const { user } = useUser();
  const isAdmin = user?.rol === 'admin';

  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombreProducto: '', precio: '', stock: '' });
  const [editId, setEditId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  


  // Cargar productos
  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleSubmit = async () => {
    const { nombreProducto, precio, stock } = form;

    if (!nombreProducto || !precio || !stock) {
      alert('Completa todos los campos');
      return;
    }

    const producto = {
      nombreProducto,
      precio: parseFloat(precio),
      stock: parseInt(stock),
    };

    try {
      if (editId) {
        await updateProducto(editId, producto);
      } else {
        await createProducto(producto);
      }
      setForm({ nombreProducto: '', precio: '', stock: '' });
      setEditId(null);
      setShowModal(false);
      await cargarProductos();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const handleEdit = (producto) => {
    setForm({
      nombreProducto: producto.nombreProducto,
      precio: producto.precio.toString(),
      stock: producto.stock.toString(),
    });
    setEditId(producto._id);
    setShowModal(true);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteProducto(deleteId);
      setShowConfirm(false);
      await cargarProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  // Acción para usuario agregar producto al carrito 
    const agregarAlCarrito = (producto) => {
    addToCart(producto);
    setShowToast(true);
  };


  return (
    <>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Catálogo de Productos</IonTitle>
          {isAdmin && (
            <IonButton slot="end" onClick={() => { setShowModal(true); setEditId(null); setForm({ nombreProducto: '', precio: '', stock: '' }); }}>
              + Agregar Producto
            </IonButton>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {isAdmin ? (
          <>
            <h2>Productos disponibles (Admin)</h2>
            <IonList>
              {productos.map((producto) => (
                <IonItem key={producto._id}>
                  <IonLabel>
                    <h2>{producto.nombreProducto}</h2>
                    <p>Precio: ${producto.precio} | Stock: {producto.stock}</p>
                  </IonLabel>
                  <IonButton color="warning" onClick={() => handleEdit(producto)}>Editar</IonButton>
                  <IonButton color="danger" onClick={() => confirmDelete(producto._id)}>Eliminar</IonButton>
                </IonItem>
              ))}
            </IonList>
          </>
        ) : (
          <>
            <h2>Productos disponibles</h2>
            <IonGrid>
              <IonRow>
                {productos.map((producto) => (
                  <IonCol size="12" sizeMd="6" sizeLg="4" key={producto._id}>
                    <IonCard className="producto-card">
                     <IonCardHeader>
                        <IonCardTitle style={{ color: 'var(--ion-color-primary)' }}>
                            {producto.nombreProducto}
                        </IonCardTitle>
                        </IonCardHeader>

                      <IonCardContent>
                        <p>Precio: ${producto.precio}</p>
                        <p>Stock: {producto.stock}</p>
                        <IonButton 
                          expand="block" 
                          disabled={producto.stock <= 0} 
                          onClick={() => agregarAlCarrito(producto)}
                        >
                          {producto.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
                        </IonButton>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </>
        )}

        {/* Modal para agregar / editar producto (solo admin) */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{editId ? 'Editar Producto' : 'Agregar Producto'}</IonTitle>
              <IonButton slot="end" onClick={() => setShowModal(false)}>Cerrar</IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput
              label="Nombre del producto"
              placeholder="Ej: Coca Cola"
              value={form.nombreProducto}
              onIonChange={(e) => setForm({ ...form, nombreProducto: e.detail.value })}
              clearInput
            />
            <IonInput
              label="Precio"
              type="number"
              placeholder="Ej: 12.50"
              value={form.precio}
              onIonChange={(e) => setForm({ ...form, precio: e.detail.value })}
              clearInput
            />
            <IonInput
              label="Stock"
              type="number"
              placeholder="Ej: 100"
              value={form.stock}
              onIonChange={(e) => setForm({ ...form, stock: e.detail.value })}
              clearInput
            />
            <IonButton expand="block" onClick={handleSubmit}>
              {editId ? 'Actualizar Producto' : 'Agregar Producto'}
            </IonButton>
          </IonContent>
        </IonModal>

        <IonAlert
          isOpen={showConfirm}
          onDidDismiss={() => setShowConfirm(false)}
          header="¿Eliminar producto?"
          message="¿Estás seguro de eliminar este producto?"
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            { text: 'Eliminar', handler: handleDelete },
          ]}
        />
      </IonContent>

      <style>{`
        .producto-card {
          transition: transform 0.2s ease;
          cursor: pointer;
        }
        .producto-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.25);
        }
      `}</style>
      <IonToast
  isOpen={showToast}
  onDidDismiss={() => setShowToast(false)}
  message="Producto agregado al carrito"
  duration={2000}
  color="success"
  position='top'
/>

    </IonPage>
    <Tab/>
    </>
  );
};

export default Catalogo;
