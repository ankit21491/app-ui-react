/* DemandDataComponent.js */

import React, { useState, useEffect } from 'react';
import DemandPageComponent from './DemandPageComponent';
import MultiSelect from 'multiselect-react-dropdown';
import downloadDemandReport from './DownloadDemandReport';
import ScrollToTopButton from 'pages/common-utils/ScrollToTopButton';
import ExportButtons from 'pages/common-utils/ExportButtons';
import 'pages/common-utils/common.css';

const DemandDataComponent = () => {
  // State variables to manage various filter inputs and data
  const [locations, setLocations] = useState([]); // Stores the available location options
  const [selectedLocations, setSelectedLocations] = useState([]); // Stores the selected location filter
  const [roleType, setRoleType] = useState([]); // Stores the available role type options
  const [selectedRoleType, setSelectedRoleType] = useState([]); // Stores the selected role type filter
  const [roleStartDateFrom, setRoleStartDateFrom] = useState(''); // Stores the start date filter for role dates
  const [roleStartDateTo, setRoleStartDateTo] = useState(''); // Stores the end date filter for role dates
  const [bgvInitiatedDate, setBgvInitiatedDate] = useState(''); // Stores the BGV initiated date filter
  const [demandReportData, setDemandReportData] = useState([]); // Stores the fetched demand report data

  // Retrieve the authentication token from local storage
  const token = localStorage.getItem('token');

  // State variable to control the visibility of PDF and Excel buttons
  const [buttonsVisible, setButtonsVisible] = useState(false);

  // useEffect to fetch initial filter values from an API
  useEffect(() => {
    fetch('http://localhost:8080/demand/filterValues', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setLocations(data.work_locations);
        setRoleType(data.role_types);
      })
      .catch((error) => {
        console.error('API error:', error);
      });
  }, [token]);

  // Event handlers for input changes
  const handleRoleStartDateFromChange = (event) => {
    setRoleStartDateFrom(event.target.value);
  };

  const handleRoleStartDateToChange = (event) => {
    setRoleStartDateTo(event.target.value);
  };

  const handleBgvInitiatedDateChange = (event) => {
    setBgvInitiatedDate(event.target.value);
  };

  // Function to generate the report based on filter criteria
  const handleGenerateReport = () => {
    const baseUrl = 'http://localhost:8080/demand/generateDemandReport';
    const queryParams = new URLSearchParams();

    // Add selected locations to the query parameters
    const myLocations = selectedLocations.join(',');
    queryParams.append('location', myLocations);

    // Add selected role types to the query parameters
    const roleTypeGroup = selectedRoleType.join(',');
    queryParams.append('roleTypeGroup', roleTypeGroup);

    // Format role start date for the query parameters
    const startDateParts = roleStartDateFrom.split('-');
    queryParams.append('roleStartDateFrom', `${startDateParts[1]}/${startDateParts[0]}`);

    // Format role end date for the query parameters
    const endDateParts = roleStartDateTo.split('-');
    queryParams.append('roleStartDateTo', `${endDateParts[1]}/${endDateParts[0]}`);

    // Construct the full URL with query parameters
    const url = `${baseUrl}?${queryParams.toString()}`;

    // Fetch data based on the constructed URL
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('API response:', data);
        setDemandReportData(data);
        console.log(demandReportData);
        setButtonsVisible(true); // Enable Export buttons after data is fetched
      })
      .catch((error) => {
        console.error('API error:', error);
      });

    console.log('Generating report...', url);
  };

  // Event handler for downloading the report as PDF
  const handleDownloadPDF = () => {
    const queryParams = new URLSearchParams();
    queryParams.append('location', selectedLocations.join(','));
    queryParams.append('roleTypeGroup', selectedRoleType.join(','));
    queryParams.append('roleStartDateFrom', `${roleStartDateFrom.split('-')[1]}/${roleStartDateFrom.split('-')[0]}`);
    queryParams.append('roleStartDateTo', `${roleStartDateTo.split('-')[1]}/${roleStartDateTo.split('-')[0]}`);

    // Call the downloadDemandReport function with reportType 'PDF'
    downloadDemandReport(queryParams, 'PDF');
    alert('Downloading as PDF...');
  };

  // Event handler for downloading the report as Excel
  const handleDownloadExcel = () => {
    const queryParams = new URLSearchParams();
    queryParams.append('location', selectedLocations.join(','));
    queryParams.append('roleTypeGroup', selectedRoleType.join(','));
    queryParams.append('roleStartDateFrom', `${roleStartDateFrom.split('-')[1]}/${roleStartDateFrom.split('-')[0]}`);
    queryParams.append('roleStartDateTo', `${roleStartDateTo.split('-')[1]}/${roleStartDateTo.split('-')[0]}`);

    // Call the downloadDemandReport function with reportType 'XLS'
    downloadDemandReport(queryParams, 'XLS');
    alert('Downloading as Excel...');
  };

  // Event handler for downloading the report as an image
  const handleDownloadImage = () => {
    alert('Downloading as Image...');
  };

  // Transform location and roleType data for dropdowns
  const dropdownLocationOptions = [
    { value: 'selectAll', label: 'All' }, // Add this option
    ...Object.entries(locations).map(([value, label]) => ({
      value,
      label
    }))
  ];

  const dropdownRoleTypeOptions = Object.entries(roleType).map(([value, label]) => ({
    value,
    label
  }));

  // Event handler for selecting items in the Multiselect dropdown for locations
  const onSelectLocation = (selectedList, selectedItem) => {
    if (selectedItem.value === 'selectAll') {
      // If "All" is selected, set selectedLocations to all location values
      const allLocationValues = Object.keys(locations);
      setSelectedLocations(allLocationValues);
    } else {
      // Otherwise, update selectedLocations as before
      setSelectedLocations([...selectedLocations, selectedItem.value]);
    }
  };

  // Event handler for removing items in the Multiselect dropdown for locations
  const onRemoveLocation = (selectedList, removedItem) => {
    if (removedItem.value === 'selectAll') {
      // If "All" is removed, clear selectedLocations
      setSelectedLocations([]);
    } else {
      // Otherwise, update selectedLocations as before
      const updatedLocations = selectedLocations.filter((item) => item !== removedItem.value);
      setSelectedLocations(updatedLocations);
    }
  };

  // Event handler for selecting items in the Multiselect dropdown for role types
  const onSelectRoleType = (selectedList, selectedItem) => {
    setSelectedRoleType([...selectedRoleType, selectedItem.value]);
  };

  // Event handler for removing items in the Multiselect dropdown for role types
  const onRemoveRoleType = (selectedList, removedItem) => {
    const updatedRoleTypes = selectedRoleType.filter((item) => item !== removedItem.value);
    setSelectedRoleType(updatedRoleTypes);
  };

  // Render the filter inputs and the report component
  return (
    <>
      <div className="center-content">
        <div className="multiselect-container">
          <div className="dropdown-row">
            <div className="dropdown-column">
              <label htmlFor="location">Location:</label>
              <MultiSelect options={dropdownLocationOptions} onSelect={onSelectLocation} onRemove={onRemoveLocation} displayValue="label" />
            </div>
            <div className="dropdown-column">
              <label htmlFor="roleType">Role Type:</label>
              <MultiSelect options={dropdownRoleTypeOptions} onSelect={onSelectRoleType} onRemove={onRemoveRoleType} displayValue="label" />
            </div>
          </div>
        </div>
        <div className="date-container">
          <div className="date-row">
            <div className="date-column">
              <label htmlFor="roleStartDateFrom">Role Start From:</label>
              <input
                type="date"
                id="roleStartDateFrom"
                className="date-input"
                value={roleStartDateFrom}
                onChange={handleRoleStartDateFromChange}
              />
            </div>
            <div className="date-column">
              <label htmlFor="roleStartDateTo">Role Start To:</label>
              <input
                type="date"
                id="roleStartDateTo"
                className="date-input"
                value={roleStartDateTo}
                onChange={handleRoleStartDateToChange}
              />
            </div>
            <div className="date-column">
              <label htmlFor="bgvInitiatedDate">BGV initiated date:</label>
              <input
                type="date"
                id="bgvInitiatedDate"
                className="date-input"
                value={bgvInitiatedDate}
                onChange={handleBgvInitiatedDateChange}
              />
            </div>
          </div>
        </div>
        <div>
          <br />
          <button className="generate-button" onClick={handleGenerateReport}>
            Generate Report
          </button>
          <br />
        </div>
      </div>
      <ExportButtons
        buttonsVisible={buttonsVisible}
        onDownloadPDF={handleDownloadPDF}
        onDownloadExcel={handleDownloadExcel}
        onDownloadImage={handleDownloadImage}
      />
      <br />
      <div>
        <DemandPageComponent data={demandReportData} />
      </div>
      <br />
      <br />
      <div>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default DemandDataComponent;
