import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Module, Workspace } from '@cauldronos/types';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
  createdAt: string;
  updatedAt: string;
}

interface Deal {
  id: string;
  name: string;
  value: number;
  contactId: string;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface CrmState {
  module: Module | null;
  workspace: Workspace | null;
  initialized: boolean;
  loading: boolean;
  contacts: Contact[];
  leads: Lead[];
  deals: Deal[];
  error: string | null;
  
  // Actions
  initialize: (module: Module, workspace: Workspace) => void;
  fetchContacts: () => Promise<void>;
  fetchLeads: () => Promise<void>;
  fetchDeals: () => Promise<void>;
  createContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Contact>;
  updateContact: (id: string, contact: Partial<Contact>) => Promise<Contact>;
  deleteContact: (id: string) => Promise<void>;
  createLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Lead>;
  updateLead: (id: string, lead: Partial<Lead>) => Promise<Lead>;
  deleteLead: (id: string) => Promise<void>;
  createDeal: (deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Deal>;
  updateDeal: (id: string, deal: Partial<Deal>) => Promise<Deal>;
  deleteDeal: (id: string) => Promise<void>;
}

// Mock data for development
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Inc.',
    title: 'CEO',
    status: 'active',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    company: 'XYZ Corp',
    title: 'CTO',
    status: 'active',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+1 (555) 456-7890',
    company: 'ABC Ltd',
    title: 'Sales Manager',
    status: 'inactive',
    createdAt: '2023-01-03T00:00:00.000Z',
    updatedAt: '2023-01-03T00:00:00.000Z'
  }
];

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    phone: '+1 (555) 111-2222',
    company: 'New Startup',
    source: 'Website',
    status: 'new',
    createdAt: '2023-01-04T00:00:00.000Z',
    updatedAt: '2023-01-04T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    phone: '+1 (555) 333-4444',
    company: 'Growing Business',
    source: 'Referral',
    status: 'contacted',
    createdAt: '2023-01-05T00:00:00.000Z',
    updatedAt: '2023-01-05T00:00:00.000Z'
  }
];

const mockDeals: Deal[] = [
  {
    id: '1',
    name: 'Enterprise Software License',
    value: 50000,
    contactId: '1',
    stage: 'proposal',
    probability: 60,
    expectedCloseDate: '2023-03-15T00:00:00.000Z',
    createdAt: '2023-01-10T00:00:00.000Z',
    updatedAt: '2023-01-10T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Consulting Services',
    value: 25000,
    contactId: '2',
    stage: 'negotiation',
    probability: 80,
    expectedCloseDate: '2023-02-28T00:00:00.000Z',
    createdAt: '2023-01-15T00:00:00.000Z',
    updatedAt: '2023-01-15T00:00:00.000Z'
  }
];

