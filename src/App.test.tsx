import {render,screen,fireEvent, getByText} from "@testing-library/react"
import App from "./App"

describe('App component',()=>{
  it('should render App component',()=>{
    render(<App/>)
    screen.getByText('Agentes')
  })
  it('should filter agents',()=>{
    render(<App/>)

    const filterInput = screen.getByPlaceholderText('Filtrar por nome')
    fireEvent.change(filterInput,{target : {value : 'Gekko'}})
    
    
    const buttonFilter = screen.getByText('Filtrar')
    fireEvent.click(buttonFilter)







  })
})