import React from "react";
import Avatar from "./avatar";
import Detail from "./detail";

function Card(props){
    return (
        <div className="card">
        <div className="top">
          <h2 className="name">{props.name}</h2>     
          {/* contact.name received from App goes to props.name */}
            <Avatar imgURL={props.imgURL}/>
            {/* imgURL fetched from App goes to imgURL of Avatar */}
        </div>
        <div className="bottom">
            <Detail detailInfo={props.tel}/>
            <Detail detailInfo={props.email}/>
        </div>
      </div>
    )
}

export default Card;