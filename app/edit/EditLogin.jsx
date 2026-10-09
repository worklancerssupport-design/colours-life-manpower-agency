'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/edit/useAuth';

export default function EditLogin() {
  const { login, loading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    await login(username.trim(), password);
  };

  return (
    <div className="edit-login">
      <div className="edit-login-card">
        <div className="edit-login-eyebrow">
          <span className="edit-login-eyebrow-mark" />
          Admin
        </div>
        <h1 className="edit-login-title">
          Edit <em>console</em>
        </h1>
        <p className="edit-login-sub">
          Sign in to update site copy, services, FAQs, reviews and case studies. Every change is committed to the repo as a single edit.
        </p>

        <form onSubmit={onSubmit} className="edit-login-form" noValidate>
          <label className="edit-field">
            <span className="edit-field-label">Username</span>
            <input
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="edit-input"
              placeholder="admin"
              disabled={loading}
            />
          </label>

          <label className="edit-field">
            <span className="edit-field-label">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="edit-input"
              placeholder="••••••••"
              disabled={loading}
            />
          </label>

          {error ? (
            <div className="edit-login-error" role="alert">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            className="edit-btn edit-btn-primary"
            disabled={loading || !username || !password}
          >
            {loading ? 'Signing in…' : 'Sign in'}
            <span className="edit-btn-arrow" aria-hidden="true">→</span>
          </button>
        </form>

        <p className="edit-login-foot">
          For authorised agency owners only. All actions are logged via git commits.
        </p>
      </div>
    </div>
  );
}