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

    const docsButton = screen.getByRole('button', { name: 'Docs' });
    expect(docsButton).toBeInTheDocument();
    expect(docsButton.querySelector('svg')).not.toBeNull();
  });

  it('renders component docs route', () => {
    window.history.pushState({}, '', '/docs/components/button');
    render(<App />);

    expect(screen.getByText('Component docs')).toBeInTheDocument();
    expect(screen.getByText('Primary action')).toBeInTheDocument();
    const githubButton = screen.getByRole('button', { name: 'GitHub' });
    expect(githubButton).toBeInTheDocument();
    expect(githubButton.querySelector('svg')).not.toBeNull();
    expect(screen.getByRole('heading', { name: 'Button' })).toBeInTheDocument();
  });

  it('renders newly added component docs pages', () => {
    window.history.pushState({}, '', '/docs/components/accordion');
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Accordion' })).toBeInTheDocument();
    expect(screen.getByText('Basic usage')).toBeInTheDocument();
  });

  it('filters docs navigation components with search input', () => {
    window.history.pushState({}, '', '/docs');
    render(<App />);

    const searchInput = screen.getByRole('textbox', { name: 'Search components' });
    fireEvent.change(searchInput, { target: { value: 'but' } });

    expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Input' })).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'zzz' } });
    expect(screen.getByText(/No components match:/)).toBeInTheDocument();
    expect(screen.getByText('zzz')).toBeInTheDocument();
  });

  it('toggles between light and dark mode', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    const toggleButton = screen.getByRole('button', { name: 'Switch to dark mode' });
    expect(toggleButton).toHaveTextContent('Dark mode');

    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveTextContent('Light mode');
    expect(window.localStorage.getItem('site-theme')).toBe('dark');
  });
});
