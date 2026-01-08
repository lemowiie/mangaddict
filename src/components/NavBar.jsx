import React from 'react';
import { Book, User, LogOut } from 'lucide-react';

export default function Navbar({ setView, user, onLogout }) {
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 
          className="text-2xl font-bold text-red-500 cursor-pointer flex items-center gap-2"
          onClick={() => setView('home')}
        >
          <Book className="w-8 h-8" /> MangaAddict
        </h1>
        <div className="hidden md:flex gap-6 items-center">
          <button onClick={() => setView('home')} className="hover:text-red-400 transition">Accueil</button>
          <button onClick={() => setView('mangas')} className="hover:text-red-400 transition">Catalogue</button>
          <button onClick={() => setView('contact')} className="hover:text-red-400 transition">Contact</button>
          
          {user ? (
            <>
              <button onClick={() => setView('profile')} className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full hover:bg-slate-700 transition">
                <User size={18} /> {user.firstname}
              </button>
              <button onClick={onLogout} className="text-red-500 hover:text-red-400"><LogOut size={20}/></button>
            </>
          ) : (
            <button 
              onClick={() => setView('login')}
              className="bg-red-600 px-4 py-2 rounded font-bold hover:bg-red-700 transition"
            >
              Connexion
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}