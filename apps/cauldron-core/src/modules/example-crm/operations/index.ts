import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspaces } from '../../../workspace/operations';

// Types
interface Customer {
  id: string;
  name: string;
  status: string;
  industry?: string;
  revenue?: string;
  contacts?: number;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  role?: string;
}

interface Deal {
  id: string;
  name: string;
  value: string;
  stage: string;
  company: string;
  probability?: string;
}

// Mock data for demonstration
const mockCustomers: Customer[] = [
  { id: '1', name: 'Acme Inc.', status: 'active', industry: 'Technology', revenue: '$1.2M', contacts: 3 },
  { id: '2', name: 'Beta Corp', status: 'lead', industry: 'Healthcare', revenue: '$3.5M', contacts: 2 },
  { id: '3', name: 'Gamma LLC', status: 'inactive', industry: 'Finance', revenue: '$850K', contacts: 1 },
  { id: '4', name: 'Delta Services', status: 'active', industry: 'Retail', revenue: '$2.1M', contacts: 5 },
];

const mockContacts: Contact[] = [
  { id: '1', name: 'John Doe', email: 'john@acme.com', phone: '555-1234', company: 'Acme Inc.', role: 'CEO' },
  { id: '2', name: 'Jane Smith', email: 'jane@acme.com', phone: '555-5678', company: 'Acme Inc.', role: 'CTO' },
  { id: '3', name: 'Bob Johnson', email: 'bob@beta.com', phone: '555-9012', company: 'Beta Corp', role: 'Sales Director' },
];

const mockDeals: Deal[] = [
  { id: '1', name: 'Enterprise License', value: '$50,000', stage: 'proposal', company: 'Acme Inc.', probability: '60%' },
  { id: '2', name: 'Support Contract', value: '$25,000', stage: 'negotiation', company: 'Beta Corp', probability: '80%' },
  { id: '3', name: 'Software Implementation', value: '$75,000', stage: 'discovery', company: 'Delta Services', probability: '30%' },
];

// API functions
const fetchCustomers = async (): Promise<Customer[]> => {
  // In a real app, this would be an API call
  // const response = await fetch('/api/modules/crm/customers');
  // return response.json();
  
  // Using mock data for now
  return new Promise(resolve => {
    setTimeout(() => resolve(mockCustomers), 500);
  });
};

const fetchContacts = async (): Promise<Contact[]> => {
  // In a real app, this would be an API call
  // const response = await fetch('/api/modules/crm/contacts');
  // return response.json();
  
  // Using mock data for now
  return new Promise(resolve => {
    setTimeout(() => resolve(mockContacts), 500);
  });
};

const fetchDeals = async (): Promise<Deal[]> => {
  // In a real app, this would be an API call
  // const response = await fetch('/api/modules/crm/deals');
  // return response.json();
  
  // Using mock data for now
  return new Promise(resolve => {
    setTimeout(() => resolve(mockDeals), 500);
  });
};

const createCustomer = async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
  // In a real app, this would be an API call
  // const response = await fetch('/api/modules/crm/customers', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(customer)
  // });
  // return response.json();
  
  // Using mock data for now
  return new Promise(resolve => {
    const newCustomer = {
      id: Math.random().toString(36).substring(2, 9),
      ...customer,
      contacts: 0
    };
    setTimeout(() => resolve(newCustomer), 500);
  });
};

const createContact = async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
  // In a real app, this would be an API call
  // const response = await fetch('/api/modules/crm/contacts', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(contact)
  // });
  // return response.json();
  
  // Using mock data for now
  return new Promise(resolve => {
    const newContact = {
      id: Math.random().toString(36).substring(2, 9),
      ...contact
    };
    setTimeout(() => resolve(newContact), 500);
  });
};

const createDeal = async (deal: Omit<Deal, 'id'>): Promise<Deal> => {
  // In a real app, this would be an API call
  // const response = await fetch('/api/modules/crm/deals', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(deal)
  // });
  // return response.json();
  
  // Using mock data for now
  return new Promise(resolve => {
    const newDeal = {
      id: Math.random().toString(36).substring(2, 9),
      ...deal
    };
    setTimeout(() => resolve(newDeal), 500);
  });
};

// React Query hooks
export const useCustomers = () => {
  const { currentWorkspace } = useWorkspaces();
  
  return useQuery({
    queryKey: ['crm', 'customers', currentWorkspace?.id],
    queryFn: fetchCustomers,
    enabled: !!currentWorkspace
  });
};

export const useContacts = () => {
  const { currentWorkspace } = useWorkspaces();
  
  return useQuery({
    queryKey: ['crm', 'contacts', currentWorkspace?.id],
    queryFn: fetchContacts,
    enabled: !!currentWorkspace
  });
};

export const useDeals = () => {
  const { currentWorkspace } = useWorkspaces();
  
  return useQuery({
    queryKey: ['crm', 'deals', currentWorkspace?.id],
    queryFn: fetchDeals,
    enabled: !!currentWorkspace
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const { currentWorkspace } = useWorkspaces();
  
  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm', 'customers', currentWorkspace?.id] });
    }
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  const { currentWorkspace } = useWorkspaces();
  
  return useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm', 'contacts', currentWorkspace?.id] });
    }
  });
};

export const useCreateDeal = () => {
  const queryClient = useQueryClient();
  const { currentWorkspace } = useWorkspaces();
  
  return useMutation({
    mutationFn: createDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm', 'deals', currentWorkspace?.id] });
    }
  });
};import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspaces } from '../../../workspace/operations';

