"use client"
// pages/404.js
import Link from 'next/link';
import { useState } from 'react';

// Search Bar Component
const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', query);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="border rounded-l-md p-2"
      />
      <button type="submit" className="bg-blue-500 text-white rounded-r-md p-2">
        Search
      </button>
    </form>
  );
};

// Breadcrumb Component
const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex space-x-2 mb-4">
      {items.map((item, index) => (
        <span key={index}>
          <Link href={item.href} className="text-blue-500 hover:underline">
            {item.label}
          </Link>
          {index < items.length - 1 && <span> &gt; </span>}
        </span>
      ))}
    </nav>
  );
};

// Custom 404 Page Component
export default function Custom404() {
  const breadcrumbItems = [
    { href: '/', label: 'Home' },
    { href: '/404', label: '404 - Page Not Found' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" passHref>
            <div className="text-xl font-semibold flex items-center cursor-pointer">
              Nexus
            </div>
          </Link>
          <SearchBar />
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex flex-col justify-center items-center text-center">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-4xl font-bold mb-4">Oops! 404 - PAGE NOT FOUND</h1>
        <p className="text-gray-700 mb-6">The page you are looking for does not exist.</p>
        <Link href="/" passHref>
          <div className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200 cursor-pointer">
            GO TO HOMEPAGE
          </div>
        </Link>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 mt-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-4">
            <Link href="/" passHref>
              <div className="text-lg font-semibold flex items-center cursor-pointer">
                Nexus
              </div>
            </Link>
          </div>
          <ul className="flex justify-center space-x-4 mb-4">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li>
              <Link href="https://www.linkedin.com/in/muhammad-bilal-a21084244" passHref>
                Contact: Muhammad Bilal
              </Link>
            </li>
          </ul>
          <ul className="flex justify-center space-x-4 mb-4">
            <li>
              <Link href="https://discord.gg/rgGYfeYW3N" passHref>
                Discord
              </Link>
            </li>
            <li>
              <Link href="https://www.facebook.com/mirotalk" passHref>
                Facebook
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/watch?v=_IVn2aINYww" passHref>
                YouTube
              </Link>
            </li>
            <li>
              <Link href="mailto:miroslav.pejic.85@gmail.com" passHref>
                Google
              </Link>
            </li>
          </ul>
          <p className="text-gray-500">&copy; 2024 Nexus, all rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
