'use client';

import React, { useEffect } from 'react';
import * as z from 'zod';

import SearchBox from '@/components/SearchBox';
import CardLayout from '@/app/(spso)/spso/printer/card-layout';
import AddPrinter from '@/components/AddPrinterForm';
import { searchPrinters } from '@/db/printer';
import { PrinterSchema } from '@/schemas';

interface PrinterSearchResult {
  text: string; // The text to display in the suggestion, required
  id: string;
  name: string;
  location: string;
}

interface SuggestionProps {
  text: string;
  data?: any;
}

const PrinterPage = () => {
  const [searchResults, setSearchResults] = React.useState<z.infer<typeof PrinterSchema>[]>([]);

  const Suggestion: React.FC<SuggestionProps> = ({ data }) => {
    return (
      <span
        onClick={() => setSearchResults(searchResults.filter((printer) => printer.id === data.id))}
        className="flex items-center justify-start text-nowrap"
      >
        <p className="font-bold">{data.name}</p>
        <span>&nbsp;-&nbsp;</span>
        <p>{data.location}</p>
      </span>
    );
  };

  const fetchSuggestions = async (query: string): Promise<PrinterSearchResult[]> => {
    console.log('fetchSuggestions', query);
    return searchPrinters(query).then((printers) => {
      setSearchResults(printers);
      return printers.map((printer: z.infer<typeof PrinterSchema>) => ({
        text: printer.name,
        id: printer.id,
        name: printer.name,
        location: printer.location,
        data: {
          id: printer.id,
          name: printer.name,
          location: printer.location,
        },
      }));
    });
  };

  return (
    <div className="relative flex flex-col justify-center items-center">
      <div className="max-w-[1086px] w-full flex flex-wrap justify-between items-center mb-8">
        <SearchBox
          placeholder="Search for a printer or location ..."
          Suggestion={Suggestion}
          fetchSuggestions={fetchSuggestions}
          maxWidth="480px"
        />

        <AddPrinter />
      </div>

      <CardLayout searchResults={searchResults} page={1} limit={6} />
    </div>
  );
};

export default PrinterPage;
