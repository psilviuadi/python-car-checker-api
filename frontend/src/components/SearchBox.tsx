import React, { useState } from 'react'
import './SearchBox.css'

interface SearchBoxProps {
  onSearch: (registration: string) => void
  loading: boolean
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, loading }) => {
  const [registration, setRegistration] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (registration.trim()) {
      onSearch(registration.trim().toUpperCase())
    }
  }

  return (
    <div className="search-box-wrapper">
      <form className="search-box" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter registration (e.g., GP56FBF)"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            disabled={loading}
            className="registration-input"
            maxLength={7}
          />
          <button
            type="submit"
            disabled={loading || !registration.trim()}
            className="search-button"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBox
