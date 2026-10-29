import { useState } from "react";

function App() {

    const [display, setDisplay] = useState("0");


    // Handle number and operator buttons

    function handleClick(value) {

        if (display === "Error") {
            setDisplay("0");
        }


        // If display is 0, replace it with the clicked value

        if (display === "0") {

            setDisplay(value);

        } else {

            setDisplay(display + value);

        }
    }


    // Clear calculator

    function clearDisplay() {

        setDisplay("0");

    }


    // Delete last character

    function deleteLast() {

        if (display.length === 1) {

            setDisplay("0");

        } else {

            setDisplay(display.slice(0, -1));

        }
    }


    // Calculate result

    function calculateResult() {

        try {

            // Convert calculator symbols to JavaScript operators

            const expression = display
                .replace(/×/g, "*")
                .replace(/÷/g, "/");


            // Calculate expression

            const result = eval(expression);


            // Check for invalid result

            if (!Number.isFinite(result)) {

                setDisplay("Error");

                return;
            }


            setDisplay(String(result));

        } catch (error) {

            setDisplay("Error");

        }
    }


    return (

        <div className="app">

            <div className="calculator">

                <h1>Calculator</h1>


                {/* Display */}

                <div className="display">

                    {display}

                </div>


                {/* Buttons */}

                <div className="buttons">

                    <button
                        className="clear"
                        onClick={clearDisplay}
                    >
                        C
                    </button>

                    <button
                        className="delete"
                        onClick={deleteLast}
                    >
                        DEL
                    </button>

                    <button
                        className="operator"
                        onClick={() => handleClick("÷")}
                    >
                        ÷
                    </button>

                    <button
                        className="operator"
                        onClick={() => handleClick("×")}
                    >
                        ×
                    </button>


                    <button onClick={() => handleClick("7")}>
                        7
                    </button>

                    <button onClick={() => handleClick("8")}>
                        8
                    </button>

                    <button onClick={() => handleClick("9")}>
                        9
                    </button>

                    <button
                        className="operator"
                        onClick={() => handleClick("-")}
                    >
                        −
                    </button>


                    <button onClick={() => handleClick("4")}>
                        4
                    </button>

                    <button onClick={() => handleClick("5")}>
                        5
                    </button>

                    <button onClick={() => handleClick("6")}>
                        6
                    </button>

                    <button
                        className="operator"
                        onClick={() => handleClick("+")}
                    >
                        +
                    </button>


                    <button onClick={() => handleClick("1")}>
                        1
                    </button>

                    <button onClick={() => handleClick("2")}>
                        2
                    </button>

                    <button onClick={() => handleClick("3")}>
                        3
                    </button>

                    <button
                        className="equals"
                        onClick={calculateResult}
                    >
                        =
                    </button>


                    <button
                        className="zero"
                        onClick={() => handleClick("0")}
                    >
                        0
                    </button>

                    <button
                        onClick={() => handleClick(".")}
                    >
                        .
                    </button>

                </div>

            </div>

        </div>
    );
}

export default App;