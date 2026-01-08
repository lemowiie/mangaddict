import React from 'react';

export default function Login({ onLogin, setView }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    onLogin(email);
  };

  return (
    <div className="flex justify-center items-center py-20 px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-red-500">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="email" type="email" placeholder="Email" className="w-full border p-3 rounded-lg" required />
          <input name="password" type="password" placeholder="Mot de passe" className="w-full border p-3 rounded-lg" required />
          <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold">Se connecter</button>
        </form>
        <button onClick={() => setView('register')} className="block mt-4 text-center text-red-600 text-sm">Pas de compte ? Créer un compte</button>
      </div>
    </div>
  );
}
