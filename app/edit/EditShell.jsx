'use client';

import { useAuth } from '@/lib/edit/useAuth';
import EditLogin from './EditLogin';
import EditorView from './EditorView';

export default function EditShell() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="edit-loading edit-loading-full"><span className="edit-spinner" /></div>;
  if (!isAuthenticated) return <EditLogin />;
  return <EditorView />;
}