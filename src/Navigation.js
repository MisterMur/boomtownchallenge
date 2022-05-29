import React, { useState } from "react";
import "./Styles/Navigation.scss";

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <a
        href="#organization-data"
        className="brand-name"
        style={{ color: "white" }}
      >
        BoomtownROI
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from Heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
            <a
              href="#repo-data"
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Repo
            </a>
          </li>
          <li>
            <a
              href="#event-data"
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Events
            </a>
          </li>
          <li>
            <a
              href="#hooks-data"
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Hooks
            </a>
          </li>
          <li>
            <a
              href="#issues-data"
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Issues
            </a>
          </li>
          <li>
            <a
              href="#members-data"
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Members
            </a>
          </li>
          <li>
            <a
              href="#public-members-data"
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Public Members
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
