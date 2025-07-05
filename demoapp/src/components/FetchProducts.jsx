
import AxiosInstance from "../AxiosInstance"; // Adjust the import path as necessary
const UserID = localStorage.getItem("userId");  
export const fetchProducts = async (setFilteredProducts,setProducts) => {
 
    try {
      const response = await AxiosInstance.get(`/BookManagement`);
      setProducts(response.data);
      setFilteredProducts(response.data); // Set filtered products to all products initially
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
 
 