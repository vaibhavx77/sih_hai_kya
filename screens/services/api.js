// services/api.js
// Centralized API service for backend integration

// IMPORTANT: Replace with your computer's local IP address for Expo Go connectivity
const BASE_URL = 'http://192.168.1.7:5000/api'; // Example IP, update to your actual IP

export async function register(name, email, password) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function createReport(report, token) {
  const res = await fetch(`${BASE_URL}/reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(report),
  });
  return res.json();
}

export async function getAllReports() {
  const res = await fetch(`${BASE_URL}/reports`);
  return res.json();
}

export async function getUserReports(userId) {
  const res = await fetch(`${BASE_URL}/reports/user/${userId}`);
  return res.json();
}

export async function updateReportStatus(reportId, status, token) {
  const res = await fetch(`${BASE_URL}/reports/${reportId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return res.json();
}
