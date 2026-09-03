import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("Erro capturado pelo ErrorBoundary:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: "100vh", background: "#120E1A", color: "#F6F3FA", fontFamily: "monospace", padding: 24 }}>
          <h1 style={{ color: "#FF5A6E", fontSize: 20 }}>Ocorreu um erro ao renderizar o app</h1>
          <p style={{ opacity: 0.8, marginTop: 8 }}>Copie a mensagem abaixo (e o que aparece no console do navegador, F12) para investigar:</p>
          <pre style={{ whiteSpace: "pre-wrap", background: "#1D1626", padding: 16, borderRadius: 12, marginTop: 12, fontSize: 12.5 }}>
            {String(this.state.error && this.state.error.stack ? this.state.error.stack : this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
