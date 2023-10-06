import React, { useState, useEffect } from 'react';
import ScrollToTopButton from 'pages/common-utils/ScrollToTopButton.js';
import ExportButtons from 'pages/common-utils/ExportButtons';
import MultiSelect from 'multiselect-react-dropdown';
import PipelinePageComponent from './PipelinePageComponent';
import 'pages/common-utils/common.css';

const PipelineDataComponent = () => {
  // State variables to manage filter inputs, generated data, and visibility of buttons
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [generatedData, setGeneratedData] = useState([]);
  const accessToken = localStorage.getItem('token');

  // State variable to control the visibility of PDF and Excel buttons
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    // Fetch categories from the server when the component mounts or when accessToken changes
    const fetchCategories = async () => {
      if (!accessToken) return;

      const categoriesUrl = 'http://localhost:8080/demand/filterValues';

      try {
        const response = await fetch(categoriesUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          const categoryValues = Object.values(data.role_types);
          setCategories(categoryValues);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCategories();
  }, [accessToken]);

  const handleGenerate = async () => {
    // Check if "All" is selected
    const isAllSelected = selectedCategories.some((category) => category.label === 'All');
    let selectedCategoryNames = [];

    if (isAllSelected) {
      // If "All" is selected, use all available category names
      selectedCategoryNames = categories;
    } else {
      // Extract category names from selectedCategories
      selectedCategoryNames = selectedCategories.map((category) => category.label);
    }

    try {
      // Send a POST request to generate data based on selected categories
      const response = await fetch('http://localhost:8080/pipeline/distribution', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedCategoryNames)
      });

      if (response.ok) {
        const generatedData = await response.json();
        setGeneratedData(generatedData);
        setButtonsVisible(true); // Show PDF and Excel buttons
      } else {
        console.error('Failed to generate data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDownloadPDF = () => {
    // Placeholder function for downloading as PDF
    alert('Downloading as PDF...');
  };

  // Event handler for downloading the report as Excel
  const handleDownloadExcel = () => {
    // Placeholder function for downloading as Excel
    alert('Downloading as Excel...');
  };

  const handleDownloadImage = () => {
    // Placeholder function for downloading as Image
    alert('Downloading as Image...');
  };

  return (
    <div>
      <div className="center-content">
        <div className="multiselect-container">
          <div className="dropdown-column">
            <label htmlFor="roleType">Role Type:</label>
            <MultiSelect
              options={categories.map((category) => ({ label: category, value: category }))}
              selectedValues={selectedCategories}
              onSelect={(selectedList) => setSelectedCategories(selectedList)}
              onRemove={(selectedList) => setSelectedCategories(selectedList)}
              displayValue="label"
            />
          </div>
        </div>
        <button className="generate-button" onClick={handleGenerate}>
          Generate Report
        </button>
        <br />
      </div>

      {/* Component for exporting data as PDF, Excel, and Image */}
      <ExportButtons
        buttonsVisible={buttonsVisible}
        onDownloadPDF={handleDownloadPDF}
        onDownloadExcel={handleDownloadExcel}
        onDownloadImage={handleDownloadImage}
      />

      <br />
      {/* Component to display the generated pipeline data */}
      <PipelinePageComponent pipelineTableData={generatedData} />
      <br />
      <br />
      <ScrollToTopButton />
    </div>
  );
};

export default PipelineDataComponent;
