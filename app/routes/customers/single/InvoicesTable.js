import Controller from './Controller';
import { LabelsLeftLayout } from 'cx/ui';
import { Button, Grid, Label, LookupField, NumberField, TextField, ValidationGroup, Window, Link } from 'cx/widgets';

export default () => (
   <cx>
      <div controller={Controller}>
         <div class="p-10 ">
            <Label class="text-3xl p-5 text-blue-600">List of invoices</Label>

            <Grid
               records-bind="$page.customer.invoices"
               columns={[
                  {
                     header: 'Invoice number',
                     field: 'invoiceNumber',
                     items: (
                        <cx>
                           <Link
                              href-tpl="~/customers/invoice-edit/{$record.id}"
                              text-tpl="{$record.invoiceNumber}"
                              class="text-blue-500 hover:underline"
                           />
                        </cx>
                     ),
                     sortable: true,
                     width: 150,
                  },
                  { header: 'Created', field: 'created', sortable: true, align: 'center' },
                  { header: 'Paid', field: 'paid', sortable: true, align: 'center' },
                  { header: 'Amount', field: 'amount', sortable: true, align: 'center' },
                  { header: 'Currency', field: 'currency', sortable: true, align: 'right' },
               ]}
            />
         </div>

         <div class="flex justify-end p-3">
            <Button mod="primary" class="mx-8" text="Create new invoice" onClick="onAddInvoice" icon="plus" />
         </div>

         <ValidationGroup>
            <Window
               visible-bind="$page.show.invoice"
               title="Create New Invoice"
               center
               draggable
               modal
               style={{ width: '450px', padding: '20px' }}
               layout={LabelsLeftLayout}
            >
               <TextField
                  placeholder="please enter 4-digit number"
                  value-bind="$page.addInvoice.invoiceNumber"
                  label="Invoice Number"
                  autoFocus-expr="!{$page.addInvoice.invoiceNumber}"
                  required
                  asterisk
               />
               <TextField
                  placeholder="month/day/year"
                  value-bind="$page.addInvoice.created"
                  label="Created"
                  required
                  asterisk
               />
               <LookupField
                  value-bind="$page.addInvoice.paid"
                  label="Paid"
                  options={[
                     { id: 'no', text: 'no' },
                     { id: 'yes', text: 'yes' },
                  ]}
                  required
                  asterisk
               />
               <LookupField
                  value-bind="$page.addInvoice.currency"
                  label="Currency"
                  options={[
                     { id: 'USD', text: 'USD' },
                     { id: 'EUR', text: 'EUR' },
                  ]}
                  required
                  asterisk
               />
               <TextField value-bind="$page.customer.defaultDiscount" label="Discount" required asterisk />
               <NumberField value-bind="$page.addInvoice.amount" label="Amount" required asterisk />

               <div class="flex justify-end p-3">
                  <Button
                     disabled-expr="{$page.saveButtonDisable}"
                     mod="primary"
                     class="mx-8"
                     text="Save"
                     onClick="onAddNewInvoice"
                     icon="plus"
                  />

                  <Button text="Cancel" onClick="onCloseModal" />
               </div>
            </Window>
         </ValidationGroup>
      </div>
   </cx>
);
