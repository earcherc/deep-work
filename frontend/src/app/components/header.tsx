import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const navigation = [
  { name: 'Product', href: '/' },
  { name: 'Blog', href: '/blog' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="relative flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:flex-1 lg:ml-52 lg:justify-center lg:items-center">
          <div className="flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold leading-6 transition-colors ${
                  pathname === item.href ? 'text-black font-bold' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        {/* Register and login buttons (visible on all screen sizes) */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link
            href="/login"
            className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Register
          </Link>
        </div>
      </nav>
      {/* Mobile menu */}
      <div className={`lg:hidden ${isMenuOpen ? '' : 'hidden'}`} role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-50"></div>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