// Types
interface Customer {
  id: string;
  name: string;
  status: string;
  industry?: string;
  revenue?: string;
  contacts?: number;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  role?: string;
}

interface Deal {
  id: string;
  name: string;
  value: string;
  stage: string;
  company: string;
  probability?: string;
}

// Mock data for demonstration
const mockCustomers: Customer[] = [
  { id: '1', name: 'Acme Inc.', status: 'active', industry: 'Technology', revenue: '$1.2M', contacts: 3 },
  { id: '2', name: 'Beta Corp', status: 'lead', industry: 'Healthcare', revenue: '$3.5M', contacts: 2 },
  { id: '3', name: 'Gamma LLC', status: 'inactive', industry: 'Finance', revenue: '$850K', contacts: 1 },
  { id: '4', name: 'Delta Services', status: 'active', industry: 'Retail', revenue: '$2.1M', contacts: 5 },
];

const mockContacts: Contact[] = [
  { id: '1', name: 'John Doe', email: 'john@acme.com', phone: '555-1234', company: 'Acme Inc.', role: 'CEO' },
  { id: '2', name: 'Jane Smith', email: 'jane@acme.com', phone: '555-5678', company: 'Acme Inc.', role: 'CTO' },
  { id: '3', name: 'Bob Johnson', email: 'bob@beta.com', phone: '555-9012', company: 'Beta Corp', role: 'Sales Director' },
];

const mockDeals: Deal[] = [
  { id: '1', name: 'Enterprise License', value: '$50,000', stage: 'proposal', company: 'Acme Inc.', probability: '60%' },
  { id: '2', name: 'Support Contract', value: '$25,000', stage: 'negotiation', company: 'Beta Corp', probability: '80%' },
  { id: '3', name: 'Software Implementation', value: '$75,000', stage: 'discovery', company: 'Delta Services', probability: '30%' },
];

// API functions
const fetchCustomers = async (): Promise<Customer[]> => {
  // In a real app, this would be an API call
  // const response = await fetch('/api/modules/crm/customers');
  // return response.json();
  
  // Using mock data for now
  return new Promise(resolve => {
    setTimeout(() => resolve(mockCustomers), 500);
  });
};

const fetchContacts = async (): Promise<Contact[]> => {
  // In a real app, this would be an API call
  // const response = await fetch('/api/modules/crm/contacts');
  // return response.json();
  
  // Using mock data for now
  return new Promise(resolve => {
    setTimeout(() => resolve(mockContacts), 500);
  });
};

const fetchDeals = async (): Promise<Deal[]> => {
  // In a real app, this would be an API call
  // const response = await fetch('/api/modules/crm/deals');
  // return response.json();
  
  // Using mock data for now
  return new Promise(resolve => {
    setTimeout(() => resolve(mockDeals), 500);
  });
};

const createCustomer = async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
  // In a real app, this would be an API call
  // const response = await fetch('/api/modules/crm/customers', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(customer)
  // });
  // return response.json();
  
  // Using mock data for now
  return new Promise(resolve => {
    const newCustomer = {
      id: Math.random().toString(36).substring(2, 9),
      ...customer,
      contacts: 0
    };
    setTimeout(() => resolve(newCustomer), 500);
  });
};

const createContact = async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
  // In a real app, this would be an API call
  // const response = await fetch('/api/modules/crm/contacts', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(contact)
  // });
  // return response.json();
  
  // Using mock data for now
  return new Promise(resolve => {
    const newContact = {
      id: Math.random().toString(36).substring(2, 9),
      ...contact
    };
    setTimeout(() => resolve(newContact), 500);
  });
};

const createDeal = async (deal: Omit<Deal, 'id'>): Promise<Deal> => {
  // In a real app, this would be an API call
  // const response = await fetch('/api/modules/crm/deals', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(deal)
  // });
  // return response.json();
  
  // Using mock data for now
  return new Promise(resolve => {
    const newDeal = {
      id: Math.random().toString(36).substring(2, 9),
      ...deal
    };
    setTimeout(() => resolve(newDeal), 500);
  });
};

// React Query hooks
export const useCustomers = () => {
  const { currentWorkspace } = useWorkspaces();
  
  return useQuery({
    queryKey: ['crm', 'customers', currentWorkspace?.id],
    queryFn: fetchCustomers,
    enabled: !!currentWorkspace
  });
};

export const useContacts = () => {
  const { currentWorkspace } = useWorkspaces();
  
  return useQuery({
    queryKey: ['crm', 'contacts', currentWorkspace?.id],
    queryFn: fetchContacts,
    enabled: !!currentWorkspace
  });
};

export const useDeals = () => {
  const { currentWorkspace } = useWorkspaces();
  
  return useQuery({
    queryKey: ['crm', 'deals', currentWorkspace?.id],
    queryFn: fetchDeals,
    enabled: !!currentWorkspace
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const { currentWorkspace } = useWorkspaces();
  
  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm', 'customers', currentWorkspace?.id] });
    }
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  const { currentWorkspace } = useWorkspaces();
  
  return useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm', 'contacts', currentWorkspace?.id] });
    }
  });
};

export const useCreateDeal = () => {
  const queryClient = useQueryClient();
  const { currentWorkspace } = useWorkspaces();
  
  return useMutation({
    mutationFn: createDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm', 'deals', currentWorkspace?.id] });
    }
  });
};