import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../../Header/Header";
import { Taskform } from "../../TaskForm/Taskform";
import { Card } from "../../Card/Card";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import {
  getTasks,
  deleteTask,
  editTaskStatus,
} from "../../../store/actions/tasksActions";
import debounce from "lodash.debounce";
import Skeleton from "react-loading-skeleton";

export const Tasks = () => {
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [tasksfromWho, setTasksfromWho] = useState("ALL");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks(tasksfromWho === "ME" ? "me" : ""));
  }, [tasksfromWho, dispatch]);

  const { tasks, error, loading } = useSelector((state) => {
    return state.tasksReducer;
  });

  useEffect(() => {
    if (tasks?.length) {
      setList(tasks);
      setRenderList(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (search)
      setRenderList(list.filter((data) => data.title.startsWith(search)));
    else setRenderList(list);
  }, [search]);

  const renderAllCards = () => {
    return renderList.map((data) => (
      <Card
        key={data._id}
        data={data}
        deleteCard={handleDelete}
        editCardStatus={handleEditCardStatus}
      />
    ));
  };

  const renderColumnCards = (text) => {
    return renderList
      ?.filter((data) => data.status === text)
      .map((data) => (
        <Card
          key={data._id}
          data={data}
          deleteCard={handleDelete}
          editCardStatus={handleEditCardStatus}
        />
      ));
  };

  const handleChangeImportance = (event) => {
    if (event.currentTarget.value === "ALL") setRenderList(list);
    else
      setRenderList(
        list.filter((data) => data.importance === event.currentTarget.value)
      );
  };

  const handleSearch = debounce((event) => {
    setSearch(event?.target?.value);
  }, 1000);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEditCardStatus = (data) => {
    dispatch(editTaskStatus(data));
  };

  return (
    <>
      <Header />
      <div className="row">
        <div className="col-md-6">
          <Taskform />
        </div>
        <div className="col-md-6 p-1">
          <div className="m-2 justify-content-center bg-light border border-2 shadow-sm rounded p-2">
            <h3>Mis tareas</h3>
            <FormControl className="p-1">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                onChange={(event) => setTasksfromWho(event.currentTarget.value)}
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio />}
                  label="Todas"
                />
                <FormControlLabel
                  value="ME"
                  control={<Radio />}
                  label="Mis tareas"
                />
              </RadioGroup>
            </FormControl>
            <div className="mb-2">
              <input
                className="form-control"
                type="text"
                placeholder="Buscar por título..."
                onChange={handleSearch}
              />
            </div>
            <div className="mb-2">
              <select
                className="form-select"
                name="importance"
                onChange={handleChangeImportance}
              >
                <option value="">Seleccionar una prioridad</option>
                <option value="ALL">Todas</option>
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
              </select>
            </div>
            <div className="list_group">
              {!renderList?.length ? (
                <div>No hay tareas creadas</div>
              ) : loading ? (
                <Skeleton />
              ) : (
                <>
                  <div className="row">
                    <div className="col-md-4">
                      <h3 className="m-1">Nuevas</h3>
                      {renderColumnCards("NEW")}
                    </div>
                    <div className="col-md-4">
                      <h3 className="m-1">En progreso</h3>
                      {renderColumnCards("IN PROGRESS")}
                    </div>
                    <div className="col-md-4">
                      <h3 className="m-1">Finalizadas</h3>
                      {renderColumnCards("FINISHED")}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
