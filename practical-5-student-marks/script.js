// ========================================
// GET HTML ELEMENTS
// ========================================

const studentForm =
    document.getElementById("studentForm");

const studentTableBody =
    document.getElementById("studentTableBody");

const topper =
    document.getElementById("topper");


// ========================================
// STUDENT ARRAY
// ========================================

let students = [];


// ========================================
// FORM SUBMIT EVENT
// ========================================

studentForm.addEventListener("submit", function (event) {

    // Prevent page reload
    event.preventDefault();


    // ====================================
    // GET STUDENT DETAILS
    // ====================================

    const name =
        document.getElementById("name").value;

    const rollNo =
        document.getElementById("rollNo").value;


    // ====================================
    // GET MARKS
    // ====================================

    const html =
        Number(document.getElementById("html").value);

    const css =
        Number(document.getElementById("css").value);

    const javascript =
        Number(document.getElementById("javascript").value);

    const react =
        Number(document.getElementById("react").value);

    const node =
        Number(document.getElementById("node").value);


    // ====================================
    // CALCULATE TOTAL
    // ====================================

    const total =
        html +
        css +
        javascript +
        react +
        node;


    // ====================================
    // CALCULATE PERCENTAGE
    // ====================================

    const percentage =
        total / 5;


    // ====================================
    // CREATE STUDENT OBJECT
    // ====================================

    const student = {

        name: name,

        rollNo: rollNo,

        total: total,

        percentage: percentage

    };


    // ====================================
    // ADD STUDENT TO ARRAY
    // ====================================

    students.push(student);


    // ====================================
    // DISPLAY STUDENTS
    // ====================================

    displayStudents();


    // ====================================
    // FIND TOPPER
    // ====================================

    findTopper();


    // ====================================
    // RESET FORM
    // ====================================

    studentForm.reset();

});


// ========================================
// DISPLAY STUDENTS
// ========================================

function displayStudents() {

    // Clear existing table
    studentTableBody.innerHTML = "";


    // Loop through students

    students.forEach(function (student, index) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${student.rollNo}
            </td>

            <td>
                ${student.name}
            </td>

            <td>
                ${student.total}
            </td>

            <td>
                ${student.percentage.toFixed(2)}%
            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${index})"
                >
                    Delete
                </button>

            </td>

        `;


        studentTableBody.appendChild(row);

    });

}


// ========================================
// FIND TOPPER
// ========================================

function findTopper() {

    // No students

    if (students.length === 0) {

        topper.textContent =
            "No student records available.";

        return;

    }


    // Assume first student is topper

    let topStudent = students[0];


    // Compare students

    for (let i = 1; i < students.length; i++) {

        if (
            students[i].percentage >
            topStudent.percentage
        ) {

            topStudent = students[i];

        }

    }


    // Display topper

    topper.innerHTML = `

        🏆 ${topStudent.name}

        -

        ${topStudent.percentage.toFixed(2)}%

        (${topStudent.total}/500)

    `;

}


// ========================================
// DELETE STUDENT
// ========================================

function deleteStudent(index) {

    students.splice(index, 1);

    displayStudents();

    findTopper();

}