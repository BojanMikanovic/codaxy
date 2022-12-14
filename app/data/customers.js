import { randomElement } from './randomElement';
import { rest } from 'msw';
import { getSearchQueryPredicate } from 'cx/util';

import customers from './customers.json';

let lastId = 400;

export const customerEndpoints = [
   rest.get('/api/customers', (req, res, ctx) => {
      let query = req.url.searchParams.get('query');
      let pageSize = req.url.searchParams.get('pageSize') || 20;
      let page = req.url.searchParams.get('page') || 1;
      let results = [...customers];
      if (query) {
         const predicate = getSearchQueryPredicate(query);
         results = results.filter((x) => predicate(x.fullName));
      }
      results = results.slice((page - 1) * pageSize, page * pageSize);
      return res(ctx.json(results));
   }),

   rest.get('/api/customers/:id', (req, res, ctx) => {
      let { id } = req.params;

      let customer = customers.find((i) => i.id == id);

      return res(ctx.json(customer));
   }),

   rest.get('/api/customer/invoice/:id', (req, res, ctx) => {
      let { id } = req.params;

      let invoice;
      for (let c of customers) {
         for (let i of c.invoices) {
            if (i.id == id) {
               invoice = i;
               break;
            }
         }
      }
      return res(ctx.json(invoice));
   }),

   rest.put('/api/customers/:id', (req, res, ctx) => {
      let { id } = req.params;

      let customer = customers.find((i) => i.id == id);

      Object.assign(customer, req.body);

      return res(ctx.json(customer));
   }),

   rest.put('/api/customer/invoices/:id', (req, res, ctx) => {
      let { id } = req.params;

      let invoice;
      for (let c of customers) {
         for (let i of c.invoices) {
            if (i.id == id) {
               invoice = i;
               break;
            }
         }
      }
      Object.assign(invoice, req.body);
      return res(ctx.json(invoice));
   }),

   rest.post('/api/customer/invoices', (req, res, ctx) => {
      let { customerId } = req.body;

      let customer = customers.find((i) => i.id == customerId);

      let { month, created, amount, invoiceNumber, paid, currency } = req.body;

      let invoice = {
         month,
         created,
         amount,
         invoiceNumber,
         paid,
         currency,
         id: ++lastId,
      };

      customer.invoices.push(invoice);

      return res(ctx.json(customer));
   }),
];
