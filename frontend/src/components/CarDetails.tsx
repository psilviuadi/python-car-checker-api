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
  const currentOdometer = latestMOT ? parseInt(latestMOT.odometerValue) : null

  return (
    <div className="car-details-card">
      <div className="car-header">
        <div className="car-info-left">
          <div className="uk-plate">
            <span className="plate-number">{mot.registration}</span>
          </div>
        </div>
        <div className="car-stats">
          <div className="stat">
            <span className="stat-icon">🚗</span>
            <span className="stat-value">{mot.make} {mot.model}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">📅</span>
            <span className="stat-value">{ves.yearOfManufacture}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">🎨</span>
            <span className="stat-value">{mot.primaryColour}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">⛽</span>
            <span className="stat-value">{mot.fuelType}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">🛣️</span>
            <span className="stat-value">{currentOdometer ? currentOdometer.toLocaleString() : 'N/A'} {latestMOT?.odometerUnit || 'miles'}</span>
          </div>
        </div>
        <div className="vehicle-status">
          <div className={`status-badge mot-${motStatus.toLowerCase()}`}>
            <span className="status-label">MOT</span>
            <span className="status-value">{motStatus}</span>
            <span className="status-date">
              {motExpiryDate && motExpiryDate !== 'N/A' 
                ? new Date(motExpiryDate).toLocaleDateString() 
                : 'N/A'}
            </span>
          </div>
          <div className={`status-badge tax-${ves.taxStatus.toLowerCase()}`}>
            <span className="status-label">Tax</span>
            <span className="status-value">{ves.taxStatus}</span>
            <span className="status-date">
              {new Date(ves.taxDueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetails
