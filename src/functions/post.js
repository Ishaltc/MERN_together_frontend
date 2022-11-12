import axios from "axios";

export const createPost = async (
  type,
  background,
  text,
  images,
  user,
  token
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/createPost`,
      {
        type,
        background,
        text,
        images,
        user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
 
    return { status: "okay", data };
  } catch (error) {
    return error.response.data.message;
  }
};

//post reaction

export const reactPost = async (react, postId, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/reactPost`,
      { react, postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "okay";
  } catch (error) {
    return error.response.data.message;
  }
};

//getReact
export const getReacts = async (postId, token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getReact/${postId}`,
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
};

//for comments

export const comment = async (postId, comment, image, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/comment`,
      {
        postId,
        comment,
        image,
      },
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
};

//post saving

export const savePost = async (postId, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/savePost/${postId}`,
      //put need 3 params.have to pass empty body
      {},
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
};

export const deletePost = async (postId, token) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/deletePost/${postId}`,
  
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
};
//deleting post
