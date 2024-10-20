/**
 * SearchBox component
 * @param {string} placeholder - The placeholder text for the input field
 * @param {React.FC} Suggestion - The component to render for each suggestion
 * @param {Function} fetchSuggestions - The function to fetch suggestions
 *
 * To use this component, you need to provide the following props:
 * - placeholder: The placeholder text for the input field
 * - Suggestion: required prop, text and children are passed as props to this component
 *       + text: show in input field and used for search (string, required)
 *       + data: any data you want to pass to the suggestion component (any)
 * - fetchSuggestions: The function to fetch suggestions, which receives a query string and
 *   returns a Promise that resolves to an array of suggestions.
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';

interface SuggestionType {
  text: string;
  data?: any;
}

interface SearchBoxProps {
  maxWidth: string;
  placeholder: string;
  Suggestion: React.FC<SuggestionType>;
  fetchSuggestions: (query: string) => Promise<SuggestionType[]>;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  maxWidth,
  placeholder,
  Suggestion,
  fetchSuggestions,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<SuggestionType[]>([]);
  const [suggestionClicked, setSuggestionClicked] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue && !suggestionClicked) {
        fetchSuggestions(inputValue).then((results) => {
          setFilteredSuggestions(results);
          setShowSuggestions(true);
        });
      } else {
        setFilteredSuggestions([]);
        setSuggestionClicked(false);
        setShowSuggestions(false);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, fetchSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (suggestion: SuggestionType) => {
    setInputValue(suggestion.text);
    setSuggestionClicked(true);
    setShowSuggestions(false);
  };

  const handleInputOnFocus = () => {
    if (inputValue) {
      fetchSuggestions(inputValue).then((results) => {
        setFilteredSuggestions(results);
        setShowSuggestions(true);
      });
    }
  };

  return (
    <div
      tabIndex={-1}
      className="relative flex w-full h-full flex-col bg-popover text-popover-foreground rounded-lg border shadow-md md:min-w-[300px]"
      style={{ maxWidth }}
      ref={inputRef}
    >
      <div className={`flex items-center px-3`}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-4 w-4 shrink-0 opacity-50"
        >
          <path
            d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        <input
          onFocus={handleInputOnFocus}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 z-10 max-h-[200px] overflow-y-auto overflow-x-auto bg-white shadow-lg rounded-md border">
          <ul className="p-1">
            {filteredSuggestions.length === 0 && inputValue && (
              <li className="py-6 text-center text-sm">No results found.</li>
            )}

            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-[#F1F5F9] cursor-pointer transition-colors duration-200"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Suggestion text={suggestion.text} data={suggestion.data}></Suggestion>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
