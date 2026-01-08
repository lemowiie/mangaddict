import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function Home({ setView }) {


  return (
    <div className="space-y-12">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-20 px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-6">Plongez dans l'univers <span className="text-red-500">Manga</span></h2>
        <button onClick={() => setView('mangas')} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold">
          Voir le catalogue
        </button>
      </div>

      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-slate-800 mb-8 border-l-4 border-red-500 pl-4">Populaires</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(manga => (
            <div key={manga.id} className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
              <h4 className="font-bold text-xl mb-2">{manga.title}</h4>
              <p className="text-slate-500 mb-4">{manga.author}</p>
              <div className="flex justify-between items-center">
                <span className="text-red-600 font-bold">{manga.price.toFixed(2)} €</span>
                <button className="bg-slate-900 text-white p-2 rounded-full"><ShoppingCart size={20}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}