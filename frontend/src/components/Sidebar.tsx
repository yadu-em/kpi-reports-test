import { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { REPORTS } from '@/constants/reports';
import './Sidebar.css';

const Sidebar = (): JSX.Element => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const isActive = useCallback(
    (path: string): boolean => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  const toggleMobileMenu = useCallback((): void => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const handleLinkClick = useCallback((): void => {
    setIsMobileOpen(false);
  }, []);

  return (
    <>
      <button
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
        type="button"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>KPI Reports</h2>
        </div>
        <nav className="sidebar-nav">
          <ul className="reports-list">
            {REPORTS.map((report) => (
              <li key={report.id}>
                <Link
                  to={report.path}
                  className={`report-link ${isActive(report.path) ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  {report.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {isMobileOpen && (
        <div className="sidebar-overlay" onClick={toggleMobileMenu} aria-hidden="true"></div>
      )}
    </>
  );
};

export default Sidebar;

