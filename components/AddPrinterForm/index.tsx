'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AddPrinterSchema } from '@/schemas';
import { addPrinter } from '@/actions';

const uploader = Uploader({
  apiKey: 'free',
});

const options = {
  maxFileCount: 1,
  // mimeTypes: ['.jpeg', 'PNG', 'JPG', 'GIF', 'SVG', 'BMP'],

  styles: {
    colors: {
      primary: '#377dff',
    },
  },
};

const AddPrinter = () => {
  const [showForm, setShowForm] = useState(false);

  const [allFileTypes, setAllFileTypes] = useState<string[]>(
    [
      '.csv',
      '.doc',
      '.docx',
      '.jpeg',
      '.jpg',
      '.pdf',
      '.png',
      '.ppt',
      '.pptx',
      '.txt',
      '.xls',
      '.xlsx',
    ].sort(),
  );
  const [allPageSizes, setAllPageSizes] = useState<string[]>(
    ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6'].sort(),
  );

  const [isPending, startTransition] = useTransition();

  const [supportedFileTypes, setSupportedFileTypes] = useState<string[]>([]);
  const [supportedPageSizes, setSupportedPageSizes] = useState<string[]>([]);
  const [image, setImage] = useState<string>('');

  const form = useForm<z.infer<typeof AddPrinterSchema>>({
    resolver: zodResolver(AddPrinterSchema),
    defaultValues: {
      image: '/assets/printer.jpg',
      supportedFileTypes: [],
      status: 'ENABLE',
      supportedPageSizes: [],
    },
  });

  const onSubmit = (printer: z.infer<typeof AddPrinterSchema>) => {
    printer.image = image;
    printer.supportedFileTypes = supportedFileTypes;
    printer.supportedPageSizes = supportedPageSizes;

    startTransition(async () => {
      await addPrinter(printer);
    });
    form.reset();
    setShowForm(false);
  };

  const handleAddFileType = (type: string) => {
    setSupportedFileTypes([...supportedFileTypes, type]);
    setAllFileTypes(allFileTypes.filter((t) => t !== type));
  };

  const handleAddPageSize = (size: string) => {
    setSupportedPageSizes([...supportedPageSizes, size]);
    setAllPageSizes(allPageSizes.filter((s) => s !== size));
  };

  return (
    <>
      <Button
        onClick={() => setShowForm(true)}
        className="h-10 bg-[hsl(217,91%,50%)] hover:bg-[hsl(217,91%,45%)] max-[683px]:mt-6"
      >
        Add Printer
      </Button>
      {showForm && (
        <div className="absolute left-0 top-0 m-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)] bg-[rgba(40,40,40,0.5)] z-10">
          <Card className="absolute left-[50%] top-[112px] translate-x-[-50%] w-[80%] z-20">
            <CardHeader>
              <div className="w-full flex flex-col gap-y-4 items-center justify-center">
                <h1 className="text-3xl xl:text-3xl font-extrabold">Add a printer</h1>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold mt-2">Printer name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              type="text"
                              placeholder="Enter printer name"
                              autoComplete="printer-name"
                              className="h-12 px-6 bg-[#F3F4F6] focus:bg-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold mt-2">Location</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              type="text"
                              placeholder="Enter printer location"
                              autoComplete="printer-location"
                              className="h-12 px-6 bg-[#F3F4F6] focus:bg-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="relative flex items-center justify-between min-h-[80px]">
                      <div className="w-[85%]">
                        <h3 className="text-lg font-semibold mt-2">File Types</h3>
                        <div className="grid grid-cols-3 gap-3 mt-2 max-h-[84px] overflow-y-auto pr-2">
                          {supportedFileTypes.map((file, index) => (
                            <span
                              key={index}
                              className="relative bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-center text-sm"
                            >
                              {file}
                              <button
                                className="absolute top-[50%] right-[10%] translate-y-[-50%] ml-2 text-red-500"
                                onClick={() => {
                                  const newFileTypes = supportedFileTypes.filter(
                                    (_, i) => i !== index,
                                  );
                                  setAllFileTypes(
                                    [...allFileTypes, supportedFileTypes[index]].sort(),
                                  );
                                  setSupportedFileTypes(newFileTypes);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 block m-auto text-black"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <Select onValueChange={handleAddFileType}>
                        <SelectTrigger className="absolute top-[43px] right-0 w-[10%]">
                          <div className="max-[690px]:hidden">Add</div>
                          <div className="min-[690px]:hidden px-[30%]">+</div>
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          <SelectGroup>
                            {allFileTypes.map((type, index) => (
                              <SelectItem key={index} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="relative flex items-center justify-between min-h-[80px]">
                      <div className="w-[85%]">
                        <h3 className="text-lg font-semibold mt-2">Page Sizes</h3>
                        <div className="grid grid-cols-3 gap-3 mt-2 max-h-[84px] overflow-y-auto pr-2">
                          {supportedPageSizes.map((size, index) => (
                            <span
                              key={index}
                              className="relative bg-green-100 text-green-600 px-4 py-2 rounded-full text-center text-sm"
                            >
                              {size}
                              <button
                                className="absolute top-[50%] right-[10%] translate-y-[-50%] ml-2 text-red-500"
                                onClick={() => {
                                  const newPageSizes = supportedPageSizes.filter(
                                    (_, i) => i !== index,
                                  );
                                  setAllPageSizes(
                                    [...allPageSizes, supportedPageSizes[index]].sort(),
                                  );
                                  setSupportedPageSizes(newPageSizes);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 block m-auto text-black"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <Select onValueChange={handleAddPageSize}>
                        <SelectTrigger className="absolute top-[43px] right-0 w-[10%]">
                          <div className="max-[690px]:hidden">Add</div>
                          <div className="min-[690px]:hidden px-[30%]">+</div>
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          <SelectGroup>
                            {allPageSizes.map((type, index) => (
                              <SelectItem key={index} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4">
                      <p className="text-lg font-semibold mt-2">Upload an image</p>
                      <div className="flex items-center justify-center">
                        <UploadDropzone
                          uploader={uploader}
                          options={options}
                          onUpdate={(files) => setImage(files.map((x) => x.fileUrl).join('\n'))}
                          width="600px"
                          height="375px"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      onClick={() => {
                        form.reset();
                        setShowForm(false);
                      }}
                      size="lg"
                      className="h-12 tracking-wide font-semibold bg-gray-300 text-gray-800 w-full py-4 rounded-lg hover:bg-gray-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      Cancel
                    </Button>

                    <Button
                      disabled={isPending}
                      type="submit"
                      size="lg"
                      className="h-12 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      Add
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AddPrinter;
