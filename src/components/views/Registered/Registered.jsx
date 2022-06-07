import { useParams, Link } from "react-router-dom";
import { Header } from "../../Header/Header";

export const Registered = () => {
  const { teamID } = useParams();

  return (
    <>
      <Header />
      <div className="container">
        <h5 className="p-2">El team ID de tu equipo es: </h5>
        <div className="p-2">{teamID}</div>
        <div>
          <h6 className="p-2">
            <Link to="/login">Ingresar</Link>
          </h6>
        </div>
      </div>
    </>
  );
};
