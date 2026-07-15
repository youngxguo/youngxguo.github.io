import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { siteConfig } from './siteConfig';

describe('App', () => {
  afterEach(() => {
    window.history.pushState({}, '', '/');
    window.localStorage.clear();
  });

  it('renders profile heading and action buttons on home route', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    expect(screen.getByRole('heading', { name: siteConfig.name })).toBeInTheDocument();

    const githubButton = screen.getByRole('button', { name: 'GitHub' });
    expect(githubButton).toBeInTheDocument();
    expect(githubButton.querySelector('svg')).not.toBeNull();

    const linkedInButton = screen.getByRole('button', { name: 'LinkedIn' });
    expect(linkedInButton).toBeInTheDocument();
    expect(linkedInButton.querySelector('svg')).not.toBeNull();

    const emailButton = screen.getByRole('button', { name: 'Email' });
    expect(emailButton).toBeInTheDocument();
    expect(emailButton.querySelector('svg')).not.toBeNull();

    expect(screen.queryByRole('button', { name: 'Docs' })).not.toBeInTheDocument();
  });

  it('does not expose the removed docs routes', () => {
    window.history.pushState({}, '', '/docs');
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
    expect(screen.queryByText(/docs/i)).not.toBeInTheDocument();
  });

  it('toggles between light and dark mode', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    const toggleButton = screen.getByRole('button', { name: 'Switch to dark mode' });
    expect(toggleButton.querySelector('svg')).not.toBeNull();

    fireEvent.click(toggleButton);

    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();
    expect(window.localStorage.getItem('site-theme')).toBe('dark');
  });
});
