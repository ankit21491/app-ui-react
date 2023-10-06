/* ExportButtons.js */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileExcel, faFileImage } from '@fortawesome/free-solid-svg-icons';
import './ExportButtons.css';

const ExportButtons = ({ buttonsVisible, onDownloadPDF, onDownloadExcel, onDownloadImage }) => {
  return (
    <div className={`button-container ${buttonsVisible ? 'random' : ''}`}>
      {buttonsVisible && (
        <>
          Export as:
          <button onClick={onDownloadPDF} className="download-button">
            <FontAwesomeIcon icon={faFilePdf} /> PDF
          </button>
          <button onClick={onDownloadExcel} className="download-button">
            <FontAwesomeIcon icon={faFileExcel} /> Excel
          </button>
          <button onClick={onDownloadImage} className="download-button">
            <FontAwesomeIcon icon={faFileImage} /> Image
          </button>
        </>
      )}
    </div>
  );
};

// prop types for the component
ExportButtons.propTypes = {
  buttonsVisible: PropTypes.bool.isRequired,
  onDownloadPDF: PropTypes.func.isRequired,
  onDownloadExcel: PropTypes.func.isRequired,
  onDownloadImage: PropTypes.func.isRequired
};

export default ExportButtons;
