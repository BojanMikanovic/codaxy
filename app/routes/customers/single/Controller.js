import { append } from 'cx/data';

import { GET, POST, PUT } from '../../../api/util/methods';

export default {
   onInit() {
      this.store.set('$page.add', this.store.get('$route.id') == 'new');
      this.store.init('$page.show', {
         customer: false,
         invoice: false,
         editInvoice: false,
      });

      this.store.init('$page.addInvoice', {});
      this.store.init('$page.editInvoice', {});

      this.reloadCustomer();
   },

   reloadCustomer() {
      var id = this.store.get('$route.id');
      if (id != 'new') {
         var promise = GET(`customers/${id}`).then((data) => {
            this.store.set('$page.customer', data);
         });
         this.setLoadingIndicator(promise);
      } else {
         this.store.set('$page.customer', {});
      }
   },

   /* reloadInvoice() {
      var id = this.store.get('$route.id');
      if (id != 'new') {
         var promise = GET(`customer/invoices/${id}`).then((data) => {
            this.store.set('$page.customer.invoice', data);
         });
         this.setLoadingIndicator(promise);
      } else {
         this.store.set('$page.customer.invoice', {});
      }
   }, */

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

   onQueryProducts(q) {
      return GET('products');
   },

   onEditCustomer() {
      this.store.set('$page.show.customer', true);
   },

   onSaveCustomer() {
      const { customer } = this.store.get('$page');

      const promise = PUT(`customers/${customer.id}`, customer);

      this.store.set('$page.show.customer', false);
   },

   onSaveInvoice() {
      let editInvoiceData = this.store.get('$page.editInvoice');
      let id = this.store.get('$route.id');
      const promise = PUT(`customer/invoices/${id}`, editInvoiceData);
   },

   onAddInvoice() {
      this.store.set('$page.show.invoice', true);
      this.nextItemId = this.nextItemId || -1;
      this.store.update('$page.customer.invoices', append, {
         id: this.nextItemId--,
      });
   },

   onEditInvoice() {
      this.store.set('$page.show.editInvoice', true);
   },

   onCloseModal() {
      this.store.set('$page.show.customer', false);
      this.store.set('$page.show.invoice', false);
   },

   addNewInvoice() {
      this.store.set('$page.show.invoice', false);
      const { customer } = this.store.get('$page');

      let newInvoice = this.store.get('$page.addInvoice');

      let invoice = {
         id: customer.id,
         ...newInvoice,
      };

      const promise = POST('customer/invoices', invoice).then((res) => {
         let invoices = res.invoices;
         this.store.set('$page.customer.invoices', invoices);
      });
   },
};
