'use client';

import { Button } from '@/components/ui/button';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

const EditRemainingPage = () => {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Default Pages</CardTitle>
        <CardDescription>The number of pages given to students at each time period</CardDescription>
        <Separator className="max-w-2xl" />
      </CardHeader>
      <CardContent className="flex justify-between items-center max-w-2xl">
        <span className="text-gray-500">
          <p>100 pages</p>
        </span>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Default Pages</DialogTitle>
              <DialogDescription>
                Make changes to your system's default pages at each time period here. Click save
                when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="defaultPage" className="text-right">
                  Default Pages
                </Label>
                <Input id="defaultPage" value="100" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const EditPageTimePeriod = () => {
  const [timePeriod, setTimePeriod] = useState('Monthly');
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Pages Time Period</CardTitle>
        <CardDescription>
          The period at which students will be given their default pages
        </CardDescription>
        <Separator className="max-w-2xl" />
      </CardHeader>
      <CardContent className="flex justify-between items-center max-w-2xl">
        <span className="text-gray-500">
          <p>Every month</p>
        </span>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Time Period</DialogTitle>
              <DialogDescription>
                Make changes to the time when you want to give the students the default pages. Click
                save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="defaultPage" className="text-right">
                  Time Period
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{timePeriod}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select Time Period</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={timePeriod} onValueChange={setTimePeriod}>
                      <DropdownMenuRadioItem value="Weekly">Weekly</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Monthly">Monthly</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Yearly">Yearly</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const EditReportTimePeriod = () => {
  const [timePeriod, setTimePeriod] = useState('Monthly');
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Report Time Period</CardTitle>
        <CardDescription>
          The period at which the SPSS system will generate reports about printing and payment
          activities
        </CardDescription>
        <Separator className="max-w-2xl" />
      </CardHeader>
      <CardContent className="flex justify-between items-center max-w-2xl">
        <span className="text-gray-500">
          <p>Every month</p>
        </span>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Time Period</DialogTitle>
              <DialogDescription>
                Make changes to the time when you want the SPSS system to automatically generate the
                reports. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="defaultPage" className="text-right">
                  Time Period
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{timePeriod}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select Time Period</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={timePeriod} onValueChange={setTimePeriod}>
                      <DropdownMenuRadioItem value="Weekly">Weekly</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Monthly">Monthly</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Yearly">Yearly</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const Page = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Update settings for your SPSS</CardDescription>
      </CardHeader>
      <CardContent>
        <EditRemainingPage />
      </CardContent>
      <CardContent>
        <EditPageTimePeriod />
      </CardContent>
      <CardContent>
        <EditReportTimePeriod />
      </CardContent>
    </Card>
  );
};

export default Page;
