import React, { useState, useEffect } from "react";
import "./App.css";

interface Agent {
  uuid?: number;
  displayName: string;
  displayIcon: string; // URL da imagem do agente
}

const AgentCard: React.FC<Agent> = ({ displayName, displayIcon }) => (
  <div className=" bg-gradient-to-br from-black via-red-600 to-red-900 rounded-lg shadow-xl p-4 m-4">
    <img src={displayIcon} alt={displayName} className="w-32 h-32 mx-auto" />
    <p className="text-center mt-2 text-white font-semibold">{displayName}</p>
  </div>
);

const App: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [filterName, setFilterName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://valorant-api.com/v1/agents", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Erro na requisição à API");
        }
        const data = await response.json();
        setAgents(data.data);
        setFilteredAgents(data.data);
        setErrorMessage(null);
      } catch (error: any) {
        setErrorMessage(error?.message);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    const filtered = agents.filter((agent) =>
      agent.displayName.toLowerCase().includes(filterName.toLowerCase())
      //se ambas as strings que foram convertidas para minusculas baterem retorna true assim dando o fiter no array e o arry filtrado é guardado no filtered que vc seta o state fitleredAgents
    );
    setFilteredAgents(filtered);
  };

  return (
    <div className="container  mx-auto p-4 ">
      <h1 className="text-center text-4xl text-blue-600 mb-6">Agentes</h1>

      <div className="w-[100%] flex items-center justify-center mb-4">
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="p-2 border rounded-lg mr-2"
        />
        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg"
        >
          Filtrar
        </button>
      </div>
      {filteredAgents?.length > 0 ? (
        <div className="grid grid-cols-2 gap-4j ustify-items-center">
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.uuid}
              displayName={agent.displayName}
              displayIcon={agent.displayIcon}
            />
          ))}
        </div>
      ) : (
        <h1 className="text-center text-red-600">{errorMessage}</h1>
      )}
    </div>
  );
};

export default App;
