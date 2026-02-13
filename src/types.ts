export interface Address {
  city: string;
  state: string;
  country: string;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  joinDate: string;
  isActive: boolean;
  skills: string[];
  address: Address;
  projects: number;
  lastReview: string;
  performanceRating: string;
}

export type FilterType = "text" | "number" | "date" | "boolean" | "select";

export type FilterOperator =
  | "contains" | "equals" | "startsWith" | "endsWith" | "doesNotContain"
  | "gt" | "lt" | "gte" | "lte" | "is" | "isNot" | "in";

export interface FilterCondition {
  id: string;
  field: string;
  operator: FilterOperator;
  value: string | boolean | number;
  type: FilterType;
}