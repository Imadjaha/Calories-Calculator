// "use client";
// import React from "react";
// import "./CalculateForm.css";

// function Modal({ isVisible, errorMessage = null, result }) {
//   if (isVisible) {
//     return (
//       <div id="modal">
//         <div id="modal-content">
//           <h1 style={{ color: errorMessage ? "red" : "green" }}>
//             {errorMessage != null ? errorMessage : "Calculation Results"}
//           </h1>
          
//           {errorMessage == null && result && (
//             <div>
//               <p><strong>Maintenance Calories:</strong> {result.maintenanceCalories} kcal</p>
//               <p><strong>Pro Weight Loss:</strong> {result.proWeightLoss} kcal</p>
//               <p><strong>Weight Loss:</strong> {result.weightLoss} kcal</p>
//               <p><strong>Clear Bulking:</strong> {result.clearBulking} kcal</p>
//               <p><strong>Dirty Bulking:</strong> {result.dirtyBulking} kcal</p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
//   return null; // Return null if the modal is not visible
// }

// export default Modal;


"use client";
import React from "react";
import "./CalculateForm.css";

function Modal({ isVisible, errorMessage = null, result }) {
  if (isVisible) {
    return (
      <div id="modal" className="modal-overlay">
        <div id="modal-content" className="modal-box">
          <h1 className="modal-title" style={{ color: errorMessage ? "#FF6B6B" : "#4CAF50" }}>
            {errorMessage != null ? errorMessage : "Calculation Results"}
          </h1>
          
          {errorMessage == null && result && (
            <div className="modal-body">
              <p><strong>Maintenance Calories:</strong> {result.maintenanceCalories} kcal</p>
              <p><strong>Pro Weight Loss:</strong> {result.proWeightLoss} kcal</p>
              <p><strong>Weight Loss:</strong> {result.weightLoss} kcal</p>
              <p><strong>Clear Bulking:</strong> {result.clearBulking} kcal</p>
              <p><strong>Dirty Bulking:</strong> {result.dirtyBulking} kcal</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null; // Return null if the modal is not visible
}

export default Modal;
