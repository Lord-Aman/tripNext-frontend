'use client';

import React from 'react';
import { FaSort } from 'react-icons/fa';

const SortButton = ({ onSort }) => {
  return (
    <button onClick={onSort} className="flex items-center text-gray-500">
      Sort <FaSort className="ml-2" />
    </button>
  );
};

export default SortButton;