export const useCrmStore = create<CrmState>()(
  devtools(
    (set, get) => ({
      module: null,
      workspace: null,
      initialized: false,
      loading: false,
      contacts: [],
      leads: [],
      deals: [],
      error: null,

      initialize: (module, workspace) => {
        set({ module, workspace, initialized: true });
        // Initialize data
        get().fetchContacts();
        get().fetchLeads();
        get().fetchDeals();
      },

      fetchContacts: async () => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/contacts');
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set({ contacts: mockContacts, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch contacts', loading: false });
          console.error('Error fetching contacts:', error);
        }
      },

      fetchLeads: async () => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/leads');
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set({ leads: mockLeads, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch leads', loading: false });
          console.error('Error fetching leads:', error);
        }
      },

      fetchDeals: async () => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/deals');
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set({ deals: mockDeals, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch deals', loading: false });
          console.error('Error fetching deals:', error);
        }
      },

      createContact: async (contact) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/contacts', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(contact)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const newContact: Contact = {
            ...contact,
            id: Math.random().toString(36).substring(2, 11),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          set(state => ({ 
            contacts: [...state.contacts, newContact], 
            loading: false 
          }));
          return newContact;
        } catch (error) {
          set({ error: 'Failed to create contact', loading: false });
          console.error('Error creating contact:', error);
          throw error;
        }
      },

      updateContact: async (id, contact) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch(`/api/modules/crm/contacts/${id}`, {
          //   method: 'PUT',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(contact)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const updatedContact = {
            ...get().contacts.find(c => c.id === id),
            ...contact,
            updatedAt: new Date().toISOString()
          } as Contact;
          
          set(state => ({ 
            contacts: state.contacts.map(c => c.id === id ? updatedContact : c), 
            loading: false 
          }));
          
          return updatedContact;
        } catch (error) {
          set({ error: 'Failed to update contact', loading: false });
          console.error('Error updating contact:', error);
          throw error;
        }
      },

      deleteContact: async (id) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // await fetch(`/api/modules/crm/contacts/${id}`, {
          //   method: 'DELETE'
          // });
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set(state => ({ 
            contacts: state.contacts.filter(c => c.id !== id), 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to delete contact', loading: false });
          console.error('Error deleting contact:', error);
          throw error;
        }
      },

      createLead: async (lead) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/leads', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(lead)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const newLead: Lead = {
            ...lead,
            id: Math.random().toString(36).substring(2, 11),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          set(state => ({ 
            leads: [...state.leads, newLead], 
            loading: false 
          }));
          return newLead;
        } catch (error) {
          set({ error: 'Failed to create lead', loading: false });
          console.error('Error creating lead:', error);
          throw error;
        }
      },

      updateLead: async (id, lead) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch(`/api/modules/crm/leads/${id}`, {
          //   method: 'PUT',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(lead)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const updatedLead = {
            ...get().leads.find(l => l.id === id),
            ...lead,
            updatedAt: new Date().toISOString()
          } as Lead;
          
          set(state => ({ 
            leads: state.leads.map(l => l.id === id ? updatedLead : l), 
            loading: false 
          }));
          
          return updatedLead;
        } catch (error) {
          set({ error: 'Failed to update lead', loading: false });
          console.error('Error updating lead:', error);
          throw error;
        }
      },

      deleteLead: async (id) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // await fetch(`/api/modules/crm/leads/${id}`, {
          //   method: 'DELETE'
          // });
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set(state => ({ 
            leads: state.leads.filter(l => l.id !== id), 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to delete lead', loading: false });
          console.error('Error deleting lead:', error);
          throw error;
        }
      },

      createDeal: async (deal) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/deals', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(deal)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const newDeal: Deal = {
            ...deal,
            id: Math.random().toString(36).substring(2, 11),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          set(state => ({ 
            deals: [...state.deals, newDeal], 
            loading: false 
          }));
          return newDeal;
        } catch (error) {
          set({ error: 'Failed to create deal', loading: false });
          console.error('Error creating deal:', error);
          throw error;
        }
      },

      updateDeal: async (id, deal) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch(`/api/modules/crm/deals/${id}`, {
          //   method: 'PUT',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(deal)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const updatedDeal = {
            ...get().deals.find(d => d.id === id),
            ...deal,
            updatedAt: new Date().toISOString()
          } as Deal;
          
          set(state => ({ 
            deals: state.deals.map(d => d.id === id ? updatedDeal : d), 
            loading: false 
          }));
          
          return updatedDeal;
        } catch (error) {
          set({ error: 'Failed to update deal', loading: false });
          console.error('Error updating deal:', error);
          throw error;
        }
      },

      deleteDeal: async (id) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // await fetch(`/api/modules/crm/deals/${id}`, {
          //   method: 'DELETE'
          // });
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set(state => ({ 
            deals: state.deals.filter(d => d.id !== id), 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to delete deal', loading: false });
          console.error('Error deleting deal:', error);
          throw error;
        }
      }
    }),
    { name: 'crm-store' }
  )
);import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Module, Workspace } from '@cauldronos/types';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
  createdAt: string;
  updatedAt: string;
}

interface Deal {
  id: string;
  name: string;
  value: number;
  contactId: string;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface CrmState {
  module: Module | null;
  workspace: Workspace | null;
  initialized: boolean;
  loading: boolean;
  contacts: Contact[];
  leads: Lead[];
  deals: Deal[];
  error: string | null;
  
  // Actions
  initialize: (module: Module, workspace: Workspace) => void;
  fetchContacts: () => Promise<void>;
  fetchLeads: () => Promise<void>;
  fetchDeals: () => Promise<void>;
  createContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Contact>;
  updateContact: (id: string, contact: Partial<Contact>) => Promise<Contact>;
  deleteContact: (id: string) => Promise<void>;
  createLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Lead>;
  updateLead: (id: string, lead: Partial<Lead>) => Promise<Lead>;
  deleteLead: (id: string) => Promise<void>;
  createDeal: (deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Deal>;
  updateDeal: (id: string, deal: Partial<Deal>) => Promise<Deal>;
  deleteDeal: (id: string) => Promise<void>;
}

// Mock data for development
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Inc.',
    title: 'CEO',
    status: 'active',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    company: 'XYZ Corp',
    title: 'CTO',
    status: 'active',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+1 (555) 456-7890',
    company: 'ABC Ltd',
    title: 'Sales Manager',
    status: 'inactive',
    createdAt: '2023-01-03T00:00:00.000Z',
    updatedAt: '2023-01-03T00:00:00.000Z'
  }
];

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    phone: '+1 (555) 111-2222',
    company: 'New Startup',
    source: 'Website',
    status: 'new',
    createdAt: '2023-01-04T00:00:00.000Z',
    updatedAt: '2023-01-04T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    phone: '+1 (555) 333-4444',
    company: 'Growing Business',
    source: 'Referral',
    status: 'contacted',
    createdAt: '2023-01-05T00:00:00.000Z',
    updatedAt: '2023-01-05T00:00:00.000Z'
  }
];

