import React, { useState, useMemo, useEffect } from 'react'
import Select from 'react-select'
import countryList from "react-select-country-list"
import styles from "./styles/CountrySelector.module.css"
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect'

function CountrySelector(props) {
  const options = useMemo(() => countryList().getData(), [])
  const [value, setValue] = useState({})

  const handleChange = (val) =>{
    console.log(val)
    setValue(val)
  }

  return <Select 
    styles={{
    control: (baseStyles, state) => ({
      ...baseStyles,
      border: state.isDisabled ? '1px solid #D4D7E3' : '1px solid #626E95',
      margin: '5px 10px',
      color: '#3F4665',
      backgroundColor: 'transparent',
      fontSize: '1rem',
      fontWeight: '600',
      borderRadius: '8px',
      padding: '4px',
    }),
  }}
  options={options} value={value} inputId={props.id} onChange={(selectedOption) => handleChange(selectedOption)} isDisabled={props.dis} />
}

export default CountrySelector
