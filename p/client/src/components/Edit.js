import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import list from "./api";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import RecordList from "./RecordList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useForm } from "react-hook-form";

// toast.configure()
const Edit = () => {
  // console.log(data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    name: "",
    email: "",
    mob: "",
    id: "",
    record: [],
  });

  // console.log(data);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mob: "",
    id: "",
    record: [],
  });
  const [record, setRecord] = useState({});

  useEffect(() => {
    list.getRecords((callback) => setRecord(callback.result));
    return;
  }, []);

  // console.log(form);
  const [show, setShow] = useState(true);
  
  const handleClose = () => {
    setShow(false);
    navigate("/")
    async function fetchData() {
      const id = params.id.toString();

      console.log(id);
      const response = await fetch(`http://localhost:5000/record/${id}`);
      console.log(response);
      if (!response.ok) {
        return;
      }

      const record = await response.json();
      
      if (!record) {
        Navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
    return;
    // window.location.reload()
  };
  const handleShow = () => {
    setShow(true);
  };

  // console.log(form);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();

      console.log(id);
      const response = await fetch(`http://localhost:5000/record/${id}`);
      console.log(response);
      if (!response.ok) {
     
        return;
      }

      const record = await response.json();
      console.log(record);

      if (!record) {
        Navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  let updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
  };

  // update the form
  useEffect((e) => {
    list.getRecords((callback) => setRecord(callback));
  });

  // useEffect(()=>{
  let onSubmit = async (e) => {
    // e.preventDefault()
    list.getRecords((callback) => setRecord(callback));
    console.log(record);

    console.log(record);

    let id = record.find((data) => data.id === form.id);
    console.log(id);
    let final = id.email;
    console.log(final);
    let mail = record.find((data) => data.email === form.email);
    if (id && form.email === final) {
      const editPerson = {
        name: form.name,
        email: form.email,
        mob: form.mob,
      };
      await fetch(`http://localhost:5000/update/${params.id}`, {
        method: "POST",
        body: JSON.stringify(editPerson),
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } else if (mail) {
      toast.warning("Already exist", { position: toast.POSITION.TOP_CENTER });
    } else {
   
      toast.success("updated successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      const editPerson = {
        name: form.name,
        email: form.email,
        mob: form.mob,
      };
      console.log(editPerson);
      await fetch(`http://localhost:5000/update/${params.id}`, {
        method: "POST",
        body: JSON.stringify(editPerson),
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    }
  };

  return (
    <div>
      <RecordList handleFunction={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upadate</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={form.id}
                // onChange={(e)=>updateForm({id:e.target.value.trim})}
                // onChange={updateForm}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("name", { required: true })}
                type="text"
                placeholder={form.name}
                value={form.name}
                // onChange={(e)=>updateForm({name:e.target.value.trim()})}
                name="name"
                onChange={updateForm}
                autoFocus
              />
            </Form.Group>

            {errors.name && (
              <span className="text-danger">Name is Required</span>
            )}

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Enter valid Email",
                  },
                })}
                type="text"
                // placeholder={form.email}
                value={form.email}
                // onChange={(e)=>updateForm({email:e.target.value})}
                name="email"
                onChange={updateForm}
                autoFocus
              />
            </Form.Group>

            <span className="text-danger"> {errors.email?.message}</span>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mobile-no</Form.Label>
              <Form.Control
                {...register("mob", {
                  required: "Mob-No is Required",
                  pattern: {
                    value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                    message: "Enter valid Mob-No",
                  },
                })}
                type="text"
                placeholder={form.mob}
                value={form.mob}
                // onChange={(e)=>updateForm({mob:e.target.value})}
                name="mob"
                onChange={updateForm}
                autoFocus
              />
            </Form.Group>
            <span className="text-danger">{errors.mob?.message}</span>
            <br />
            <br />

            <div className="form-group">
              <input
                type="submit"
                value="Update Record"
                className="btn btn-primary"
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  );
};
export default Edit;
