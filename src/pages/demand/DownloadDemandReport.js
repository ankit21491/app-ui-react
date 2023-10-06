/* DownloadDemandReport.js */

// This function downloads a report based on the provided queryParams and reportType.
const downloadDemandReport = (queryParams, reportType) => {
  const token = localStorage.getItem('token');

  // Define the base URL for the report download endpoint.
  const baseUrl = 'http://localhost:8080/demand/exportDemandReport';

  // Add the 'reportType' parameter to the query parameters.
  queryParams.append('reportType', reportType);

  // Build the complete URL for the report download.
  const url = `${baseUrl}?${queryParams.toString()}`;

  // Perform a GET request to download the report.
  fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}` // Include the user's token in the request headers.
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob(); // Extract the response data as a binary blob.
    })
    .then((blob) => {
      // Create a URL for the blob data to be used for downloading.
      const blobUrl = window.URL.createObjectURL(blob);

      // Create an anchor element for initiating the download.
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.target = '_blank';
      anchor.download = `demand_report.${reportType.toLowerCase()}`; // Set the download file name.

      // Trigger the click event on the anchor to initiate the download.
      anchor.click();

      // Revoke the object URL to free up resources.
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => {
      console.error('API error:', error);
    });
};

export default downloadDemandReport;
