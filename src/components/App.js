import React, { useState, useEffect } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [editPizza, setEditPizza] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
      .then((response) => response.json())
      .then((data) => setPizzas(data));
  }, []);

  function handleRenderPizza(pizza) {
    setEditPizza(pizza);
  }

  function handleEditPizza(updatedPizza) {
    const updatedPizzas = pizzas.map((pizza) => {
      if (pizza.id === updatedPizza.id) {
        return updatedPizza;
      } else {
        return pizza;
      }
    });
    setEditPizza(updatedPizza);
    setPizzas(updatedPizzas);
  }

  function handleChange(name, value) {
    setEditPizza({
      ...editPizza,
      [name]: value,
    });
  }

  return (
    <>
      <Header />
      <PizzaForm
        pizza={editPizza}
        onEditPizza={handleEditPizza}
        onChangeForm={handleChange}
      />
      <PizzaList pizzas={pizzas} onRenderPizza={handleRenderPizza} />
    </>
  );
}

export default App;
