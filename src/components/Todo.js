import React, { useState } from "react";
import "../index.css";
function Todo() {
  const [val, setVal] = useState("");
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [editid, setEditId] = useState(null);
  const setData = () => {
    if (val === "") {
      alert("please enter your todo");
    } else if (val && !toggle) {
      setItems(
        items.map((elem) => {
          if (elem.id === editid) {
            return { ...elem, name: val };
          }
          return elem;
        })
      );
      setToggle(true);
      setVal("");
      setEditId(null);
    } else {
      const inputVal = { id: new Date().getTime().toString(), name: val };
      setItems([inputVal, ...items]);
      setVal("");
    }
  };
  const DeleteItem = (index) => {
    const arr = items.filter((element) => {
      return index !== element.id;
    });
    setItems(arr);
  };
  const DeleteAll = () => {
    setItems([]);
  };

  const editItem = (id) => {
    const data = items.find((element) => {
      return element.id === id;
    });
    setToggle(false);
    setVal(data.name);
    setEditId(id);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className=" col-12 col-md-6 m-auto">
          <div className="card border border-success p-5">
            <img
              src="https://i.ibb.co/KmxZDZm/todoicon.png"
              className="card-img-top m-auto"
              alt="note"
              style={{ width: "5rem" }}
            />
            <div className="card-body">
              <h5 className="card-title text-center pb-2">📝Your Todo</h5>

              <div className="d-flex justify-content-between align-items-center">
                <input
                  className="form-control mb-1"
                  type="text"
                  placeholder="✍ Write Here"
                  value={val}
                  onChange={(e) => {
                    setVal(e.target.value);
                  }}
                />
                {toggle ? (
                  <i
                    title="add todo"
                    className="fas fa-plus px-1 pb-2 fs-4"
                    onClick={setData}
                  ></i>
                ) : (
                  <i class="fas fa-edit px-1 pb-2 fs-4" onClick={setData}></i>
                )}
              </div>
              <hr className="text-primary" />
              <ul className="list-group mb-3">
                {items.map((element) => (
                  <li
                    className=" hover-effect list-group-item border border-warning mb-2 d-flex justify-content-between"
                    key={element.id}
                  >
                    {element.name}
                    <div>
                      <i
                        title="edit todo"
                        className="fas fa-edit me-3"
                        onClick={() => {
                          editItem(element.id);
                        }}
                      ></i>
                      <i
                        title="remove todo"
                        className="fas fa-trash-restore-alt"
                        onClick={() => {
                          DeleteItem(element.id);
                        }}
                      ></i>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-center">
                <button
                  title="delete all"
                  className="btn btn-primary"
                  onClick={DeleteAll}
                >
                  Delete All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
