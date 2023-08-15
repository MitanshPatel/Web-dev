import React from "react";
import Card from "./Card";
import contacts from "../contacts";
import Avatar from "./avatar";

function createCard(contact){
  return (<Card
    key={contact.id} 
    name={contact.name} 
    imgURL = {contact.imgURL}
    tel = {contact.tel}
    email = {contact.email}
  />
  )
}

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      <Avatar
        imgURL="https://imglarger.com/Images/before-after/ai-image-enlarger-1-before-2.jpg"
      />

      {contacts.map(createCard)}

      {/* <Card 
        name={contacts[0].name}      //value of contacts.name goes into name and this goes to Card.jsx
        imgURL={contacts[0].imgURL}
        tel={contacts[0].tel}
        email={contacts[0].email}
      />
      <Card 
        name={contacts[1].name}
        imgURL={contacts[1].imgURL}
        tel={contacts[1].tel}
        email={contacts[1].email}
      />
      <Card 
        name={contacts[2].name}
        imgURL={contacts[2].imgURL}
        tel={contacts[2].tel}
        email={contacts[2].email} 
      /> */}
    </div>
  );
}

export default App;
