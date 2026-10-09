'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  EDIT_SECTIONS,
  inferFieldKind,
  fieldLabel,
  containsTokens,
  isPlainObject,
} from '@/lib/edit/sections';
import { useEditSection } from '@/lib/edit/useEditSection';
import { useAuth } from '@/lib/edit/useAuth';

const SERVICES_INDEX_ID = 'services-index';
const SERVICE_PREFIX = 'service-';

function groupSections(sections) {
  const groups = [
    { id: 'agency', label: 'Agency', items: [] },
    { id: 'services', label: 'Services', items: [] },
    { id: 'content', label: 'Content', items: [] },
  ];
  sections.forEach((section) => {
    if (section.id === 'agency') groups[0].items.push(section);
    else if (section.id === SERVICES_INDEX_ID || section.id.startsWith(SERVICE_PREFIX)) {
      groups[1].items.push(section);
    } else {
      groups[2].items.push(section);
    }
  });
  return groups;
}

function shortPath(path) {
  return path.replace(/^data\//, '').replace(/\.json$/, '');
}

function serviceLabel(section) {
  if (!section.id.startsWith(SERVICE_PREFIX)) return section.label;
  const slug = section.id.slice(SERVICE_PREFIX.length);
  return slug;
}

export default function EditorView() {
  const groups = useMemo(() => groupSections(EDIT_SECTIONS), []);
  const [activeId, setActiveId] = useState(EDIT_SECTIONS[0].id);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const activeSection = useMemo(
    () => EDIT_SECTIONS.find((section) => section.id === activeId) || EDIT_SECTIONS[0],
    [activeId]
  );

  useEffect(() => {
    setMobileNavOpen(false);
  }, [activeId]);

  return (
    <div className={`edit-console ${mobileNavOpen ? 'edit-console--nav-open' : ''}`}>
      <ConsoleHeader onToggleNav={() => setMobileNavOpen((value) => !value)} />

      <div className="edit-console-body">
        <nav className="edit-nav" aria-label="Editable sections">
          {groups.map((group) => (
            <div key={group.id} className="edit-nav-group">
              <div className="edit-nav-group-label">{group.label}</div>
              <ul className="edit-nav-list">
                {group.items.map((section) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      className={`edit-nav-item ${section.id === activeId ? 'is-active' : ''}`}
                      onClick={() => setActiveId(section.id)}
                    >
                      <span className="edit-nav-item-title">{serviceLabel(section)}</span>
                      <span className="edit-nav-item-path">{shortPath(section.path)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <main className="edit-main">
          <SectionEditor key={activeSection.id} section={activeSection} />
        </main>
      </div>
    </div>
  );
}

function ConsoleHeader({ onToggleNav }) {
  const { logout } = useAuth();
  return (
    <header className="edit-header">
      <div className="edit-header-row">
        <div className="edit-header-brand">
          <span className="edit-header-mark" aria-hidden="true">CL</span>
          <div className="edit-header-titles">
            <span className="edit-header-title">Edit console</span>
            <span className="edit-header-tag">Colours Life Manpower Agency</span>
          </div>
        </div>

        <div className="edit-header-actions">
          <button
            type="button"
            className="edit-icon-btn edit-icon-btn-mobile"
            onClick={onToggleNav}
            aria-label="Toggle section list"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
          <a href="/" className="edit-ghost-btn" target="_blank" rel="noopener noreferrer">
            View site
            <span aria-hidden="true">↗</span>
          </a>
          <button type="button" className="edit-ghost-btn" onClick={logout}>
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}

function SectionEditor({ section }) {
  const editor = useEditSection(section);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    if (!editor.savedAt) return undefined;
    setSavedFlash(true);
    const id = setTimeout(() => setSavedFlash(false), 2200);
    return () => clearTimeout(id);
  }, [editor.savedAt]);

  if (editor.loading && !editor.editData) {
    return (
      <div className="edit-loading">
        <span className="edit-spinner" aria-hidden="true" />
        Loading {section.label.toLowerCase()}…
      </div>
    );
  }

  if (editor.error && !editor.editData) {
    return (
      <div className="edit-error">
        <strong>Couldn&apos;t load this section.</strong>
        <p>{editor.error}</p>
        <button type="button" className="edit-btn edit-btn-secondary" onClick={editor.refresh}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="edit-section">
      <header className="edit-section-head">
        <div className="edit-section-eyebrow">{shortPath(section.path)}</div>
        <h1 className="edit-section-title">{section.label}</h1>
        {section.notes ? <p className="edit-section-notes">{section.notes}</p> : null}
      </header>

      <ActionBar editor={editor} savedFlash={savedFlash} />

      {editor.error ? <div className="edit-banner edit-banner-error">{editor.error}</div> : null}

      <SectionBody editor={editor} />
    </div>
  );
}

function SectionBody({ editor }) {
  const { editData, section } = editor;
  if (editData == null) return null;
  const readOnlyKeys = section?.readOnlyKeys || [];
  const onChange = (updater) => editor.updateEditData(updater);

  if (Array.isArray(editData)) {
    return (
      <ObjectListField
        value={editData}
        path={[]}
        onChange={onChange}
        ownLabel={section?.label || 'Items'}
        readOnlyKeys={readOnlyKeys}
      />
    );
  }

  return (
    <GroupFields
      value={editData}
      path={[]}
      readOnlyKeys={readOnlyKeys}
      onChange={onChange}
    />
  );
}

function ActionBar({ editor, savedFlash }) {
  let status = null;
  if (editor.saving) {
    status = (
      <span className="edit-status edit-status-saving">
        <span className="edit-spinner edit-spinner-sm" /> Saving…
      </span>
    );
  } else if (editor.hasChanges) {
    status = <span className="edit-status edit-status-dirty">Unsaved changes</span>;
  } else if (savedFlash) {
    status = <span className="edit-status edit-status-saved">Saved ✓</span>;
  } else {
    status = <span className="edit-status edit-status-clean">All caught up</span>;
  }

  return (
    <div className="edit-actions">
      <div className="edit-actions-status">{status}</div>
      <div className="edit-actions-buttons">
        <button
          type="button"
          className="edit-btn edit-btn-ghost"
          onClick={editor.refresh}
          disabled={editor.saving || editor.loading}
          title="Reload from GitHub (discards local changes)"
        >
          Refresh
        </button>
        <button
          type="button"
          className="edit-btn edit-btn-secondary"
          onClick={editor.discard}
          disabled={editor.saving || !editor.hasChanges}
        >
          Discard
        </button>
        <button
          type="button"
          className="edit-btn edit-btn-primary"
          onClick={editor.save}
          disabled={editor.saving || !editor.hasChanges}
        >
          {editor.saving ? 'Saving…' : 'Save changes'}
          <span aria-hidden="true" className="edit-btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Field tree — recursive renderer. Each FieldRenderer gets:
//   - value:    the current JSON value at this path
//   - path:     array of keys from the root to this value
//   - onChange: (updater) => void — caller owns the root draft
//   - readOnlyKeys: keys (leaf-level only) that must not be edited
// ---------------------------------------------------------------------------

function FieldRenderer({ kind, value, path, readOnlyKeys, onChange, label }) {
  const ownLabel = label != null ? label : fieldLabel(path[path.length - 1] || 'value');

  if (kind === 'text' || kind === 'textarea') {
    return <StringField value={value} path={path} onChange={onChange} ownLabel={ownLabel} readOnlyKeys={readOnlyKeys} />;
  }
  if (kind === 'boolean') {
    return <BooleanField value={value} path={path} onChange={onChange} ownLabel={ownLabel} />;
  }
  if (kind === 'stringArray') {
    return <StringArrayField value={value} path={path} onChange={onChange} ownLabel={ownLabel} />;
  }
  if (kind === 'objectList') {
    return <ObjectListField value={value} path={path} onChange={onChange} ownLabel={ownLabel} />;
  }
  if (kind === 'group') {
    return (
      <GroupFields
        value={value}
        path={path}
        readOnlyKeys={readOnlyKeys}
        onChange={onChange}
        title={path.length === 0 ? null : ownLabel}
      />
    );
  }
  return <JsonField value={value} path={path} onChange={onChange} ownLabel={ownLabel} />;
}

function GroupFields({ value, path, readOnlyKeys, onChange, title }) {
  if (!isPlainObject(value)) return null;
  const keys = Object.keys(value);
  const activeReadOnly = readOnlyKeys || [];
  return (
    <div className={`edit-group ${path.length === 0 ? 'edit-group-root' : ''}`}>
      {title ? <h3 className="edit-group-title">{title}</h3> : null}
      <div className="edit-group-grid">
        {keys.map((key) => {
          const childPath = [...path, key];
          const childValue = value[key];
          return (
            <FieldRenderer
              key={key}
              kind={inferFieldKind(childValue)}
              value={childValue}
              path={childPath}
              readOnlyKeys={activeReadOnly.includes(key) ? [key] : []}
              onChange={onChange}
              label={fieldLabel(key)}
            />
          );
        })}
      </div>
    </div>
  );
}

function FieldFrame({ label, hint, locked, tokensHint, children, span }) {
  return (
    <div className={`edit-field ${span ? 'edit-field-wide' : ''}`}>
      <div className="edit-field-label">
        <span>{label}</span>
        <span className="edit-field-badges">
          {locked ? <span className="edit-badge edit-badge-lock">Locked</span> : null}
          {tokensHint ? <span className="edit-badge edit-badge-token">Token</span> : null}
        </span>
      </div>
      {children}
      {hint ? <p className="edit-field-hint">{hint}</p> : null}
    </div>
  );
}

function StringField({ value, path, onChange, ownLabel, readOnlyKeys }) {
  const key = path[path.length - 1];
  const locked = readOnlyKeys.includes(key);
  const hasTokens = containsTokens(value);
  const isMultiline = typeof value === 'string' && (value.length > 80 || value.includes('\n'));

  const update = (next) => onChange((draft) => setAtPath(draft, path, next));

  return (
    <FieldFrame label={ownLabel} locked={locked} tokensHint={hasTokens}>
      {isMultiline ? (
        <textarea
          className="edit-input edit-textarea"
          value={value || ''}
          rows={Math.min(10, Math.max(3, Math.ceil((value || '').length / 80)))}
          disabled={locked}
          onChange={(event) => update(event.target.value)}
        />
      ) : (
        <input
          type="text"
          className="edit-input"
          value={value || ''}
          disabled={locked}
          onChange={(event) => update(event.target.value)}
        />
      )}
    </FieldFrame>
  );
}

function BooleanField({ value, path, onChange, ownLabel }) {
  const update = (next) => onChange((draft) => setAtPath(draft, path, next));
  return (
    <FieldFrame label={ownLabel}>
      <button
        type="button"
        className={`edit-toggle ${value ? 'is-on' : ''}`}
        onClick={() => update(!value)}
        aria-pressed={Boolean(value)}
      >
        <span className="edit-toggle-knob" />
        <span className="edit-toggle-text">{value ? 'On' : 'Off'}</span>
      </button>
    </FieldFrame>
  );
}

function StringArrayField({ value, path, onChange, ownLabel }) {
  const list = Array.isArray(value) ? value : [];

  const updateAt = (index, next) => {
    onChange((draft) => {
      const node = path.reduce((n, k) => (n == null ? n : n[k]), draft);
      if (Array.isArray(node)) node[index] = next;
    });
  };

  const removeAt = (index) => {
    onChange((draft) => {
      const node = path.reduce((n, k) => (n == null ? n : n[k]), draft);
      if (Array.isArray(node)) node.splice(index, 1);
    });
  };

  const move = (from, to) => {
    if (from === to) return;
    onChange((draft) => {
      const node = path.reduce((n, k) => (n == null ? n : n[k]), draft);
      if (!Array.isArray(node)) return;
      if (from < 0 || from >= node.length) return;
      const [item] = node.splice(from, 1);
      node.splice(Math.max(0, Math.min(to, node.length)), 0, item);
    });
  };

  const addOne = () => {
    onChange((draft) => {
      const node = path.reduce((n, k) => (n == null ? n : n[k]), draft);
      if (Array.isArray(node)) node.push('');
    });
  };

  return (
    <FieldFrame label={ownLabel} hint="One entry per line.">
      <div className="edit-list">
        {list.length === 0 ? <div className="edit-list-empty">No entries yet.</div> : null}
        {list.map((item, index) => (
          <div key={index} className="edit-list-row">
            <span className="edit-list-idx">{String(index + 1).padStart(2, '0')}</span>
            <input
              type="text"
              className="edit-input"
              value={item || ''}
              onChange={(event) => updateAt(index, event.target.value)}
              placeholder="Entry text"
            />
            <button
              type="button"
              className="edit-row-remove"
              onClick={() => removeAt(index)}
              aria-label={`Remove entry ${index + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
        <button type="button" className="edit-add-btn" onClick={addOne}>
          <span aria-hidden="true">+</span> Add entry
        </button>
      </div>
    </FieldFrame>
  );
}

function ObjectListField({ value, path, onChange, ownLabel, readOnlyKeys }) {
  const list = Array.isArray(value) ? value : [];

  const updateChild = (index) => (updater) => {
    onChange((draft) => {
      const node = path.reduce((n, k) => (n == null ? n : n[k]), draft);
      if (Array.isArray(node) && isPlainObject(node[index])) updater(node[index]);
    });
  };

  const replaceAt = (index, next) => {
    onChange((draft) => {
      const node = path.reduce((n, k) => (n == null ? n : n[k]), draft);
      if (Array.isArray(node)) node[index] = next;
    });
  };

  const removeAt = (index) => {
    onChange((draft) => {
      const node = path.reduce((n, k) => (n == null ? n : n[k]), draft);
      if (Array.isArray(node)) node.splice(index, 1);
    });
  };

  const move = (from, to) => {
    if (from === to) return;
    onChange((draft) => {
      const node = path.reduce((n, k) => (n == null ? n : n[k]), draft);
      if (!Array.isArray(node)) return;
      if (from < 0 || from >= node.length) return;
      const [item] = node.splice(from, 1);
      node.splice(Math.max(0, Math.min(to, node.length)), 0, item);
    });
  };

  const addOne = () => {
    onChange((draft) => {
      const node = path.reduce((n, k) => (n == null ? n : n[k]), draft);
      if (Array.isArray(node)) node.push(buildBlankItem(node));
    });
  };

  return (
    <div className="edit-card">
      <div className="edit-card-head">
        <h3 className="edit-card-title">{ownLabel}</h3>
        <span className="edit-card-count">{list.length}</span>
      </div>

      {list.length === 0 ? (
        <div className="edit-list-empty">Nothing here yet — add your first entry.</div>
      ) : null}

      <div className="edit-cards">
        {list.map((item, index) => (
          <ObjectCard
            key={index}
            index={index}
            total={list.length}
            item={item}
            path={[...path, String(index)]}
            readOnlyKeys={readOnlyKeys}
            onMoveUp={() => move(index, index - 1)}
            onMoveDown={() => move(index, index + 1)}
            onRemove={() => removeAt(index)}
            onChildChange={updateChild(index)}
            onReplace={(next) => replaceAt(index, next)}
          />
        ))}
      </div>

      <button type="button" className="edit-add-btn" onClick={addOne}>
        <span aria-hidden="true">+</span> Add new
      </button>
    </div>
  );
}

function ObjectCard({ index, total, item, path, readOnlyKeys, onMoveUp, onMoveDown, onRemove, onChildChange }) {
  const headline = objectHeadline(item, index);
  return (
    <article className="edit-object">
      <header className="edit-object-head">
        <span className="edit-object-idx">{String(index + 1).padStart(2, '0')}</span>
        <span className="edit-object-title">{headline}</span>
        <div className="edit-object-tools">
          <button type="button" className="edit-tool" onClick={onMoveUp} disabled={index === 0} aria-label="Move up">↑</button>
          <button type="button" className="edit-tool" onClick={onMoveDown} disabled={index === total - 1} aria-label="Move down">↓</button>
          <button type="button" className="edit-tool edit-tool-danger" onClick={onRemove} aria-label="Remove">✕</button>
        </div>
      </header>

      <div className="edit-object-body">
        <GroupFields value={item} path={path} readOnlyKeys={readOnlyKeys || []} onChange={onChildChange} />
      </div>
    </article>
  );
}

function JsonField({ value, path, onChange, ownLabel }) {
  const [draft, setDraft] = useState(() => JSON.stringify(value, null, 2));
  const [error, setError] = useState(null);
  const lastValue = useRef(value);

  useEffect(() => {
    if (lastValue.current !== value) {
      lastValue.current = value;
      setDraft(JSON.stringify(value, null, 2));
      setError(null);
    }
  }, [value]);

  const commit = (raw) => {
    try {
      const parsed = JSON.parse(raw);
      onChange((draft2) => setAtPath(draft2, path, parsed));
      setError(null);
    } catch (err) {
      setError(err.message || 'Invalid JSON');
    }
  };

  return (
    <FieldFrame label={ownLabel} hint="Edit raw JSON. Commits only when valid.">
      <textarea
        className={`edit-input edit-textarea edit-textarea-mono ${error ? 'has-error' : ''}`}
        value={draft}
        rows={10}
        onChange={(event) => {
          setDraft(event.target.value);
          commit(event.target.value);
        }}
        spellCheck={false}
      />
      {error ? <div className="edit-field-error">{error}</div> : null}
    </FieldFrame>
  );
}

// --- helpers ----------------------------------------------------------------

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

function buildBlankItem(array) {
  if (!array.length) return {};
  const template = array[0];
  if (Array.isArray(template)) return [];
  if (isPlainObject(template)) {
    const blank = {};
    for (const key of Object.keys(template)) {
      const sample = template[key];
      if (typeof sample === 'string') blank[key] = '';
      else if (typeof sample === 'number') blank[key] = 0;
      else if (typeof sample === 'boolean') blank[key] = false;
      else if (Array.isArray(sample)) blank[key] = [];
      else if (isPlainObject(sample)) blank[key] = {};
      else blank[key] = '';
    }
    return blank;
  }
  if (typeof template === 'string') return '';
  if (typeof template === 'number') return 0;
  if (typeof template === 'boolean') return false;
  return '';
}

function objectHeadline(item, index) {
  if (!isPlainObject(item)) return `Item ${index + 1}`;
  const namedKeys = ['name', 'title', 'question', 'label', 'navTitle', 'shortName', 'author'];
  for (const key of namedKeys) {
    if (typeof item[key] === 'string' && item[key].trim()) return item[key];
  }
  const firstString = Object.values(item).find((value) => typeof value === 'string' && value.trim());
  if (firstString) return firstString.slice(0, 60);
  return `Item ${index + 1}`;
}