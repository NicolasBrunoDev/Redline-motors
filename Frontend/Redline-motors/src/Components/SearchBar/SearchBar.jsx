import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, setIsSearchOpen }) => {
  return (
    <div className="w-full py-4 px-10 border-b border-white/5">
      <div className="max-w-3xl mx-auto relative">
        <input 
          type="text"
          value={searchTerm}
          placeholder="Busca tu próximo desafío (Ej: Ford, Ferrari, Deportivo...)"
          onFocus={() => setIsSearchOpen(true)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if(e.target.value !== "") setIsSearchOpen(true);
          }}
          className="w-full bg-white/10 text-white rounded-xl py-3 px-12 outline-none border border-white/10 focus:border-red-700 focus:bg-white/20 transition-all"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      </div>
    </div>
  );
};

export default SearchBar;