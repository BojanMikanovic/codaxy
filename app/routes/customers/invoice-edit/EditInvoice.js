import Controller from './Controller';
import { LabelsLeftLayout } from 'cx/ui';
import { Button, Label, TextField, Link, Icon, NumberField } from 'cx/widgets';

export default () => (
   <cx>
      <div controller={Controller}>
         <div class="p-8">
            <Link
               href="~/customers"
               class=" w-10 h-10 border rounded-full top-[-20px] left-4 bg-white flex justify-center items-center z-10"
            >
               <Icon name="arrow-left" />
            </Link>
         </div>
         <div class="p-10">
            <Label class="text-2xl p-5 text-blue-600">Edit Invoice</Label>
         </div>
         <div layout={LabelsLeftLayout} class="flex-col justify-center align-center">
            <div layout={LabelsLeftLayout} class="widget ml-20 ">
               <TextField label="Invoice Number" value:bind="$page.editInvoice.invoiceNumber" />
               <TextField label="Created" value:bind="$page.editInvoice.created" />
               <TextField label="Paid" value:bind="$page.editInvoice.paid" />
               <NumberField label="Amount" value:bind="$page.editInvoice.amount" />
               <TextField label="Currency" value:bind="$page.editInvoice.currency" />
            </div>
            <div class="flex justify-end p-3">
               <Button mod="primary" class="mx-8 " text="Save" onClick="onSaveInvoice" icon="plus" />

               <Button text="Cancel" />
            </div>
         </div>
      </div>
   </cx>
);
