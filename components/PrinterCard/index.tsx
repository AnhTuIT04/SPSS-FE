import Link from 'next/link';
import React from 'react';

interface PrinterCardProps {
  id: string;
  name: string;
  image: string;
  status: boolean;
  location: string;
  fileType: string[];
  pageSize: string[];
  showConfigure?: boolean;
}

const PrinterCard: React.FC<PrinterCardProps> = ({
  id,
  name,
  image,
  status,
  location,
  fileType,
  pageSize,
  showConfigure = false,
}) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg cursor-pointer hover:bg-blue-100 transition w-[300px] h-fit"
    >
      <div className="h-[222px] bg-[#DEDEDE] rounded-tl-lg rounded-tr-lg">
        <img
          src={image}
          alt='printer'
          width={5000}
          height={5000}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-xl font-bold my-[8px]">{name}</p>
        <p>Status: {status ? "ENABLE" : "DISABLE"}</p>
        <hr className="my-4 border-gray-300" />
        <div>
          <div className="h-[120px]">
            <h3 className="text-lg font-semibold mt-2">File Type</h3>
            <div className="grid grid-cols-4 gap-3 mt-2 max-h-[84px] overflow-y-auto pr-2">
              {fileType.length &&
                fileType.map((type, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center mx-[2px] px-[12px] py-[8px] w-full h-[31px] border-[1px] border-[solid] border-[#546FFF] rounded-[100px] text-[12px] text-[#546FFF]"
                  >
                    {type}
                  </div>
                ))}
            </div>
          </div>
          <div className="h-[76px] mt-1">
            <h3 className="text-lg font-semibold mt-2">Page Size</h3>
            <div className="grid grid-cols-4 gap-3 mt-2 max-h-[84px] overflow-y-auto pr-2">
              {pageSize.length &&
                pageSize.map((size, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center mx-[2px] px-[12px] py-[8px] w-full h-[31px] border-[1px] border-[solid] border-[#ccc] rounded-[100px] text-[12px] text-[#111]"
                  >
                    {size}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <p className="text-gray-500 my-[8px]">Location: {location}</p>
      </div>

      {showConfigure && (
        <Link href={`/spso/printer/${id}`}>
          <button className="ml-4 mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Configure
          </button>
        </Link>
      )}
    </div>
  );
};

export default PrinterCard;
