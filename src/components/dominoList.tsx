import { useState } from "react";
import DominoList from "./dominoes";
import Kartu from "./kartu";

interface DominoCard {
  values: [number, number];
}

const defaultData: DominoCard[] = [
  { values: [1, 1] },
  { values: [1, 2] },
  { values: [1, 3] },
  { values: [4, 5] },
  { values: [4, 3] },
  { values: [4, 1] },
  { values: [2, 5] },
  { values: [2, 5] },
];

const Domino = () => {
  const [dominoes, setDominoes] = useState<DominoCard[]>(defaultData);
  const [totalToRemove, setTotalToRemove] = useState<number | null>(null);
  const [newCardValues, setNewCardValues] = useState<[number, number]>([0, 0]);

  const getDoubleCount = () => {
    return dominoes.filter((card) => card.values[0] === card.values[1]).length;
  };

  const sortDominoes = (order: "asc" | "desc") => {
    const sorted = [...dominoes].sort((a, b) => {
      const totalA = a.values[0] + a.values[1];
      const totalB = b.values[0] + b.values[1];
      return order === "asc" ? totalA - totalB : totalB - totalA;
    });
    setDominoes(sorted);
  };

  const removeDuplicates = () => {
    const counts: { [key: string]: number } = {};

    dominoes.forEach((card) => {
      const key = card.values.sort().toString();
      counts[key] = (counts[key] || 0) + 1;
    });

    const uniqueCards = dominoes.filter((card) => {
      const key = card.values.sort().toString();
      return counts[key] === 1;
    });

    setDominoes(uniqueCards);
  };

  const flipCards = () => {
    const flipped = dominoes.map((card) => ({
      values: [card.values[1], card.values[0]] as [number, number],
    }));
    setDominoes(flipped);
  };

  const removeByTotal = () => {
    if (totalToRemove !== null) {
      const filtered = dominoes.filter(
        (card) => card.values[0] + card.values[1] !== totalToRemove,
      );
      setDominoes(filtered);
    }
  };

  const resetData = () => {
    setDominoes(defaultData);
    setTotalToRemove(null);
  };

  const addNewCard = () => {
    const [value1, value2] = newCardValues;
    if (value1 >= 0 && value2 >= 0) {
      setDominoes([...dominoes, { values: [value1, value2] }]);
      setNewCardValues([0, 0]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-center">Domino Manager</h1>
      <div className="mt-4">
        <DominoList dominoes={dominoes} />
        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {dominoes.map((card, index) => (
            <Kartu
              key={index}
              angkaAtas={card.values[0]}
              angkaBawah={card.values[1]}
              warnaBawah={card.values[0] === card.values[1] ? "merah" : ""}
            />
          ))}
        </div>
        <div className="mt-4 text-center">Double Count: {getDoubleCount()}</div>
        <div className="flex flex-col md:flex-row justify-center mt-4 gap-2">
          <button
            onClick={() => sortDominoes("asc")}
            className="bg-blue-500 text-white px-3 py-2 rounded transition-transform transform hover:scale-105"
          >
            Sort Asc
          </button>
          <button
            onClick={() => sortDominoes("desc")}
            className="bg-blue-500 text-white px-3 py-2 rounded transition-transform transform hover:scale-105"
          >
            Sort Desc
          </button>
          <button
            onClick={removeDuplicates}
            className="bg-green-500 text-white px-3 py-2 rounded transition-transform transform hover:scale-105"
          >
            Remove Duplicates
          </button>
          <button
            onClick={flipCards}
            className="bg-yellow-500 text-white px-3 py-2 rounded transition-transform transform hover:scale-105"
          >
            Flip Cards
          </button>
          <button
            onClick={removeByTotal}
            className="bg-red-500 text-white px-3 py-2 rounded transition-transform transform hover:scale-105"
          >
            Remove Total
          </button>
          <input
            type="number"
            placeholder="Total to remove"
            onChange={(e) => setTotalToRemove(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={resetData}
            className="bg-gray-500 text-white px-3 py-2 rounded transition-transform transform hover:scale-105"
          >
            Reset Data
          </button>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-center">
            Add New Domino Card
          </h2>
          <div className="flex flex-col md:flex-row justify-center mt-2 gap-2">
            <input
              type="number"
              placeholder="Value 1"
              value={newCardValues[0]}
              onChange={(e) =>
                setNewCardValues([Number(e.target.value), newCardValues[1]])
              }
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Value 2"
              value={newCardValues[1]}
              onChange={(e) =>
                setNewCardValues([newCardValues[0], Number(e.target.value)])
              }
              className="p-2 border border-gray-300 rounded"
            />
            <button
              onClick={addNewCard}
              className="bg-blue-500 text-white px-3 py-2 rounded transition-transform transform hover:scale-105"
            >
              Add Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Domino;
