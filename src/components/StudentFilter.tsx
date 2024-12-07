"use client"
import React, { useEffect, useState } from "react";

import './StudentFilter.css';

// Define types for filter values
interface FilterProps {
  limit: number;
  page: number;
  state: string;
  enquirySource: string;
  searchedName: string;
  sort: string;
  nameSort: string;
}

const StudentFilter: React.FC<any> = ({ onFilter, currentFilters }) => {
  const initialFilters: FilterProps = {
    limit: 10,
    page: 1,
    state: "",
    enquirySource: "",
    searchedName: "",
    sort: "",
    nameSort: "",
  };

  const [filters, setFilters] = useState<FilterProps>(currentFilters);

  useEffect(() => {
    setFilters(currentFilters); // Update state whenever currentFilters change
  }, [currentFilters]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const input = e.target as HTMLInputElement;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? input.checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilter(filters);
  };

  // Handle resetting filters
  const handleReset = () => {
    setFilters(initialFilters);
    onFilter(initialFilters); // Optional: Trigger callback with reset filters
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <div className="filter-group">
        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={filters.state}
          onChange={handleChange}
          aria-label="Filter by state"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="enquirySource">Enquiry Source:</label>
        <select
          id="enquirySource"
          name="enquirySource"
          value={filters.enquirySource}
          onChange={handleChange}
          aria-label="Filter by enquiry source"
        >
          <option value="">All</option>
          <option value="walk-in">Walk-in</option>
          <option value="online">Online</option>
          <option value="referral">Referral</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="searchedName">Search Student Name:</label>
        <input
          type="text"
          id="searchedName"
          name="searchedName"
          value={filters.searchedName}
          onChange={handleChange}
          aria-label="Search by student or guardian name"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="sort">Sort By Created At:</label>
        <select
          id="sort"
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          aria-label="Sort by creation or update time"
        >
          <option value="">None</option>
          <option value="asc">Oldest First</option>
          <option value="desc">Newest First</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="nameSort">Name Sort:</label>
        <select
          id="nameSort"
          name="nameSort"
          value={filters.nameSort}
          onChange={handleChange}
          aria-label="Sort by student name"
        >
          <option value="">None</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="limit">Page Limit:</label>
        <select
          id="limit"
          name="limit"
          value={filters.limit}
          onChange={handleChange}
          aria-label="Select the number of students per page"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </select>
      </div>
      <div className="filter-group">
        <button type="submit" className="apply-button" aria-label="Apply filters">
          Apply Filters
        </button>
        <button
          type="button"
          className="reset-button"
          onClick={handleReset}
          aria-label="Remove all filters"
        >
          Remove All Filters
        </button>
      </div>
    </form>
  );
};

export default StudentFilter;
