'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { printers } from '@/constants/student';
import styles from '@/app/(student)/student.module.css';
import Image from 'next/image';
import uploadFile from '@/public/assets/uploadfile.svg';
import deleteFileBtn from '@/public/assets/deletefilebtn.svg';
import imgPlaceholder from '@/public/assets/imgplaceholder.svg';
import { Select, InputNumber, Radio, Input } from 'antd';
import type { InputNumberProps, RadioChangeEvent } from 'antd';
import confetti from 'canvas-confetti'

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
        console.log(`choose ${printer.name}`)
        alert(`Bạn đã chọn ${printer.name}. Tiếp tục sang bước upload tài liệu.`);
    };

    // Select
    const handleChangeSelect = (value: string) => {
        console.log(`selected ${value}`);
    };

    // Input
    const onChangeInput: InputNumberProps['onChange'] = (value) => {
        console.log('changed', value);
    };

    // Radio
    const [value, setValue] = useState(1);
    const onChangeRadio = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        if (e.target.value === 1) {
            setInputValue('');  // Clear input when selecting "All"
        }
    };
    const [inputValue, setInputValue] = useState('');  // Store input value

    // Handle input change and auto-select the second radio button
    const onInputChange = (e) => {
        setInputValue(e.target.value);
        setValue(2);  // Auto-select value 2 when typing in the input
    };

    // const handlePrint = () => {
    //     alert(`Gửi yêu cầu in thành công`);
    // };

    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState(''); // 'success' or 'error'


    const isSuccess = 'success';
    const handleSubmit = () => {
        setNotificationType(isSuccess ? 'success' : 'error');
        setShowNotification(true);

        // Chạy hiệu ứng pháo giấy
        if (isSuccess === 'success') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        // setTimeout(() => {
        //     setShowNotification(false);
        // }, 3000); // Ẩn thông báo sau 3 giây
    };

    const handleCancel = () => {
        setShowNotification(false);
    };

    const router = useRouter();

    const handleNavigateDashboard = () => {
        router.push('/student/dashboard');
    };

    const handleNavigateBuyPages = () => {
        router.push('/student/buypages');
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
                <div className="justify-center max-w-screen-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <div className='mb-4'>
                        <h1 className="mb-[4px] text-2xl font-bold">Upload File</h1>
                        <p className='text-[14px] leading-[20px] text-[#6D6D6D]'>Add your document here</p>
                    </div>
                    <div className='flex-col justify-center items-center my-[16px] p-[24px] gap-[12px] w-full h-full bg-[#FFFFFF] border-[1px] border-dashed border-[#1849D6] rounded-[8px]'>
                        <div className='flex justify-center'>
                            <Image src={uploadFile} alt='upload'></Image>
                        </div>
                        <div className='flex flex-col justify-center my-[8px]'>
                            <span className='flex justify-center'>Drag your file to start uploading</span>
                            <div className='my-[4px] flex justify-center items-center'>
                                <hr className='w-[80px] h-[0.97px] bg-[#E7E7E7]'></hr>
                                <span className='mx-4 text-[12px] leading-[18px] text-center text-[#6D6D6D]'>OR</span>
                                <hr className='w-[80px] h-[0.97px] bg-[#E7E7E7]'></hr>
                            </div>
                            <div className='flex justify-center items-center'>
                                <div className='group cursor-pointer flex justify-center items-center border-[1px] border-[solid] border-[#546FFF] rounded-[8px] hover:bg-[#546FFF] transition duration-300 ease-in-out'>
                                    <button className='h-full m-[6px] text-[#546FFF] group-hover:text-white'>Browse file</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className='text-[14px] leading-[20px] text-[#6D6D6D]'>Only support {selectedPrinter?.fileType.map((type, index) => (
                            <span key={index}>.{type.toLowerCase()} </span>
                        ))}
                            file</span>
                    </div>
                    <div className='relative flex flex-row my-[16px] px-[16px] py-[8px] gap-[8px] w-full bg-[#FFFFFF] border-[1px] border-[solid] border-[#E7E7E7] rounded-[12px]'>
                        <div className='flex items-center self-center'>
                            <img width="40" height="auto" src="https://img.icons8.com/flat-round/50/check-file.png" alt="check-file" />
                        </div>
                        <div className='inline-flex h-full'>
                            <div className='flex flex-col h-full justify-center'>
                                <span className='font-semibold text-[14px] leading-[18px] text-[#0B0B0B]'>Document1.docx</span>
                                <span className='font-normal text-[12px] leading-[16px] text-[#6D6D6D]'>129KB</span>
                            </div>
                        </div>
                        <button className='flex items-center self-center absolute my-auto right-[10px]'>
                            <Image src={deleteFileBtn} alt='delete btn'></Image>
                        </button>
                    </div>
                    <div className='flex space-x-2 justify-end'>
                        <button className={styles.buttonBack} onClick={() => handlePrevStep('select-printer')}>Back</button>
                        <button className={styles.buttonNext} onClick={() => handleNextStep('specify-props')}>Next</button>
                    </div>
                </div>
            )}

            {step === 'specify-props' && (
                <div className="flex justify-start max-w-screen-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <div className=' w-[50%]'>
                        <Image src={imgPlaceholder} alt='img placeholder'></Image>
                    </div>
                    <div className='relative ml-[40px] w-[50%]'>
                        <h1 className="mb-[4px] text-2xl font-bold">Print Properties</h1>
                        <div className='flex mb-[16px]'>
                            <div className='mr-[16px] w-[50%]'>
                                <span>Page Size</span>
                                <Select
                                    className='block'
                                    defaultValue="A4"
                                    style={{ width: '100%' }}
                                    onChange={handleChangeSelect}
                                    options={[
                                        { value: 'A4', label: 'A4' },
                                        { value: 'A3', label: 'A3' },
                                    ]}
                                />
                            </div>
                            <div className=' w-[50%]'>
                                <span>Copies</span>
                                <InputNumber
                                    className='block'
                                    style={{ width: '100%' }}
                                    min={1}
                                    defaultValue={1}
                                    onChange={onChangeInput}
                                    changeOnWheel />
                            </div>
                        </div>
                        <div className='mb-[16px]'>
                            <span>Pages</span>
                            <div>
                                <Radio.Group className='ml-[24px]' onChange={onChangeRadio} value={value}>
                                    <Radio className='flex' value={1}>All</Radio>
                                    <Radio className='flex' value={2}>
                                        <Input
                                            style={{ width: '100%' }}
                                            placeholder="eg. 1-5, 8, 11-13"
                                            disabled={value === 1}  // Disable input when "All" is selected
                                            value={inputValue}
                                            onChange={onInputChange}
                                        />
                                    </Radio>

                                </Radio.Group>
                            </div>
                        </div>
                        <div className='w-[100%] mb-[16px]'>
                            <span>One-/double-sided</span>
                            <Select
                                className='block'
                                defaultValue="One-sided"
                                style={{ width: '100%' }}
                                onChange={handleChangeSelect}
                                options={[
                                    { value: 'onesided', label: 'One-sided' },
                                    { value: 'doublesided', label: 'Double-sided' },
                                ]}
                            />
                        </div>
                        <div className='absolute right-0 bottom-0 flex space-x-2 justify-end'>
                            <button className={styles.buttonBack} onClick={() => handlePrevStep('upload')}>
                                Back
                            </button>
                            <button className={styles.buttonNext} onClick={handleSubmit}>
                                Print
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay và thông báo */}
            {showNotification && (
                <div className="z-50 absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
                    {/* <div
                        className={`px-6 py-4 rounded text-white ${notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                    >
                        {notificationType === 'success' ? 'Submission Successful!' : 'Submission Failed!'}
                    </div> */}
                    {isSuccess === 'success' && (
                        <div className="flex flex-col items-center justify-center max-w-screen-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                            <div className='text-[green] text-[24px] leading-[28px] mb-[10px]'>
                                Request created successfully!
                            </div>
                            <div className='text-[16px] leading-[19px] text-[#656565] mb-[40px]'>
                                Your document was sent to {selectedPrinter?.name}
                            </div>
                            <div className='text-[16px] leading-[19px] text-[#656565]'>
                                Come after 1PM at {selectedPrinter?.location} to get your document
                            </div>
                            <div>
                                <button className='p-[8px] border-[1px] border-[rgba(0,0,0,0.2)] rounded-[10px] mt-[40px] hover:bg-gray-200'
                                    onClick={handleNavigateDashboard}
                                >
                                    Return to Dashboard
                                </button>
                            </div>
                        </div>
                    )}
                    {isSuccess === 'error' && (
                        <div className="relative flex flex-col items-center justify-center max-w-screen-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                            <div className='font-normal text-[24px] leading-[32px] mb-[10px]'>
                                You don't have enough pages to print!
                            </div>
                            <div className='text-[16px] leading-[19px] text-[#656565] mb-[80px]'>
                                Buy more pages or changing printing properties.
                            </div>
                            <div className='absolute right-[16px] bottom-0 flex space-x-2 justify-end'>
                                <button className='p-[8px] border-[1px] border-[rgba(0,0,0,0.2)] rounded-[10px] hover:bg-gray-200 mb-[16px]'
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button className='p-[8px] border-[1px] border-[rgba(0,0,0,0.2)] rounded-[10px] hover:bg-gray-200 mb-[16px]'
                                    onClick={handleNavigateBuyPages}
                                >
                                    Buy Pages
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Print;
