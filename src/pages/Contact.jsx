import React from 'react';

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Contactez-nous</h2>
      <form className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <input type="text" placeholder="Votre nom" className="w-full border p-3 rounded-lg" />
        <textarea rows="4" placeholder="Votre message" className="w-full border p-3 rounded-lg"></textarea>
        <button className="w-full bg-red-600 text-white font-bold py-3 rounded-lg">Envoyer</button>
      </form>
    </div>
  );
}
