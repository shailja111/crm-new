import React, { useEffect, useRef, useState } from 'react';
import './FilesView.css';
import { FaFileExcel } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

function FilesView() {
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); // Temp state for selected files

  const dropdownRefs = useRef([]);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleView = (file) => {
    console.log('Downloading file:', file);

    // Create an anchor element to simulate a download link
    const link = document.createElement('a');

    // You can either use file URL if you have one, or simulate downloading a file
    const fileUrl = URL.createObjectURL(file); // If `file` is a Blob or File object
    link.href = fileUrl;
    link.download = file.name; // Set the download attribute with the file name

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up the URL object after download
    URL.revokeObjectURL(fileUrl);
    setActiveDropdownIndex(null);
  };


  const handleDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index); // Remove the file at the specified index
    setFiles(updatedFiles);
    setActiveDropdownIndex(null); // Close any active dropdown after deletion
  };

  const toggleDropdown = (index) => {
    setActiveDropdownIndex(activeDropdownIndex === index ? null : index);
  };


  const handleFileUpload = (event) => {
    const selected = Array.from(event.target.files);
    setSelectedFiles(selected);
  };


  const handleFileConfirmUpload = () => {
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setSelectedFiles([]);
    handleModalClose();
  };

  const handleRemoveSelectedFile = (fileToRemove) => {
    setSelectedFiles((prevFiles) => prevFiles.filter(file => file !== fileToRemove));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeDropdownIndex !== null &&
        dropdownRefs.current[activeDropdownIndex] &&
        !dropdownRefs.current[activeDropdownIndex].contains(event.target)
      ) {
        setActiveDropdownIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdownIndex]);

  return (
    <div className="row">
      <div className='file-div'>
        <div className='row'>
          <div className="file-upload-area text-center mb-3 col-md-3">
            <button type="button" className=" btn-primary-upload-file" onClick={handleModalShow}>
              <span><FaPlus className='svg-plus-sign' /></span>
              Upload
            </button>
          </div>
        </div>

        <div className='row'>
          <div className="file-drop-area d-flex flex-wrap">
            {files.map((file, index) => (
              <div key={file.name} className='wrap-file-drop-area '> {/* Use a unique key */}
                <div className="file-preview mb-3 ml-5">
                  <div> <FaFileExcel className='file-svg' /></div>
                  <div><p className="text-truncate file-name">{file.name}</p></div>
                  <div
                    className='dropdown-file'
                    ref={(el) => (dropdownRefs.current[index] = el)} // Store each dropdown ref separately
                  >
                    <button
                      className='btn-threedots'
                      onClick={() => toggleDropdown(index)}
                    >
                      <BsThreeDots className='dots-svg' />
                    </button>
                    {activeDropdownIndex === index && (
                      <ul className='dropdown-menu-file-toggle'>
                        <li>
                          <button className="dropdown-item-file btn-design-1" onClick={() => handleView(file)}>View</button>
                        </li>
                        <li>
                          <button className="dropdown-item-file btn-design-2" onClick={() => handleDelete(index)}>Delete</button> {/* Pass index or unique identifier to delete */}
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal for file upload */}
      {showModal && (
        <>
          <div className="custom-modal fade show" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">Upload Files</h5>
                  <button type="button" className="close-view" aria-label="Close" onClick={handleModalClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>

                </div>
                <p className='modal-body-title'><label class="f-14 text-dark-grey mb-12 mr-2" data-label="1" for="file-upload-dropzone">Add File
                  <sup class="f-14 mr-2 require-icon">*</sup>

                </label></p>
                <div className="modal-body">

                  <div className="file-upload-btn">
                    {/* Show "Choose Files" only if no files are selected */}
                    {selectedFiles.length === 0 && (
                      <label className="file-input-label choose-files">
                        <input type="file" multiple onChange={handleFileUpload} />
                        Choose a File
                      </label>
                    )}
                  </div>

                  {/* Show file preview grid if there are selected files */}
                  {selectedFiles.length > 0 && (
                    <div className="file-preview-grid mt-3">
                      <div className="row">
                        {selectedFiles.map((file, index) => (
                          <div className="col-md-3" key={index}>
                            <div className="file-preview-item">
                              <FaFileExcel className="file-svg" />
                              <p className="text-truncate file-name">{file.name}</p>
                              
                            </div>
                            <button
                                className=" btn-danger-remove btn-sm"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent label click event
                                  handleRemoveSelectedFile(file);
                                }}
                              >
                                Remove
                              </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="modal-footer">

                  <div class="btn-group float-right" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-primary mr-2" onClick={handleModalClose}>Close</button>
                    <button type="button" class="btn btn-danger mr-2" onClick={handleFileConfirmUpload}>Upload</button>

                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          {/* Overlay */}
          <div className="custom-backdrop fade show" onClick={handleModalClose}></div>
        </>
      )}
    </div>
  );
}

export default FilesView;
