import React from 'react';
import './App.css';
import EVChooserLanding from './components/EVChooserLanding';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <header className="bg-green-700 text-white p-4">
        <h1 className="text-2xl font-bold">Electric Car Comparison</h1>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="w-96 h-96 bg-green-300 shadow-lg rounded-full text-center hover:cursor-pointer hover:ring-4 ring-green-500 flex items-center justify-center transition-all">
          <EVChooserLanding />
        </div>
      </main>

      <footer className="bg-green-700 text-white text-center p-4">
        <p>© 2025 EV Chooser. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
