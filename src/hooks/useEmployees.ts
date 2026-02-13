import { useState, useMemo } from "react";
import { Employee, FilterCondition } from "../types";

const ROLES = ["Senior Developer", "Manager", "Designer", "QA Engineer", "Product Owner"];
const DEPARTMENTS = ["Engineering", "Product", "Sales", "Marketing", "HR"];
const CITIES = ["San Francisco", "New York", "London", "Berlin", "Tokyo"];
const SKILLS_POOL = ["React", "TypeScript", "Node.js", "GraphQL", "Python", "SQL", "Docker", "AWS"];

const FIRST_NAMES = ["John", "Jane", "Alice", "Bob", "Carol", "David", "Emma", "Frank", "Grace", "Henry",
  "Isla", "Jack", "Karen", "Liam", "Mia", "Noah", "Olivia", "Paul", "Quinn", "Rachel",
  "Sam", "Tina", "Uma", "Victor", "Wendy", "Xander", "Yara", "Zoe", "Aaron", "Beth",
  "Chris", "Diana", "Eric", "Fiona", "George", "Hannah", "Ivan", "Julia", "Kevin", "Laura"];

const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Wilson", "Taylor", "Moore", "Anderson", "Thomas", "Jackson", "White", "Harris",
  "Martin", "Thompson", "Young", "Allen", "King", "Wright", "Scott", "Green",
  "Baker", "Adams", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner"];

function generateMockData(count: number): Employee[] {
  const employees: Employee[] = [];
  for (let i = 0; i < count; i++) {
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
    const lastName = LAST_NAMES[i % LAST_NAMES.length];

    const joinDateObj = new Date();
    joinDateObj.setDate(joinDateObj.getDate() - i * 10);

    const reviewDateObj = new Date();
    reviewDateObj.setDate(reviewDateObj.getDate() - i * 5);

    employees.push({
      id: i + 1,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      department: DEPARTMENTS[i % DEPARTMENTS.length],
      role: ROLES[i % ROLES.length],
      salary: 50000 + ((i * 1234) % 80000),
      joinDate: joinDateObj.toISOString().split("T")[0],
      isActive: i % 5 !== 0,
      skills: SKILLS_POOL.slice(0, (i % 5) + 1),
      address: { city: CITIES[i % CITIES.length], state: "CA", country: "USA" },
      projects: (i % 9) + 1,
      lastReview: reviewDateObj.toISOString().split("T")[0],
      performanceRating: (3 + ((i % 20) / 10)).toFixed(1),
    });
  }
  return employees;
}

const MOCK_DATA: Employee[] = generateMockData(50);

function applyFilters(data: Employee[], filters: FilterCondition[]): Employee[] {
  return data.filter((item) => {
    return filters.every((filter) => {
      if (filter.value === "" || filter.value === undefined || filter.value === null) return true;

      let itemValue: any;
      if (filter.field.includes(".")) {
        const [obj, key] = filter.field.split(".");
        itemValue = (item as any)[obj]?.[key];
      } else {
        itemValue = (item as any)[filter.field];
      }

      if (itemValue === undefined || itemValue === null) return false;

      const val = filter.value;

      switch (filter.operator) {
        case "equals": return String(itemValue).toLowerCase() === String(val).toLowerCase();
        case "contains": return String(itemValue).toLowerCase().includes(String(val).toLowerCase());
        case "startsWith": return String(itemValue).toLowerCase().startsWith(String(val).toLowerCase());
        case "endsWith": return String(itemValue).toLowerCase().endsWith(String(val).toLowerCase());
        case "doesNotContain": return !String(itemValue).toLowerCase().includes(String(val).toLowerCase());
        case "gt": return filter.type === "date" ? new Date(String(itemValue)) > new Date(String(val)) : Number(itemValue) > Number(val);
        case "lt": return filter.type === "date" ? new Date(String(itemValue)) < new Date(String(val)) : Number(itemValue) < Number(val);
        case "gte": return Number(itemValue) >= Number(val);
        case "lte": return Number(itemValue) <= Number(val);
        case "is": return String(itemValue) === String(val);
        case "isNot": return String(itemValue) !== String(val);
        default: return true;
      }
    });
  });
}

export function useEmployees() {
  const [filters, setFilters] = useState<FilterCondition[]>([]);

  const filteredData = useMemo(() => applyFilters(MOCK_DATA, filters), [filters]);

  return {
    employees: filteredData,
    totalCount: MOCK_DATA.length,
    filteredCount: filteredData.length,
    filters,
    addFilter: (f: FilterCondition) => setFilters((prev) => [...prev, f]),
    removeFilter: (id: string) => setFilters((prev) => prev.filter((f) => f.id !== id)),
    updateFilter: (id: string, updates: Partial<FilterCondition>) => setFilters((prev) => prev.map((f) => f.id === id ? { ...f, ...updates } : f)),
    clearFilters: () => setFilters([]),
  };
}