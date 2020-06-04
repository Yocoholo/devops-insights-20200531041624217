import React, { useState } from 'react';

function City(props) {

    const [validationError, setValidationError] = useState(null);

    const validate = (event) => {
        const cityCodePattern = /^[A-zÀ-ú -]+$/;
        const valid = cityCodePattern.test(event.target.value);
        if (!valid) {
            setValidationError('* should be any letter between A-z');
            props.clearResponse();
        } else {
            setValidationError('');
            props.onCityChange(event.target.value);
        }
    };

    return (
        <div className="col-sm-4">
            <div className="row">
                <div className="col-sm-10">
                    <style jsx="true">{`
                        .form-control::-webkit-input-placeholder {
                            color: #ddd;
                        }
                    `}
                    </style>
                    <input
                        type="text"
                        className="form-control"
                        id="textboxSearchBar"
                        placeholder="example: Bulls"
                        onClick={(event) => { validate(event);}}
                        onKeyPress={(event) => { if (event.key === "Enter") { validate(event);} }
                        }
                    ></input>
                </div>
            </div>
            <div className="pl-3 row">
                <div className="text-danger small"> {validationError}</div>
            </div>
        </div>
    );
}

export default City