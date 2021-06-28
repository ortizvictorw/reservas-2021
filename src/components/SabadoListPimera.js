import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { firebase, googleAuthProvider, db } from "../firebase";

const SabadoListPimera = () => {
  const [reservas, setReservas] = useState([]);
  const [contador, setContador] = useState(0);
  const [isPastor, setIsPastor] = useState(false);

  const getReservas = async () => {
    await db
      .collection("Reservas-sabado-primera")
      .onSnapshot((querySnapshot) => {
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

  const validation = () => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        if (user.providerData[0].email === "iepuebloelegido@gmail.com") {
          setIsPastor(true);
        } else {
          console.log("no es el pastor");
        }
      });
  };

  const suma = () => {
    const cuposSuma = reservas.map((elem) => Number(elem.cupos));
    let numeros = cuposSuma,
      suma = 0;
    numeros.forEach(function (numero) {
      suma += numero;
    });
    setContador(suma);
  };
  const usuarios = reservas;
  const columns = [
    {
      dataField: "name",
      text: "Familia",
    },
    {
      dataField: "cupos",
      text: "Cupos",
    },
  ];
  return (
    <div className="container">
      <h1>
        Sabado Primera Reunion{" "}
        {contador ? (
          <h2>Cupos Libres {180 - contador}</h2>
        ) : 180 - contador === 0 ? (
          <h2>Reunion Llena</h2>
        ) : (
          ""
        )}
      </h1>
      <br />
      <button className="btn btn-primary" onClick={suma}>
        Ver Cupos
      </button>
      <BootstrapTable id="s1" keyField="id" data={usuarios} columns={columns} />
      <button className="btn btn-primary mr-4" onClick={validation}>
        Obtener Lista
      </button>
      {isPastor ? (
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="btn btn-success"
          table="s1"
          filename="sabado-primera-reunion"
          sheet="tablexls"
          buttonText="Descargar Excel"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SabadoListPimera;
