import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/UpdateNotifyLimitModal.css'; // Create and style this CSS file
 
const UpdateNotifyLimitModal = ({ inventoryId, onClose, onNotifyLimitUpdated }) => {
  const [notifyLimit, setNotifyLimit] = useState('');
  const [inventoryDetails, setInventoryDetails] = useState(null);

  // Fetch existing inventory details
  useEffect(() => {
    const fetchInventoryDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7274/api/Inventory/${inventoryId}`); // Fetch inventory details
        setInventoryDetails(response.data); // Store the existing inventory details
        setNotifyLimit(response.data.notifyLimit); // Pre-fill the notify limit with the current value
      } catch (error) {
        console.error('Error fetching inventory details:', error);
        alert('Error fetching inventory details.');
      }
    };

    fetchInventoryDetails();
  }, [inventoryId]);
 
  // Handle form submission
  const handleSubmit = async () => {
    if (!inventoryDetails) {
      alert('Unable to update. Inventory details not loaded.');
      return;
    }

    try {
      // Prepare the payload with updated notify limit and existing details
      const payload = {
        inventoryID: inventoryDetails.inventoryID,
        bookID: inventoryDetails.bookID,
        quantity: inventoryDetails.quantity,
        notifyLimit: parseInt(notifyLimit), // Updated notify limit
      };
      // Send the updated data to the backend
      await axios.put(`https://localhost:7274/api/Inventory/${inventoryId}`, payload);
      alert('Notify limit updated successfully!');
      onNotifyLimitUpdated(); // Refresh the inventory list
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating notify limit:', error);
      alert('Error updating notify limit.');
    }
  };
 
  return (
    <div className="notify-modal">
      <div className="notify-modal-content">
        <h3>Update Notify Limit for Inventory ID: {inventoryId}</h3>
        {inventoryDetails ? (
          <div>
            <div className="notify-details">
            {/* <p>
              <strong>Book Title:</strong> {inventoryDetails.bookManagement?.title}
            </p>
            <p>
              <strong>Current Quantity:</strong> {inventoryDetails.quantity}
            </p> */}
            <p className="label">Book Title:</p>
            <p className="value">{inventoryDetails.bookManagement?.title}</p>
            <p className="label">Current Quantity:</p>
            <p className="value">{inventoryDetails.quantity}</p>
            </div>
            <form>
              <div className="notify-form-group">
                <label>New Notify Limit:</label>
                <input
                  type="number"
                  value={notifyLimit}
                  onChange={(e) => setNotifyLimit(e.target.value)}
                  placeholder="Enter New Notify Limit"
                  min="0"
                  required
                />
              </div>
              <div className="notify-modal-actions">
                <button type="button" onClick={handleSubmit}>
                  Submit
                </button>
                <button type="button" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
    </div>
        ) : (
          <p>Loading inventory details...</p>
        )}
      </div>
    </div>
  );
};
 
export default UpdateNotifyLimitModal;