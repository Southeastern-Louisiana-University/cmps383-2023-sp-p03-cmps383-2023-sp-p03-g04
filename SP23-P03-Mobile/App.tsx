import React from "react";
import 'react-native-gesture-handler';
import { AuthProvider } from "./authentication/auth-context";
import AppNav from "./navigation/app.nav";


const App =() => {
  return (
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
    
  );
}

export default App;
  

