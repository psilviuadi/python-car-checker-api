import React from 'react'
import './ErrorMessage.css'

interface ErrorMessageProps {
  message: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="error-message">
      <span className="error-icon">⚠️</span>
      <div className="error-content">
        <h3>Error</h3>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default ErrorMessage
