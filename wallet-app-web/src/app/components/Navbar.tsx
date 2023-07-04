// components/Navbar.js

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-primary">
      <div className="container mx-auto px-4 py-2 text-white text-center align-middle">
        <ul className="flex justify-between">
          <li>
            <Link href="/" className="text-2xl font-bold">
              Wallet App
            </Link>
          </li>
          <li className="flex ml-6">
            <Link href="/">Home</Link>
          </li>
          <li className="flex ml-6">
            <Link href="/balance">Balances</Link>
          </li>
          <li className="flex ml-6">
            <Link href="/about">About</Link>
          </li>
          {/* to the right login or logout */}
          <li className="ml-auto">
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
