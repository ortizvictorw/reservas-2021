import React, { useState, useEffect } from "react";
import { firebase, googleAuthProvider, db } from "../firebase";
import { BrowserRouter, useHistory } from "react-router-dom";

const LinksForm = (props) => {
  let history = useHistory();

  const initialStateValues = {
    name: "",
    cupos: "",
    turno: "",
    dia: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const [cupos, setcupos] = useState({
    cupos: "",
  });

  const [reservas, setReservas] = useState({
    reservas: "",
  });

  const [isLoanding, setisLoanding] = useState(true);

  const handleInputChangeEmail = (e) => {
    const { value } = e.target;
    setloginData({ ...loginData, email: value });
  };
  const handleInputChangePassword = (e) => {
    const { value } = e.target;
    setloginData({ ...loginData, password: value });
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    props.addReserva(values);
    setValues({ ...initialStateValues });
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("links").doc(id).get();
    setValues({ ...doc.data() });
    setisLoanding(false);
  };

  useEffect(() => {
    db.collection("Cupos")
      .doc("3OVF98CbYiNAcSbd0tSq")
      .get()
      .then((res) => {
        setcupos({ ...res.data() });
        setisLoanding(false);
      });
    const cityRef = db.collection("Reservas").doc("SF");

    cityRef.get().then((res) => {
      setReservas({ ...res.data() });
      setisLoanding(false);
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        if (user.providerData[0].email === "iepuebloelegido@gmail.com") {
          history.push("/user");
        } else {
          console.log("no es el pastor");
        }
      });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getLinkById(props.currentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId]);

  return (
    <>
      <form onSubmit={handleSubmit} className="card card-body border-primary">
        <div className="form-group input-group">
          <div className="input-group-text bg-light">
            <i className="material-icons">account_circle</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Familia..."
            value={values.name}
            name="name"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            rows="3"
            className="form-control"
            placeholder="Cantidad de cupos"
            name="cupos"
            required
            value={values.cupos}
            type="number"
            min={0}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <select
            rows="3"
            className="form-control"
            placeholder="dia"
            required
            value={values.dia}
            onChange={handleInputChange}
            name="dia"
          >
            <option>Selecione dia</option>
            <option>Sabado</option>
            <option>Domingo</option>
          </select>
        </div>
        <div className="form-group">
          <select
            required
            rows="3"
            className="form-control"
            placeholder="Turno"
            value={values.turno}
            onChange={handleInputChange}
            name="turno"
          >
            <option>Selecione turno</option>
            <option>Primer Turno</option>
            <option>Segundo Turno</option>
          </select>
        </div>

        <button className="btn btn-primary btn-block">Reservar</button>
      </form>

      <button className="btn btn-success btn-block mt-1" onClick={handleLogin}>
        Login
      </button>

      <div className="card-body">
        {isLoanding ? (
          <h4>Cupos</h4>
        ) : (
          <>
            <h4>Cupos Totales {cupos.cupos}</h4>
          </>
        )}
      </div>
    </>
  );
};

export default LinksForm;
