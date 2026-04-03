import React from 'react'
import { VESResponse } from '../services/api'
import './VESDetails.css'

interface VESDetailsProps {
  ves: VESResponse
}

const VESDetails: React.FC<VESDetailsProps> = ({ ves }) => {
  return (
    <div className="ves-details-card">
      <h3>DVLA VES Data</h3>
      
      <div className="ves-grid">
        <div className="ves-item">
          <label>Registration Number</label>
          <value>{ves.registrationNumber}</value>
        </div>
        <div className="ves-item">
          <label>Tax Status</label>
          <value className={`tax-${ves.taxStatus.toLowerCase()}`}>
            {ves.taxStatus}
          </value>
        </div>
        <div className="ves-item">
          <label>MOT Status</label>
          <value className={`mot-${ves.motStatus.toLowerCase()}`}>
            {ves.motStatus}
          </value>
        </div>
        <div className="ves-item">
          <label>Tax Due Date</label>
          <value>{new Date(ves.taxDueDate).toLocaleDateString()}</value>
        </div>
        <div className="ves-item">
          <label>MOT Expiry Date</label>
          <value>{new Date(ves.motExpiryDate).toLocaleDateString()}</value>
        </div>
        <div className="ves-item">
          <label>Year of Manufacture</label>
          <value>{ves.yearOfManufacture}</value>
        </div>
        <div className="ves-item">
          <label>Engine Capacity</label>
          <value>{ves.engineCapacity}cc</value>
        </div>
        <div className="ves-item">
          <label>Fuel Type</label>
          <value>{ves.fuelType}</value>
        </div>
        <div className="ves-item">
          <label>CO2 Emissions</label>
          <value>{ves.co2Emissions}g/km</value>
        </div>
        <div className="ves-item">
          <label>Colour</label>
          <value>{ves.colour}</value>
        </div>
        <div className="ves-item">
          <label>Wheelplan</label>
          <value>{ves.wheelplan}</value>
        </div>
        <div className="ves-item">
          <label>Type Approval</label>
          <value>{ves.typeApproval}</value>
        </div>
        <div className="ves-item">
          <label>Date of Last V5C</label>
          <value>{new Date(ves.dateOfLastV5CIssued).toLocaleDateString()}</value>
        </div>
        <div className="ves-item">
          <label>Month of First Registration</label>
          <value>{ves.monthOfFirstRegistration}</value>
        </div>
        <div className="ves-item">
          <label>Marked for Export</label>
          <value>{ves.markedForExport ? 'Yes' : 'No'}</value>
        </div>
      </div>
    </div>
  )
}

export default VESDetails
