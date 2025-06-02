import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  title?: string;
  links?: { text: string; link: string }[];
  active?: string;
  buttons?: React.ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title = "Dashboard", links = [], active = "", buttons }) => {
  return (
    <div className="flex items-center justify-between page-header-breadcrumb flex-wrap gap-2 mb-1 p-1">
      <div>
        <h1 className="page-title font-large text-lg mt-0 p-2 mb-1">{title}</h1>
        <nav>
          <ol className="flex items-center whitespace-nowrap min-w-0">
            <li className="text-sm">
              <Link className="flex items-center text-primary hover:text-primary dark:text-primary" to="/user">
                <span className="bi bi-house-door"></span>
                <span className="px-3">Home</span>
                <span className="bi bi-chevron-right px-2 pl-0"></span>
              </Link>
            </li>
            {links.map((link, index) => (
              <li key={index} className="text-sm">
                <Link className="flex items-center text-primary hover:text-primary dark:text-primary" to={link.link}>
                  {link.text}
                  <span className="bi bi-chevron-right px-3"></span>
                </Link>
              </li>
            ))}
            {active && (
              <li className="text-sm">
                <Link className="flex items-center text-gray-500 dark:text-[#8c9097] dark:text-white/50 hover:text-primary" to="#">
                  {active}
                </Link>
              </li>
            )}
          </ol>
        </nav>
      </div>
      {buttons && <div className="btn-list">{buttons}</div>}
    </div>
  );
};

export default Breadcrumb;