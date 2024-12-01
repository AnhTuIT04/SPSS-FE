'use client';

import React, { useEffect, useState, useRef } from 'react';
import * as z from 'zod';

import PrinterCard from '@/components/PrinterCard';
import Invisible from '@/components/ui/invisible';
import { PrinterSchema } from '@/schemas';
import { getPrinters } from '@/db/printer';

interface CardLayoutProps {
  searchResults: z.infer<typeof PrinterSchema>[];
  page: number;
  limit: number;
}

const getFakePrinters = (totalPrinters: number, printersPerRow: number) => {
  const remainder = totalPrinters % printersPerRow;
  return remainder === 0 ? 0 : printersPerRow - remainder;
};

const CardLayout: React.FC<CardLayoutProps> = ({ searchResults, page, limit }) => {
  const [printers, setPrinters] = useState<z.infer<typeof PrinterSchema>[]>(searchResults);
  const [printersPerRow, setPrintersPerRow] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculatePrintersPerRow = () => {
    if (containerRef.current) {
      setContainerWidth((w) => (w = containerRef.current?.clientWidth || 0));

      if (containerWidth < 712) {
        // Magic numbers, should be replaced with breakpoints
        setPrintersPerRow(1);
      } else if (containerWidth < 1084) {
        // Magic numbers, should be replaced with breakpoints
        setPrintersPerRow(2);
      } else {
        setPrintersPerRow(3);
      }
    }
  };

  useEffect(() => {
    calculatePrintersPerRow();
    window.addEventListener('resize', calculatePrintersPerRow);

    return () => {
      window.removeEventListener('resize', calculatePrintersPerRow);
    };
  }, [containerWidth, printers]);

  useEffect(() => {
    if (printers.length !== 0) {
      setPrinters(searchResults);
    } else {
      getPrinters(page, limit).then((printers) => {
        setPrinters(printers);
      });
    }
  }, [searchResults]);

  const fakePrinterCount = getFakePrinters(printers.length, printersPerRow);

  return (
    <div ref={containerRef} className="flex flex-wrap items-center justify-center gap-8">
      {printers.map((printer) => (
        <PrinterCard key={printer.id} {...printer} />
      ))}

      {Array.from({ length: fakePrinterCount }).map((_, index) => (
        <Invisible key={`fake-${index}`}>
          <div className="w-[340px] h-[580px]"></div>
        </Invisible>
      ))}
    </div>
  );
};

export default CardLayout;
