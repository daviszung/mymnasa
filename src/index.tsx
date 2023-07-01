import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { App } from './components/App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='1083148561370-upi86atao26o1rl23r1da2t6a73ddtbh.apps.googleusercontent.com'>
      <App/>
    </GoogleOAuthProvider>
  </React.StrictMode>
);