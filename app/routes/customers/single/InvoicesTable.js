import Controller from './Controller';
import { LabelsLeftLayout } from 'cx/ui';
import { Button, Grid, Label, LookupField, NumberField, TextField, ValidationGroup, Window } from 'cx/widgets';

export default () => (
   <cx>
      <div controller={Controller}>
         <div class="p-10">
            <div class="flex-row pad2">
               <div class="pb-4" value:bind="$page.customer.fullName"></div>
            </div>

            <Label class="text-2xl p-5">List of invoices</Label>

            <Grid
               records-bind="$page.customer.invoices"
               columns={[
                  {
                     header: 'Invoice number',
                     field: 'invoiceNumber',

                     sortable: true,
                  },
                  { header: 'Created', field: 'created', sortable: true },
                  { header: 'Paid', field: 'paid', sortable: true },
                  { header: 'Amount', field: 'amount', sortable: true },
                  { header: 'Currency', field: 'currency', sortable: true, align: 'right' },
               ]}
            />
         </div>

         <div class="flex justify-end p-3">
            <Button class="mx-8" text="Create new invoice" onClick="onAddInvoice" icon="plus" />
         </div>
         <ValidationGroup invalid-bind="$page.invalid">
            <Window
               visible-bind="$page.show.invoice"
               title="Create New Invoice"
               center
               draggable
               modal
               style={{ width: '400px', padding: '20px' }}
               layout={LabelsLeftLayout}
            >
               <TextField value-bind="$page.addInvoice.invoiceNumber" label="Invoice Number" required />
               <TextField
                  placeholder="date/month/year"
                  value-bind="$page.addInvoice.created"
                  label="Created"
                  required
               />
               <LookupField
                  value-bind="$page.addInvoice.paid"
                  label="Paid"
                  options={[
                     { id: 'no', text: 'no' },
                     { id: 'yes', text: 'yes' },
                  ]}
                  required
               />
               <NumberField value-bind="$page.addInvoice.amount" label="Amount" required />
               <TextField placeholder="USD/EUR" value-bind="$page.addInvoice.currency" label="Currency" required />
               <div class="flex justify-end p-3">
                  <Button class="mx-8" text="Save" onClick="addNewInvoice" icon="plus" />

                  <Button text="Cancel" onClick="onCloseModal" />
               </div>
            </Window>
         </ValidationGroup>
      </div>
   </cx>
);
