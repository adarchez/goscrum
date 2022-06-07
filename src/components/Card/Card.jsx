import { useState } from "react";

export const Card = ({
  deleteCard,
  editCardStatus,
  data: {
    _id,
    title,
    createdAt,
    user: { userName },
    description,
    status,
    importance,
  },
  data,
}) => {
  const [showMore, setShowMore] = useState(false);

  const datetime = new Date(createdAt).toLocaleString() + " hs.";

  const limitString = (str) => {
    if (str.length > 170)
      return { string: str.slice(0, 167).concat("..."), addButton: true };
    return { string: str, addButton: false };
  };

  return (
    <div className="card m-1">
      <div className="card-body">
        <h5 className="card-title d-inline">{title}</h5>
        <p className="d-inline float-end" onClick={() => deleteCard(_id)}>
          X
        </p>
        <p className="fs-6 m-0 p-0">{datetime}</p>
        <p className="fs-6 m-0 p-0">{userName}</p>
        <span
          className={
            status.toLowerCase() === "finished"
              ? "badge text-bg-success m-1"
              : status.toLowerCase() === "new"
              ? "badge text-bg-danger m-1"
              : "badge text-bg-warning m-1"
          }
          onClick={() => editCardStatus(data)}
        >
          {status.toLowerCase()}
        </span>
        <span
          className={
            importance.toLowerCase() === "high"
              ? "badge text-bg-danger m-1"
              : importance.toLowerCase() === "low"
              ? "badge text-bg-primary m-1"
              : "badge text-bg-warning m-1"
          }
        >
          {importance.toLowerCase()}
        </span>
        {!showMore && (
          <p className="card-text fs-6 m-0 p-0">
            {limitString(description).string}
            {limitString(description).addButton && (
              <button
                className="btn btn-link"
                type="button"
                onClick={() => setShowMore(true)}
              >
                Ver más
              </button>
            )}
          </p>
        )}
        {showMore && (
          <>
            <p className="card-text fs-6 m-0 p-0">
              {description}
              <button
                className="btn btn-link"
                type="button"
                onClick={() => setShowMore(false)}
              >
                Ver menos
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
