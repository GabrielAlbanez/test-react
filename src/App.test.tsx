import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App";

describe("App component", () => {
  //abaixo estamos realizado um mock de uma api ou seja uma chamada fake

  const server = setupServer(
    rest.get("https://valorant-api.com/v1/agents", async (req, res, ctx) => {
      return res(
        ctx.json({
          data: [
            {
              uuid: "e370fa57-4757-3604-3648-499e1f642d3f",
              displayName: "Gekko",
              displayIcon:
                "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/displayicon.png",
            },
            // Add more agents as needed
          ],
        })
      );
    })
  );

  //o beforeAll server para usar esse mock em todos nossos teste
  beforeAll(() => server.listen());
  //temos que usar o resethandles pq para cada teste tenho seu handler propio
  //o teste abaixo mostra como fazer isso basta usar o server.use() os testes que não tem isso
  // usa o mock inicial para os testes
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should show error message", async () => {
    //teste server para demostrar se a api retornar um erro 500
    //aq estamos formçando um mock de erro 500 assim retorna a messagem la no front end
    //e como ele acho a message da para mostrar o erro 
    // mas temos que levar que isso é fake pois a api do valorant n ta retornando um erro 500
    server.use(
      rest.get("https://valorant-api.com/v1/agents",  (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: "error " }));
      })
    );
    render(<App />);
    await screen.findByText("Erro na requisição à API");
  });
  //estamos testando se a api ta retornando os dados e ela esta pois ele esta achando o nome do agente
  it("should fetch and show agents after component is rendered", async () => {
    render(<App />);
    // Wait for the "Gekko" text to be present in the document
    await screen.findByText("Gekko");
  });

  it("should render App component", () => {
    render(<App />);
    expect(screen.getByText("Agentes")).toBeInTheDocument();
  });

  it("should write in the filter", () => {
    render(<App />);
    const filterInput = screen.getByPlaceholderText("Filtrar por nome");

    fireEvent.change(filterInput, { target: { value: "Gekko" } });

    // You can add more assertions or interactions as needed
  });

  it("should click button filter", () => {
    render(<App />);
    const buttonFilter = screen.getByText("Filtrar");

    fireEvent.click(buttonFilter);

    // You can add more assertions or interactions as needed
  });
});
