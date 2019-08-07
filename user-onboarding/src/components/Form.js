import React from 'react';
import { Form, Field, withFormik } from 'formik';

const UserForm = () => {

    // Name
    // Email
    // Password
    // Terms of Service (checkbox)
    // A Submit button to send our form data to the server.

    return (
        <div>
            <h1> OnBoarding Form </h1>
            <Form>
                <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                />

                <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                />

                <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <label>
                    Terms of Service
                    <Field
                        type="checkbox"
                        name="terms"
                        placeholder="Terms of Service"
                    />
                </label>
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
};

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, terms}){
        return{
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false, 
        };
    },

    handleSubmit(values){
        console.log(values)
    }
    
})(UserForm);

export default FormikUserForm;