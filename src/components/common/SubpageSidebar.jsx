import { NavLink } from 'react-router-dom';
import { getSection } from '../../data/navigation';

const SubpageSidebar = ({ sectionPath }) => {
  const section = getSection(sectionPath);

  if (!section?.children) return null;

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
        <div className="bg-primary-50 px-5 py-4 border-b border-primary-100">
          <h3 className="font-bold text-primary">{section.name}</h3>
        </div>
        <nav className="p-2">
          {section.children.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              end={false}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white font-medium'
                    : 'text-gray-600 hover:bg-primary-50 hover:text-primary'
                }`
              }
            >
              {child.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default SubpageSidebar;
