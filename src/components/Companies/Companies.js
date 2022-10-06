import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCompanies } from '../../features/companies/companiesAPI'
import {
  addCompanies,
  getAllCompanies,
} from '../../features/companies/companiesSlice'
import Company from '../Company/Company'
import './Companies.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Companies = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchData() {
      const response = await fetchCompanies()
      dispatch(addCompanies(response.data))
    }
    fetchData()
  }, [])
  const companies = useSelector(getAllCompanies)
  return (
    <div className="companies-page">
      <div className="companies-page-container">
        <div className="companies-page-header-container">
          <h1 className="companies-page-header">Şirketler</h1>
        </div>
        <div className="companies-page-search-container">
          <div className="companies-page-search-inner-container">
            <input
              type="text"
              className="companies-page-search-input"
              placeholder="Pozisyon adı veya lokasyon"
            />
            <div className="companies-page-search-input-icon-container">
              <FontAwesomeIcon icon={faSearch} size="lg" />
            </div>
          </div>
        </div>
        <div className="companies-page-companies-container">
          {companies.map((company) => {
            return <Company company={company} key={company._id} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Companies
