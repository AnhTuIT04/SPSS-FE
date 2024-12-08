'use client';

import { useEffect, useState } from "react";

import PrinterCard from "@/components/PrinterCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Printer {
  id: string;
  image: string;
  name: string;
  location: string;
  fileType: string[];
  status: boolean;
  pageSize: string[];
}

const Page = () => {
  const [printers, setPrinters] = useState<Printer[]>([]);
  const [searchVal, setSearchVal] = useState("");
  const [searchResults, setSearchResults] = useState<Printer[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrinter = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/printer');
        if (!response.ok) {
          throw new Error('Failed to fetch printer data');
        }

        const data = await response.json();
        setPrinters(data);
        setSearchResults(data); // Khởi tạo kết quả tìm kiếm là toàn bộ dữ liệu
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrinter();
  }, []);

  useEffect(() => {
    const results = printers.filter(printer => {
      const searchLower = searchVal.trim().toLowerCase();

      return (
        printer.name.toLowerCase().includes(searchLower) ||
        printer.location.toLowerCase().includes(searchLower) ||
        printer.fileType.some(type => type.toLowerCase().includes(searchLower)) ||
        printer.pageSize.some(size => size.toLowerCase().includes(searchLower)) ||
        (printer.status ? "ENABLE" : "DISABLE").toLowerCase().includes(searchLower)
      );
    });

    setSearchResults(results);
  }, [searchVal, printers]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-bold mb-4">Select Printer</h1>
      <div className="relative flex justify-between">
        <div>
          <input
            className="search-input mb-4 p-2 w-[400px] border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Search by keywords..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>

        <Link href="/spso/printer/add">
          <Button
            className="h-10 bg-[hsl(217,91%,50%)] hover:bg-[hsl(217,91%,45%)]"
          >
            Add Printer
          </Button>
        </Link>
      </div>
      <div className="flex items-center justify-center m-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {searchResults && searchResults.map((printer) => (
            <PrinterCard
              key={printer.id}
              id={printer.id}
              name={printer.name}
              image={printer.image}
              status={printer.status}
              location={printer.location}
              fileType={printer.fileType}
              pageSize={printer.pageSize}
              showConfigure
            />
          ))}
        </div>
      </div>
    </div>
  )
};

export default Page;
