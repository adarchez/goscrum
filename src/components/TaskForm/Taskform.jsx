import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const Taskform = () => {
  const initialValues = {
    title: "",
    status: "",
    importance: "",
    description: "",
  };

  const onSubmit = () => {
    axios({
      method: "post",
      url: `${API_ENDPOINT}task`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        task: {
          title: values.title,
          importance: values.importance,
          status: values.status,
          description: values.description,
        },
      },
    })
      .then((response) => {
        resetForm();
        toast("Tu tarea se creó con éxito");
      })
      .catch((error) => {
        toast("Error al crear tarea");
      });
  };

  const required = "* El campo es requerido";

  const validationSchema = () =>
    Yup.object().shape({
      title: Yup.string()
        .min(6, "La cantidad mínima de caracteres es 6")
        .required(required),
      status: Yup.string().required(required),
      description: Yup.string().required(required),
      importance: Yup.string().required(required),
    });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    resetForm,
  } = formik;

  return (
    <div className="m-2 row justify-content-center">
      <form className="row" onSubmit={handleSubmit}>
        <h3>Crear tarea</h3>
        <p>Crea tus tareas</p>
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className={
              errors.title && touched.title
                ? "form-control  is-invalid"
                : "form-control"
            }
            id="title"
            placeholder="Título"
            onChange={handleChange}
            value={values.title}
            onBlur={handleBlur}
          />
          {touched.title && errors.title ? (
            <div className="invalid-feedback">{errors.title}</div>
          ) : null}
        </div>
        <div className="col-md-4 mb-2">
          <select
            className={
              errors.status && touched.status
                ? "form-select is-invalid"
                : "form-select"
            }
            id="status"
            onChange={handleChange}
            value={values.status}
            onBlur={handleBlur}
          >
            <option value="">Selecciona un estado</option>
            <option value="NEW">Nueva</option>
            <option value="IN PROGRESS">En proceso</option>
            <option value="FINISHED">Teminada</option>
          </select>
          {touched.status && errors.status ? (
            <div className="invalid-feedback">{errors.status}</div>
          ) : null}
        </div>
        <div className="col-md-4 mb-2">
          <select
            className={
              errors.importance && touched.importance
                ? "form-select is-invalid"
                : "form-select"
            }
            id="importance"
            onChange={handleChange}
            value={values.importance}
            onBlur={handleBlur}
          >
            <option value="">Selecciona una prioridad</option>
            <option value="LOW">Baja</option>
            <option value="MEDIUM">Media</option>
            <option value="HIGH">Alta</option>
          </select>
          {touched.importance && errors.importance ? (
            <div className="invalid-feedback">{errors.importance}</div>
          ) : null}
        </div>
        <div className="mb-2">
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Descripción"
            id="description"
            onBlur={handleBlur}
            className={
              errors.description && touched.description
                ? "form-control is-invalid"
                : "form-control"
            }
            value={values.description}
          />
        </div>
        <div className="d-grid gap-2 d-md-block">
          <button type="submit" className="btn btn-primary">
            Crear
          </button>
        </div>
        <div></div>
      </form>
      <ToastContainer />
    </div>
  );
};
