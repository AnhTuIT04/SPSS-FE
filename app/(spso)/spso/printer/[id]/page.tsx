'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PrinterSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/router';

const ConfigurePrinterSchema = PrinterSchema.extend({
  // Add any additional fields or validation if needed
});

const ConfigurePrinterPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isPending, startTransition] = useState(false);
  const form = useForm<z.infer<typeof ConfigurePrinterSchema>>({
    resolver: zodResolver(ConfigurePrinterSchema),
    defaultValues: {
      name: '',
      location: '',
      status: 'ENABLE',
      supportedFileTypes: [],
      supportedPageSizes: [],
    },
  });

  const onSubmit = (data: z.infer<typeof ConfigurePrinterSchema>) => {
    startTransition(true);
    // Add your save logic here
    console.log('Printer data:', data);
    startTransition(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Configure Printer</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Printer Name" />
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
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Printer Location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Add more fields as needed */}
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigurePrinterPage;
