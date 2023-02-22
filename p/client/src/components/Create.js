import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import list from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Navbar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mob: "",
    },
  });
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mob: "",
  });
  const [records, setRecords] = useState([]);
  useEffect((e) => {
    list.getRecords((callback) => setRecords(callback));
  }, []);
  console.log(records);
  const handleClose = () => {
    window.location.reload(false);

    setShow(false);
  };

  const handleShow = () => {
    list.getRecords((callback) => {
      setRecords(callback);
    });
    setShow(true);
  };

  function updateForm(value) {
    console.log(value);
    return setForm((prev) => {
      console.log(prev);
      return { ...prev, ...value };
    });
  }

  let onSubmit = (e) => {
    console.log(e);
    setForm({ name: "", email: "", mob: "" });
    list.getRecords((callback) => setRecords(callback));
    console.log(records);
    const isEmailExist = records.find((data) => data.email === form.email)
      ? true
      : false;

    console.log("email______________________", isEmailExist);
    if (isEmailExist) {
      toast.warning("Email already exist", {
        position: toast.POSITION.TOP_CENTER,
      });
      setShow(false);
    } else {
      toast.success("form subimited successfully", {
        position: toast.POSITION.TOP_CENTER,
      });

      setShow(false);
      let id = Math.floor(Math.random() * 10000000000);
      const newPerson = { ...form, id };
      fetch("http://localhost:5000/record/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      });
    }

    setRecords(records);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="float-end">
        Create New User
      </Button>
      <br />
      <br />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("name", { required: true })}
                id="name"
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
                type="text"
                placeholder="enter your name"
                autoFocus
              />
            </Form.Group>
            {errors.name && (
              <span className="text-danger">Name is Required</span>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Enter valid Email",
                  },
                })}
                type=""
                placeholder="enter your Email"
                autoFocus
                id="email"
                value={form.email}
                onChange={(e) => updateForm({ email: e.target.value })}
              />
            </Form.Group>
            <span className="text-danger"> {errors.email?.message}</span>

            <Form.Group className="mb-3">
              <Form.Label>Mobile-No</Form.Label>
              <Form.Control
                {...register("mob", {
                  required: "Mob-No is Required",
                  pattern: {
                    value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                    message: "Enter valid Mob-No",
                  },
                })}
                type="text"
                placeholder="enter your Mobile Number"
                autoFocus
                id="mob"
                value={form.mob}
                onChange={(e) => updateForm({ mob: e.target.value })}
              />
            </Form.Group>
            <sapn className="text-danger">{errors.mob?.message}</sapn>
            <br />
            <br />
            <button type="submit">Submit</button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}
export default Navbar;
