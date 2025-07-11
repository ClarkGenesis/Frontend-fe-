import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';


createRoot(document.getElementById('root')!).render(

<AuthProvider>
    <StrictMode>
      <App />
    </StrictMode>
</AuthProvider>
);