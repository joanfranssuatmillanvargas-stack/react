import { useEffect, useState } from "react";

function App() {

  const [pokemon, setPokemon] = useState(null);

  const [nombre, setNombre] = useState("");

  const [mensaje, setMensaje] = useState("");

  const [mostrarImagen, setMostrarImagen] = useState(false);

  // Obtener pokemon
  const cargarPokemon = async () => {

    const respuesta = await fetch("/api/pokemon");

    const data = await respuesta.json();

    setPokemon(data);

    setMensaje("");

    setNombre("");

    setMostrarImagen(false);

  };

  // Al iniciar
  useEffect(() => {

    cargarPokemon();

  }, []);

  // Verificar respuesta
  const verificarPokemon = async () => {

    const respuesta = await fetch("/api/adivinar", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        nombre
      })

    });

    const data = await respuesta.json();

    setMensaje(data.mensaje);

    setMostrarImagen(true);

  };

  if (!pokemon) {

    return <h1>Cargando...</h1>;

  }

  return (

    <div style={{

      textAlign: "center",
      fontFamily: "Arial",
      padding: "20px"

    }}>

      <h1>Adivina el Pokémon</h1>

      <h3>ID: {pokemon.id}</h3>

      <h3>Tipos: {pokemon.tipos.join(", ")}</h3>

      <h3>Color: {pokemon.color}</h3>

      <h3>Altura: {pokemon.altura}</h3>

      <h3>Peso: {pokemon.peso}</h3>

      <h3>
        Ataques: {pokemon.ataques.join(", ")}
      </h3>

      <input

        type="text"

        placeholder="Escribe el nombre"

        value={nombre}

        onChange={(e) => setNombre(e.target.value)}

        style={{
          padding: "10px",
          borderRadius: "10px",
          marginTop: "20px"
        }}

      />

      <br /><br />

      <button

        onClick={verificarPokemon}

        style={{
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          marginRight: "10px"
        }}

      >

        Adivinar

      </button>

      <button

        onClick={cargarPokemon}

        style={{
          padding: "10px 20px",
          backgroundColor: "#1e3a8a",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}

      >

        Nuevo Pokémon

      </button>

      <h2>{mensaje}</h2>

      {

        mostrarImagen && (

          <img
            src={pokemon.imagen}
            alt="pokemon"
            width="250"
          />

        )

      }

    </div>

  );

}

export default App;