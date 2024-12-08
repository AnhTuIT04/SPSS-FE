'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DialogClose } from '@radix-ui/react-dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

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

const updatePrinter = async (printer: any) => {
  const response = await fetch(`http://localhost:3000/api/v1/printer/${printer.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(printer),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error('Failed to update printer');
}

const EditPrinterImage = (printer: any) => {
  const [image, setImage] = useState(printer.image);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveClick = () => {
    updatePrinter({ ...printer, image });
    setIsEditing(false);
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Printer Image</CardTitle>
        <CardDescription>Manage the image for this printer. This image will be displayed in search results and listings.</CardDescription>
        <Separator className="max-w-2xl" />
      </CardHeader>
      <CardContent className="flex justify-between items-center max-w-2xl">
        <div className="flex justify-between flex-1 items-center text-gray-500">
          <img src={image} alt="Printer" className="w-48 h-48 object-cover rounded-md shadow mb-4" />
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="default" onClick={() => setIsEditing(true)}>Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Upload an Image</DialogTitle>
                <DialogDescription>
                  Upload a new image for the printer. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
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
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={handleSaveClick} type="submit">
                    Save changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

const EditPrinterName = (printer: any) => {
  const [name, setName] = useState(printer.name);

  const handleSaveChanges = async () => {
    await updatePrinter({ ...printer, name });
  }

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Printer Name</CardTitle>
        <CardDescription>The name to display, this can be used for searching.</CardDescription>
        <Separator className="max-w-2xl" />
      </CardHeader>
      <CardContent className="flex justify-between items-center max-w-2xl">
        <span className="text-gray-500">
          <p>{name}</p>
        </span>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit printer name</DialogTitle>
              <DialogDescription>
                Update the printer name as needed. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editName" className="text-right">
                  Printer name
                </Label>
                <Input id="editName" value={name} onChange={handleChanges} className="col-span-3" />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={handleSaveChanges} type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const EditPrinterLocation = (printer: any) => {
  const [location, setLocation] = useState(printer.location);

  const handleSaveChanges = async () => {
    await updatePrinter({ ...printer, location });
  }

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Printer location</CardTitle>
        <CardDescription> The printer's location, this can be used for searching.</CardDescription>
        <Separator className="max-w-2xl" />
      </CardHeader>
      <CardContent className="flex justify-between items-center max-w-2xl">
        <span className="text-gray-500">
          <p>{location}</p>
        </span>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit printer location</DialogTitle>
              <DialogDescription>
                Update the printer location as needed. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editLocation" className="text-right">
                  Printer location
                </Label>
                <Input id="editLocation" value={location} onChange={handleChanges} className="col-span-3" />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={handleSaveChanges} type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const EditPrinterStatus = (printer: any) => {
  const [status, setStatus] = useState(printer.status ? 'ENABLE' : 'DISABLED');

  const handleSaveChanges = async () => {
    await updatePrinter({ ...printer, status: status === 'ENABLE' });
  }

  const handleChanges = (value: string) => {
    setStatus(value as string);
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Printer status</CardTitle>
        <CardDescription>
          The current status of the printer, indicating whether it is enabled or disabled.
        </CardDescription>
        <Separator className="max-w-2xl" />
      </CardHeader>
      <CardContent className="flex justify-between items-center max-w-2xl">
        <span className="text-gray-500">
          <p className={status === 'ENABLE' ? 'text-green-500' : 'text-red-500'}>{status}</p>
        </span>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit printer status</DialogTitle>
              <DialogDescription>
                Update the printer status if needed. If the printer's status is DISABLED, students can't use it. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="defaultPage" className="text-right">
                  Printer status
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{status}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select printer status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={status} onValueChange={handleChanges}>
                      <DropdownMenuRadioItem value="ENABLE">ENABLE</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="DISABLED">DISABLED</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={handleSaveChanges} type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const EditFileType = (printer: any) => {
  const [allFileTypes, setAllFileTypes] = useState<string[]>(["pdf", "docx", "xlsx", "pptx", "jpg", "png", "jpeg"].sort());
  const [supportedFileTypes, setSupportedFileTypes] = useState<string[]>(printer.fileType.sort());

  useEffect(() => {
    const newFileTypes = allFileTypes.filter((type) => !supportedFileTypes.includes(type));
    setAllFileTypes(newFileTypes);
  }, [supportedFileTypes]);

  const handleAddFileType = (type: string) => {
    const updatedTypes = [...supportedFileTypes, type].sort();
    setSupportedFileTypes(updatedTypes);
    updatePrinter({ ...printer, fileType: updatedTypes });
  };

  const handleRemoveFileType = (index: number) => {
    const updatedTypes = supportedFileTypes.filter((_, i) => i !== index);
    setSupportedFileTypes(updatedTypes);
    setAllFileTypes([...allFileTypes, supportedFileTypes[index]].sort());
    updatePrinter({ ...printer, fileType: updatedTypes });
  };

  const handleSaveChanges = async () => {
    await updatePrinter({ ...printer, fileType: supportedFileTypes });
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>File Type</CardTitle>
        <CardDescription>Manage the supported file types for this printer.</CardDescription>
        <Separator className="max-w-2xl" />
      </CardHeader>
      <CardContent className="flex justify-between items-center max-w-3xl">
        <div className="grid grid-cols-3 gap-3 mt-2 max-h-[84px] overflow-y-auto pr-2">
          {supportedFileTypes.map((type, index) => (
            <span
              key={index}
              className="relative min-w-[100px] bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-center text-sm"
            >
              {type}
              <button
                className="absolute top-[50%] right-[10%] translate-y-[-50%] ml-2 text-red-500"
                onClick={() => handleRemoveFileType(index)}
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Supported File Types</DialogTitle>
              <DialogDescription>
                Add or remove supported file types as needed. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="addFileType" className="text-right">
                  Add File Type
                </Label>
                <Select onValueChange={handleAddFileType}>
                  <SelectTrigger className='w-40'>
                    <div>Select type</div>
                  </SelectTrigger>
                  <SelectContent>
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
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={handleSaveChanges} type="submit">
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const EditPageSize = (printer: any) => {
  const [allPageSizes, setAllPageSizes] = useState<string[]>(["A2", "A3", "A4", "A5"]);
  const [supportedPageSizes, setSupportedPageSizes] = useState<string[]>(printer.pageSize.sort());

  useEffect(() => {
    const newPageSizes = allPageSizes.filter((size) => !supportedPageSizes.includes(size));
    setAllPageSizes(newPageSizes);
  }, [supportedPageSizes]);

  const handleAddPageSize = (size: string) => {
    const updatedSizes = [...supportedPageSizes, size].sort();
    setSupportedPageSizes(updatedSizes);
    updatePrinter({ ...printer, pageSize: updatedSizes });
  };

  const handleRemovePageSize = (index: number) => {
    const updatedSizes = supportedPageSizes.filter((_, i) => i !== index);
    setSupportedPageSizes(updatedSizes);
    setAllPageSizes([...allPageSizes, supportedPageSizes[index]].sort());
    updatePrinter({ ...printer, pageSize: updatedSizes });
  };

  const handleSaveChanges = async () => {
    await updatePrinter({ ...printer, pageSize: supportedPageSizes });
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Page Size</CardTitle>
        <CardDescription>Manage the supported page sizes for this printer.</CardDescription>
        <Separator className="max-w-2xl" />
      </CardHeader>
      <CardContent className="flex justify-between items-center max-w-3xl">
        <div className="grid grid-cols-3 gap-3 mt-2 max-h-[84px] overflow-y-auto pr-2">
          {supportedPageSizes.map((size, index) => (
            <span
              key={index}
              className="relative min-w-[100px] bg-green-100 text-green-600 px-4 py-2 rounded-full text-center text-sm"
            >
              {size}
              <button
                className="absolute top-[50%] right-[10%] translate-y-[-50%] ml-2 text-red-500"
                onClick={() => handleRemovePageSize(index)}
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Supported Page Sizes</DialogTitle>
              <DialogDescription>
                Add or remove supported page sizes as needed. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="addPageSize" className="text-right">
                  Add Page Size
                </Label>
                <Select onValueChange={handleAddPageSize}>
                  <SelectTrigger className='w-40'>
                    <div>Select size</div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {allPageSizes.map((size, index) => (
                        <SelectItem key={index} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={handleSaveChanges} type="submit">
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const PrinterConfigPage = () => {
  const { id } = useParams();
  const [printer, setPrinter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrinter = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/printer/${id}`);
        const data = await response.json();
        setPrinter(data);
      } catch (error) {
        console.error("Error fetching printer:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrinter();
  }, [id]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Configure Printer</CardTitle>
        <CardDescription>Update settings for this printer</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-gray-500 text-center">Loading printer data...</div>
        ) : printer ? (
          <>
            <div className="mb-6">
              <EditPrinterImage {...printer} />
            </div>
            <div className="mb-6">
              <EditPrinterName {...printer} />
            </div>
            <div className="mb-6">
              <EditPrinterLocation {...printer} />
            </div>
            <div className="mb-6">
              <EditPrinterStatus {...printer} />
            </div>
            <div className="mb-6">
              <EditFileType {...printer} />
            </div>
            <div className="mb-6">
              <EditPageSize {...printer} />
            </div>
          </>
        ) : (
          <div className="text-gray-500 text-center">Printer not found or doesn't exist.</div>
        )}
      </CardContent>
    </Card>
  );
};

export default PrinterConfigPage;
