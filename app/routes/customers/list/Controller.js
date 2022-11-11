import { GET } from '../../../api/util/methods';

export default {
   onInit() {
      this.store.init('$page.pageSize', 10);

      this.store.init('$page.filter', {
         query: null,
         sortField: 'fullName',
         sortDir: 'desc',
      });

      this.addTrigger(
         'resetPage',
         ['$page.filter', '$page.pageSize'],
         () => {
            this.store.set('$page.page', 1);
            this.store.set('$page.pageCount', 1);
         },
         true
      );

      this.fetchCustomers();

      this.addTrigger('load', ['$page.filter', '$page.page', '$page.pageSize'], () => this.fetchCustomers(), true);
   },

   fetchCustomers() {
      var filter = this.store.get('$page.filter');
      var pageSize = this.store.get('$page.pageSize');
      var page = this.store.get('$page.page');
      var pageCount = this.store.get('$page.pageCount');
      var promise = GET('customers', { query: { ...filter, page, pageSize } }).then((data) => {
         this.store.set('$page.customers', data.slice(0, pageSize));
         this.store.set('$page.pageCount', Math.max(pageCount, page + (data.length == pageSize ? 1 : 0)));
      });
   },
};
