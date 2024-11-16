import React, { useRef, useState } from "react";
import "./Import.css";
import { BiRightArrowAlt } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faFileAlt,
 
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx"; 
import { toast } from 'react-toastify';

function ImportFile({ show, handleClose }) {
  const [isExiting, setIsExiting] = useState(false);
  const inputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [showColumns, setShowColumns] = useState(false);
  const [mappedColumns, setMappedColumns] = useState({});
  const [fileColumns, setFileColumns] = useState([]); // To hold the columns from the file
  const [fileData, setFileData] = useState([]);
  const [editColumn, setEditColumn] = useState([]);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [skippedColumns, setSkippedColumns] = useState(new Set());
  const [isFileInfoVisible, setIsFileInfoVisible] = useState(true);
  const [showMore, setShowMore] = useState(false);

  const predefinedColumns = ["Name", "Email", "Phone"]; // Example of expected columns
  const matchedColumns = ["Name", "Email", "Phone"]; // Example matched columns

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      handleClose();
      resetModalStates();
      setIsExiting(false);
    }, 400);
  };


  const resetModalStates = () => {
    setSelectedFile(null);
    setError("");
    setShowColumns(false);
    setFileColumns([]);
    setFileData([]); 
    setMappedColumns({}); 
    setSkippedColumns(new Set()); 
    setIsFileInfoVisible(true); 
    setEditColumn([]); 
    setCurrentEditIndex(null);
  };


  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const allowedFormats = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];

      if (!allowedFormats.includes(file.type)) {
        setError(
          "Unsupported file format. Please select an xls, xlsx, or csv file."
        );
        setSelectedFile(null);
      } else {
        setError(""); // Reset error
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          const [headings, ...rows] = jsonData;
          setFileColumns(headings);
          setFileData(rows);
        };
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const displayedValues = showMore ? fileData : fileData.slice(0, 4);

  const triggerFileInput = () => {
    inputRef.current.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError("");
    setShowColumns(false);
  };

  const handleBack = () => {
    if (showColumns) {
      
      setShowColumns(false);
      setIsFileInfoVisible(true); 
      setCurrentEditIndex(null);
    } else if (selectedFile) {
     
      removeFile(); 
    } else {
      
      handleClose();
    }
  };

  const handleBackCol = (index) => {
    setEditColumn((prev) => prev.filter((colIndex) => colIndex !== index));
    const previousIndex = index - 1;
    if (previousIndex >= 0) {
      setCurrentEditIndex(previousIndex); 
      setEditColumn((prev) => [...prev, previousIndex]); 
    }
  };

  const handleSave = (index) => {
    console.log(`Saving column mapping for index: ${index}`);
    handleBackCol(index); // Exit edit mode after saving
  };

  const handleEditColumn = (index) => {
    setEditColumn((prev) =>
      prev.includes(index)
        ? prev.filter((colIndex) => colIndex !== index)
        : [...prev, index]
    );
  };

  const handleSkipColumn = (index) => {
    setSkippedColumns((prev) => new Set(prev).add(index));
    setEditColumn((prev) => prev.filter((colIndex) => colIndex !== index));
  };

  const handleColumnMapping = (index, value) => {
    const updatedColumns = { ...mappedColumns };
    updatedColumns[index] = value;
    setMappedColumns(updatedColumns);
  };

  const handleUploadAndNextStep = () => {
    if (!selectedFile) {
      setError("Please select a file before proceeding.");
      return;
    }
    setShowColumns(true);
    setIsFileInfoVisible(false);
  };

  const isColumnMatched = (column) => {
    return matchedColumns.includes(column);
  };


  const handleSubmit = () => {
  // Add your submit logic here, e.g., sending data to the server
  console.log("Submitting data...");
  // Example: send the mappedColumns and other necessary data to the backend
};

  if (!show && !isExiting) {
    return null;
  }

  return (
    <div className={`modalWrapperImport ${isExiting ? "exiting" : ""}`}>
      <div className="modalContainerImport">
        <div>
          <button onClick={handleExit} className="btnCloseImport">
            &times;
          </button>
        </div>

        <div className="modalImport">
          <div className="content-import">
            <h3 className="import-heading" id="lead-form-title">
              Import Leads
            </h3>
            <div className="import-form">
              <div className="import-header">
                <h4>Import Leads</h4>
                <hr />
              </div>

              <div className="import-body">
                {!selectedFile ? (
                  <>
                    <label>Upload File (must be of type: xls, xlsx, csv)</label>
                    <div
                      className="file-upload-container"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <button type="button" onClick={triggerFileInput}>
                        <FontAwesomeIcon icon={faCloudArrowUp} />
                        Choose File
                      </button>

                      <input
                        ref={inputRef}
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        accept=".xls, .xlsx, .csv"
                      />

                      {error && (
                        <p className="error-message" style={{ color: "red" }}>
                          {error}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {isFileInfoVisible && (
                      <div
                        className="file-info"
                        onMouseEnter={() => setIsHovered(true)} // Set hover state on this div
                        onMouseLeave={() => setIsHovered(false)} // Set hover state on this div
                      >
                        <FontAwesomeIcon
                          icon={faFileAlt}
                          className="file-icon"
                        />
                        <span className="file-name">{selectedFile.name}</span>

                        {/* Show file backdrop when hovering over the uploaded file info */}
                        {isHovered && (
                          <div className="file-backdrop">
                            <button
                              className="remove-button"
                              onClick={removeFile}
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    {showColumns && (
                      <div>
                        <p className="mt-3">
                          Please sort the data you have uploaded by matching the
                          columns in the CSV to the fields in the associated
                          fields.
                        </p>
                        <div className="columns-container">
                          <table>
                            <tbody>
                              <tr className="table-body">
                                {fileColumns.map((column, index) => (
                                  <td className="table-data" key={index}>
                                    <div className="table-row importBox">
                                      <div className="column-status">
                                        <p
                                          className={
                                            isColumnMatched(column)
                                              ? "matchedColumn"
                                              : "unmatchedWarning"
                                          }
                                        >
                                          {isColumnMatched(column)
                                            ? column
                                            : "(Unmatched Column)"}
                                        </p>
                                        {skippedColumns.has(index) &&
                                          !editColumn.includes(index) && (
                                            <p className="alert alert-warning notimported">
                                              Will not be Imported
                                            </p>
                                          )}
                                      </div>
                                      <div className="column-actions">
                                        {editColumn.includes(index) ? (
                                          <div className="edit-column-dropdown">
                                            <select
                                              value={mappedColumns[index] || ""}
                                              onChange={(e) =>
                                                handleColumnMapping(
                                                  index,
                                                  e.target.value
                                                )
                                              }
                                            >
                                              <option value="">
                                                Select Column
                                              </option>
                                              {predefinedColumns.map((col) => (
                                                <option key={col} value={col}>
                                                  {col}
                                                </option>
                                              ))}
                                            </select>

                                            <div className="button-container">
                                              <button
                                                onClick={() =>
                                                  handleBackCol(index)
                                                }
                                                className="back-button"
                                              >
                                                Back
                                              </button>
                                              <button
                                                onClick={() =>
                                                  handleSave(index)
                                                }
                                                className="save-button"
                                              >
                                                Save
                                              </button>

                                              <button
                                                className="skip-button"
                                                onClick={() =>
                                                  handleSkipColumn(index)
                                                }
                                              >
                                                Skip
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <>
                                            <button
                                              className="edit-button"
                                              onClick={() =>
                                                handleEditColumn(index)
                                              }
                                            >
                                              Edit
                                            </button>
                                            {!skippedColumns.has(index) && (
                                              <button
                                                className="skip-button"
                                                onClick={() =>
                                                  handleSkipColumn(index)
                                                }
                                              >
                                                Skip
                                              </button>
                                            )}
                                          </>
                                        )}
                                      </div>
                                      <div className="column-name">
                                        <span>{column}</span>
                                        <div className="column-values">
                                          {displayedValues.map(
                                            (row, rowIndex) => (
                                              <span
                                                key={rowIndex}
                                                className="column-value"
                                                style={{
                                                  marginBottom: `${
                                                    (rowIndex + 1) * 5
                                                  }px`,
                                                }} // Increase bottom margin progressively
                                              >
                                                {row[index]}
                                              </span>
                                            )
                                          )}
                                          {/* {fileData.length > 4 && !showMore && (
                                            <button
                                              className="show-more"
                                              onClick={() => setShowMore(true)}
                                            >
                                              Show More
                                            </button>
                                          )} */}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                ))}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="button-group" id="import-button-group">
              {showColumns ? (
    <button type="button" className="btn-submit" onClick={handleSubmit}>
      Submit
    </button>
  ) : (
    <button type="button" className="btn-upload-next" onClick={handleUploadAndNextStep}>
      <BiRightArrowAlt />
      Upload and Move to Next Step
    </button>
  )}
                <button type="button" className="btn-back" onClick={handleBack}>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportFile;
