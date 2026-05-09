"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Action = {
  id?: number;
  societe: string;
  theme: string;
  action: string;
  echeance: string;
  statut: string;
  priorite: string;
};

export default function Page() {
  const [societe, setSociete] = useState("");
  const [theme, setTheme] = useState("");
  const [action, setAction] = useState("");
  const [echeance, setEcheance] = useState("");
  const [priorite, setPriorite] = useState("Moyenne");

  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    chargerActions();
  }, []);

  const chargerActions = async () => {
    const { data, error } = await supabase
      .from("actions")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setActions(data || []);
  };

  const ajouterAction = async () => {
    if (!societe || !theme || !action) {
      alert("Veuillez remplir les champs");
      return;
    }

    const nouvelleAction = {
      societe,
      theme,
      action,
      echeance,
      statut: "À faire",
      priorite,
    };

    const { data, error } = await supabase
      .from("actions")
      .insert([nouvelleAction])
      .select();

    if (error) {
      console.error(error);
      alert("Erreur lors de l'ajout");
      return;
    }

    setActions([...(data || []), ...actions]);

    setSociete("");
    setTheme("");
    setAction("");
    setEcheance("");
    setPriorite("Moyenne");
  };

  return (
    <main style={pageStyle}>
      <h1 style={titleStyle}>
        AI Executive Assistant
      </h1>

      <div style={cardStyle}>
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

        <select
          value={priorite}
          onChange={(e) => setPriorite(e.target.value)}
          style={inputStyle}
        >
          <option value="Haute">Haute</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Faible">Faible</option>
        </select>

        <button
          onClick={ajouterAction}
          style={buttonStyle}
        >
          Ajouter
        </button>
      </div>

      <div>
        <h2>Liste des actions</h2>

        {actions.length === 0 && (
          <p>Aucune action.</p>
        )}

        {actions.map((a) => (
          <div
            key={a.id}
            style={actionCardStyle}
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
              <strong>Priorité :</strong> {a.priorite}
            </p>

            <p>
              <strong>Statut :</strong> {a.statut}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  padding: "40px",
  background: "#f5f5f5",
  minHeight: "100vh",
  fontFamily: "Arial",
};

const titleStyle: React.CSSProperties = {
  fontSize: "32px",
  marginBottom: "30px",
};

const cardStyle: React.CSSProperties = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "30px",
};

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 20px",
  background: "black",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const actionCardStyle: React.CSSProperties = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "15px",
};