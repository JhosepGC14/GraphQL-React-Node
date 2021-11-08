import React, { useState } from "react";
import { useEditPerson } from "../../persons/graphql/custom-hooks";

const EditPerson = () => {
  const [userForm, setUserForm] = useState({
    name: "",
    phone: "",
  });
  const [editPerson] = useEditPerson();

  const handleSubmit = (e) => {
    e.preventDefault();
    editPerson({ variables: userForm });
    setUserForm({
      name: "",
      phone: "",
    });
  };

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Edit Person: </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          value={userForm.name}
          onChange={handleChange}
        />
        <br />

        <input
          type="text"
          placeholder="Celular"
          name="phone"
          value={userForm.phone}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <button type="submit">Edit Phone</button>
        <br />
        <br />
      </form>
    </div>
  );
};

export default EditPerson;
