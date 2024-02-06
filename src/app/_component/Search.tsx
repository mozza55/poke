'use client';

import { searchState } from '@/store/searchContext';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const Search = () => {
  const [search, setSearch] = useRecoilState(searchState);
  const [input, setInput] = useState('');
  
  const updateSearch = () => {
    setSearch(input);
  };

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateSearch();
    }
  };

  useEffect(() => {
    return () => setSearch('');
  },[setSearch]);

  return (
    <div className="flex gap-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleInputEnter}
        placeholder="id를 입력하세요"
      />
      <button className="bg-gray-100 rounded-full py-2 px-4" onClick={updateSearch}>
        검색
      </button>
    </div>
  );
};

export default Search;
