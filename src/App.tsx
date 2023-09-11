import React, { useState, useEffect } from 'react';
import "./App.css"

interface Agent {
  uuid?: number;
  displayName: string;
  displayIcon: string; // URL da imagem do agente
}

const AgentCard: React.FC<Agent> = ({ displayName, displayIcon }) => (
  <div className="bg-white rounded-lg shadow-md p-4 m-4">
    <img src={displayIcon} alt={displayName} className="w-32 h-32 mx-auto" />
    <p className="text-center mt-2">{displayName}</p>
  </div>
);

const App: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [filterName, setFilterName] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://valorant-api.com/v1/agents');
        if (!response.ok) {
          throw new Error('Erro na requisição à API');
        }
        const data = await response.json();
        setAgents(data.data);
        setFilteredAgents(data.data);
      } catch (error) {
        console.error('Erro na requisição à API:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    const filtered = agents.filter((agent) =>
      agent.displayName.toLowerCase().includes(filterName.toLowerCase())
    );
    setFilteredAgents(filtered);
  };

  return (
    <div className="container mx-auto p-4">
        <h1>Agentes</h1>

      <div className='w-[100%] flex items-center justify-center '>
      <input
        type="text"
        placeholder="Filtrar por nome"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
        className="p-2 border rounded-lg mr-2"
      />
      <button onClick={handleFilter} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Filtrar
      </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {filteredAgents.map((agent) => (
          <AgentCard
            key={agent.uuid}
            displayName={agent.displayName}
            displayIcon={agent.displayIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
