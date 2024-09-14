"use client";
import React from "react";
import "./CalculateForm.css";
import { useState } from "react";
import Modal from "./Modal";

function CalculateForm() {
  const [calculateInputs, setCalculateInputs] = useState({
    age: 15,
    gender: "",
    height: "",
    weight: "",
    activity: "1.2",
  });

  const [result, setResult] = useState({
    maintenanceCalories: "",
    proWeightLoss: "",
    weightLoss: "",
    clearBulking: "",
    dirtyBulking: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  let bmr;
  function handleCalculate() {
    const { age, gender, height, weight, activity } = calculateInputs;
    // Parsing values to ensure they are numbers
    const ageValue = parseInt(age, 10);
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);
    const activityValue = parseFloat(activity);

    // Check if any of the fields are empty or invalid
    if (!ageValue || !heightValue || !weightValue || !gender) {
      setErrorMessage("Please enter valid values for all fields.");
      setShowModal(true);
      return;
    }

    // Reset error message if values are valid
    setErrorMessage(null);

    // Calculate BMR based on gender
    if (gender === "male") {
      bmr = 5 + 10 * weightValue + 6.25 * heightValue - 5 * ageValue;
    } else if (gender === "female") {
      bmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue - 161;
    }

    // Update the result state with calculated values
    setResult({
      maintenanceCalories: (bmr * activityValue).toFixed(2),
      proWeightLoss: (bmr * activityValue * 0.9).toFixed(2),
      weightLoss: (bmr * activityValue * 0.8).toFixed(2),
      clearBulking: (bmr * activityValue * 1.2).toFixed(2),
      dirtyBulking: (bmr * activityValue * 1.4).toFixed(2),
    });

    setShowModal(true);
  }

  // Function to handle the change for activity level
  const setActivity = (activityLevel) => {
    setCalculateInputs((prevState) => ({
      ...prevState,
      activity: activityLevel, // Update only the activity field
    }));
  };

  function handleReset() {
    setCalculateInputs({
      age: 15,
      gender: "",
      height: "",
      weight: "",
      activity: "1.2",
    });
    setResult({
      maintenanceCalories: "",
      proWeightLoss: "",
      weightLoss: "",
      clearBulking: "",
      dirtyBulking: "",
    });
  }

  const btnIsDisabled =
    calculateInputs.age === "" ||
    calculateInputs.gender === "" ||
    calculateInputs.height === "" ||
    calculateInputs.weight === "" ||
    calculateInputs.activity === "";

  // Handle div click to close the modal when clicking outside of it
  function handleDivClick(e) {
    // Close the modal only if the click is outside of the modal content
    if (e.target.id === "modal") {
      setShowModal(false);
    }
  }

  return (
    <div
      onClick={handleDivClick}
      className="flex"
      style={{ flexDirection: "column" }}
    >
      <form
        id="calculate-form"
        className="flex"
        style={{ flexDirection: "column" }}
      >
        <label>
          Age{" \t "}
          <input
            value={calculateInputs.age}
            type="number"
            placeholder="Enter Your Age"
            maxLength="3"
            onChange={(e) =>
              setCalculateInputs({ ...calculateInputs, age: e.target.value })
            }
            required
          />
        </label>

        <label>
          Gender {" \t "}
          <div className="gender-container" style={{ flexDirection: "row" }}>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={(e) =>
                setCalculateInputs({
                  ...calculateInputs,
                  gender: e.target.value,
                })
              }
              required
            />{" "}
            Male
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={(e) =>
                setCalculateInputs({
                  ...calculateInputs,
                  gender: e.target.value,
                })
              }
              required
            />{" "}
            Female
          </div>{" "}
        </label>

        <label>
          Height
          <input
            type="number"
            placeholder="Enter Your Height in cm"
            maxLength="3"
            value={calculateInputs.height}
            onChange={(e) =>
              setCalculateInputs({ ...calculateInputs, height: e.target.value })
            }
            required
          />
        </label>

        <label>
          Weight
          <input
            type="text"
            placeholder="Enter Your Weight in Kg"
            maxLength="3"
            value={calculateInputs.weight}
            onChange={(e) =>
              setCalculateInputs({ ...calculateInputs, weight: e.target.value })
            }
            required
          />
        </label>
       
        <label>
          Activity Level:
          <select
            value={calculateInputs.activity}
            onChange={(e) => setActivity(e.target.value)}
            required
          >
            <option value="1.2">No activity</option>
            <option value="1.375">occasionally walking</option>
            <option value="1.55">exercising 1-3 times a week</option>
            <option value="1.725">exercising 4-6 times a week</option>
            <option value="1.9">hard exercises, or physical work</option>
          </select>
        </label>
        <div>
          <button type="button" onClick={handleCalculate}>
            Calculate
          </button>
          <button type="reset" onClick={handleReset}>
            clear
          </button>
        </div>
      </form>

      <Modal
        result={result}
        errorMessage={errorMessage}
        isVisible={showModal}
      />
    </div>
  );
}

export default CalculateForm;
