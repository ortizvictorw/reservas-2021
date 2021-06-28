import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

import { BrowserRouter as Router, useHistory } from "react-router-dom";

export const User = () => {
  let history = useHistory();
  const handleLogout = async (e) => {
    e.preventDefault();
    history.push("/");
  };
  const initialStateValues = {
    fecha: "",
    turno: "",
    cuposTotales: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  const onDeleteReservaS1 = async () => {
    if (window.confirm("Estas seguro que quieres limpiar las listas?")) {
      await db.collection("Reservas-sabado-primera").doc().delete();
      toast("Link Removed Successfully", {
        type: "error",
        autoClose: 2000,
      });
    }
  };
  const onDeleteReservaS2 = async (id) => {
    if (window.confirm("Estas seguro que quieres limpiar las listas?")) {
      await db.collection("Reservas-sabado-segunda").doc("DC").delete();

      toast("Link Removed Successfully", {
        type: "error",
        autoClose: 2000,
      });
    }
  };
  const onDeleteReservaD1 = async (id) => {
    if (window.confirm("Estas seguro que quieres limpiar las listas?")) {
      await db.collection("Reservas-domingo-primera").doc("DC").delete();

      toast("Link Removed Successfully", {
        type: "error",
        autoClose: 2000,
      });
    }
  };
  const onDeleteReservaD2 = async (id) => {
    if (window.confirm("Estas seguro que quieres limpiar las listas?")) {
      await db.collection("Reservas-domingo-segunda").doc("DC").delete();
      toast("Link Removed Successfully", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container p-4">
      <h1>Panel de Administrador</h1>
      <div className="row">
        <button
          className="btn btn-primary btn-block"
          onClick={onDeleteReservaS1}
        >
          Limpiar Listas Sabado primera
        </button>
        <button
          className="btn btn-primary btn-block"
          onClick={onDeleteReservaS2}
        >
          Limpiar Listas Sabado segunda
        </button>
        <button
          className="btn btn-primary btn-block"
          onClick={onDeleteReservaD1}
        >
          Limpiar Listas Domingo primera
        </button>
        <button
          className="btn btn-primary btn-block"
          onClick={onDeleteReservaD2}
        >
          Limpiar Listas Domingo segunda
        </button>
      </div>
      <button className="btn btn-success  mt-1" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
