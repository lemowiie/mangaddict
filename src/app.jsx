import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MangaCrud from './pages/MangaCrud';
import Contact from './pages/Contact';

export default function App() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null); // null = pas connecté

  // Fonction de simulation de login
  const handleLogin = (email) => {
    setUser({ 
      id: 1, 
      email: email, 
      firstname: "lucy", 
      lastname: "sasha", 
      role: "admin" 
    });
    setView('profile');
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Navbar view={view} setView={setView} user={user} onLogout={handleLogout} />

      <main className="flex-grow">
        {view === 'home' && <Home setView={setView} />}
        {view === 'login' && <Login onLogin={handleLogin} setView={setView} />}
        {view === 'profile' && <Profile user={user} onLogout={handleLogout} />}
        {view === 'mangas' && <MangaCrud />}
        {view === 'contact' && <Contact />}
      </main>

      <Footer setView={setView} />
    </div>
  );
}
