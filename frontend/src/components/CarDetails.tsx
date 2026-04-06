import React from 'react'
import { MOTResponse, VESResponse } from '../services/api'
import './CarDetails.css'

interface CarDetailsProps {
  mot: MOTResponse
  ves: VESResponse
}

const CarDetails: React.FC<CarDetailsProps> = ({ mot, ves }) => {
  const latestMOT = mot.motTests.length > 0 ? mot.motTests[0] : null
  const motStatus = latestMOT ? latestMOT.testResult : 'Unknown'
  const motExpiryDate = latestMOT ? latestMOT.expiryDate : 'N/A'
  
  // Calculate MTG (Miles To Go) - rough estimate
  const estimateAnnualMileage = 12000
  const currentOdometer = latestMOT ? parseInt(latestMOT.odometerValue) : null
  const yearsSinceManufacture = new Date().getFullYear() - ves.yearOfManufacture
  const estimatedTotalMileage = yearsSinceManufacture * estimateAnnualMileage
  const mtgEstimate = currentOdometer 
    ? Math.max(0, estimatedTotalMileage - currentOdometer)
    : null

  return (
    <div className="car-details-card">
      <div className="car-header">
        <div className="car-info">
          <h2>{mot.make} {mot.model}</h2>
          <p className="registration">{mot.registration}</p>
          <p className="year">Year: {ves.yearOfManufacture}</p>
        </div>
        <div className="vehicle-status">
          <div className={`status-badge mot-${motStatus.toLowerCase()}`}>
            <span className="status-label">MOT Status</span>
            <span className="status-value">{motStatus}</span>
          </div>
          <div className={`status-badge tax-${ves.taxStatus.toLowerCase()}`}>
            <span className="status-label">Tax Status</span>
            <span className="status-value">{ves.taxStatus}</span>
          </div>
        </div>
      </div>

      <div className="car-props-grid">
        <div className="car-prop">
          <label>Fuel Type</label>
          <value>{mot.fuelType}</value>
        </div>
        <div className="car-prop">
          <label>Color</label>
          <value>{mot.primaryColour}</value>
        </div>
        <div className="car-prop">
          <label>Engine Size</label>
          <value>{mot.engineSize}cc</value>
        </div>
        <div className="car-prop">
          <label>MOT Expiry</label>
          <value>{motExpiryDate ? new Date(motExpiryDate).toLocaleDateString() : 'N/A'}</value>
        </div>
        <div className="car-prop">
          <label>Tax Due Date</label>
          <value>{new Date(ves.taxDueDate).toLocaleDateString()}</value>
        </div>
        {mtgEstimate !== null && (
          <div className="car-prop">
            <label>Est. Miles to Go</label>
            <value>{mtgEstimate.toLocaleString()}</value>
          </div>
        )}
      </div>
    </div>
  )
}

export default CarDetails
