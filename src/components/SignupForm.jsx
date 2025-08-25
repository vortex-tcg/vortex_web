import { useState } from "react";
import { MdError, MdCheckCircle } from "react-icons/md";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordChecks = {
    length: formData.password.length >= 8,
    upper: /[A-Z]/.test(formData.password),
    lower: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
  };

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.passwordConfirmation
    ) {
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

    try {
      const response = await fetch(`${API_URL}/api/auth/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erreur lors de l'inscription.");
      } else {
        setSuccess(data.message || "Inscription réussie ✅");
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        });
      }
    } catch {
      setError("Impossible de contacter le serveur.");
    }
  };

  const renderCheck = (label, isValid) => (
    <li className={`flex items-center gap-2 ${isValid ? "text-green-600" : "text-red-500"}`}>
      {isValid ? <MdCheckCircle /> : <MdError />}
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

        {/* Prénom */}
        <fieldset className="fieldset mb-4">
          <div className="flex items-center">
            <legend className="fieldset-legend">Prénom</legend>
            <p className="text-red-500 font-bold ml-1">*</p>
          </div>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Entrez votre prénom"
            required
            className="input input-bordered w-full"
          />
        </fieldset>

        {/* Nom */}
        <fieldset className="fieldset mb-4">
          <div className="flex items-center">
            <legend className="fieldset-legend">Nom</legend>
            <p className="text-red-500 font-bold ml-1">*</p>
          </div>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Entrez votre nom"
            required
            className="input input-bordered w-full"
          />
        </fieldset>

        {/* Nom d'utilisateur */}
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

        {/* Email */}
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

        {/* Mot de passe */}
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

        {/* Confirmation */}
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

      {/* Messages */}
      {error && (
        <div role="alert" className="alert alert-warning my-4 max-w-md mx-auto">
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div role="alert" className="alert alert-success my-4 max-w-md mx-auto">
          <span>{success}</span>
        </div>
      )}
    </>
  );
}
