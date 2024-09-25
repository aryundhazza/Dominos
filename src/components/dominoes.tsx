import React from "react";

interface DominoCard {
  values: [number, number];
}

interface DominoListProps {
  dominoes: DominoCard[];
}

const DominoList: React.FC<DominoListProps> = ({ dominoes }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Dominoes:</h2>
      <div className="border border-gray-300 rounded-lg p-2 bg-gray-50">
        <div className="flex flex-wrap">
          {dominoes.map((card, index) => (
            <div
              key={index}
              className="border border-blue-500 rounded-lg m-1 p-2 bg-white shadow-sm"
            >
              [{card.values.join(", ")}]
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DominoList;
