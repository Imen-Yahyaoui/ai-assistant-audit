"use client";

import { useState } from "react";

type Action = {
  societe: string;
  theme: string;
  action: string;
  echeance: string;
  statut: string;
};

export default function Page() {
  const [societe, setSociete] = useState("");
  const [theme, setTheme] = useState("");
  const [action, setAction] = useState("");
  const [echeance, setEcheance] = useState("");

  const [actions, setActions] = useState<Action[]>([]);

  const ajouterAction = () => {
    if (!societe || !theme || !action) return;

    const nouvelleAction: Action = {
      societe,
      theme,
      action,
      echeance,
      statut: "À faire",
    };

    setActions([nouvelleAction, ...actions]);

    setSociete("");
    setTheme("");
    setAction("");
    setEcheance("");
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "30px" }}>
        AI Executive Assistant
      </h1>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <h2>Ajouter une action</h2>

        <input
          placeholder="Société"
          value={societe}
          onChange={(e) => setSociete(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Thème"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Action"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          style={inputStyle}
        />

        <input
          type="date"
          value={echeance}
          onChange={(e) => setEcheance(e.target.value)}
          style={inputStyle}
        />

        <button onClick={ajouterAction} style={buttonStyle}>
          Ajouter
        </button>
      </div>

      <div>
        <h2>Liste des actions</h2>

        {actions.length === 0 && (
          <p>Aucune action pour le moment.</p>
        )}

        {actions.map((a, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          >
            <h3>{a.societe}</h3>

            <p>
              <strong>Thème :</strong> {a.theme}
            </p>

            <p>
              <strong>Action :</strong> {a.action}
            </p>

            <p>
              <strong>Échéance :</strong> {a.echeance}
            </p>

            <p>
              <strong>Statut :</strong> {a.statut}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "12px 20px",
  background: "black",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};