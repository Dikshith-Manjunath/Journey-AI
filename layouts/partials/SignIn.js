// pages/signin.jsx
import { useState } from 'react';
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Replace this with your actual authentication logic
      // Example: const response = await signInWithEmailAndPassword(email, password);
      console.log('Signing in with:', email, password);
      
      // Simulate API call
      await new Promise((resolve, reject) => {
        // Simulate success or failure
        if (email === 'test@example.com' && password === 'password') {
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      });

      // If successful, redirect to home page
      window.location.href = '/blogs';
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        {error && <div>{error}</div>}
      </form>
      <Link href="/sign-in">Create an account</Link>
    </div>
  );
}