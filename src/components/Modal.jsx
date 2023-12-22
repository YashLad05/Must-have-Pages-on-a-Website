import React, { useState } from 'react';

import './Modal.css';

function Modal({ closeModal, onSubmit, defaultValue }) {

    // Keeping track of user Input data with useState Hook
    // Making formState, a stateful variable.
    const [formState, setFromState] = useState(
        defaultValue || {
            page: "",
            description: "",
            status: "live",
        });

    // Making errorState, a stateful variable which contains all error messages
    const [errors, setErrors] = useState("");

    const validateForm = () => {
        if (formState.page && formState.description && formState.status) {
            setErrors("");
            return true;
        } else {
            let errorFields = [];
            for (const [key, values] of Object.entries(formState)) {
                if (!values) {
                    errorFields.push(key);
                    // pushing the key into "errorFields" array
                }
            }
            setErrors(errorFields.join(", "));
            return false;
        }
    };

    /*
    Function which can update the formState variable and update that whenever the changes are made
    change event -> e
    square brackets [], since we have a dynamic key name. 
    */

    /*
    Creating indivisual function for each of page, description change would be bad.
    Because you are creating many functions needlessly.
    Also, If we want to add a new field in future, we would have to write an entirely new function for that. 
    */

    /* 
    Having a single function, allows us to, 
    > take in the name, 
    > the input element that has been changed,
    and updaing just that field inside our formState. 
    */

    const handleChange = (e) => {
        setFromState({
            ...formState,
            [e.target.name]: e.target.value
        })
        // console.log("New formState:", formState);
    };

    /*
    Now, as we can keep track of the formState, we need a seprate function, which will run when we click on "Instant Submit" Button.
    Submit Event -> e
    Since the submit button refreshes the pagewhenever we click on it;
    We add "e.preventDefault();"
    So, once we add "preventDefault()", It won't refresh the page anymore.
    "preventDefault();" will reset the stage.
    */

    const handleSubmit = (e) => {
        // debugger;
        e.preventDefault();

        if (!validateForm()) {
            // When validateForm returns false
            return;
            // return out of the "handleSubmit" function and don't run "onSubmit" function.
        };
        console.log("After handle Submit formState:", formState);

        onSubmit(formState);
        console.log("After onSubmit formState:", formState);

        closeModal();
    };

    return (
        <div
            className='modal-container'
            onClick={(e) => {
                if (e.target.className === "modal-container")
                    closeModal();
            }}
        >
            {/* Background for the Modal */}

            <div className='modal'>
                <h2 className='header'>Page Information</h2>
                {/* Actual Modal which will contain the form */}
                <form action='' method=''>

                    {/* We want the values inside input fields, to be reflected inside the formState */}
                    <div className='form-group'> {/* Page Name */}
                        <label htmlFor="page">Page</label>
                        <input
                            type="text"
                            name='page'
                            value={formState.page}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form-group'> {/* Description */}
                        <label htmlFor="description">Description</label>
                        <textarea
                            type="text"
                            name='description'
                            value={formState.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form-group'> {/* Dropdown Options */}
                        <label htmlFor="status">Status</label>
                        <select
                            name="status"
                            value={formState.status}
                            onChange={handleChange}
                        >
                            {/* <option value="none" defaultValue={"Select an option"} disabled hidden> Select an Option</option> */}
                            <option value="live">Live</option>
                            <option value="draft">Draft</option>
                            <option value="error">Error</option>
                        </select>
                    </div>

                    {errors && <div className='errorField'> {`Please include: ${errors}`} </div>}

                    <button
                        type='submit'
                        className='btn'
                        // disabled={validateForm}
                        onClick={handleSubmit}
                    >
                        Instant Submit
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Modal;