const mockDeals: Deal[] = [
  {
    id: '1',
    name: 'Enterprise Software License',
    value: 50000,
    contactId: '1',
    stage: 'proposal',
    probability: 60,
    expectedCloseDate: '2023-03-15T00:00:00.000Z',
    createdAt: '2023-01-10T00:00:00.000Z',
    updatedAt: '2023-01-10T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Consulting Services',
    value: 25000,
    contactId: '2',
    stage: 'negotiation',
    probability: 80,
    expectedCloseDate: '2023-02-28T00:00:00.000Z',
    createdAt: '2023-01-15T00:00:00.000Z',
    updatedAt: '2023-01-15T00:00:00.000Z'
  }
];

export const useCrmStore = create<CrmState>()(
  devtools(
    (set, get) => ({
      module: null,
      workspace: null,
      initialized: false,
      loading: false,
      contacts: [],
      leads: [],
      deals: [],
      error: null,

      initialize: (module, workspace) => {
        set({ module, workspace, initialized: true });
        // Initialize data
        get().fetchContacts();
        get().fetchLeads();
        get().fetchDeals();
      },

      fetchContacts: async () => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/contacts');
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set({ contacts: mockContacts, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch contacts', loading: false });
          console.error('Error fetching contacts:', error);
        }
      },

      fetchLeads: async () => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/leads');
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set({ leads: mockLeads, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch leads', loading: false });
          console.error('Error fetching leads:', error);
        }
      },

      fetchDeals: async () => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/deals');
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set({ deals: mockDeals, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch deals', loading: false });
          console.error('Error fetching deals:', error);
        }
      },

      createContact: async (contact) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/contacts', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(contact)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const newContact: Contact = {
            ...contact,
            id: Math.random().toString(36).substring(2, 11),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          set(state => ({ 
            contacts: [...state.contacts, newContact], 
            loading: false 
          }));
          return newContact;
        } catch (error) {
          set({ error: 'Failed to create contact', loading: false });
          console.error('Error creating contact:', error);
          throw error;
        }
      },

      updateContact: async (id, contact) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch(`/api/modules/crm/contacts/${id}`, {
          //   method: 'PUT',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(contact)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const updatedContact = {
            ...get().contacts.find(c => c.id === id),
            ...contact,
            updatedAt: new Date().toISOString()
          } as Contact;
          
          set(state => ({ 
            contacts: state.contacts.map(c => c.id === id ? updatedContact : c), 
            loading: false 
          }));
          
          return updatedContact;
        } catch (error) {
          set({ error: 'Failed to update contact', loading: false });
          console.error('Error updating contact:', error);
          throw error;
        }
      },

      deleteContact: async (id) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // await fetch(`/api/modules/crm/contacts/${id}`, {
          //   method: 'DELETE'
          // });
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set(state => ({ 
            contacts: state.contacts.filter(c => c.id !== id), 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to delete contact', loading: false });
          console.error('Error deleting contact:', error);
          throw error;
        }
      },

      createLead: async (lead) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/leads', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(lead)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const newLead: Lead = {
            ...lead,
            id: Math.random().toString(36).substring(2, 11),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          set(state => ({ 
            leads: [...state.leads, newLead], 
            loading: false 
          }));
          return newLead;
        } catch (error) {
          set({ error: 'Failed to create lead', loading: false });
          console.error('Error creating lead:', error);
          throw error;
        }
      },

      updateLead: async (id, lead) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch(`/api/modules/crm/leads/${id}`, {
          //   method: 'PUT',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(lead)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const updatedLead = {
            ...get().leads.find(l => l.id === id),
            ...lead,
            updatedAt: new Date().toISOString()
          } as Lead;
          
          set(state => ({ 
            leads: state.leads.map(l => l.id === id ? updatedLead : l), 
            loading: false 
          }));
          
          return updatedLead;
        } catch (error) {
          set({ error: 'Failed to update lead', loading: false });
          console.error('Error updating lead:', error);
          throw error;
        }
      },

      deleteLead: async (id) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // await fetch(`/api/modules/crm/leads/${id}`, {
          //   method: 'DELETE'
          // });
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set(state => ({ 
            leads: state.leads.filter(l => l.id !== id), 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to delete lead', loading: false });
          console.error('Error deleting lead:', error);
          throw error;
        }
      },

      createDeal: async (deal) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/deals', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(deal)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const newDeal: Deal = {
            ...deal,
            id: Math.random().toString(36).substring(2, 11),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          set(state => ({ 
            deals: [...state.deals, newDeal], 
            loading: false 
          }));
          return newDeal;
        } catch (error) {
          set({ error: 'Failed to create deal', loading: false });
          console.error('Error creating deal:', error);
          throw error;
        }
      },

      updateDeal: async (id, deal) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch(`/api/modules/crm/deals/${id}`, {
          //   method: 'PUT',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(deal)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const updatedDeal = {
            ...get().deals.find(d => d.id === id),
            ...deal,
            updatedAt: new Date().toISOString()
          } as Deal;
          
          set(state => ({ 
            deals: state.deals.map(d => d.id === id ? updatedDeal : d), 
            loading: false 
          }));
          
          return updatedDeal;
        } catch (error) {
          set({ error: 'Failed to update deal', loading: false });
          console.error('Error updating deal:', error);
          throw error;
        }
      },

      deleteDeal: async (id) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // await fetch(`/api/modules/crm/deals/${id}`, {
          //   method: 'DELETE'
          // });
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set(state => ({ 
            deals: state.deals.filter(d => d.id !== id), 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to delete deal', loading: false });
          console.error('Error deleting deal:', error);
          throw error;
        }
      }
    }),
    { name: 'crm-store' }
  )
);import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Module, Workspace } from '@cauldronos/types';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
  createdAt: string;
  updatedAt: string;
}

