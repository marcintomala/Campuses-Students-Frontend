import React from "react";

export default function CampusCard({ campus }) {
    return (
        <div className="campus-card">
            <img src={campus.imageUrl} alt={`${campus.name}`} />
            <h1>{campus.name}</h1>
            <h3>{campus.address}</h3>
            <p>{campus.description}</p>
        </div>
    )
}