import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useResize } from "../../hoooks/useResize";

export const Header = () => {
  const navigate = useNavigate();
  const { isPhone } = useResize();

  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login", { replace: true });
  };

  return (
    <header>
      <nav className="navbar border-bottom border-4 shadow-sm">
        <div className="container-fluid">
          <img
            className={isPhone ? "navbar-brand img-fluid w-25" : "navbar-brand img-fluid"}
            src="/img/GoScrum.jpg"
            alt="logo"
          />
          <div className="d-flex">
            <div>
              <p className="fw-semibold m-2">
                Tareas creadas: {!tasks ? 0 : tasks.length}
              </p>
            </div>
            <div>
              <p className="fw-semibold m-2">
                {localStorage.getItem("userName")}
              </p>
            </div>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm m-2"
              onClick={handleLogout}
            >
              X
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
