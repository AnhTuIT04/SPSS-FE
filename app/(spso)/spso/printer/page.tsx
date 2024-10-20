'use client';

import React from 'react';
import * as z from 'zod';

import SearchBox from '@/components/SearchBox';
import CardLayout from '@/app/(spso)/spso/printer/card-layout';
import { Button } from '@/components/ui/button';
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

const Suggestion: React.FC<SuggestionProps> = ({ data }) => {
  return (
    <span className="flex items-center justify-start text-nowrap">
      <p className="font-bold">{data.name}</p>
      <span>&nbsp;-&nbsp;</span>
      <p>{data.location}</p>
    </span>
  );
};

const fetchSuggestions = async (query: string): Promise<PrinterSearchResult[]> => {
  console.log('fetchSuggestions', query);
  return searchPrinters(query).then((printers) =>
    printers.map((printer: z.infer<typeof PrinterSchema>) => ({
      text: printer.name,
      id: printer.id,
      name: printer.name,
      location: printer.location,
      data: {
        name: printer.name,
        location: printer.location,
      },
    })),
  );
};

const PrinterPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-[1086px] w-full flex flex-wrap justify-between items-center mb-8">
        <SearchBox
          placeholder="Search for a printer or location ..."
          Suggestion={Suggestion}
          fetchSuggestions={fetchSuggestions}
          maxWidth="480px"
        />

        <Button className="h-10 bg-[hsl(217,91%,50%)] hover:bg-[hsl(217,91%,45%)] max-[683px]:mt-6">
          Add Printer
        </Button>
      </div>

      <CardLayout page={1} limit={9} />
    </div>
  );
};

export default PrinterPage;
