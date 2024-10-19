'use client'
import { useState } from 'react';
import { printers } from '@/constants/student';
import styles from '@/app/(student)/student.module.css'

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
        <div>

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
                                    }
                                    }
                                >
                                    <div className='h-[222px] bg-[#DEDEDE] rounded-tl-lg rounded-tr-lg'></div>
                                    <div className='p-4'>
                                        <p className="text-xl font-bold my-[8px]">{printer.name}</p>
                                        <p>Status: {printer.status}</p>
                                        <hr className="my-4 border-gray-300" />
                                        <p>File Type:
                                            <div className='inline-flex'>
                                                {printer.fileType && printer.fileType.map((type, index) => (
                                                    <div key={index} className="flex-row justify-center items-end mx-[2px] px-[12px] py-[8px] gap-[10px] w-fit h-[31px] border-[1px] border-[solid] border-[#546FFF] rounded-[100px] text-[12px] text-[#546FFF]">{type}</div>
                                                ))}
                                            </div>
                                        </p>
                                        <p className="text-gray-500 my-[8px]">Location: {printer.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            )}

            {step === 'upload' && (
                <div>
                    <div className="flex items-center justify-center">
                        <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-fit h-fit">
                            Upload
                            <div className='flex space-x-4 justify-end'>
                                <button className={styles.buttonBack} onClick={() => handlePrevStep('select-printer')}>Back</button>
                                <button className={styles.buttonNext} onClick={() => handleNextStep('specify-props')}>Next</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {step === 'specify-props' && (
                <div>
                    <h2>Specify Printing Properties</h2>
                    <button className={styles.buttonBack} onClick={() => handlePrevStep('upload')}>Back</button>
                    <button className={styles.buttonNext} onClick={() => handleNextStep('review')}>Next</button>
                </div>
            )}

            {step === 'review' && (
                <div>
                    <h2>Review and Submit</h2>
                    <button className={styles.buttonBack} onClick={() => handlePrevStep('specify-props')}>Back</button>
                    <button className={styles.buttonNext} onClick={() => handleNextStep('select-printer')}>Start Over</button>
                    <button>Submit</button>
                </div>
            )}
        </div>
    );
};

export default Print;
