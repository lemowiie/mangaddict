import React, { useState } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react';

export default function MangaCrud() {
  const [mangas, setMangas] = useState([
    { id: 1, title: "One Piece Vol. 100", price: 6.90, author: "Eiichiro Oda", description: "L'aventure continue !" },
    { id: 2, title: "Naruto Edition Hokage", price: 15.00, author: "Masashi Kishimoto", description: "L'édition ultime." },
  ]);

  const [editingManga, setEditingManga] = useState(null);
  const [formData, setFormData] = useState({ title: '', price: '', author: '', description: '' });

  const handleSave = (e) => {
    e.preventDefault();
    if (editingManga) {
      setMangas(mangas.map(m => m.id === editingManga.id ? { ...m, ...formData, price: parseFloat(formData.price) } : m));
    } else {
      setMangas([...mangas, { id: Date.now(), ...formData, price: parseFloat(formData.price) }]);
    }
    setEditingManga(null);
    setFormData({ title: '', price: '', author: '', description: '' });
  };

  const startEdit = (manga) => {
    setEditingManga(manga);
    setFormData(manga);
  };

  const handleDelete = (id) => {
    if(window.confirm("Supprimer ?")) setMangas(mangas.filter(m => m.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        Catalogue 
        {!editingManga && (
          <button onClick={() => { setEditingManga({}); setFormData({title:'', price:'', author:'', description:''}); }} className="bg-green-600 text-white text-sm px-4 py-2 rounded flex items-center gap-2">
            <Plus size={16}/> Ajouter
          </button>
        )}
      </h2>

      {editingManga && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-slate-200 max-w-2xl space-y-4">
          <input type="text" placeholder="Titre" required className="w-full border p-2 rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <input type="number" step="0.01" placeholder="Prix" required className="w-full border p-2 rounded" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          <input type="text" placeholder="Auteur" required className="w-full border p-2 rounded" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setEditingManga(null)} className="px-4 py-2 text-slate-600">Annuler</button>
            <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded">Enregistrer</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Titre</th>
              <th className="p-4">Prix</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mangas.map(m => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="p-4">{m.title}</td>
                <td className="p-4 text-red-600 font-bold">{m.price.toFixed(2)} €</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => startEdit(m)} className="text-blue-600"><Edit size={18}/></button>
                  <button onClick={() => handleDelete(m.id)} className="text-red-600"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}