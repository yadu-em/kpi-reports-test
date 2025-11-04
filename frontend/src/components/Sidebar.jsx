import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const REPORTS = [
  { id: 'sales-performance', name: 'Sales Performance', path: '/report/sales-performance' },
];

function Sidebar() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
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
                  className={`report-link ${
                    isActive(report.path) ? 'active' : ''
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {report.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {isMobileOpen && (
        <div className="sidebar-overlay" onClick={toggleMobileMenu}></div>
      )}
    </>
  );
}

export default Sidebar;

