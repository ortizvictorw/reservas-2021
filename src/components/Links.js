import React, { useEffect, useState } from "react";
import LinksForm from "./LinksForm";

import { db } from "../firebase";
import { toast } from "react-toastify";

const Links = () => {
  const [reservas, setReservas] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getReservas = async () => {
    db.collection("Reservas").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setReservas(docs);
    });
  };

  useEffect(() => {
    getReservas();
  }, []);

  const addReserva = async (linkObject) => {
    try {
      if (
        linkObject.turno === "Seleccione turno" ||
        linkObject.dia === "Seleccione dia" ||
        linkObject.turno === "" ||
        linkObject.dia === ""
      ) {
        toast("Debe llenar todos los campos", {
          type: "warning",
        });
      } else {
        if (
          linkObject.turno === "Primer Turno" &&
          linkObject.dia === "Domingo"
        ) {
          await db.collection("Reservas-domingo-primera").doc().set(linkObject);
          toast("Nueva reserva guardada para el dia Domingo primer turno", {
            type: "success",
          });
        } else if (
          linkObject.turno === "Segundo Turno" &&
          linkObject.dia === "Domingo"
        ) {
          await db.collection("Reservas-domingo-segunda").doc().set(linkObject);
          toast("Nueva reserva guardada para el dia Domingo segundo turno", {
            type: "success",
          });
        } else if (
          linkObject.turno === "Primer Turno" &&
          linkObject.dia === "Sabado"
        ) {
          await db.collection("Reservas-sabado-primera").doc().set(linkObject);
          toast("Nueva reserva guardada para el dia Sabado primer turno", {
            type: "success",
          });
        } else if (
          linkObject.turno === "Segundo Turno" &&
          linkObject.dia === "Sabado"
        ) {
          await db.collection("Reservas-sabado-segunda").doc().set(linkObject);
          toast("Nueva reserva guardada para el dia Sabado segundo turno", {
            type: "success",
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="col-md-4 p-2">
        <LinksForm {...{ addReserva, currentId, reservas }} />
      </div>
    </>
  );
};

export default Links;
