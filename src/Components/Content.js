import React, { useState } from "react";
import { v4 } from "uuid";

const AddProp = ({ onCancel, onAddTask }) => {
  const [propiName, setPropiName] = useState("");
  const [propiDesp, setPropiDesp] = useState("");
  const [propiSize, setPropiSize] = useState("");

  return (
    <div>
      <div>
        <form>
          <input
            id="name"
            placeholder="Name"
            value={propiName}
            onChange={(event) => setPropiName(event.target.value)}
          />
          <input
            id="desp"
            placeholder="Description"
            value={propiDesp}
            onChange={(event) => setPropiDesp(event.target.value)}
          />
          <input
            id="size"
            placeholder="Size"
            value={propiSize}
            onChange={(event) => setPropiSize(event.target.value)}
          />
        </form>
      </div>
      <div className="btn">
        <button
          id="savebtn"
          disabled={!propiName || !propiDesp || !propiSize}
          onClick={() => {
            onAddTask(propiName, propiDesp, propiSize);
            onCancel();
            setPropiName("");
            setPropiDesp("");
            setPropiSize("");
          }}
        >
          Save
        </button>
        <button
          id="cancelbtn"
          onClick={() => {
            onCancel();
            setPropiName("");
            setPropiDesp("");
            setPropiSize("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const PropiItems = ({ propis }) => {
  let propiToRender = [...propis];

  return (
    <div>
      {propiToRender.map((propis) => (
        <div className="pro" key={v4()} id="namep">
          <p className="name">
            <input type="checkbox"></input>
            {propis.textN}
          </p>
          <p className="desp">{propis.textD}</p>
          <p className="size">Size: {propis.textS}</p>
        </div>
      ))}
    </div>
  );
};

const RemovePropi = (e) => {
  const del = document.querySelector("#namep");
  del.remove();
};

const Content = () => {
  const [showAddPropi, setShowAddPropi] = useState(false);

  const [propis, setPropis] = useState([]);

  const addNewPropi = (textN, textD, textS) => {
    const newPropiItem = { textN, textD, textS };
    setPropis((prevState) => [...prevState, newPropiItem]);
  };

  return (
    <div>
      <nav>
        <button
          id="addbtn"
          disabled={document.querySelector("#namep") === true}
          onClick={() => setShowAddPropi((prevState) => !prevState)}
        >
          Add
        </button>
        <button id="removebtn" onClick={RemovePropi}>
          Remove
        </button>
      </nav>

      <div className="content">
        {showAddPropi && (
          <AddProp
            onAddTask={addNewPropi}
            onCancel={() => setShowAddPropi(false)}
          />
        )}
        {propis.length > 0 ? (
          <PropiItems propis={propis} />
        ) : (
          <p className="noprop">No Property</p>
        )}
      </div>
    </div>
  );
};

export default Content;
