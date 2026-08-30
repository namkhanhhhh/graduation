import { v4 as uuidv4 } from 'uuid';
import { invitationConfig as defaultConfig } from '../config';
import dataJson from '../data.json';

// In-memory store initialized from data.json
let store = [...dataJson];

export const getInvitations = () => {
  return store;
};

export const getInvitationById = (id) => {
  return store.find(inv => inv.id === id);
};

export const getInvitationBySlug = (slug) => {
  return store.find(inv => inv.slug === slug);
};

export const saveInvitation = async (invitation) => {
  const index = store.findIndex(inv => inv.id === invitation.id);
  
  if (index !== -1) {
    store[index] = { ...store[index], ...invitation };
  } else {
    store.push({
      ...invitation,
      createdAt: new Date().toISOString(),
    });
  }

  // Attempt to save to local API (works in dev mode)
  try {
    await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(store, null, 2)
    });
  } catch (e) {
    console.log('Failed to save to /api/save. This is expected in production.');
  }
};

export const deleteInvitation = async (id) => {
  store = store.filter(inv => inv.id !== id);
  try {
    await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(store, null, 2)
    });
  } catch (e) {
    console.log('Failed to save to /api/save. This is expected in production.');
  }
};

export const isSlugUnique = (slug, excludeId = null) => {
  return !store.some(inv => inv.slug === slug && inv.id !== excludeId);
};

export const createNewInvitation = () => {
  const newInv = {
    id: uuidv4(),
    slug: `thiep-${Math.floor(Math.random() * 10000)}`,
    ...defaultConfig,
    leftPageImage: 'sample.jpg', // Default image filename
    title: 'Trân trọng kính mời đến dự',
    personName: 'Tên Bạn',
    createdAt: new Date().toISOString(),
  };
  // We don't save immediately, let the user save in the editor
  return newInv;
};
