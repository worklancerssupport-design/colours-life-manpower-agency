'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetchFileFromGitHub, saveFileToGitHub } from '@/lib/edit/github-client';
import { resolveSection } from '@/lib/edit/sections';

// Must match the existing data/ formatting exactly or every save is a
// whitespace-only diff across the whole repo.
const INDENT = 2;

const serialize = (data) => `${JSON.stringify(data, null, INDENT)}\n`;
const clone = (value) =>
  typeof structuredClone === 'function'
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));

function setAtPath(draft, path, value) {
  if (!path.length) return value;
  let node = draft;
  for (let i = 0; i < path.length - 1; i++) {
    if (node == null) return draft;
    node = node[path[i]];
  }
  if (node == null) return draft;
  node[path[path.length - 1]] = value;
  return draft;
}

function removeAtPath(draft, path) {
  if (!path.length) return draft;
  let node = draft;
  for (let i = 0; i < path.length - 1; i++) {
    if (node == null) return draft;
    node = node[path[i]];
  }
  if (node == null) return draft;
  const key = path[path.length - 1];
  if (Array.isArray(node)) node.splice(Number(key), 1);
  else if (node && typeof node === 'object') delete node[key];
  return draft;
}

function insertAtPath(draft, path, value, index) {
  const target = path.length ? path.reduce((n, k) => (n == null ? n : n[k]), draft) : draft;
  if (!Array.isArray(target)) return draft;
  const at = index == null ? target.length : Math.max(0, Math.min(index, target.length));
  target.splice(at, 0, value);
  return draft;
}

function moveAtPath(draft, path, from, to) {
  const target = path.length ? path.reduce((n, k) => (n == null ? n : n[k]), draft) : draft;
  if (!Array.isArray(target)) return draft;
  const start = Number(from);
  const end = Number(to);
  if (start === end || start < 0 || start >= target.length) return draft;
  const [item] = target.splice(start, 1);
  target.splice(Math.max(0, Math.min(end, target.length)), 0, item);
  return draft;
}

/**
 * Generic read/edit/write lifecycle for one data file.
 *
 * @param {string|import('@/lib/edit/sections').EditSection} sectionOrPath section id, repo path, or section object
 */
export function useEditSection(sectionOrPath) {
  const section = resolveSection(sectionOrPath);

  const [originalData, setOriginalData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [sha, setSha] = useState('');
  const [loading, setLoading] = useState(Boolean(section));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [savedAt, setSavedAt] = useState(null);

  // Keyed on primitives so an inline section object can never retrigger the
  // load effect on every render.
  const path = section?.path || '';
  const commitMessage = section?.commitMessage || '';

  const refresh = useCallback(async () => {
    if (!path) {
      setError('Unknown edit section');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { content, sha: nextSha } = await fetchFileFromGitHub(path);
      const parsed = JSON.parse(content);
      setOriginalData(parsed);
      setEditData(clone(parsed));
      setSha(nextSha);
    } catch (err) {
      setError(err.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateEditData = useCallback(
    (updater) => {
      setEditData((prev) => {
        if (prev == null) return prev;
        const draft = clone(prev);
        updater(draft);
        return draft;
      });
    },
    []
  );

  const setAt = useCallback(
    (path, value) => updateEditData((draft) => setAtPath(draft, path, value)),
    [updateEditData]
  );

  const removeAt = useCallback(
    (path) => updateEditData((draft) => removeAtPath(draft, path)),
    [updateEditData]
  );

  const insertAt = useCallback(
    (path, value, index) => updateEditData((draft) => insertAtPath(draft, path, value, index)),
    [updateEditData]
  );

  const moveAt = useCallback(
    (path, from, to) => updateEditData((draft) => moveAtPath(draft, path, from, to)),
    [updateEditData]
  );

  // Documented convenience wrappers for the common top-level-array case.
  const updateItem = useCallback(
    (index, updates) =>
      updateEditData((draft) => {
        if (Array.isArray(draft) && draft[index]) Object.assign(draft[index], updates);
      }),
    [updateEditData]
  );
  const addItem = useCallback(
    (item) => updateEditData((draft) => Array.isArray(draft) && draft.push(item)),
    [updateEditData]
  );
  const removeItem = useCallback(
    (index) => updateEditData((draft) => Array.isArray(draft) && draft.splice(index, 1)),
    [updateEditData]
  );
  const moveItem = useCallback(
    (from, to) => updateEditData((draft) => Array.isArray(draft) && moveAtPath(draft, [], from, to)),
    [updateEditData]
  );

  const hasChanges =
    originalData != null && editData != null && serialize(originalData) !== serialize(editData);

  const save = useCallback(async () => {
    if (!path || editData == null) return;
    setSaving(true);
    setError(null);
    try {
      const { newSha } = await saveFileToGitHub({
        path,
        content: serialize(editData),
        sha,
        message: commitMessage || `Update ${path} via edit console`,
      });
      setOriginalData(clone(editData));
      setSha(newSha);
      setSavedAt(Date.now());
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  }, [path, commitMessage, editData, sha]);

  const discard = useCallback(() => {
    if (originalData == null) return;
    setEditData(clone(originalData));
    setError(null);
  }, [originalData]);

  return {
    section,
    originalData,
    editData,
    sha,
    loading,
    saving,
    error,
    hasChanges,
    savedAt,
    refresh,
    save,
    discard,
    updateEditData,
    setAt,
    removeAt,
    insertAt,
    moveAt,
    updateItem,
    addItem,
    removeItem,
    moveItem,
  };
}
