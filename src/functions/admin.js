import axios from "axios";


export const userDetails = async (token)=>{
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getAllUsers`,
            
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return data;
        
    } catch (error) {
        return error.response.data.message; 
    }
}