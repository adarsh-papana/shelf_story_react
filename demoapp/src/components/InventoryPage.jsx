import React, { useEffect, useState, useCallback } from "react";
import UpdateStockModal from "./UpdateStockModal";
import UpdateNotifyLimitModal from "./UpdateNotifyLimitModal";
import AddNewBookModal from "./AddNewBookModal";
import AddInventoryPage from "./AddInventoryPage";
import DeleteBookModal from "./DeleteBookModal";
import ConfirmationModal from "./ConfirmationModal";
import AxiosInstance from "../AxiosInstance";
import "../style/InventoryPage.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const InventoryPage = ({ searchQuery }) => {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  // const [selectedInventory, setSelectedInventory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  // const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showAddInventoryModal, setShowAddInventoryModal] = useState(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState(null); // Selected Inventory ID for UpdateNotifyLimitModal
  const [showDeleteBookModal, setShowDeleteBookModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [inventoryToDelete, setInventoryToDelete] = useState(null);

  const fetchInventoryList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.get(`/Inventory`);
      setInventories(response.data);
    } catch (error) {
      console.error("Error fetching inventories:", error);
      toast.error("Failed to fetch inventories. Please try again."); // Show error message using toast
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventoryList(); // Call the function directly
  }, [fetchInventoryList]);

  // Filter inventories based on searchQuery
  const filteredInventories = inventories.filter((item) =>
    item.bookManagement?.title
      ?.toLowerCase()
      .includes((searchQuery || "").toLowerCase())
  );

  const handleUpdateStockClick = (bookId) => {
    setSelectedBookId(bookId); // Set the selected Book ID
    setShowStockModal(true); // Show the UpdateStockModal
  };

  const handleUpdateNotifyLimitClick = (inventoryId) => {
    setSelectedInventoryId(inventoryId); // Set the selected Inventory ID
    setShowNotifyModal(true); // Show the UpdateNotifyLimitModal
  };

  // Handle delete confirmation
  const handleDeleteClick = (inventoryId) => {
    setInventoryToDelete(inventoryId); // Set the inventory ID to delete
    setShowDeleteModal(true); // Show the confirmation modal
  };

  // Confirm delete action
  const confirmDelete = async () => {
    try {
      await AxiosInstance.delete(`/Inventory/${inventoryToDelete}`);
      toast.success("Inventory deleted successfully!"); // Show success message using toast
      setInventories((prevInventories) =>
        prevInventories.filter((item) => item.inventoryID !== inventoryToDelete)
      );
    } catch (error) {
      console.error("Error deleting inventory:", error);
      toast.error("Failed to delete inventory. Please try again."); // Show error message using toast
    } finally {
      setShowDeleteModal(false); // Close the confirmation modal
      setInventoryToDelete(null); // Clear the inventory ID
    }
  };

  // Cancel delete action
  const cancelDelete = () => {
    setShowDeleteModal(false); // Close the confirmation modal
    setInventoryToDelete(null); // Clear the inventory ID
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Inventory List</h1>

        {/* <button style={{ float: 'right', marginBottom: '10px' }} onClick={() => setShowAddModal(true)} >
            Add New Book
        </button>
        <button style={{ float: 'right', marginBottom: '10px' }} onClick={() => setShowAddInventoryModal(true)} >
            Add New Inventory
        </button> */}
        <div className="button-container">
          <button
            className="action-button"
            onClick={() => setShowAddModal(true)}
          >
            Add New Book
          </button>
          <button
            className="action-button "
            onClick={() => setShowDeleteBookModal(true)}
          >
            Delete Book
          </button>
          <button
            className="action-button"
            onClick={() => setShowAddInventoryModal(true)}
          >
            Add New Inventory
          </button>
        </div>
      </div>

      {showStockModal && (
        <UpdateStockModal
          bookId={selectedBookId}
          onClose={() => setShowStockModal(false)}
          onStockUpdated={(msg) => {
            setShowStockModal(false);
            fetchInventoryList(); // Refresh inventory list
          }}
          // onStockUpdated={fetchInventoryList} // Refresh inventory list
        />
      )}

      {showNotifyModal && (
        <UpdateNotifyLimitModal
          inventoryId={selectedInventoryId}
          onClose={() => setShowNotifyModal(false)}
          onNotifyLimitUpdated={(msg) => {
            setShowNotifyModal(false);
            fetchInventoryList(); // Refresh inventory list
          }}
        />
      )}

      {showAddModal && (
        <AddNewBookModal
          onClose={() => setShowAddModal(false)}
          // onBookAdded={fetchInventoryList}
          onBookAdded={(msg) => {
            setShowAddModal(false);
            fetchInventoryList(); // Refresh inventory list
          }}
        />
      )}

      {showAddInventoryModal && (
        <AddInventoryPage
          onClose={() => setShowAddInventoryModal(false)}
          // onInventoryAdded={(msg) => handleInventoryAdded(msg)}
          onInventoryAdded={(msg) => {
            setShowAddInventoryModal(false);
            fetchInventoryList(); // Refresh inventory list
          }}
        />
      )}

      {showDeleteBookModal && (
        <DeleteBookModal
          onClose={() => setShowDeleteBookModal(false)}
          // onBookDeleted={fetchInventoryList}
          onBookDeleted={(msg) => {
            setShowDeleteBookModal(false);
            fetchInventoryList(); // Refresh inventory list
          }}
        />
      )}

      {showDeleteModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this inventory?"
          onConfirm={confirmDelete} // Confirm delete action
          onCancel={cancelDelete} // Cancel delete action
        />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          {/* <table className="min-w-full border border-gray-300" className="table-container"> */}
          <table className="table-container">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border text-center">InventoryID</th>
                <th className="p-2 border text-center">BookID</th>
                <th className="p-2 border text-center">Title</th>
                <th className="p-2 border text-center">Quantity</th>
                <th className="p-2 border text-center">NotifyLimit</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventories.map((item) => (
                <tr key={item.inventoryID}>
                  <td className="p-2 border text-center">{item.inventoryID}</td>
                  <td className="p-2 border text-center">{item.bookID}</td>
                  <td className="p-2 border text-center">
                    {item.bookManagement?.title}
                  </td>
                  <td className="p-2 border text-center">{item.quantity}</td>
                  <td className="p-2 border text-center">{item.notifyLimit}</td>
                  <td className="p-2 border text-center space-x-2">
                    {/* <div className="button-container"> */}
                    <button
                      className="action-button update-stock"
                      onClick={() => handleUpdateStockClick(item.bookID)} // Pass the bookId to the function
                    >
                      Add Stock
                    </button>
                    <button
                      className="action-button update-notify"
                      onClick={() =>
                        handleUpdateNotifyLimitClick(item.inventoryID)
                      } // Pass the inventoryId to the function
                    >
                      Update Notify Limit
                    </button>
                    <button
                      className="action-button delete-inventory"
                      onClick={() => handleDeleteClick(item.inventoryID)}
                    >
                      Delete
                    </button>
                    {/* </div> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
