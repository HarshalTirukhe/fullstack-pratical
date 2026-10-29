function StudentDisplay({ student }) {

    // If no student has been submitted

    if (!student) {

        return (

            <div className="display-card empty">

                <h2>Student Information</h2>

                <p>
                    Submit the form to display student information.
                </p>

            </div>

        );
    }


    return (

        <div className="display-card">

            <h2>Student Information</h2>

            <div className="student-info">

                <div className="info-row">
                    <strong>Name:</strong>
                    <span>{student.name}</span>
                </div>

                <div className="info-row">
                    <strong>Email:</strong>
                    <span>{student.email}</span>
                </div>

                <div className="info-row">
                    <strong>Age:</strong>
                    <span>{student.age}</span>
                </div>

                <div className="info-row">
                    <strong>Branch:</strong>
                    <span>{student.branch}</span>
                </div>

            </div>

        </div>

    );
}

export default StudentDisplay;