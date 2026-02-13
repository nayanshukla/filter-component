import React from "react";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/">Go back to home</a>
    </div>
  );
}