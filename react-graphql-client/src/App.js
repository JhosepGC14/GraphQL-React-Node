import logo from "./logo.svg";
import "./App.css";
import Persons from "./components/Persons";
import AddPerson from "./components/AddPerson";
import { usePersons } from "./persons/graphql/custom-hooks";
import { useState } from "react";
import NotifyError from "./components/NotifyError";
import EditPerson from "./components/EditPerson";

function App() {
  const { data, /*error,*/ loading } = usePersons();
  const [errorMessage, setErrorMessage] = useState(null);

  const notifyError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div className="App">
      <NotifyError errorMessage={errorMessage} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {loading ? <p>Loading...</p> : <Persons persons={data?.allPersons} />}
      </header>
      <div>
        <EditPerson />
      </div>
      <div>
        <AddPerson notifyError={notifyError} />
      </div>
    </div>
  );
}

export default App;
