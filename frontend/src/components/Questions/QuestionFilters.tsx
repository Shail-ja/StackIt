import React from 'react';
import { Filter } from 'lucide-react';
import { FilterType } from '../../types';

interface QuestionFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function QuestionFilters({ activeFilter, onFilterChange }: QuestionFiltersProps) {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'newest', label: 'Newest' },
    { key: 'unanswered', label: 'Unanswered' },
    { key: 'answered', label: 'Answered' },
    { key: 'active', label: 'Active' }
  ];

return (
  <div className="flex items-center bg-gray-800 rounded-lg px-2 py-1 shadow-sm">
    <Filter className="h-4 w-4 text-gray-400 mr-2" />

    {filters.map((filter) => (
      <button
        key={filter.key}
        onClick={() => onFilterChange(filter.key)}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
          activeFilter === filter.key
            ? 'bg-orange-500 text-white shadow'
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
      >
        {filter.label}
      </button>
    ))}
  </div>
);
}