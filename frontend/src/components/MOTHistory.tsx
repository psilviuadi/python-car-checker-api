import React from 'react'
import { MOTTest } from '../services/api'
import './MOTHistory.css'

interface MOTHistoryProps {
  tests: MOTTest[]
}

const MOTHistory: React.FC<MOTHistoryProps> = ({ tests }) => {
  if (!tests || tests.length === 0) {
    return (
      <div className="mot-history-card">
        <h3>MOT History</h3>
        <p className="no-data">No MOT records found.</p>
      </div>
    )
  }

  return (
    <div className="mot-history-card">
      <h3>MOT History ({tests.length} test{tests.length !== 1 ? 's' : ''})</h3>
      
      <div className="mot-tests">
        {tests.map((test, index) => (
          <div key={test.motTestNumber} className={`mot-test mot-${test.testResult.toLowerCase()}`}>
            <div className="mot-test-header">
              <div className="test-number">Test #{index + 1}</div>
              <div className={`test-result-badge result-${test.testResult.toLowerCase()}`}>
                {test.testResult}
              </div>
            </div>

            <div className="mot-test-details">
              <div className="detail-row">
                <span className="label">Test Number:</span>
                <span className="value">{test.motTestNumber}</span>
              </div>
              <div className="detail-row">
                <span className="label">Completed Date:</span>
                <span className="value">
                  {new Date(test.completedDate).toLocaleDateString()} at {new Date(test.completedDate).toLocaleTimeString()}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Expiry Date:</span>
                <span className="value">
                  {test.expiryDate ? new Date(test.expiryDate).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Odometer:</span>
                <span className="value">{test.odometerValue} {test.odometerUnit}</span>
              </div>
              <div className="detail-row">
                <span className="label">Odometer Type:</span>
                <span className="value">{test.odometerResultType}</span>
              </div>
              <div className="detail-row">
                <span className="label">Data Source:</span>
                <span className="value">{test.dataSource}</span>
              </div>
            </div>

            {test.defects && test.defects.length > 0 && (
              <div className="defects-section">
                <h4>Defects ({test.defects.length})</h4>
                <div className="defects-list">
                  {test.defects.map((defect, defectIndex) => (
                    <div key={defectIndex} className={`defect defect-${defect.type.toLowerCase()}`}>
                      <div className="defect-type">
                        <span className={`type-badge type-${defect.type.toLowerCase()}`}>
                          {defect.type}
                        </span>
                        {defect.dangerous && <span className="dangerous-badge">⚠️ DANGEROUS</span>}
                      </div>
                      <p className="defect-text">{defect.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MOTHistory
