import { useState } from 'react';
import { NavLink, Link } from 'react-router';
import useFetch from '../../hooks/useFetch';
import { MenuOpen, MenuClose, User } from '../ui/Icons';
import Button from '../ui/Button';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch menu items from the API
  const { data: menuData, loading, error } = useFetch('/api/menus');

  // Safely get menus from response (assuming it might be wrapped in an array or data object)
  const menus = Array.isArray(menuData) ? menuData : menuData?.data || [];

  // Sort or filter if needed based on isActive/order if the API doesn't do it
  const activeMenus = menus
    .filter((menu) => menu.isActive !== false) // Default to true if undefined
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-100 w-full bg-black/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img src="/aha-logo.svg" alt="Aha Logo" className="h-8 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex ml-10 space-x-8">
              {loading && <span className="text-neutral-500 text-sm">Loading menu...</span>}
              {error && <span className="text-red-500 text-sm">Error loading menu</span>}
              {!loading && !error && activeMenus.map((item) => (
                <NavLink
                  key={item._id || item.slug}
                  to={item.slug === 'home' ? '/' : `/${item.slug}`}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-neutral-300'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right side actions (search, sign in) */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="!rounded-full px-6 py-2 bg-gradient-to-t from-[oklch(55%_0.22_44.5)] to-[oklch(67.5%_0.22_44.5)] text-white hover:opacity-90 border-0 shadow-md">
              Subscribe Now
            </Button>
            <Button variant="ghost" className="text-neutral-300 hover:text-white !rounded-full px-5 py-2 flex items-center gap-2">
              <User size={18} />
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-neutral-300 hover:text-white focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <MenuClose size={28} /> : <MenuOpen size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-900 border-b border-neutral-800">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {loading && <div className="px-3 py-2 text-neutral-500">Loading menu...</div>}
            {error && <div className="px-3 py-2 text-red-500">Error loading menu</div>}
            {!loading && !error && activeMenus.map((item) => (
              <NavLink
                key={item._id || item.slug}
                to={item.slug === 'home' ? '/' : `/${item.slug}`}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive
                    ? 'bg-neutral-800 text-primary'
                    : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="mt-4 pt-4 border-t border-neutral-800 grid gap-2 px-3">
              <Button variant="secondary" className="w-full justify-center !rounded-full py-3 flex items-center gap-2">
                <User size={18} />
                Sign In
              </Button>
              <Button className="w-full justify-center !rounded-full py-3 bg-gradient-to-t from-[oklch(55%_0.22_44.5)] to-[oklch(67.5%_0.22_44.5)] text-white hover:opacity-90 border-0 shadow-md">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
