import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value        //if name=title, then it converts to title: "Blah blah"
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);         //to send note back to parent app.jsx
    setNote({                  //once added, clear out the adding div
      title: "",
      content: ""
    });
    event.preventDefault();   //to not reload page and remove note
  }

  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
