'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Customer } from './customer-table';
import { Label } from './ui/label';
import { Input } from './ui/input';

type Props = {
  selectedRow?: Customer;
  open: boolean;
  onClose: () => void;
};

export function DrawerDetailCustomer({ selectedRow, open, onClose }: Props) {
  return (
    <Drawer open={open} direction="right">
      <DrawerContent className="h-full left-[70%]">
        <div className="px-10">
          <DrawerHeader className="px-0 mb-4">
            <DrawerTitle>Customer Detail</DrawerTitle>
            <DrawerDescription>ID: {selectedRow?.id}</DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Company Name:</Label>
              <Input
                disabled
                type="text"
                defaultValue={selectedRow?.companyName}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Contact Name:</Label>
              <Input
                disabled
                type="text"
                defaultValue={selectedRow?.contactName}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Contact Title:</Label>
              <Input
                disabled
                type="text"
                defaultValue={selectedRow?.contactTitle}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Address:</Label>
              <Input disabled type="text" defaultValue={selectedRow?.address} />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">City:</Label>
              <Input disabled type="text" defaultValue={selectedRow?.city} />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Postal Code:</Label>
              <Input
                disabled
                type="text"
                defaultValue={selectedRow?.postalCode}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Country:</Label>
              <Input disabled type="text" defaultValue={selectedRow?.country} />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Phone:</Label>
              <Input disabled type="text" defaultValue={selectedRow?.phone} />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Fax:</Label>
              <Input disabled type="text" defaultValue={selectedRow?.fax} />
            </div>
          </div>

          <DrawerFooter className="absolute bottom-0 right-0 w-full">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
