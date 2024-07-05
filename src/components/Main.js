"use client";
import "./Main.css";
import  {  useState } from "react";
export default function Main() {
  const [age, setAge] = useState(15);
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [result, setResult] = useState([]);
  const [errors, setErrors] = useState([]);
  const newErrors = [];
  const results = [];

  const calculateCalories = () => {
    const ageValue = parseInt(age);
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);
    const activityValue = parseFloat(activity);

    let bmr;

    if (gender === "male") {
      bmr = 5 + 10 * weightValue + 6.25 * heightValue - 5 * ageValue;
    } else if (gender === "female") {
      bmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue - 161;
    }
    const maintenanceCalories = bmr * activityValue;
    const proWeightLoss = maintenanceCalories * 0.9;
    const weightLoss = maintenanceCalories * 0.8;
    const clearBulking = maintenanceCalories * 1.2;
    const dirtyBulking = maintenanceCalories * 1.4;

    if(maintenanceCalories !== "" && proWeightLoss !== "" && weightLoss !== "" && clearBulking !== "" && dirtyBulking !== ""){
      results.push( `Your maintenance calories are approximately ${maintenanceCalories.toFixed(
        0
      )} calories per day.`);
      results.push( `Your  weight loss is approximately ${proWeightLoss.toFixed(
        0
      )} calories per day.`);
      results.push( `Your weight loss is approximately ${weightLoss.toFixed(
        0
      )} calories per day.`);
      results.push( `Your clear bulking is approximately ${clearBulking.toFixed(
        0
      )} calories per day.`);
      results.push( `Your dirty bulking is approximately ${dirtyBulking.toFixed(
        0
      )} calories per day.`);
    }

    setResult(results);
    


    // check empty values
    if (
      gender === "" &&
      height === "" &&
      weight === "" &&
      activity === "" &&
      age === ""
    ) {
      alert("Please enter your details");
    } else if (age === "") {
      alert("Please enter your age");
    } else if (gender === "") {
      alert("Please select your gender");
    } else if (height === "") {
      alert("Please enter your height");
    } else if (weight === "") {
      alert("Please enter your weight");
    } 
// check Conditions
    if (age < 15 || age > 100 && age !== "") {
      newErrors.push("Age must be between 15 and 100");
      return false
    }
    if (height > 250 || height < 50 && height !== "") {
      newErrors.push("Height must be between 50 and 250");
    }
    if (weight > 250 || weight < 50 && weight !== "") {
      newErrors.push('Weight must be between 50 and 250');
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };
  const resetForm = () => {
    setResult("");
    setAge(15);
    setGender("");
    setHeight("");
    setWeight("");
    setActivity("");
    setErrors([]);
  };

  return (
    <div className="container">
    
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Age{" \t "}
          <input
            type="text"
            placeholder="Enter Your Age"
              maxLength="3"
            value={age}
          
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Gender {" \t "}
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={(e) => setGender(e.target.value)}
            required
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={(e) => setGender(e.target.value)}
            required
          />{" "}
          Female
        </label>
        <br />
        <br />
        <label>
          Height
          <input
            type="text"
            placeholder="Enter Your Height in cm"
            maxLength="3"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Weight
          <input
            type="text"
            placeholder="Enter Your Weight in Kg"
            maxLength="3"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Activity Level:
          <select
            value={activity}
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
          <button type="button" onClick={calculateCalories}>
            Calculate
          </button>
          <button type="reset" onClick={resetForm}>
            clear
          </button>
        </div>
      </form>
      <div style={{ color: 'red' }}>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
          </div>
          // should work on the casse when the error showed then the result should not be shown
      <div className="resultContainer"> {setErrors != null && result && result.length > 0 ? (
    result.map((Result, index) => (
      <p key={index}>{Result}</p>
    ))
  ) : null}  {/* Render nothing if no results or errors */}
          </div>
    </div>
   
  );
}
