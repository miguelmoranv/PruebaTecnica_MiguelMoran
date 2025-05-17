import React, { useState } from 'react';
import { 
  IonPage, IonContent, IonInput, IonButton, IonItem, IonLabel, 
  IonToast, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonRow, IonCol, IonGrid, IonText
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI } from '../api/api';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async () => {
    try {
      setShowLoading(true);
      const userData = await loginAPI(email, password);

      login({
        id_user: userData._id,
        nombres_users: userData.nombre,
        apellidos_users: userData.apellido,
        rol: userData.rol,
        token: userData.token
      });

      setToastMsg('¡Bienvenido!');
      setTimeout(() => navigate('/catalogo'), 1500);
    } catch (error) {
      setToastMsg(error.response?.data?.message || 'Credenciales incorrectas');
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="ion-justify-content-center ion-align-items-center" style={{ height: '100%' }}>
          <IonRow>
            <IonCol size="12" sizeMd="8" offsetMd="2" sizeLg="6" offsetLg="3">
              <IonCard className="ion-padding">
                <IonCardHeader>
                    <h2 className="ion-text-center" style={{ fontWeight: 'bold' }}>Iniciar Sesión</h2>
                </IonCardHeader>
                
                <IonCardContent>
                  <IonItem className="ion-margin-bottom" lines="full">
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput 
                      type="email" 
                      value={email} 
                      onIonChange={e => setEmail(e.detail.value)} 
                      autocomplete="email"
                    />
                  </IonItem>
                  
                  <IonItem className="ion-margin-bottom" lines="full">
                    <IonLabel position="floating">Contraseña</IonLabel>
                    <IonInput 
                      type="password" 
                      value={password} 
                      onIonChange={e => setPassword(e.detail.value)}
                      autocomplete="current-password"
                    />
                  </IonItem>
                  
                  <IonButton 
                    expand="block" 
                    onClick={handleLogin}
                    disabled={showLoading}
                    className="ion-margin-top"
                  >
                    {showLoading ? 'Cargando...' : 'Ingresar'}
                  </IonButton>
                  
                  <IonText className="ion-text-center ion-margin-top" style={{ display: 'block' }}>
                    <p>¿No tienes cuenta? <a onClick={() => navigate('/registro')} style={{ cursor: 'pointer', color: 'var(--ion-color-primary)' }}>Regístrate</a></p>
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
          color={toastMsg.includes('Bienvenido') ? 'success' : 'danger'}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;