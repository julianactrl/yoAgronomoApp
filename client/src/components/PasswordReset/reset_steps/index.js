import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import strings from "./strings";
import errosManager from "./passCheck";

const Reset_steps = ({ handleSubmit, step, loading, buttonRef }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState([]);

  const s = strings;

  const handleInputChange = (e) => {
    const inputManager = e.target.value;
    setInput(inputManager);
    if (step === 3) {
      setError(errosManager(inputManager));
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    error.length === 0 && handleSubmit(input, step);
    setInput("");
  };

  const handleInputType = () => {
    switch (step) {
      case 1:
        return "email";
      case 2:
        return "number";
      case 3:
        return "password";
      default:
        return "";
    }
  };

  return (
    <div className="container-md">
      <div className="mb-3">
        <h3 className="">Cambio de contraseña</h3>
        <p className="">{s.description[step]}</p>
      </div>
      <form onSubmit={formSubmit} className="">
        <div className="form-group">
          <label className="form-label" for="email">
            {s.label[step]}
          </label>
          <input
            className="form-control"
            id="email"
            type={handleInputType()}
            value={input}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <button ref={buttonRef} type="submit"  className="btn btn-success text-dark">
          {loading ? (
            <div className="spinner-border text-dark" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            s.button[step]
          )}
        </button>
        <hr />
        <Link to="/index/register">
          <h4 className="text-dark">Registrate!</h4>
        </Link>
        <Link to="/index">
          <h4 className="text-dark">Inicia Sesión</h4>
        </Link>
      </form>
    </div>
  );
};

export default Reset_steps;
