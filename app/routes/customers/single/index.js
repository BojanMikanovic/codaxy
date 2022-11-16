import Controller from './Controller';
import { LabelsLeftLayout } from 'cx/ui';
import { Icon, Link, TextField, Button, Window } from 'cx/widgets';
import InvoicesTable from './InvoicesTable';
import Chart from './Chart';
import KPI from './KPI';

export default (
   <cx>
      <div controller={Controller}>
         <main class="bg-gray-50">
            <div class="p-8">
               <Link
                  href="~/customers"
                  class=" w-10 h-10 border rounded-full top-[-20px] left-4 bg-white flex justify-center items-center z-10"
               >
                  <Icon name="arrow-left" />
               </Link>
            </div>

            <div class="text-center text-2xl mb-10 text-blue-500">Details of the selected customer</div>
            <div class="flex justify-between m-10 py-10 border rounded w-[1050px]">
               <div>
                  <div layout={LabelsLeftLayout} class="widget ml-20 ">
                     <TextField label="Full name" value:bind="$page.customer.fullName" readOnly />
                     <TextField label="City" value:bind="$page.customer.city" readOnly />
                     <TextField label="Country" value:bind="$page.customer.country" readOnly />
                     <TextField label="Tax number" value:bind="$page.customer.taxNumber" readOnly />
                     <TextField label="Create date" value:bind="$page.customer.createDate" readOnly />
                     <TextField label="Contact email" value:bind="$page.customer.contactEmail" readOnly />
                     <TextField label="Contact phone" value:bind="$page.customer.contactPhone" readOnly />
                     <TextField label="Default discount" value:bind="$page.customer.defaultDiscount" readOnly />
                  </div>
                  <div class="flex justify-end mt-8">
                     <Button mod="primary" text="Edit customer" onClick="onEditCustomer" icon="pencil" />
                  </div>
                  <div>
                     <Window
                        visible-bind="$page.show.customer"
                        title="Edit customer"
                        center
                        draggable
                        modal
                        style={{ width: '400px', padding: '20px' }}
                        layout={LabelsLeftLayout}
                     >
                        <TextField label="Full name" value:bind="$page.customer.fullName" />
                        <TextField label="City" value:bind="$page.customer.city" />
                        <TextField label="Country" value:bind="$page.customer.country" />
                        <TextField label="Tax number" value:bind="$page.customer.taxNumber" />
                        <TextField label="Create date" value:bind="$page.customer.createDate" />
                        <TextField label="Contact email" value:bind="$page.customer.contactEmail" />
                        <TextField label="Contact phone" value:bind="$page.customer.contactPhone" />
                        <TextField label="Default discount" value:bind="$page.customer.defaultDiscount" />
                        <div>
                           <Button mod="primary" text="Save" onClick="onSaveCustomer" icon="plus" class="mr-3" />
                           <Button text="Cancel" onClick="onCloseModal" />
                        </div>
                     </Window>
                  </div>
               </div>

               <div>
                  <Chart />
               </div>
            </div>

            <div class="grid grid-cols-4 m-10 gap-8 " style="grid-template-rows: auto; width: 1050px">
               <KPI
                  title="Unpaid Amount"
                  value:bind="$page.unpaidAmountOfAllInvoices"
                  unit="USD"
                  icon="credit-card"
                  iconClass="bg-amber-400 text-white"
                  change={0.012}
               />
               <KPI
                  title="YTD Paid Amount"
                  value:bind="$page.yearToDatePaidInvoices"
                  unit="USD"
                  icon="credit-card"
                  iconClass="bg-green-400 text-white"
                  change={0.082}
               />
               <KPI
                  title="YTD Total Amount"
                  value:bind="$page.yearToDateTotalInvoicedAmount"
                  unit="USD"
                  icon="credit-card"
                  iconClass="bg-blue-500 text-white"
                  change={-0.032}
               />
               <KPI
                  title="Last Year Total Amount"
                  value:bind="$page.lastYearTotalAmount"
                  unit="USD"
                  icon="credit-card"
                  iconClass="bg-blue-700 text-white"
                  change={0.011}
               />
            </div>
            <div class="m-10 bg-white border rounded w-[1050px] ">
               <InvoicesTable />
            </div>
         </main>
      </div>
   </cx>
);
