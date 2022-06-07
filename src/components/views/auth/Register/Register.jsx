import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { useResize } from "../../../../hoooks/useResize";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const Register = () => {
  const [data, setData] = useState({});
  const { isPhone } = useResize();

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}auth/data`)
      .then((response) => {
        setData(response.data.result);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "Error interno en el servidor",
          icon: "error",
          confirmButtonText: "Volver",
        });
      });
  }, []);

  const navigate = useNavigate();

  const initialValues = {
    userName: "",
    password: "",
    email: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
    switch: false,
  };

  const required = "* Campo obligatorio";

  const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string()
        .min(6, "* Debe tener como mínimo 6 caracteres")
        .required(required),
      password: Yup.string().required(required),
      email: Yup.string()
        .email("* Debe ser un email válido")
        .required(required),
      role: Yup.string().required(required),
      continent: Yup.string().required(required),
      region: Yup.string().required(required),
    });

  const handleChangeContinent = (value) => {
    setFieldValue("continent", value);
    if (value !== "America") setFieldValue("region", "Otro");
  };

  const onSubmit = () => {
    const teamID = !values.teamID ? uuidv4() : values.teamID;

    axios
      .post(`${API_ENDPOINT}auth/register`, {
        user: {
          userName: values.userName,
          password: values.password,
          email: values.email,
          teamID,
          role: values.role,
          continent: values.continent,
          region: values.region,
        },
      })
      .then((response) => {
        let teamID = response.data.result.user.teamID;
        navigate("/registered/" + teamID, {
          replace: true,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "Error al registrarse. " + error.message,
          icon: "error",
          confirmButtonText: "Volver",
        });
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = formik;

  return (
    <div className={!isPhone && "bg-light"}>
      <div className="row m-3 vh-100 row justify-content-center align-items-center">
        <form className={!isPhone && "col-4 bg-white  border border-1 shadow-sm rounded p-4"} onSubmit={handleSubmit}>
          <h2>Registro</h2>
          <div className="mb-2">
            <label htmlFor="userName" className="form-label mb-0">
              Nombre de usuario
            </label>
            <input
              type="text"
              className={
                errors.userName && touched.userName
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="userName"
              onChange={handleChange}
              value={values.userName}
              onBlur={handleBlur}
            />
            {touched.userName && errors.userName ? (
              <div className="invalid-feedback">{errors.userName}</div>
            ) : null}
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label mb-0">
              Contraseña
            </label>
            <input
              type="password"
              className={
                errors.password && touched.password
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
            />
            {touched.password && errors.password ? (
              <div className="invalid-feedback">{errors.password}</div>
            ) : null}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label mb-0">
              Email
            </label>
            <input
              type="email"
              className={
                errors.email && touched.email
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
            />
            {touched.email && errors.email ? (
              <div className="invalid-feedback">{errors.email}</div>
            ) : null}
          </div>
          <div className="form-check form-switch mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchTeamId"
              value={values.switch}
              onChange={() =>
                formik.setFieldValue("switch", !formik.values.switch)
              }
            />
            <label className="form-check-label" htmlFor="switchTeamId">
              Perteneces a un equipo ya creado
            </label>
          </div>
          {values.switch && (
            <div className="mb-2">
              <label htmlFor="teamID" className="form-label mb-0">
                Por favor, introduce el identificador de equipo
              </label>
              <input
                type="text"
                className="form-control"
                id="teamID"
                value={values.teamID}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          )}
          <div className="mb-2">
            <label htmlFor="role" className="form-label mb-0">
              Rol
            </label>
            <select
              className={
                errors.role && touched.role
                  ? "form-select is-invalid"
                  : "form-select"
              }
              id="role"
              onChange={handleChange}
              value={values.role}
              onBlur={handleBlur}
            >
              <option value="">Seleccionar rol...</option>
              {data?.Rol?.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
            {touched.role && errors.role ? (
              <div className="invalid-feedback">{errors.role}</div>
            ) : null}
          </div>
          <div className="mb-2">
            <label htmlFor="continent" className="form-label mb-0">
              Continente
            </label>
            <select
              className={
                errors.continent && touched.continent
                  ? "form-select is-invalid"
                  : "form-select"
              }
              id="continent"
              onChange={(event) =>
                handleChangeContinent(event.currentTarget.value)
              }
              value={values.continent}
              onBlur={handleBlur}
            >
              <option value="">Seleccionar continente...</option>
              {data?.continente?.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
            {touched.continent && errors.continent ? (
              <div className="invalid-feedback">{errors.continent}</div>
            ) : null}
          </div>
          {values.continent === "America" && (
            <div className="mb-2">
              <label htmlFor="region" className="form-label mb-0">
                Región
              </label>
              <select
                className={
                  errors.region && touched.region
                    ? "form-select is-invalid"
                    : "form-select"
                }
                id="region"
                onChange={handleChange}
                value={values.region}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar región...</option>
                {data?.region?.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
              {touched.region && errors.region ? (
                <div className="invalid-feedback">{errors.region}</div>
              ) : null}
            </div>
          )}
          <div className="d-grid gap-2 mb-2">
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </div>
          <div>
            <Link to="/login">Ir a iniciar sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
