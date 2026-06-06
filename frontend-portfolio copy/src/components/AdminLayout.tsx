// frontend-portfolio/src/components/AdminLayout.tsx
import React from 'react';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return <AdminSidebar>{children}</AdminSidebar>;
};