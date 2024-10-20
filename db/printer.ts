'use server';

import * as z from 'zod';
import fs from 'fs';
import { PrinterSchema } from '@/schemas';

const PRINTER_FILE_PATH = 'db/printer.json';

const readPrintersFromFile = () => {
  try {
    const data = fs.readFileSync(PRINTER_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading printers file:', error);
    return [];
  }
};

const writePrintersToFile = (printers: z.infer<typeof PrinterSchema>) => {
  try {
    fs.writeFileSync(PRINTER_FILE_PATH, JSON.stringify(printers, null, 2));
  } catch (error) {
    console.error('Error writing to printers file:', error);
  }
};

/**
 * @path /api/printers
 * @method GET
 * @request body { page: number, limit: number }
 * @response body { id: string, name: string, image: string, resetCycle: { pages: number, days: number }, location: string, supportedFiles: string[] }[]
 */
export const getPrinters = async (page: number, limit: number) => {
  const printers = await readPrintersFromFile();
  const start = (page - 1) * limit;
  const end = start + limit;
  return printers.slice(start, end);
};

/**
 * @path /api/printers/:id
 * @method GET
 * @request body {}
 * @response body { id: string, name: string, image: string, resetCycle: { pages: number, days: number }, location: string, supportedFiles: string[] }
 */
export const getPrinterById = async (id: string) => {
  const printers = await readPrintersFromFile();
  return printers.find((p: z.infer<typeof PrinterSchema>) => p.id === id);
};

/**
 * @path /api/printers/search
 * @param query
 * @method GET
 * @request body { query: string }
 * @response body { id: string, name: string, image: string, resetCycle: { pages: number, days: number }, location: string, supportedFiles: string[] }[]
 */
export const searchPrinters = async (query: string) => {
  const printers = await readPrintersFromFile();
  return printers.filter(
    (p: z.infer<typeof PrinterSchema>) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.location.toLowerCase().includes(query.toLowerCase()),
  );
};

/**
 * @path /api/printers
 * @method POST
 * @request body { id: string, name: string, image: string, resetCycle: { pages: number, days: number }, location: string, supportedFiles: string[] }
 * @response body { id: string, name: string, image: string, resetCycle: { pages: number, days: number }, location: string, supportedFiles: string[] }
 */
export const savePrinter = async (printer: z.infer<typeof PrinterSchema>) => {
  const printers = await readPrintersFromFile();
  printers.push(printer);
  await writePrintersToFile(printers);
};
