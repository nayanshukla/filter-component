import { Employee } from "@/types";
import React from "react";

interface ResultsTableProps {
  data: Employee[];
}

export function ResultsTable({ data }: ResultsTableProps) {
  if (data.length === 0) {
    return (
      <div className="no-results">
        <p>No results found. Try changing or removing some filters.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="results-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Salary</th>
            <th>City</th>
            <th>Join Date</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {data.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
              <td>${emp.salary.toLocaleString()}</td>
              <td>{emp.address.city}</td>
              <td>{emp.joinDate}</td>
              <td>
                <span className={emp.isActive ? "badge-active" : "badge-inactive"}>
                  {emp.isActive ? "Yes" : "No"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}