interface Deal {
  id: string;
  name: string;
  value: number;
  contactId: string;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface CrmState {
  module: Module | null;
  workspace: Workspace | null;
  initialized: boolean;
  loading: boolean;
  contacts: Contact[];
  leads: Lead[];
  deals: Deal[];
  error: string | null;
  
  // Actions
  initialize: (module: Module, workspace: Workspace) => void;
  fetchContacts: () => Promise<void>;
  fetchLeads: () => Promise<void>;
  fetchDeals: () => Promise<void>;
  createContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Contact>;
  updateContact: (id: string, contact: Partial<Contact>) => Promise<Contact>;
  deleteContact: (id: string) => Promise<void>;
  createLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Lead>;
  updateLead: (id: string, lead: Partial<Lead>) => Promise<Lead>;
  deleteLead: (id: string) => Promise<void>;
  createDeal: (deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Deal>;
  updateDeal: (id: string, deal: Partial<Deal>) => Promise<Deal>;
  deleteDeal: (id: string) => Promise<void>;
}

// Mock data for development
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Inc.',
    title: 'CEO',
    status: 'active',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    company: 'XYZ Corp',
    title: 'CTO',
    status: 'active',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+1 (555) 456-7890',
    company: 'ABC Ltd',
    title: 'Sales Manager',
    status: 'inactive',
    createdAt: '2023-01-03T00:00:00.000Z',
    updatedAt: '2023-01-03T00:00:00.000Z'
  }
];

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    phone: '+1 (555) 111-2222',
    company: 'New Startup',
    source: 'Website',
    status: 'new',
    createdAt: '2023-01-04T00:00:00.000Z',
    updatedAt: '2023-01-04T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    phone: '+1 (555) 333-4444',
    company: 'Growing Business',
    source: 'Referral',
    status: 'contacted',
    createdAt: '2023-01-05T00:00:00.000Z',
    updatedAt: '2023-01-05T00:00:00.000Z'
  }
];

const mockDeals: Deal[] = [
  {
    id: '1',
    name: 'Enterprise Software License',
    value: 50000,
    contactId: '1',
    stage: 'proposal',
    probability: 60,
    expectedCloseDate: '2023-03-15T00:00:00.000Z',
    createdAt: '2023-01-10T00:00:00.000Z',
    updatedAt: '2023-01-10T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Consulting Services',
    value: 25000,
    contactId: '2',
    stage: 'negotiation',
    probability: 80,
    expectedCloseDate: '2023-02-28T00:00:00.000Z',
    createdAt: '2023-01-15T00:00:00.000Z',
    updatedAt: '2023-01-15T00:00:00.000Z'
  }
];

