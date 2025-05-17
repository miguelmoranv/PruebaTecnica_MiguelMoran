import React, { useState } from 'react';
import { 
  IonPage, IonContent, IonInput, IonButton, IonItem, IonLabel, 
  IonToast, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonRow, IonCol, IonGrid, IonText
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/api';

const Register = () => {
  const [form, setForm] = useState({ 
    nombre: '', 
    apellido: '', 
    email: '', 
    password: '',
    confirmPassword: '' 
  });
  const [toastMsg, setToastMsg] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      setToastMsg('Las contraseñas no coinciden');
      return;
    }

    try {
      setShowLoading(true);
      await register(form.nombre, form.apellido, form.email, form.password);
      setToastMsg('¡Registro exitoso!');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setToastMsg(error.response?.data?.message || 'Error al registrarse');
    } finally {
      setShowLoading(false);
    }
  };

  const updateForm = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="ion-justify-content-center ion-align-items-center" style={{ height: '100%' }}>
          <IonRow>
            <IonCol size="12" sizeMd="8" offsetMd="2" sizeLg="6" offsetLg="3">
              <IonCard className="ion-padding">
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center">
                    <h2 style={{ fontWeight: 'bold' }}>Crear Cuenta</h2>
                  </IonCardTitle>
                </IonCardHeader>
                
                <IonCardContent>
                  <IonItem className="ion-margin-bottom" lines="full">
                    <IonLabel position="floating">Nombre</IonLabel>
                    <IonInput 
                      value={form.nombre} 
                      onIonChange={e => updateForm('nombre', e.detail.value)}
                      autocomplete="given-name"
                    />
                  </IonItem>
                  
                  <IonItem className="ion-margin-bottom" lines="full">
                    <IonLabel position="floating">Apellido</IonLabel>
                    <IonInput 
                      value={form.apellido} 
                      onIonChange={e => updateForm('apellido', e.detail.value)}
                      autocomplete="family-name"
                    />
                  </IonItem>
                  
                  <IonItem className="ion-margin-bottom" lines="full">
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput 
                      type="email" 
                      value={form.email} 
                      onIonChange={e => updateForm('email', e.detail.value)}
                      autocomplete="email"
                    />
                  </IonItem>
                  
                  <IonItem className="ion-margin-bottom" lines="full">
                    <IonLabel position="floating">Contraseña</IonLabel>
                    <IonInput 
                      type="password" 
                      value={form.password} 
                      onIonChange={e => updateForm('password', e.detail.value)}
                      autocomplete="new-password"
                    />
                  </IonItem>
                  
                  <IonItem className="ion-margin-bottom" lines="full">
                    <IonLabel position="floating">Confirmar Contraseña</IonLabel>
                    <IonInput 
                      type="password" 
                      value={form.confirmPassword} 
                      onIonChange={e => updateForm('confirmPassword', e.detail.value)}
                      autocomplete="new-password"
                    />
                  </IonItem>
                  
                  <IonButton 
                    expand="block" 
                    onClick={handleRegister}
                    disabled={showLoading}
                    className="ion-margin-top"
                  >
                    {showLoading ? 'Registrando...' : 'Crear Cuenta'}
                  </IonButton>
                  
                  <IonText className="ion-text-center ion-margin-top" style={{ display: 'block' }}>
                    <p>¿Ya tienes cuenta? <a onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'var(--ion-color-primary)' }}>Inicia Sesión</a></p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        
        <IonToast 
  isOpen={!!toastMsg} 
  message={toastMsg} 
  duration={2000} 
  onDidDismiss={() => setToastMsg('')}
  color={
    toastMsg.includes('éxito') || 
    toastMsg.includes('exito') || 
    toastMsg.includes('Exit') ? 'success' : 'danger'
  }
/>
      </IonContent>
    </IonPage>
  );
};

export default Register;