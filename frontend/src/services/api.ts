import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

export interface MOTDefect {
  dangerous: boolean
  text: string
  type: 'FAIL' | 'ADVISORY'
}

export interface MOTTest {
  registrationAtTimeOfTest: string
  motTestNumber: string
  completedDate: string
  expiryDate: string | null
  odometerValue: string
  odometerUnit: string
  odometerResultType: string
  testResult: 'PASSED' | 'FAILED'
  dataSource: string
  defects: MOTDefect[]
}

export interface MOTResponse {
  registration: string
  make: string
  model: string
  firstUsedDate: string
  fuelType: string
  primaryColour: string
  registrationDate: string
  manufactureDate: string
  engineSize: string
  hasOutstandingRecall: string
  motTests: MOTTest[]
  error?: string
}

export interface VESResponse {
  registrationNumber: string
  taxStatus: string
  taxDueDate: string
  motStatus: string
  make: string
  yearOfManufacture: number
  engineCapacity: number
  co2Emissions: number
  fuelType: string
  markedForExport: boolean
  colour: string
  typeApproval: string
  dateOfLastV5CIssued: string
  motExpiryDate: string
  wheelplan: string
  monthOfFirstRegistration: string
  error?: string
}

export const apiService = {
  getMOTHistory: async (registration: string): Promise<MOTResponse> => {
    try {
      const response = await axios.get<MOTResponse>(
        `${API_BASE_URL}/mot/${registration}`
      )
      return response.data
    } catch (error) {
      console.error('Error fetching MOT history:', error)
      throw error
    }
  },

  getVESData: async (registration: string): Promise<VESResponse> => {
    try {
      const response = await axios.get<VESResponse>(
        `${API_BASE_URL}/ves/${registration}`
      )
      return response.data
    } catch (error) {
      console.error('Error fetching VES data:', error)
      throw error
    }
  },

  getCarData: async (registration: string) => {
    try {
      const [motData, vesData] = await Promise.all([
        apiService.getMOTHistory(registration),
        apiService.getVESData(registration),
      ])
      return { mot: motData, ves: vesData }
    } catch (error) {
      console.error('Error fetching car data:', error)
      throw error
    }
  }
}