export const useCrmStore = create<CrmState>()(
  devtools(
    (set, get) => ({
      module: null,
      workspace: null,
      initialized: false,
      loading: false,
      contacts: [],
      leads: [],
      deals: [],
      error: null,

      initialize: (module, workspace) => {
        set({ module, workspace, initialized: true });
        // Initialize data
        get().fetchContacts();
        get().fetchLeads();
        get().fetchDeals();
      },

      fetchContacts: async () => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/contacts');
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set({ contacts: mockContacts, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch contacts', loading: false });
          console.error('Error fetching contacts:', error);
        }
      },

      fetchLeads: async () => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/leads');
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set({ leads: mockLeads, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch leads', loading: false });
          console.error('Error fetching leads:', error);
        }
      },

      fetchDeals: async () => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/deals');
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set({ deals: mockDeals, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch deals', loading: false });
          console.error('Error fetching deals:', error);
        }
      },

      createContact: async (contact) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/contacts', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(contact)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const newContact: Contact = {
            ...contact,
            id: Math.random().toString(36).substring(2, 11),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          set(state => ({ 
            contacts: [...state.contacts, newContact], 
            loading: false 
          }));
          return newContact;
        } catch (error) {
          set({ error: 'Failed to create contact', loading: false });
          console.error('Error creating contact:', error);
          throw error;
        }
      },

      updateContact: async (id, contact) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch(`/api/modules/crm/contacts/${id}`, {
          //   method: 'PUT',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(contact)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const updatedContact = {
            ...get().contacts.find(c => c.id === id),
            ...contact,
            updatedAt: new Date().toISOString()
          } as Contact;
          
          set(state => ({ 
            contacts: state.contacts.map(c => c.id === id ? updatedContact : c), 
            loading: false 
          }));
          
          return updatedContact;
        } catch (error) {
          set({ error: 'Failed to update contact', loading: false });
          console.error('Error updating contact:', error);
          throw error;
        }
      },

      deleteContact: async (id) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // await fetch(`/api/modules/crm/contacts/${id}`, {
          //   method: 'DELETE'
          // });
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set(state => ({ 
            contacts: state.contacts.filter(c => c.id !== id), 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to delete contact', loading: false });
          console.error('Error deleting contact:', error);
          throw error;
        }
      },

      createLead: async (lead) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/leads', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(lead)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const newLead: Lead = {
            ...lead,
            id: Math.random().toString(36).substring(2, 11),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          set(state => ({ 
            leads: [...state.leads, newLead], 
            loading: false 
          }));
          return newLead;
        } catch (error) {
          set({ error: 'Failed to create lead', loading: false });
          console.error('Error creating lead:', error);
          throw error;
        }
      },

      updateLead: async (id, lead) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch(`/api/modules/crm/leads/${id}`, {
          //   method: 'PUT',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(lead)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const updatedLead = {
            ...get().leads.find(l => l.id === id),
            ...lead,
            updatedAt: new Date().toISOString()
          } as Lead;
          
          set(state => ({ 
            leads: state.leads.map(l => l.id === id ? updatedLead : l), 
            loading: false 
          }));
          
          return updatedLead;
        } catch (error) {
          set({ error: 'Failed to update lead', loading: false });
          console.error('Error updating lead:', error);
          throw error;
        }
      },

      deleteLead: async (id) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // await fetch(`/api/modules/crm/leads/${id}`, {
          //   method: 'DELETE'
          // });
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set(state => ({ 
            leads: state.leads.filter(l => l.id !== id), 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to delete lead', loading: false });
          console.error('Error deleting lead:', error);
          throw error;
        }
      },

      createDeal: async (deal) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/deals', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(deal)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const newDeal: Deal = {
            ...deal,
            id: Math.random().toString(36).substring(2, 11),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          set(state => ({ 
            deals: [...state.deals, newDeal], 
            loading: false 
          }));
          return newDeal;
        } catch (error) {
          set({ error: 'Failed to create deal', loading: false });
          console.error('Error creating deal:', error);
          throw error;
        }
      },

      updateDeal: async (id, deal) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch(`/api/modules/crm/deals/${id}`, {
          //   method: 'PUT',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(deal)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const updatedDeal = {
            ...get().deals.find(d => d.id === id),
            ...deal,
            updatedAt: new Date().toISOString()
          } as Deal;
          
          set(state => ({ 
            deals: state.deals.map(d => d.id === id ? updatedDeal : d), 
            loading: false 
          }));
          
          return updatedDeal;
        } catch (error) {
          set({ error: 'Failed to update deal', loading: false });
          console.error('Error updating deal:', error);
          throw error;
        }
      },

      deleteDeal: async (id) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // await fetch(`/api/modules/crm/deals/${id}`, {
          //   method: 'DELETE'
          // });
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set(state => ({ 
            deals: state.deals.filter(d => d.id !== id), 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to delete deal', loading: false });
          console.error('Error deleting deal:', error);
          throw error;
        }
      }
    }),
    { name: 'crm-store' }
  )
);import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Module, Workspace } from '@cauldronos/types';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
  createdAt: string;
  updatedAt: string;
}

interface Deal {
  id: string;
  name: string;
  value: number;
  contactId: string;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface CrmState {
  module: Module | null;
  workspace: Workspace | null;
  initialized: boolean;
  loading: boolean;
  contacts: Contact[];
  leads: Lead[];
  deals: Deal[];
  error: string | null;
  
  // Actions
  initialize: (module: Module, workspace: Workspace) => void;
  fetchContacts: () => Promise<void>;
  fetchLeads: () => Promise<void>;
  fetchDeals: () => Promise<void>;
  createContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Contact>;
  updateContact: (id: string, contact: Partial<Contact>) => Promise<Contact>;
  deleteContact: (id: string) => Promise<void>;
  createLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Lead>;
  updateLead: (id: string, lead: Partial<Lead>) => Promise<Lead>;
  deleteLead: (id: string) => Promise<void>;
  createDeal: (deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Deal>;
  updateDeal: (id: string, deal: Partial<Deal>) => Promise<Deal>;
  deleteDeal: (id: string) => Promise<void>;
}

// Mock data for development
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Inc.',
    title: 'CEO',
    status: 'active',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    company: 'XYZ Corp',
    title: 'CTO',
    status: 'active',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+1 (555) 456-7890',
    company: 'ABC Ltd',
    title: 'Sales Manager',
    status: 'inactive',
    createdAt: '2023-01-03T00:00:00.000Z',
    updatedAt: '2023-01-03T00:00:00.000Z'
  }
];

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    phone: '+1 (555) 111-2222',
    company: 'New Startup',
    source: 'Website',
    status: 'new',
    createdAt: '2023-01-04T00:00:00.000Z',
    updatedAt: '2023-01-04T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    phone: '+1 (555) 333-4444',
    company: 'Growing Business',
    source: 'Referral',
    status: 'contacted',
    createdAt: '2023-01-05T00:00:00.000Z',
    updatedAt: '2023-01-05T00:00:00.000Z'
  }
];

