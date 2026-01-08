import React from 'react';
import { User, LogOut } from 'lucide-react';

export default function Profile({ user, onLogout }) {
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto flex items-center gap-6">
        <div className="bg-slate-200 p-6 rounded-full text-slate-500">
          <User size={48} />
        </div>
        <div className="flex-grow">
          <h2 className="text-3xl font-bold text-slate-800">Bonjour, {user.firstname}</h2>
          <p className="text-slate-500">{user.email}</p>
        </div>
        <button onClick={onLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 flex items-center gap-2">
          <LogOut size={18}/> Déconnexion
        </button>
      </div>
    </div>
  );
}
