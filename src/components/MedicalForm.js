import React from 'react'
import {ethers} from "ethers"
import { medicAbi } from '../constant'
import { useState } from 'react';

function MedicalForm() {
    const [patientName, setPatientName] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [prescription, setPrescription] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");


    
  const handleUpload = async (event) => {
    event.preventDefault();
    try {
      if (window.ethereum) {
        // Connect to the Ethereum provider (MetaMask)
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Get the contract instance
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0xd5fc7752ad00ec7b30b84ad46892ad4d41d231fa", // Replace with the actual contract address on the deployed network
          medicAbi.abi,
          signer
        );

        // Call the addMedicalRecord function on the contract
        await contract.addMedicalRecord(
          patientName,
          diagnosis,
          prescription,
          gender,
          parseInt(age)
        );

        // Reset form fields after successful upload
        setPatientName("");
        setDiagnosis("");
        setPrescription("");
        setGender("");
        setAge("");
      } else {
        alert("Please install MetaMask to interact with the smart contract.");
      }
    } catch (error) {
      // Handle errors, if any
      console.error("Error uploading medical record:", error);
    }
  };
  return (
    <div>
              <h2>Upload Medical Record</h2>
      <form onSubmit={handleUpload}>
        {/* Form fields for patient name, diagnosis, prescription, gender, and age */}
        <label>
          Patient Name:
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </label>
        <label>
          Diagnosis:
          <input
            type="text"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </label>
        <label>
          Prescription:
          <input
            type="text"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <button type="submit">Upload</button>
      </form>

      
    </div>
  )
}

export default MedicalForm
