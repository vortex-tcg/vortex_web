import { useState } from "react";
import { MdError } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordChecks = {
    length: formData.password.length >= 8,
    upper: /[A-Z]/.test(formData.password),
    lower: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.passwordConfirmation) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Adresse email invalide.");
      return;
    }

    if (formData.password !== formData.passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const allValid = Object.values(passwordChecks).every(Boolean);
    if (!allValid) {
      setError("Le mot de passe ne respecte pas tous les critères.");
      return;
    }

    console.log("Données du formulaire :", formData);
    setError("");
  };

  const renderCheck = (label, isValid) => (
    <li className={`flex items-center gap-2 ${isValid ? "text-green-600" : "text-red-500"}`}>
      {isValid ? (
        <span className="material-symbols-outlined text-green-600"><MdCheckCircle /></span>
      ) : (
        <span className="material-symbols-outlined text-red-500"><MdError /></span>
      )}
      {label}
    </li>
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-4 border border-base-300 rounded-lg p-4"
      >
        <div className="w-full justify-center flex my-6">
          <p className="text-4xl font-extrabold">INSCRIPTION</p>
        </div>

        <fieldset className="fieldset mb-4">
          <div className="flex items-center">
            <legend className="fieldset-legend">Nom d'utilisateur</legend>
            <p className="text-red-500 font-bold ml-1">*</p>
          </div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Entrez votre nom d'utilisateur"
            required
            className="input input-bordered w-full"
          />
        </fieldset>

        <fieldset className="fieldset mb-4">
          <div className="flex items-center">
            <legend className="fieldset-legend">Email</legend>
            <p className="text-red-500 font-bold ml-1">*</p>
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Entrez votre adresse email"
            required
            className="input input-bordered w-full"
          />
        </fieldset>

        <fieldset className="fieldset mb-4">
          <div className="flex items-center">
            <legend className="fieldset-legend">Mot de passe</legend>
            <p className="text-red-500 font-bold ml-1">*</p>
          </div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Entrez un mot de passe"
            required
            className="input input-bordered w-full"
          />

          {/* Indications dynamiques */}
          {formData.password && (
            <ul className="mt-2 ml-2 text-sm space-y-1">
              {renderCheck("Au moins 8 caractères", passwordChecks.length)}
              {renderCheck("Une majuscule", passwordChecks.upper)}
              {renderCheck("Une minuscule", passwordChecks.lower)}
              {renderCheck("Un chiffre", passwordChecks.number)}
              {renderCheck("Un caractère spécial", passwordChecks.special)}
            </ul>
          )}
        </fieldset>

        <fieldset className="fieldset mb-4">
          <div className="flex items-center">
            <legend className="fieldset-legend">Confirmation du mot de passe</legend>
            <p className="text-red-500 font-bold ml-1">*</p>
          </div>
          <input
            type="password"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            placeholder="Confirmez le mot de passe"
            required
            className="input input-bordered w-full"
          />
        </fieldset>

        <button type="submit" className="btn btn-primary w-full mt-4">
          S'inscrire
        </button>
      </form>

      {error && (
        <div role="alert" className="alert alert-warning my-4 max-w-md mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </>
  );
}
