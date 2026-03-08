import { render, screen } from '@testing-library/react';
import App from './App';
import { siteConfig } from './siteConfig';

describe('App', () => {
  afterEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('renders profile heading and action buttons on home route', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    expect(screen.getByRole('heading', { name: siteConfig.name })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'GitHub' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'LinkedIn' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'yxgui' })).toBeInTheDocument();
  });

  it('renders component docs route', () => {
    window.history.pushState({}, '', '/docs/components/button');
    render(<App />);

    expect(screen.getByText('Component docs')).toBeInTheDocument();
    expect(screen.getByText('Live playground')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'yxgui GitHub' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Button' })).toBeInTheDocument();
  });

  it('renders newly added component docs pages', () => {
    window.history.pushState({}, '', '/docs/components/accordion');
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Accordion' })).toBeInTheDocument();
    expect(screen.getByText('Reference page')).toBeInTheDocument();
  });
});
