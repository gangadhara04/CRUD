import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useParams } from "react-router-dom";
import list from "./api";
import RecordList from "./RecordList";
function Remove(props) {
  const [show, setShow] = useState(true);
  let [record, setRecord] = useState([]);
  let [data, setData] = useState([]);
  const handleClose = () => setShow(false);

  let params = useParams();
  //   console.log(params);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();

      console.log(id);
      const response = await fetch(`http://localhost:5000/record/${id}`);
      console.log(response);
      if (!response.ok) {
       
        return;
      }

      const data = await response.json();

      if (!record) {
        // window.alert(`Record with id ${id} not found`);
        // Navigate("/")
        return;
      }
      setData(data);
    }
    fetchData();
    return;
  }, []);

  let name = data.name;
  console.log(name);

  console.log(data);

  useEffect((e) => {
    list.getRecords((callback) => setRecord(callback));
  }, []);

  async function deleteRecord(id) {
    //   console.log(id);
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    const newRecords = record.filter((el) => el._id !== id);
    setRecord(newRecords);
    return newRecords;
  }

  return (
    <>
      <RecordList handleDelete={handleShow} />

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ border: "2px solid red ", borderRadius: "50%" }}>
              <img
                src="https://cdn.pixabay.com/photo/2013/07/12/12/44/cancel-146131_960_720.png"
                style={{ width: "100px", padding: "30px" }}
              />
            </div>
          </div>
          <h1 className="text-center ">Are You Sure?</h1>
          <p className="text-center  text-secondary">
            Do you want Delete "{name}" records? This process cannot be undone
          </p>
        </Modal.Body>
        <div>
          <div className="d-flex justify-content-around p-5">
            <div>
           
              <Button
                variant="danger"
                onClick={() => {
                  deleteRecord(params.id.toString());
                }}
              >
                <Link className="text-white text-decoration-none" to={"/"}>
                  delete
                </Link>
              </Button>
            </div>
            <div>
              <Button variant="secondary" onClick={handleClose}>
                <Link className="text-white text-decoration-none" to={"/"}>
                  Cancel
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Remove;




