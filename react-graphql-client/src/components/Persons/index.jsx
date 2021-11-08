import React, { useEffect, useState } from "react";
import { useFindPerson } from "../../persons/graphql/custom-hooks";

const Persons = ({ persons }) => {
  const [person, setPerson] = useState(null);
  const [getPerson, result] = useFindPerson();

  const showPerson = (name) => {
    getPerson({ variables: { nameToSearch: name } });
  };

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson);
    }
  }, [result]);

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>{person.address.street}</div>
        <div>{person.address.city}</div>
        <div>{person.phone}</div>

        <br />
        <button onClick={() => setPerson(null)}>Close</button>
      </div>
    );
  }

  if (persons === null) return null;

  return (
    <div>
      <h2>Personas : </h2>
      <ul>
        {persons.map((item) => {
          return (
            <li key={item.id} onClick={() => showPerson(item.name)}>
              {item.name} {item.phone || "-"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Persons;
