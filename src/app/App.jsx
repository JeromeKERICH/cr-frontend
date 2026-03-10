import Router from "./routes";
import { AuthProvider } from "../hooks/useAuth";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
