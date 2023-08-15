import React from "react";

function Avatar(prop){
    return (
        <img
        className="circle-img"
          src={prop.imgURL}
          alt="avatar_img"
        />
    )
}

export default Avatar;