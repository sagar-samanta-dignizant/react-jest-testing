import { AuthProvider } from "./contexts/AuthContext";
import Router from "./routes";
import ThemeProvider from "./theme";
import { Toaster } from "react-hot-toast";

//The AuthProvider is a custom context that provides authentication-related information and methods to child components. The ThemeProvider is another custom context that provides the theme configuration to child components.
const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              className: "MuiAlert-message",
              duration: 5000,
            }}
          />
          <Router />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
