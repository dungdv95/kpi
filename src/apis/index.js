import {apiEndpoint} from '../endpoint';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStorageData} from '../../utils/storage/storage';

async function kpiFetch(input, options) {
  const jwt = await AsyncStorage.getItem('token');
  return fetch(input, {
    ...options,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  });
}

async function login({username, password} = {}) {
  const response = await fetch(`${apiEndpoint}/login`, {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (data?.error) {
    throw new Error(data?.status);
  }
  return data;
}

async function getGroups() {
  const response = await kpiFetch(`${apiEndpoint}/v1/group`, {
    method: 'GET',
  });

  const data = await response.json();
  if (data?.error) {
    throw new Error(data?.status);
  }
  return data;
}

async function getListByToken() {
  const response = await kpiFetch(`${apiEndpoint}/v1/rule/listByToken`, {
    method: 'GET',
  });

  const data = await response.json();
  console.log('==============2======================');
  console.log('data', data);
  console.log('====================================');
  if (data?.error) {
    throw new Error(data?.status);
  }
  return data;
}

async function getRuleByType(type, search = '') {
  const response = await kpiFetch(
    `${apiEndpoint}/v1/rule?type=${type}&name=${search}`,
    {
      method: 'GET',
    },
  );
  const data = await response.json();
  if (data?.error) {
    throw new Error(data?.status);
  }
  return data;
}

async function score({ruleId, userId, score, multiplier, note}) {
  const response = await kpiFetch(`${apiEndpoint}/v1/score`, {
    method: 'POST',
    body: JSON.stringify({
      ruleId: ruleId,
      userId: userId,
      score: score,
      multiplier: multiplier,
      note: note,
    }),
  });
  console.log('====================================');
  console.log('ruleId', ruleId);
  console.log('userId', userId);
  console.log('score', score);
  console.log('multiplier', multiplier);
  console.log('note', note);

  console.log('====================================');
  const data = await response.json();

  if (data?.error) {
    throw new Error(data?.status);
  }
  return data;
}

async function createRules(submitData) {
  console.log('submitData', submitData);
  const response = await kpiFetch(`${apiEndpoint}/v1/rule`, {
    method: 'POST',
    body: JSON.stringify(submitData),
  });
  const data = await response.json();
  if (data?.error) {
    throw new Error(data?.message);
  }
  return data;
}

async function reportPointByMonth({groupId, month, year}) {
  const response = await kpiFetch(
    `${apiEndpoint}/v1/score/report?groupId=${groupId}&month=${month}&year=${year}`,
    {
      method: 'GET',
    },
  );
  const data = await response.json();
  if (data?.error) {
    throw new Error(data?.status);
  }
  return data;
}
async function reportPointByUser({userId, date, limit}) {
  const response = await kpiFetch(
    `${apiEndpoint}/v1/score/log?userId=${userId}&date=${date}&limit=${limit}`,
    {
      method: 'GET',
    },
  );
  const data = await response.json();
  if (data?.error) {
    throw new Error(data?.message);
  }
  return data;
}
async function editRule(submitData) {
  const response = await kpiFetch(`${apiEndpoint}/v1/rule`, {
    method: 'PUT',
    body: JSON.stringify(submitData),
  });
  const data = await response.json();
  if (data?.error) {
    throw new Error(data?.message);
  }
  return data;
}

async function deleteRule(id) {
  const response = await kpiFetch(`${apiEndpoint}/v1/rule/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (data?.error) {
    throw new Error(data?.status);
  }
  return data;
}

async function getAllUser(groupId = '', fullName = '') {
  const response = await kpiFetch(
    `${apiEndpoint}/v1/user?groupId=${groupId}&fullName=${fullName}`,
    {
      method: 'GET',
    },
  );

  const data = await response.json();
  if (data?.error) {
    throw new Error(data?.status);
  }
  return data;
}

async function deleteUser(id) {
  const response = await kpiFetch(`${apiEndpoint}/v1/user/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (data?.error) {
    throw new Error(data?.status);
  }
  return data;
}

async function getAllRoles() {
  const response = await kpiFetch(`${apiEndpoint}/v1/role`, {
    method: 'GET',
  });

  const data = await response.json();
  if (data?.error) {
    throw new Error(data?.status);
  }
  return data;
}

export default Object.freeze({
  login,
  getGroups,
  score,
  getListByToken,
  reportPointByMonth,
  getAllUser,
  reportPointByUser,
  getRuleByType,
  createRules,
  editRule,
  deleteRule,
  getAllUser,
  getAllRoles,
  deleteUser,
});
