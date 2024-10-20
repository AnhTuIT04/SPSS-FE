'use client';
import { useState } from 'react';
import { printers } from '@/constants/student';
import styles from '@/app/(student)/student.module.css';
import Image from 'next/image';
import uploadFile from '@/public/assets/uploadfile.svg';
import deleteFileBtn from '@/public/assets/deletefilebtn.svg';

const Print = () => {
  const [step, setStep] = useState('select-printer');

  const handleNextStep = (nextStep: string) => {
    setStep(nextStep);
  };

  const handlePrevStep = (prevStep: string) => {
    setStep(prevStep);
  };

  const [selectedPrinter, setSelectedPrinter] = useState(null);

  const selectPrinter = (printer) => {
    setSelectedPrinter(printer);
    alert(`Bạn đã chọn ${printer.name}. Tiếp tục sang bước upload tài liệu.`);
  };

  return (
    <div className="w-full h-full">
      {step === 'select-printer' && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Select Printer</h1>
          <div className="flex items-center justify-center m-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {printers.map((printer) => (
                <div
                  key={printer.id}
                  className="bg-white shadow-md rounded-lg cursor-pointer hover:bg-blue-100 transition w-[300px] h-fit"
                  // className={`p-6  h-auto rounded-[8px] ${printer.status === 'Offline' ? 'bg-gray-200' : 'bg-white border-[1px] border-[solid] border-[#d5d5d5]  hover:border-[#1488DB]'}`}
                  // className="bg-white p-6 border-[1px] border-[solid] border-[#d5d5d5] rounded-[8px] h-auto hover:border-[#1488DB] "
                  onClick={() => {
                    selectPrinter(printer);
                    handleNextStep('upload');
                  }}
                >
                  <div className="h-[222px] bg-[#DEDEDE] rounded-tl-lg rounded-tr-lg"></div>
                  <div className="p-4">
                    <p className="text-xl font-bold my-[8px]">{printer.name}</p>
                    <p>Status: {printer.status}</p>
                    <hr className="my-4 border-gray-300" />
                    <div>
                      File Type:
                      <div className="inline-flex">
                        {printer.fileType &&
                          printer.fileType.map((type, index) => (
                            <div
                              key={index}
                              className="flex-row justify-center items-end mx-[2px] px-[12px] py-[8px] gap-[10px] w-fit h-[31px] border-[1px] border-[solid] border-[#546FFF] rounded-[100px] text-[12px] text-[#546FFF]"
                            >
                              {type}
                            </div>
                          ))}
                      </div>
                    </div>
                    <p className="text-gray-500 my-[8px]">Location: {printer.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 'upload' && (
        // <div className=" p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
        <div className=" justify-center max-w-screen-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <h1 className="mb-[4px] text-2xl font-bold">Upload File</h1>
            <p className="text-[14px] leading-[20px] text-[#6D6D6D]">Add your document here</p>
          </div>
          <div className="flex-col justify-center items-center my-[16px] p-[24px] gap-[12px] w-full h-full bg-[#FFFFFF] border-[1px] border-dashed border-[#1849D6] rounded-[8px]">
            <div className="flex justify-center">
              <Image src={uploadFile} alt="upload"></Image>
            </div>
            <div className="flex flex-col justify-center my-[8px]">
              <span className="flex justify-center">Drag your file to start uploading</span>
              <div className="my-[4px] flex justify-center items-center">
                <hr className="w-[80px] h-[0.97px] bg-[#E7E7E7]"></hr>
                <span className="mx-4 text-[12px] leading-[18px] text-center text-[#6D6D6D]">
                  OR
                </span>
                <hr className="w-[80px] h-[0.97px] bg-[#E7E7E7]"></hr>
              </div>
              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center border-[1px] border-[solid] border-[#546FFF] rounded-[8px] hover:bg-[#546FFF] transition duration-300 ease-in-out">
                  <button className="m-[6px] text-[#546FFF] hover:text-white">Browse file</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <span className="text-[14px] leading-[20px] text-[#6D6D6D]">
              Only support{' '}
              {selectedPrinter?.fileType.map((type, index) => (
                <span key={index}>.{type.toLowerCase()} </span>
              ))}
              file
            </span>
          </div>
          <div className="relative flex flex-row my-[16px] px-[16px] py-[8px] gap-[8px] w-full bg-[#FFFFFF] border-[1px] border-[solid] border-[#E7E7E7] rounded-[12px]">
            <div className="flex items-center self-center">
              <img
                width="40"
                height="auto"
                src="https://img.icons8.com/flat-round/50/check-file.png"
                alt="check-file"
              />
            </div>
            <div className="inline-flex h-full">
              <div className="flex flex-col h-full justify-center">
                <span className="font-semibold text-[14px] leading-[18px] text-[#0B0B0B]">
                  Document1.docx
                </span>
                <span className="font-normal text-[12px] leading-[16px] text-[#6D6D6D]">129KB</span>
              </div>
            </div>
            <button className="flex items-center self-center absolute my-auto right-[10px]">
              <Image src={deleteFileBtn} alt="delete btn"></Image>
            </button>
          </div>
          <div className="flex space-x-2 justify-end">
            <button className={styles.buttonBack} onClick={() => handlePrevStep('select-printer')}>
              Back
            </button>
            <button className={styles.buttonNext} onClick={() => handleNextStep('specify-props')}>
              Next
            </button>
          </div>
        </div>

        // </div>
      )}

      {step === 'specify-props' && (
        <div>
          <h2>Specify Printing Properties</h2>
          <button className={styles.buttonBack} onClick={() => handlePrevStep('upload')}>
            Back
          </button>
          <button className={styles.buttonNext} onClick={() => handleNextStep('review')}>
            Next
          </button>
        </div>
      )}

      {step === 'review' && (
        <div>
          <h2>Review and Submit</h2>
          <button className={styles.buttonBack} onClick={() => handlePrevStep('specify-props')}>
            Back
          </button>
          <button className={styles.buttonNext} onClick={() => handleNextStep('select-printer')}>
            Start Over
          </button>
          <button>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Print;
