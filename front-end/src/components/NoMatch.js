import React from "react";
import { Link } from "react-router-dom";

export default function NoMatch() {
    return (
        <div>
            <h1>404 - Not Found</h1>
            <p>Nothing found under this link :(</p>
            <Link to="/">Go to the home page</Link>
        </div>

    )
}