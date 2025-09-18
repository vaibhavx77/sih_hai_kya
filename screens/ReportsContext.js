import React, { createContext, useContext, useState } from 'react';

const ReportsContext = createContext();

export function ReportsProvider({ children }) {
  const [reports, setReports] = useState([
    {
      id: 1,
      photo: null,
      description: 'Pothole near main street',
      location: { latitude: 28.6139, longitude: 77.209 },
      status: 'submitted',
      createdAt: '2025-09-18T10:00:00Z',
    },
    {
      id: 2,
      photo: null,
      description: 'Broken streetlight at park',
      location: { latitude: 28.6145, longitude: 77.2085 },
      status: 'in-progress',
      createdAt: '2025-09-18T11:00:00Z',
    },
  ]);

  return (
    <ReportsContext.Provider value={{ reports, setReports }}>
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  return useContext(ReportsContext);
}