const mockDeals: Deal[] = [
  {
    id: '1',
    name: 'Enterprise Software License',
    value: 50000,
    contactId: '1',
    stage: 'proposal',
    probability: 60,
    expectedCloseDate: '2023-03-15T00:00:00.000Z',
    createdAt: '2023-01-10T00:00:00.000Z',
    updatedAt: '2023-01-10T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Consulting Services',
    value: 25000,
    contactId: '2',
    stage: 'negotiation',
    probability: 80,
    expectedCloseDate: '2023-02-28T00:00:00.000Z',
    createdAt: '2023-01-15T00:00:00.000Z',
    updatedAt: '2023-01-15T00:00:00.000Z'
  }
];

export const useCrmStore = create<CrmState>()(
  devtools(
    (set, get) => ({
      module: null,
      workspace: null,
      initialized: false,
      loading: false,
      contacts: [],
      leads: [],
      deals: [],
      error: null,

      initialize: (module, workspace) => {
        set({ module, workspace, initialized: true });
        // Initialize data
        get().fetchContacts();
        get().fetchLeads();
        get().fetchDeals();
      },

      fetchContacts: async () => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/contacts');
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set({ contacts: mockContacts, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch contacts', loading: false });
          console.error('Error fetching contacts:', error);
        }
      },

      fetchLeads: async () => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/leads');
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set({ leads: mockLeads, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch leads', loading: false });
          console.error('Error fetching leads:', error);
        }
      },

      fetchDeals: async () => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/deals');
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set({ deals: mockDeals, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch deals', loading: false });
          console.error('Error fetching deals:', error);
        }
      },

      createContact: async (contact) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/contacts', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(contact)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const newContact: Contact = {
            ...contact,
            id: Math.random().toString(36).substring(2, 11),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          set(state => ({ 
            contacts: [...state.contacts, newContact], 
            loading: false 
          }));
          return newContact;
        } catch (error) {
          set({ error: 'Failed to create contact', loading: false });
          console.error('Error creating contact:', error);
          throw error;
        }
      },

      updateContact: async (id, contact) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch(`/api/modules/crm/contacts/${id}`, {
          //   method: 'PUT',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(contact)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const updatedContact = {
            ...get().contacts.find(c => c.id === id),
            ...contact,
            updatedAt: new Date().toISOString()
          } as Contact;
          
          set(state => ({ 
            contacts: state.contacts.map(c => c.id === id ? updatedContact : c), 
            loading: false 
          }));
          
          return updatedContact;
        } catch (error) {
          set({ error: 'Failed to update contact', loading: false });
          console.error('Error updating contact:', error);
          throw error;
        }
      },

      deleteContact: async (id) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // await fetch(`/api/modules/crm/contacts/${id}`, {
          //   method: 'DELETE'
          // });
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set(state => ({ 
            contacts: state.contacts.filter(c => c.id !== id), 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to delete contact', loading: false });
          console.error('Error deleting contact:', error);
          throw error;
        }
      },

      createLead: async (lead) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/leads', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(lead)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const newLead: Lead = {
            ...lead,
            id: Math.random().toString(36).substring(2, 11),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          set(state => ({ 
            leads: [...state.leads, newLead], 
            loading: false 
          }));
          return newLead;
        } catch (error) {
          set({ error: 'Failed to create lead', loading: false });
          console.error('Error creating lead:', error);
          throw error;
        }
      },

      updateLead: async (id, lead) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch(`/api/modules/crm/leads/${id}`, {
          //   method: 'PUT',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(lead)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const updatedLead = {
            ...get().leads.find(l => l.id === id),
            ...lead,
            updatedAt: new Date().toISOString()
          } as Lead;
          
          set(state => ({ 
            leads: state.leads.map(l => l.id === id ? updatedLead : l), 
            loading: false 
          }));
          
          return updatedLead;
        } catch (error) {
          set({ error: 'Failed to update lead', loading: false });
          console.error('Error updating lead:', error);
          throw error;
        }
      },

      deleteLead: async (id) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // await fetch(`/api/modules/crm/leads/${id}`, {
          //   method: 'DELETE'
          // });
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set(state => ({ 
            leads: state.leads.filter(l => l.id !== id), 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to delete lead', loading: false });
          console.error('Error deleting lead:', error);
          throw error;
        }
      },

      createDeal: async (deal) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/deals', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(deal)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const newDeal: Deal = {
            ...deal,
            id: Math.random().toString(36).substring(2, 11),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          set(state => ({ 
            deals: [...state.deals, newDeal], 
            loading: false 
          }));
          return newDeal;
        } catch (error) {
          set({ error: 'Failed to create deal', loading: false });
          console.error('Error creating deal:', error);
          throw error;
        }
      },

      updateDeal: async (id, deal) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch(`/api/modules/crm/deals/${id}`, {
          //   method: 'PUT',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(deal)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const updatedDeal = {
            ...get().deals.find(d => d.id === id),
            ...deal,
            updatedAt: new Date().toISOString()
          } as Deal;
          
          set(state => ({ 
            deals: state.deals.map(d => d.id === id ? updatedDeal : d), 
            loading: false 
          }));
          
          return updatedDeal;
        } catch (error) {
          set({ error: 'Failed to update deal', loading: false });
          console.error('Error updating deal:', error);
          throw error;
        }
      },

      deleteDeal: async (id) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // await fetch(`/api/modules/crm/deals/${id}`, {
          //   method: 'DELETE'
          // });
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set(state => ({ 
            deals: state.deals.filter(d => d.id !== id), 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to delete deal', loading: false });
          console.error('Error deleting deal:', error);
          throw error;
        }
      }
    }),
    { name: 'crm-store' }
  )
);import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Module, Workspace } from '@cauldronos/types';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
  createdAt: string;
  updatedAt: string;
}

