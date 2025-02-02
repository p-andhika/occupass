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
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Order } from './order-table';

type Props = {
  selectedRow?: Order;
  open: boolean;
  onClose: () => void;
};

export function DrawerDetailOrder({ selectedRow, open, onClose }: Props) {
  return (
    <Drawer open={open} direction="right">
      <DrawerContent className="h-full left-[70%]">
        <div className="px-10">
          <DrawerHeader className="px-0 mb-4">
            <DrawerTitle>Order Detail</DrawerTitle>
            <DrawerDescription>ID: {selectedRow?.id}</DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Customer ID:</Label>
              <Input
                disabled
                type="text"
                defaultValue={selectedRow?.customerId}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Employee ID:</Label>
              <Input
                disabled
                type="text"
                defaultValue={selectedRow?.employeeId}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Freight:</Label>
              <Input disabled type="text" defaultValue={selectedRow?.freight} />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Order Date:</Label>
              <Input
                disabled
                type="text"
                defaultValue={selectedRow?.orderDate}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Required Date:</Label>
              <Input
                disabled
                type="text"
                defaultValue={selectedRow?.requiredDate}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Ship Address:</Label>
              <Input
                disabled
                type="text"
                defaultValue={selectedRow?.shipAddress}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Ship City:</Label>
              <Input
                disabled
                type="text"
                defaultValue={selectedRow?.shipCity}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Ship Country:</Label>
              <Input
                disabled
                type="text"
                defaultValue={selectedRow?.shipCountry}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Ship Name:</Label>
              <Input
                disabled
                type="text"
                defaultValue={selectedRow?.shipName}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Ship Postal Code:</Label>
              <Input
                disabled
                type="text"
                defaultValue={selectedRow?.shipPostalCode}
              />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Ship Via:</Label>
              <Input disabled type="text" defaultValue={selectedRow?.shipVia} />
            </div>
            <div className="flex flex-row items-center">
              <Label className="w-[50%]">Ship Date:</Label>
              <Input
                disabled
                type="text"
                defaultValue={selectedRow?.shippedDate}
              />
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
