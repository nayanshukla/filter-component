import React from "react";
import { FilterCondition, FilterType, FilterOperator } from "../types";

const fields = [
  { key: "name", label: "Name", type: "text" as FilterType },
  { key: "email", label: "Email", type: "text" as FilterType },
  { key: "department", label: "Department", type: "select" as FilterType, options: ["Engineering", "Product", "Sales", "Marketing", "HR"] },
  { key: "role", label: "Role", type: "select" as FilterType, options: ["Senior Developer", "Manager", "Designer", "QA Engineer", "Product Owner"] },
  { key: "salary", label: "Salary", type: "number" as FilterType },
  { key: "joinDate", label: "Join Date", type: "date" as FilterType },
  { key: "isActive", label: "Is Active", type: "boolean" as FilterType },
  { key: "address.city", label: "City", type: "select" as FilterType, options: ["San Francisco", "New York", "London", "Berlin", "Tokyo"] },
];

function getOperators(type: FilterType) {
  if (type === "text") return [{ val: "contains", label: "Contains" }, { val: "equals", label: "Equals" }, { val: "startsWith", label: "Starts With" }, { val: "endsWith", label: "Ends With" }, { val: "doesNotContain", label: "Does Not Contain" }];
  if (type === "number") return [{ val: "equals", label: "Equals" }, { val: "gt", label: "Greater Than" }, { val: "lt", label: "Less Than" }, { val: "gte", label: ">=" }, { val: "lte", label: "<=" }];
  if (type === "date") return [{ val: "equals", label: "On" }, { val: "gt", label: "After" }, { val: "lt", label: "Before" }];
  if (type === "boolean") return [{ val: "is", label: "Is" }];
  if (type === "select") return [{ val: "is", label: "Is" }, { val: "isNot", label: "Is Not" }];
  return [];
}

interface Props {
  filters: FilterCondition[];
  onAdd: (f: FilterCondition) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<FilterCondition>) => void;
  onClear: () => void;
}

export function FilterBuilder({ filters, onAdd, onRemove, onUpdate, onClear }: Props) {

  function addFilter() {
    onAdd({ id: Date.now().toString(), field: "name", operator: "contains", value: "", type: "text" });
  }

  function changeField(id: string, fieldKey: string) {
    const field = fields.find(f => f.key === fieldKey)!;
    onUpdate(id, { field: fieldKey, type: field.type, operator: getOperators(field.type)[0].val as FilterOperator, value: "" });
  }

  return (
    <div className="filter-builder">
      <div className="filter-builder-header">
        <h2 className="filter-title">Filters</h2>
        {filters.length > 0 && <button className="btn-clear" onClick={onClear}>Clear All</button>}
      </div>

      {filters.length === 0 && <p className="no-filters-msg">No filters added. Click Add Filter to start.</p>}

      {filters.map((f) => {
        const fieldDef = fields.find(fd => fd.key === f.field);
        const operators = getOperators(f.type);

        return (
          <div key={f.id} className="filter-row">
            <select className="filter-select" value={f.field} onChange={(e) => changeField(f.id, e.target.value)}>
              {fields.map(fd => <option key={fd.key} value={fd.key}>{fd.label}</option>)}
            </select>

            <select className="filter-select" value={f.operator} onChange={(e) => onUpdate(f.id, { operator: e.target.value as FilterOperator })}>
              {operators.map(op => <option key={op.val} value={op.val}>{op.label}</option>)}
            </select>

            {f.type === "boolean" ? (
              <select className="filter-select filter-value" value={String(f.value)} onChange={(e) => onUpdate(f.id, { value: e.target.value === "true" })}>
                <option value="">Select...</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            ) : f.type === "select" && fieldDef?.options ? (
              <select className="filter-select filter-value" value={String(f.value)} onChange={(e) => onUpdate(f.id, { value: e.target.value })}>
                <option value="">Select...</option>
                {fieldDef.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : (
              <input
                className="filter-input filter-value"
                type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                placeholder="Enter value..."
                value={String(f.value)}
                onChange={(e) => onUpdate(f.id, { value: e.target.value })}
              />
            )}

            <button className="btn-remove" onClick={() => onRemove(f.id)}>✕</button>
          </div>
        );
      })}

      <button className="btn-add" onClick={addFilter}>+ Add Filter</button>
    </div>
  );
}