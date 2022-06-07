import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useResize } from "../../../../hoooks/useResize";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const Login = () => {
  const navigate = useNavigate();
  const { isPhone } = useResize();

  const initialValues = {
    userName: "",
    password: "",
  };

  const required = "* El campo es requerido";

  const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string()
        .min(6, "* El nombre de usuario debe tener como mínimo 6 caracteres")
        .required(required),
      password: Yup.string().required(required),
    });

  const onSubmit = (values) => {
    const { userName, password } = values;

    axios
      .post(`${API_ENDPOINT}auth/login`, {
        userName,
        password,
      })
      .then((response) => {
        let data = response.data;
        if (data.status_code === 200) {
          localStorage.setItem("token", data.result.token);
          localStorage.setItem("userName", data.result.user.userName);
          navigate("/", { replace: true });
        }
      })
      .catch(function (error) {
        Swal.fire({
          title: "Error!",
          text: "Credenciales inválidas",
          icon: "error",
          confirmButtonText: "Volver",
        });
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    formik;

  return (
    <div className={!isPhone && "bg-light"}>
      <div className="row m-3 vh-100 row justify-content-center align-items-center">
        <form className={!isPhone && "col-4 bg-white  border border-1 shadow-sm rounded p-4"} onSubmit={handleSubmit}>
          <h2>Iniciar sesión</h2>
          <div className="mb-1">
            <label htmlFor="userName" className="form-label">
              Nombre de usuario
            </label>
            <input
              type="text"
              className={
                errors.userName && touched.userName
                  ? "form-control  is-invalid"
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
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className={
                errors.password && touched.password
                  ? "form-control  is-invalid"
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
          <div className="d-grid gap-2 mb-2">
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </div>
          <div>
            <Link to="/register">Registrarme</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
