import React from 'react';
import Link from 'next/link';

interface PrinterCardProps {
  id: string;
  name: string;
  image: string;
  location: string;
  supportedFileTypes: string[];
  supportedPageSizes: string[];
}

const PrinterCard: React.FC<PrinterCardProps> = ({
  id,
  name,
  image,
  location,
  supportedFileTypes,
  supportedPageSizes,
}) => {
  return (
    <div className="relative w-[340px] h-[670px] rounded-lg shadow-xl bg-white overflow-hidden">
      {/* Image Section */}
      <div className="w-full h-[220px] bg-gray-400 flex justify-center items-center">
        <img
          src={image}
          alt={`${name} image`}
          className="w-full h-[220px] object-cover rounded-t-lg"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>

          <p className="text-gray-500 mt-1 leading-5">{location}</p>

          <div className="border-t border-gray-300 my-2"></div>

          {/* File Types Section with Scroll */}
          <div className="h-[124px]">
            <h3 className="text-lg font-semibold mt-2">File Types</h3>
            <div className="grid grid-cols-3 gap-3 mt-2 max-h-[84px] overflow-y-auto pr-2">
              {supportedFileTypes.map((file, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-center text-sm"
                >
                  {file}
                </span>
              ))}
            </div>
          </div>

          {/* Page Sizes Section with Scroll */}
          <div className="h-[124px]">
            <h3 className="text-lg font-semibold mt-2">Page Sizes</h3>
            <div className="grid grid-cols-3 gap-3 mt-2 max-h-[84px] overflow-y-auto pr-2">
              {supportedPageSizes.map((size, index) => (
                <span
                  key={index}
                  className="relative bg-green-100 text-green-600 px-4 py-2 rounded-full text-center text-sm"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Configure Button */}
        <Link href={`/spso/printer/${id}`}>
          <button className="absolute left-6 bottom-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Configure
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PrinterCard;
