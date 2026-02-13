import React from "react";
import { useEmployees } from "../hooks/useEmployees";
import { FilterBuilder } from "../components/FilterBuilder";
import { ResultsTable } from "../components/ResultsTable";

export default function Home() {
  const {
    employees,
    totalCount,
    filteredCount,
    filters,
    addFilter,
    removeFilter,
    updateFilter,
    clearFilters,
  } = useEmployees();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Employee Directory</h1>
        <p>Browse and filter employee records</p>
      </div>

      <FilterBuilder
        filters={filters}
        onAdd={addFilter}
        onRemove={removeFilter}
        onUpdate={updateFilter}
        onClear={clearFilters}
      />

      <div className="record-count">
        Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> records
        {filters.length > 0 && ` (${filters.length} filter${filters.length > 1 ? "s" : ""} applied)`}
      </div>

      <ResultsTable data={employees} />
    </div>
  );
}