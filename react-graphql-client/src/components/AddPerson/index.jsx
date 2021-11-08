import React, { useState } from "react";
import { useCreatePerson } from "../../persons/graphql/custom-hooks";

const AddPerson = ({notifyError}) => {
  const [userForm, setUserForm] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
  });
  const [createPerson] = useCreatePerson(notifyError);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPerson({ variables: userForm });
    setUserForm({
      name: "",
      phone: "",
      street: "",
      city: "",
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
      <h2>Create new Person: </h2>
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

        <input
          type="text"
          placeholder="Calle"
          name="street"
          value={userForm.street}
          onChange={handleChange}
        />
        <br />

        <input
          type="text"
          placeholder="Ciudad"
          name="city"
          value={userForm.city}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Create</button>
        <br />
        <br />
      </form>
    </div>
  );
};

export default AddPerson;
