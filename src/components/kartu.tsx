import React from "react";

interface KartuProps {
  angkaAtas: number;
  angkaBawah: number;
  warnaBawah?: string;
}

const Kartu: React.FC<KartuProps> = ({ angkaAtas, angkaBawah }) => {
  const warna = angkaAtas === angkaBawah ? "merah" : undefined;

  return (
    <div
      className={`w-20 h-40 border-2 border-black mx-4 inline-block rounded-lg justify-between p-2 m-2 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}
    >
      <span
        className={`text-4xl block text-left ${
          warna === "merah" ? "text-red-500" : ""
        }`}
      >
        {angkaAtas}
      </span>
      <br />
      <br />
      <span
        className={`text-4xl text-right block ${
          warna === "merah" ? "text-red-500" : ""
        }`}
      >
        {angkaBawah}
      </span>
    </div>
  );
};

export default Kartu;
