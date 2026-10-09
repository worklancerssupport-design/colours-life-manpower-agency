'use client';

// ---------------------------------------------------------------------------
// PASS 2 STUB — this is the only file the UI pass needs to rewrite.
//
// Everything it needs is already wired:
//   useAuth()  -> { isAuthenticated, loading, error, login, logout }
//   useEditSection(section) -> {
//     section, editData, originalData, sha, loading, saving, error,
//     hasChanges, savedAt, refresh, save, discard, updateEditData,
//     setAt, removeAt, insertAt, moveAt,
//     updateItem, addItem, removeItem, moveItem
//   }
//
//   EDIT_SECTIONS       -> [{ id, label, path, kind, commitMessage,
//                            readOnlyKeys, notes }]
//   inferFieldKind(v)   -> 'text'|'textarea'|'boolean'|'stringArray'|
//                          'objectList'|'group'|'json'
//   fieldLabel(key)     -> 'metaTitle' -> 'Meta Title'
//   containsTokens(str) -> true when a value holds {{token}} placeholders
//
// Contract the UI must honour:
//   - Call section.save() to commit. It serialises with 2-space indent + a
//     trailing newline so git diffs stay clean. Do not write files any other way.
//   - {{token}} strings are opaque. Never interpolate them in the editor and
//     never save an interpolated copy.
//   - Keys listed in section.readOnlyKeys must not be editable.
//   - Offer Refresh / Discard / Save on every editor (documented action bar).
// ---------------------------------------------------------------------------

import { useAuth } from '@/lib/edit/useAuth';

export default function EditShell() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div data-edit-shell="loading" />;

  if (!isAuthenticated) {
    return <div data-edit-shell="login" />;
  }

  return <div data-edit-shell="console" />;
}
