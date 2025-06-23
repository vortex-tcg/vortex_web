import { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirmation) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    console.log("Données du formulaire :", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 mt-10">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Nom d'utilisateur</legend>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Entrez votre nom d'utilisateur"
          required
          className="input input-bordered w-full"
        />
        <p className="label">Obligatoire</p>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Email</legend>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Entrez votre adresse email"
          required
          className="input input-bordered w-full"
        />
        <p className="label">Obligatoire</p>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Mot de passe</legend>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Entrez un mot de passe"
          required
          className="input input-bordered w-full"
        />
        <p className="label">Obligatoire</p>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Confirmation du mot de passe</legend>
        <input
          type="password"
          name="passwordConfirmation"
          value={formData.passwordConfirmation}
          onChange={handleChange}
          placeholder="Confirmez le mot de passe"
          required
          className="input input-bordered w-full"
        />
        <p className="label">Doit être identique au mot de passe</p>
      </fieldset>

      <button
        type="submit"
        className="btn btn-primary w-full"
      >
        S'inscrire
      </button>
    </form>
  );
}
