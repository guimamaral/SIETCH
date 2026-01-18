'use client';

import { useState, FormEvent } from 'react';
import styles from './TutoringContactForm.module.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export function TutoringContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading' });

    try {
      const response = await fetch('/api/tutoring-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus({
        type: 'success',
        message: 'Thank you! I\'ll get back to you soon.',
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={styles.input}
          disabled={status.type === 'loading'}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={styles.input}
          disabled={status.type === 'loading'}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={styles.textarea}
          disabled={status.type === 'loading'}
          placeholder="Tell me about your learning goals..."
        />
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={status.type === 'loading'}
      >
        {status.type === 'loading' ? 'Sending...' : 'Send Inquiry'}
      </button>

      {status.type === 'success' && (
        <p className={styles.successMessage}>{status.message}</p>
      )}

      {status.type === 'error' && (
        <p className={styles.errorMessage}>{status.message}</p>
      )}
    </form>
  );
}
