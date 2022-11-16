import { GET, POST, PUT } from '../../../api/util/methods';
import { append } from 'cx/data';

export default {
   onInit() {
      this.store.init('$page.show', {
         customer: false,
         invoice: false,
         chart: true,
      });

      this.store.set('$page.saveButtonDisable', true);

      this.store.init('$page.addInvoice', {
         invoiceNumber: '',
         month: '',
         created: '',
         paid: '',
         currency: '',
         amount: null,
      });

      this.fetchCustomer().then(() => this.customerData());

      this.addTrigger('disable', ['$page.addInvoice'], () => {
         if (
            this.store.get('$page.addInvoice.invoiceNumber') !== '' &&
            this.store.get('$page.addInvoice.month') !== '' &&
            this.store.get('$page.addInvoice.created') !== '' &&
            this.store.get('$page.addInvoice.paid') !== '' &&
            this.store.get('$page.addInvoice.currency') !== ''
         ) {
            this.store.set('$page.saveButtonDisable', false);
         }
      });
   },

   fetchCustomer() {
      var id = this.store.get('$route.id');

      var promise = GET(`customers/${id}`).then((data) => {
         this.store.set('$page.customer', data);
      });

      return promise;
   },

   customerData() {
      let { customer } = this.store.get('$page');
      if (customer === 'undefined') {
         return;
      }
      let yearToDatePaidInvoices = customer.invoices
         .filter((i) => i.paid === 'yes')
         .reduce((acc, p) => acc + p.amount, 0);
      this.store.set('$page.yearToDatePaidInvoices', yearToDatePaidInvoices);

      let unpaidAmountOfAllInvoices = customer.invoices
         .filter((i) => i.paid === 'no')
         .reduce((acc, u) => acc + u.amount, 0);
      this.store.set('$page.unpaidAmountOfAllInvoices', unpaidAmountOfAllInvoices);

      let yearToDateTotalInvoicedAmount = customer.invoices.reduce((acc, a) => acc + a.amount, 0);
      this.store.set('$page.yearToDateTotalInvoicedAmount', yearToDateTotalInvoicedAmount);

      let lastYearTotalAmount = customer.lastYear.reduce((acc, curr) => acc + curr);
      this.store.set('$page.lastYearTotalAmount', lastYearTotalAmount);

      let turnover = customer.invoices.slice(-6);
      this.store.set('$page.turnover', turnover);
   },

   onEditCustomer() {
      this.store.set('$page.show.customer', true);
   },

   onSaveCustomer() {
      const { customer } = this.store.get('$page');

      PUT(`customers/${customer.id}`, customer);

      this.store.set('$page.show.customer', false);
   },

   onAddInvoice() {
      this.store.set('$page.show.invoice', true);
   },

   onAddNewInvoice() {
      const { customer } = this.store.get('$page');

      let newInvoice = this.store.get('$page.addInvoice');

      let invoice = {
         id: customer.id,
         ...newInvoice,
      };

      POST('customer/invoices', invoice).then((res) => {
         let invoices = res.invoices;
         this.store.set('$page.customer.invoices', invoices);
      });

      this.store.set('$page.addInvoice', {
         month: '',
         invoiceNumber: '',
         created: '',
         paid: '',
         currency: '',
         amount: null,
      });
      this.store.set('$page.saveButtonDisable', true);
      this.store.set('$page.show.invoice', false);
   },

   onCloseModal() {
      this.store.set('$page.show.customer', false);
      this.store.set('$page.show.invoice', false);
   },
};