interface Deal {
  id: string;
  name: string;
  value: number;
  contactId: string;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface CrmState {
  module: Module | null;
  workspace: Workspace | null;
  initialized: boolean;
  loading: boolean;
  contacts: Contact[];
  leads: Lead[];
  deals: Deal[];
  error: string | null;
  
  // Actions
  initialize: (module: Module, workspace: Workspace) => void;
  fetchContacts: () => Promise<void>;
  fetchLeads: () => Promise<void>;
  fetchDeals: () => Promise<void>;
  createContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Contact>;
  updateContact: (id: string, contact: Partial<Contact>) => Promise<Contact>;
  deleteContact: (id: string) => Promise<void>;
  createLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Lead>;
  updateLead: (id: string, lead: Partial<Lead>) => Promise<Lead>;
  deleteLead: (id: string) => Promise<void>;
  createDeal: (deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Deal>;
  updateDeal: (id: string, deal: Partial<Deal>) => Promise<Deal>;
  deleteDeal: (id: string) => Promise<void>;
}

// Mock data for development
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Inc.',
    title: 'CEO',
    status: 'active',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    company: 'XYZ Corp',
    title: 'CTO',
    status: 'active',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+1 (555) 456-7890',
    company: 'ABC Ltd',
    title: 'Sales Manager',
    status: 'inactive',
    createdAt: '2023-01-03T00:00:00.000Z',
    updatedAt: '2023-01-03T00:00:00.000Z'
  }
];

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    phone: '+1 (555) 111-2222',
    company: 'New Startup',
    source: 'Website',
    status: 'new',
    createdAt: '2023-01-04T00:00:00.000Z',
    updatedAt: '2023-01-04T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    phone: '+1 (555) 333-4444',
    company: 'Growing Business',
    source: 'Referral',
    status: 'contacted',
    createdAt: '2023-01-05T00:00:00.000Z',
    updatedAt: '2023-01-05T00:00:00.000Z'
  }
];

const mockDeals: Deal[] = [
  {
    id: '1',
    name: 'Enterprise Software License',
    value: 50000,
    contactId: '1',
    stage: 'proposal',
    probability: 60,
    expectedCloseDate: '2023-03-15T00:00:00.000Z',
    createdAt: '2023-01-10T00:00:00.000Z',
    updatedAt: '2023-01-10T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Consulting Services',
    value: 25000,
    contactId: '2',
    stage: 'negotiation',
    probability: 80,
    expectedCloseDate: '2023-02-28T00:00:00.000Z',
    createdAt: '2023-01-15T00:00:00.000Z',
    updatedAt: '2023-01-15T00:00:00.000Z'
  }
];

