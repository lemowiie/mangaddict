import React from 'react';
import { Mail } from 'lucide-react';

export default function Footer({ setView }) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
      <div className="container mx-auto grid md:grid-cols-3 gap-8 px-4">
        <div>
          <h3 className="text-white font-bold text-lg mb-4">MangaAddict</h3>
          <p className="text-sm">Votre destination numéro 1 pour l'achat de mangas en ligne.</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">Légal</h3>
          <button onClick={() => setView('mentions')} className="block hover:text-white">Mentions Légales</button>
          <button onClick={() => setView('cgu')} className="block hover:text-white">CGU / CGV</button>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">Contact</h3>
          <p className="flex items-center gap-2"><Mail size={16}/> contact@mangaaddict.fr</p>
        </div>
      </div>
    </footer>
  );
}
