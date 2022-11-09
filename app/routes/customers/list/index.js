import { Grid, Link, TextField, LookupField, Pagination } from 'cx/widgets';
import Controller from './Controller';

export default (
   <cx>
      <div controller={Controller}>
         <TextField
            placeholder="Search customers..."
            value={{
               bind: '$page.filter.query',
               debounce: 300,
            }}
            icon="search"
            class="my-4 border-sky-400"
         />
         <Grid
            records-bind="$page.customers"
            columns={[
               {
                  header: 'Name',
                  field: 'fullName',
                  items: (
                     <cx>
                        <Link
                           href-tpl="~/customers/{$record.id}"
                           text-tpl="{$record.fullName}"
                           class="text-blue-500 hover:underline"
                        />
                     </cx>
                  ),
                  sortable: true,
               },
               { header: 'City', field: 'city', sortable: true },
               { header: 'Country', field: 'country', sortable: true },
               { header: 'Tax Number', field: 'taxNumber', sortable: true },
               { header: 'Create Date', field: 'createDate', sortable: true, align: 'right' },
               { header: 'Contact Email', field: 'contactEmail', sortable: true, align: 'right' },
               { header: 'Contact Phone', field: 'contactPhone', sortable: true, align: 'right' },
               { header: 'Default Discount', field: 'defaultDiscount', sortable: true, align: 'right' },
            ]}
         />
         <div class="border-t p-2 flex">
            <Pagination page-bind="$page.page" pageCount-bind="$page.pageCount" />
            <LookupField
               value-bind="$page.pageSize"
               class="ml-2 w-[180px]"
               required
               options={[
                  {
                     id: 5,
                     text: '5 rows per page',
                  },
                  {
                     id: 10,
                     text: '10 rows per page',
                  },
                  {
                     id: 20,
                     text: '20 rows per page',
                  },
                  {
                     id: 50,
                     text: '50 rows per page',
                  },
               ]}
            />
         </div>
      </div>
   </cx>
);
