import React from 'react';

export default function Header() {
  return (
    <header className="border-b border-neutral-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
          Photo Gallery
        </h1>
        <p className="text-base text-neutral-500 mt-2">
          Discover beautiful moments.
        </p>
      </div>
    </header>
  );
}
