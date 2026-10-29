import { useState } from "react";

function StudentForm({ onSubmit }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        branch: ""
    });


    // Handle input changes

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }


    // Handle form submission

    function handleSubmit(event) {

        event.preventDefault();

        if (
            formData.name === "" ||
            formData.email === "" ||
            formData.age === "" ||
            formData.branch === ""
        ) {
            alert("Please fill all fields.");
            return;
        }


        // Send data to parent component

        onSubmit(formData);


        // Clear form

        setFormData({
            name: "",
            email: "",
            age: "",
            branch: ""
        });
    }


    return (

        <div className="form-card">

            <h2>Student Details</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>Name</label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />

                </div>


                <div className="form-group">

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />

                </div>


                <div className="form-group">

                    <label>Age</label>

                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter your age"
                    />

                </div>


                <div className="form-group">

                    <label>Branch</label>

                    <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Branch
                        </option>

                        <option value="Information Technology">
                            Information Technology
                        </option>

                        <option value="Computer Engineering">
                            Computer Engineering
                        </option>

                        <option value="Electronics">
                            Electronics
                        </option>

                        <option value="Mechanical">
                            Mechanical
                        </option>

                    </select>

                </div>


                <button type="submit">
                    Submit
                </button>

            </form>

        </div>
    );
}

export default StudentForm;