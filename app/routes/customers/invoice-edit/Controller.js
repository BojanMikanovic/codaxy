import { GET, PUT } from '../../../api/util/methods';

export default {
   onInit() {
      this.reloadInvoice();
   },

   reloadInvoice() {
      var id = this.store.get('$route.id');

      GET(`customer/invoice/${id}`).then((data) => {
         this.store.set('$page.editInvoice', data);
      });
   },

   onSaveInvoice() {
      var id = this.store.get('$route.id');
      const invoice = this.store.get('$page.editInvoice');

      const promise = PUT(`customer/invoices/${id}`, invoice);
   },
};
