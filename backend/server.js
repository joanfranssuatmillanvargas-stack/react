const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

// Variable global
let pokemonActual = null;

// Ruta principal
app.get("/", (req, res) => {
  res.send("Servidor Pokemon funcionando");
});

// Obtener pokemon aleatorio
app.get("/api/pokemon", async (req, res) => {

  try {

    // Numero aleatorio
    const randomId = Math.floor(Math.random() * 151) + 1;

    // Datos pokemon
    const respuestaPokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );

    const dataPokemon = await respuestaPokemon.json();

    // Datos species
    const respuestaSpecies = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${randomId}`
    );

    const dataSpecies = await respuestaSpecies.json();

    // Guardar pokemon actual
    pokemonActual = dataPokemon.name.toLowerCase();

    // Datos para frontend
    const pokemon = {

      id: dataPokemon.id,

      tipos: dataPokemon.types.map(
        (t) => t.type.name
      ),

      altura: dataPokemon.height,

      peso: dataPokemon.weight,

      color: dataSpecies.color.name,

      ataques: dataPokemon.moves
        .slice(0, 4)
        .map((m) => m.move.name),

      imagen:
        dataPokemon.sprites.other.dream_world.front_default ||
        dataPokemon.sprites.front_default

    };

    res.json(pokemon);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      mensaje: "Error obteniendo Pokemon"
    });

  }

});

// Verificar respuesta
app.post("/api/adivinar", (req, res) => {

  const { nombre } = req.body;

  if (!nombre) {

    return res.status(400).json({
      mensaje: "Debes escribir un nombre"
    });

  }

  if (nombre.toLowerCase() === pokemonActual) {

    return res.json({
      correcto: true,
      mensaje: `Correcto! Es ${pokemonActual}`
    });

  }

  return res.json({
    correcto: false,
    mensaje: `Incorrecto. Era ${pokemonActual}`
  });

});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});