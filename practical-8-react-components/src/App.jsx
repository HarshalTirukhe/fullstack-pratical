import { useState } from "react";

import StudentForm from "./components/StudentForm";
import StudentDisplay from "./components/StudentDisplay";

function App() {

    const [student, setStudent] = useState(null);


    // Receive submitted student data

    function handleStudentSubmit(data) {

        setStudent(data);

    }


    return (

        <div className="app">

            <header>

                <h1>Student Information App</h1>

                <p>
                    React Components Practical
                </p>

            </header>


            <main>

                <StudentForm
                    onSubmit={handleStudentSubmit}
                />

                <StudentDisplay
                    student={student}
                />

            </main>

        </div>

    );
}

export default App;