export const useCrmStore = create<CrmState>()(
  devtools(
    (set, get) => ({
      module: null,
      workspace: null,
      initialized: false,
      loading: false,
      contacts: [],
      leads: [],
      deals: [],
      error: null,

      initialize: (module, workspace) => {
        set({ module, workspace, initialized: true });
        // Initialize data
        get().fetchContacts();
        get().fetchLeads();
        get().fetchDeals();
      },

      fetchContacts: async () => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/contacts');
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set({ contacts: mockContacts, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch contacts', loading: false });
          console.error('Error fetching contacts:', error);
        }
      },

      fetchLeads: async () => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/leads');
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set({ leads: mockLeads, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch leads', loading: false });
          console.error('Error fetching leads:', error);
        }
      },

      fetchDeals: async () => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/deals');
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set({ deals: mockDeals, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch deals', loading: false });
          console.error('Error fetching deals:', error);
        }
      },

      createContact: async (contact) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/contacts', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(contact)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const newContact: Contact = {
            ...contact,
            id: Math.random().toString(36).substring(2, 11),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          set(state => ({ 
            contacts: [...state.contacts, newContact], 
            loading: false 
          }));
          return newContact;
        } catch (error) {
          set({ error: 'Failed to create contact', loading: false });
          console.error('Error creating contact:', error);
          throw error;
        }
      },

      updateContact: async (id, contact) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch(`/api/modules/crm/contacts/${id}`, {
          //   method: 'PUT',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(contact)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const updatedContact = {
            ...get().contacts.find(c => c.id === id),
            ...contact,
            updatedAt: new Date().toISOString()
          } as Contact;
          
          set(state => ({ 
            contacts: state.contacts.map(c => c.id === id ? updatedContact : c), 
            loading: false 
          }));
          
          return updatedContact;
        } catch (error) {
          set({ error: 'Failed to update contact', loading: false });
          console.error('Error updating contact:', error);
          throw error;
        }
      },

      deleteContact: async (id) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // await fetch(`/api/modules/crm/contacts/${id}`, {
          //   method: 'DELETE'
          // });
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set(state => ({ 
            contacts: state.contacts.filter(c => c.id !== id), 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to delete contact', loading: false });
          console.error('Error deleting contact:', error);
          throw error;
        }
      },

      createLead: async (lead) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/leads', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(lead)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const newLead: Lead = {
            ...lead,
            id: Math.random().toString(36).substring(2, 11),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          set(state => ({ 
            leads: [...state.leads, newLead], 
            loading: false 
          }));
          return newLead;
        } catch (error) {
          set({ error: 'Failed to create lead', loading: false });
          console.error('Error creating lead:', error);
          throw error;
        }
      },

      updateLead: async (id, lead) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch(`/api/modules/crm/leads/${id}`, {
          //   method: 'PUT',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(lead)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const updatedLead = {
            ...get().leads.find(l => l.id === id),
            ...lead,
            updatedAt: new Date().toISOString()
          } as Lead;
          
          set(state => ({ 
            leads: state.leads.map(l => l.id === id ? updatedLead : l), 
            loading: false 
          }));
          
          return updatedLead;
        } catch (error) {
          set({ error: 'Failed to update lead', loading: false });
          console.error('Error updating lead:', error);
          throw error;
        }
      },

      deleteLead: async (id) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // await fetch(`/api/modules/crm/leads/${id}`, {
          //   method: 'DELETE'
          // });
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set(state => ({ 
            leads: state.leads.filter(l => l.id !== id), 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to delete lead', loading: false });
          console.error('Error deleting lead:', error);
          throw error;
        }
      },

      createDeal: async (deal) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch('/api/modules/crm/deals', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(deal)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const newDeal: Deal = {
            ...deal,
            id: Math.random().toString(36).substring(2, 11),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          set(state => ({ 
            deals: [...state.deals, newDeal], 
            loading: false 
          }));
          return newDeal;
        } catch (error) {
          set({ error: 'Failed to create deal', loading: false });
          console.error('Error creating deal:', error);
          throw error;
        }
      },

      updateDeal: async (id, deal) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // const response = await fetch(`/api/modules/crm/deals/${id}`, {
          //   method: 'PUT',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(deal)
          // });
          // const data = await response.json();
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          const updatedDeal = {
            ...get().deals.find(d => d.id === id),
            ...deal,
            updatedAt: new Date().toISOString()
          } as Deal;
          
          set(state => ({ 
            deals: state.deals.map(d => d.id === id ? updatedDeal : d), 
            loading: false 
          }));
          
          return updatedDeal;
        } catch (error) {
          set({ error: 'Failed to update deal', loading: false });
          console.error('Error updating deal:', error);
          throw error;
        }
      },

      deleteDeal: async (id) => {
        set({ loading: true, error: null });
        try {
          // In a real app, this would be an API call
          // await fetch(`/api/modules/crm/deals/${id}`, {
          //   method: 'DELETE'
          // });
          
          // Using mock data for now
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          set(state => ({ 
            deals: state.deals.filter(d => d.id !== id), 
            loading: false 
          }));
        } catch (error) {
          set({ error: 'Failed to delete deal', loading: false });
          console.error('Error deleting deal:', error);
          throw error;
        }
      }
    }),
    { name: 'crm-store' }
  )
);