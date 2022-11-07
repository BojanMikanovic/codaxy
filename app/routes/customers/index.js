import { SandboxedRoute } from '../../components/SandboxedRoute';
import CustomersList from './list';
import SingleCustomer from './single';
import EditInvoice from './single/EditInvoice';

export default (
   <cx>
      <SandboxedRoute route="~/customers">{CustomersList}</SandboxedRoute>
      <SandboxedRoute route="~/customers/:id">{SingleCustomer}</SandboxedRoute>
   </cx>
);
