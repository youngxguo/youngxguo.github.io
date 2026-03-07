import { NavLink, Outlet } from 'react-router-dom';
import { siteConfig } from '../siteConfig';

const navClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav-link nav-link-active' : 'nav-link';

export function Layout() {
  return (
    <div className="site-shell">
      <header className="hero">
        <img className="avatar" src={siteConfig.picture} alt={siteConfig.name} />
        <p className="eyebrow">Personal Site</p>
        <h1>{siteConfig.name}</h1>
        <p className="bio">{siteConfig.bio}</p>
        <div className="social-row" aria-label="social links">
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={siteConfig.links.email}>Email</a>
        </div>
      </header>

      <nav className="top-nav" aria-label="Main navigation">
        <NavLink className={navClassName} to="/" end>
          Home
        </NavLink>
        <NavLink className={navClassName} to="/about">
          About
        </NavLink>
      </nav>

      <main className="page-body">
        <Outlet />
      </main>

      <footer className="footer">
        {siteConfig.name} © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
