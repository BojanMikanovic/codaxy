import { GET, PUT } from '../../../api/util/methods';

export default {
   onInit() {
      this.reloadInvoice();
   },

   reloadInvoice() {
      var id = this.store.get('$route.id');

      var promise = GET(`customer/invoice/${id}`).then((data) => {
         this.store.set('$page.editInvoice', data);
      });
      this.setLoadingIndicator(promise);
   },

   onSaveInvoice() {
      var id = this.store.get('$route.id');
      const invoice = this.store.get('$page.editInvoice');

      const promise = PUT(`customer/invoices/${id}`, invoice);

      promise
         .then((data) => {
            this.store.set('test', data);
         })
         .catch((e) => {
            console.log(e);
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
