import React, { useState } from 'react'
import SearchBox from './SearchBox'
import CarDetails from './CarDetails'
import MOTHistory from './MOTHistory'
import VESDetails from './VESDetails'
import ErrorMessage from './ErrorMessage'
import { apiService, MOTResponse, VESResponse } from '../services/api'
import './CarChecker.css'

interface CarData {
  mot: MOTResponse
  ves: VESResponse
}

const CarChecker: React.FC = () => {
  const [carData, setCarData] = useState<CarData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (registration: string) => {
    setLoading(true)
    setError(null)
    setCarData(null)

    try {
      const data = await apiService.getCarData(registration)
      
      if (data.mot.error || data.ves.error) {
        setError(data.mot.error || data.ves.error || 'Failed to retrieve car data')
        return
      }

      setCarData(data)
    } catch (err) {
      console.error('Search error:', err)
      setError('Failed to search for vehicle. Please check the registration and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="car-checker-container">
      <div className="header">
        <h1>🚗 Car Checker</h1>
        <p>Check MOT history and vehicle details</p>
      </div>

      <SearchBox onSearch={handleSearch} loading={loading} />

      {error && <ErrorMessage message={error} />}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching for vehicle...</p>
        </div>
      )}

      {carData && (
        <div className="results">
          <CarDetails mot={carData.mot} ves={carData.ves} />
          <VESDetails ves={carData.ves} />
          <MOTHistory tests={carData.mot.motTests} />
        </div>
      )}
    </div>
  )
}

export default CarChecker
