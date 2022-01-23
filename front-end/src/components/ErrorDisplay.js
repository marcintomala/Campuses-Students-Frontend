import React from "react";

export default function ErrorDisplay(props) {
    const errors = props.errors;
    const errorTags = Object.keys(errors);
    const errorDisplay = errorTags.map(tag => <h3 key={tag}>{errors[tag]}</h3>);
    return (
        <>
            {errorTags.length > 0 && 
            <div className="errors">
                <h1>Errors:</h1>
                {errorDisplay}
            </div>}
        </>
    )
}