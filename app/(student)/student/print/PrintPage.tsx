'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/(student)/student.module.css';
import Image from 'next/image';
import uploadFile from '@/public/assets/uploadfile.svg';
import imgPlaceholder from '@/public/assets/imgplaceholder.svg';
import { Select, InputNumber, Radio, Input } from 'antd';
import confetti from 'canvas-confetti'
import axios from 'axios';
import { useEdgeStore } from '@/lib/edgestorefile';
import { UploadAbortedError } from '@edgestore/react/errors';
import {
    MultiFileDropzone,
    type FileState,
} from '@/components/MultiFileDropzone';
import { Button } from '@/components/ui/button';

interface Printer {
    id: string;
    image: string;
    name: string;
    location: string;
    fileType: string[];
    status: boolean;
    pageSize: string[];
}

const Print = ({ user }: { user: any }) => {
    const [step, setStep] = useState('select-printer');

    const handleNextStep = (nextStep: string) => {
        setStep(nextStep);
    };

    const handlePrevStep = (prevStep: string) => {
        setStep(prevStep);
    };

    const [printers, setPrinters] = useState<Printer[]>([]);
    const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState(''); // 'success' or 'error'
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [formValues, setFormValues] = useState({
        printer: '', // newly added!!!!!!!!!!!
        pageSize: 'A4',
        copies: 1,
        pageSelection: 'all', // 'all' or 'custom'
        customPages: '',
        printType: 'onesided', // 'onesided' or 'doublesided'
    });

    const [searchVal, setSearchVal] = useState("");
    const [searchResults, setSearchResults] = useState<Printer[]>([]);

    const { edgestore } = useEdgeStore();
    const [fileStates, setFileStates] = useState<FileState[]>([]);

    const [uploadRes, setUploadRes] = useState<
        {
            url: string;
            filename: string;
            size?: number;
        }[]
    >([]);

    function updateFileState(key: string, changes: Partial<FileState>) {
        setFileStates((prevStates) => {
            return prevStates.map((fileState) => {
                if (fileState.key === key) {
                    return { ...fileState, ...changes };
                }
                return fileState;
            });
        });
    }

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Gửi request đến API
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

    // Lọc dữ liệu khi searchVal thay đổi
    useEffect(() => {
        const results = printers.filter(printer => {
            const searchLower = searchVal.trim().toLowerCase();

            return (
                printer.name.toLowerCase().includes(searchLower) ||  // Tìm kiếm theo name
                printer.location.toLowerCase().includes(searchLower) ||  // Tìm kiếm theo location
                printer.fileType.some(type => type.toLowerCase().includes(searchLower)) ||  // Tìm kiếm trong fileType
                printer.pageSize.some(size => size.toLowerCase().includes(searchLower)) ||  // Tìm kiếm trong pageSize
                (printer.status ? "ENABLE" : "DISABLE").toLowerCase().includes(searchLower)  // Tìm kiếm theo status
            );
        });

        setSearchResults(results);
    }, [searchVal, printers]);

    // Hiển thị loading hoặc lỗi
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const selectPrinter = (printer: Printer) => {
        setSelectedPrinter(printer);
        console.log(`choose ${printer.name}`)
        alert(`Bạn đã chọn ${printer.name}. Tiếp tục sang bước upload tài liệu.`);
    };

    const handleSelectChange = (field: any, value: any) => {
        console.log('select', value);
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleInputChange = (field: any, value: any) => {
        console.log('choose', value);
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        let response;
        try {
            const payload = {
                date: new Date().toISOString(),
                fileName: uploadRes[0].filename,
                fileType: uploadRes[0].filename.split('.').pop(),
                numberOfPage: uploadRes[0] ? Math.ceil((uploadRes[0].size || 3000) / Math.pow(2, 20)) : 0,
                userId: user.id
            }

            response = await axios.post(`http://localhost:3000/api/v1/printer/${formValues.printer}/print`, payload);


            for (let file of uploadRes) {
                const url = file.url;
                await edgestore.publicFiles.confirmUpload({ url })
            }
        } catch (error) {
            console.error('Error submitting print request:', error);
            // alert('Failed to submit print request.');
        }
        setIsSuccess(response?.status === 201);
        AfterPrintSubmit();
    };

    const AfterPrintSubmit = () => {
        setNotificationType(isSuccess ? 'success' : 'error');
        setShowNotification(true);

        // Chạy hiệu ứng pháo giấy
        isSuccess && confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        setTimeout(() => {
            setShowNotification(false);
            isSuccess ? handleNavigateDashboard() : handleNavigateBuyPages();
        }, 5000); // Ẩn thông báo sau 3 giây
    };

    const handleCancel = () => {
        setShowNotification(false);
        handleNavigateDashboard();
    };

    const router = useRouter();

    const handleNavigateDashboard = () => {
        router.push('/student/dashboard');
    };

    const handleNavigateBuyPages = () => {
        router.push('/student/buypages');
    };

    return (
        <>
            {step === 'select-printer' && (
                <div className="w-full h-full">
                    <div>
                        <div>
                            <h1 className="text-2xl font-bold mb-4">Select Printer</h1>
                            <input
                                className="search-input mb-4 p-2 w-[400px] border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Search by keywords..."
                                value={searchVal}
                                onChange={(e) => setSearchVal(e.target.value)}
                            />
                            <div className="flex items-center justify-center m-auto">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {searchResults.map((printer) => (
                                        <div
                                            key={printer.id}
                                            className="bg-white shadow-md rounded-lg cursor-pointer hover:bg-blue-100 transition w-[300px] h-fit"
                                            onClick={() => {
                                                selectPrinter(printer);
                                                handleNextStep('upload');
                                                handleInputChange('printer', printer.id);
                                            }}
                                        >
                                            <div className="h-[222px] bg-[#DEDEDE] rounded-tl-lg rounded-tr-lg">
                                                <img
                                                    src={printer.image}
                                                    alt='printer'
                                                    width={5000}
                                                    height={5000}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <p className="text-xl font-bold my-[8px]">{printer.name}</p>
                                                <p>Status: {printer.status ? "ENABLE" : "DISABLE"}</p>
                                                <hr className="my-4 border-gray-300" />
                                                <div>
                                                    <div className="h-[120px]">
                                                        <h3 className="text-lg font-semibold mt-2">File Type</h3>
                                                        <div className="grid grid-cols-4 gap-3 mt-2 max-h-[84px] overflow-y-auto pr-2">
                                                            {printer.fileType &&
                                                                printer.fileType.map((type, index) => (
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
                                                            {printer.pageSize &&
                                                                printer.pageSize.map((size, index) => (
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
                                                <p className="text-gray-500 my-[8px]">Location: {printer.location}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
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

                    <div className='flex justify-center'>
                        <Image src={uploadFile} alt='upload'></Image>
                    </div>
                    <div className='flex flex-col justify-center items-center pt-6'>
                        <MultiFileDropzone
                            value={fileStates}
                            dropzoneOptions={{ maxFiles: 1 }}
                            onChange={(files) => {
                                setFileStates(files);
                            }}
                            onFilesAdded={async (addedFiles) => {
                                setFileStates([...fileStates, ...addedFiles]);
                            }}

                        />
                        <Button
                            className={`${styles.buttonNext} mt-2`}
                            onClick={async () => {
                                await Promise.all(
                                    fileStates.map(async (fileState) => {
                                        try {
                                            if (fileState.progress !== 'PENDING') return;
                                            const abortController = new AbortController();
                                            updateFileState(fileState.key, { abortController });
                                            const res = await edgestore.publicFiles.upload({
                                                file: fileState.file,
                                                options: { temporary: true },
                                                signal: abortController.signal,
                                                onProgressChange: async (progress) => {
                                                    updateFileState(fileState.key, { progress });
                                                    if (progress === 100) {
                                                        // wait 1 second to set it to complete
                                                        // so that the user can see the progress bar
                                                        await new Promise((resolve) => setTimeout(resolve, 1000));
                                                        updateFileState(fileState.key, { progress: 'COMPLETE' });
                                                    }
                                                },
                                            });
                                            setUploadRes((uploadRes) => [
                                                ...uploadRes,
                                                {
                                                    url: res.url,
                                                    filename: fileState.file.name,
                                                    size: fileState.file.size,
                                                },
                                            ]);
                                            updateFileState(fileState.key, { progress: 'COMPLETE', url: res.url });
                                        } catch (err) {
                                            console.error(err);
                                            if (err instanceof UploadAbortedError) {
                                                updateFileState(fileState.key, { progress: 'PENDING' });
                                            } else {
                                                updateFileState(fileState.key, { progress: 'ERROR' });
                                            }
                                        }
                                    }),
                                );
                            }}
                            disabled={
                                !fileStates.filter((fileState) => fileState.progress === 'PENDING')
                                    .length
                            }
                        >
                            Upload
                        </Button>
                    </div>

                    <div className='mt-[8px]'>
                        <span className='text-[14px] leading-[20px] text-[#6D6D6D]'>Only support {selectedPrinter?.fileType.map((type, index) => (
                            <span key={index}>.{type.toLowerCase()} </span>
                        ))}
                            file</span>
                    </div>

                    <div className='flex space-x-2 justify-end'>
                        <button className={styles.buttonBack} onClick={() => handlePrevStep('select-printer')}>Back</button>
                        <button
                            className={styles.buttonNext}
                            onClick={() => handleNextStep('specify-props')}
                            disabled={!fileStates.length || fileStates.some(fileState => fileState.progress !== 'COMPLETE')}
                        >
                            Next
                        </button>
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
                                    onChange={(value) => handleSelectChange('pageSize', value)}
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
                                    onChange={(value) => handleInputChange('copies', value)}
                                    changeOnWheel />
                            </div>
                        </div>
                        <div className='mb-[16px]'>
                            <span>Pages</span>
                            <div>
                                <Radio.Group
                                    className="ml-[24px]"
                                    onChange={(e) =>
                                        handleInputChange(
                                            'pageSelection',
                                            e.target.value === 1 ? 'all' : 'custom'
                                        )
                                    }
                                    value={formValues.pageSelection === 'all' ? 1 : 2}
                                >
                                    <Radio className="flex" value={1}>
                                        All
                                    </Radio>
                                    <Radio className="flex" value={2}>
                                        <Input
                                            style={{ width: '100%' }}
                                            placeholder="eg. 1-5, 8, 11-13"
                                            disabled={formValues.pageSelection === 'all'}
                                            value={formValues.customPages}
                                            onChange={(e) =>
                                                handleInputChange('customPages', e.target.value)
                                            }
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
                                onChange={(value) => handleSelectChange('printType', value)}
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
                                Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showNotification && (
                <div className="z-50 absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center max-w-screen-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                            <div className='text-[green] text-[24px] leading-[28px] mb-[10px]'>
                                Request created successfully!
                            </div>
                            <div className='text-[16px] leading-[19px] text-[#656565] mb-[40px]'>
                                Your document was sent to {selectedPrinter?.name}
                            </div>
                            <div className="text-[16px] leading-[19px] text-[#656565]">
                                {`Come after ${new Date(Date.now() + 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} at ${selectedPrinter?.location
                                    } to get your document`}
                            </div>
                            <div>
                                <button className={`${styles.buttonNext} p-[8px] mt-[40px]`}
                                    onClick={handleNavigateDashboard}
                                >
                                    Return to Dashboard
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="relative flex flex-col items-center justify-center max-w-screen-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                            <div className='font-normal text-[24px] leading-[32px] mb-[10px]'>
                                You don't have enough pages to print!
                            </div>
                            <div className='text-[16px] leading-[19px] text-[#656565] mb-[80px]'>
                                Buy more pages or changing printing properties.
                            </div>
                            <div className='absolute right-[16px] bottom-0 flex space-x-2 justify-end'>
                                <button className={`${styles.buttonBack} p-[8px] mb-[16px]`}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button className={`${styles.buttonNext} p-[8px] mb-[16px]`}
                                    onClick={handleNavigateBuyPages}
                                >
                                    Buy Pages
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
};

export default Print;
