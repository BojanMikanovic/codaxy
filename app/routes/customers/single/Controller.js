import { append } from 'cx/data';

import { GET, POST, PUT } from '../../../api/util/methods';

export default {
   onInit() {
      this.store.init('$page.show', {
         customer: false,
         invoice: false,
         chart: true,
      });

      this.store.init('$page.enableButton', true);

      this.store.init('$page.addInvoice', {});

      this.fetchCustomer().then(() => this.fetchKPI());
   },

   fetchCustomer() {
      var id = this.store.get('$route.id');

      var promise = GET(`customers/${id}`).then((data) => {
         this.store.set('$page.customer', data);
      });
      this.setLoadingIndicator(promise);
      return promise;
   },

   fetchKPI() {
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
      this.nextItemId = this.nextItemId || -1;
      this.store.update('$page.customer.invoices', append, {
         id: this.nextItemId--,
      });
   },

   addNewInvoice() {
      this.store.set('$page.show.invoice', false);
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
      this.store.set('$page.addInvoice', {});
   },

   onCloseModal() {
      this.store.set('$page.show.customer', false);
      this.store.set('$page.show.invoice', false);
   },

   setSavingIndicator(p) {
      this.store.update('$page.saving', (saving) => (saving || 0) + 1);
      return p
         .then((x) => {
            this.store.update('$page.saving', (saving) => saving - 1);
            return x;
         })
         .catch((e) => {
            this.store.update('$page.saving', (saving) => saving - 1);
            throw e;
         });
   },

   setLoadingIndicator(p) {
      this.store.update('$page.loading', (loading) => (loading || 0) + 1);
      p.then((x) => {
         this.store.update('$page.loading', (loading) => loading - 1);
         return x;
      }).catch((e) => {
         this.store.update('$page.loading', (loading) => loading - 1);
      });
   },
};
