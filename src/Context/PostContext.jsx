import axios from "axios";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";
export let PostContext = createContext();


export default function PostContextProvider({ children }) {
  let headers = { token: localStorage.getItem("userToken") };
  const [UserData, setUserData] = useState({})
  
//   async function getAllPosts() {
//     try {
//       let { data } = await axios.get(
//         `https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt`,
//         { headers }
//       );
// console.log(data , "from allposts");

//       return data.posts;
//     } catch (error) {
//       console.log(error);
//     }
//   }

  async function getSinglePost(id) {
    try {
      let { data } = await axios.get(
        `https://linked-posts.routemisr.com/posts/${id}`,
        { headers }
      );

      return data.post;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserPost(id) {
    try {
      let { data } = await axios.get(
        `https://linked-posts.routemisr.com/users/${id}/posts?limit=10`,
        { headers }
      );

      return data.posts;
    } catch (error) {
      console.log(error);
    }
  }

async function getUserData() {
    try {
      let { data } = await axios.get(
        `https://linked-posts.routemisr.com/users/profile-data`,
        { headers }
      );
      console.log(data, "from getUserData");
      setUserData(data.user);
    
      return data.user;
    } catch (error) {
      console.log(error);
    }
  }

  async function addComment(body) {
    try {
      let { data } = await axios.post(
        `https://linked-posts.routemisr.com/comments`,
        body,
        { headers }
      );
      toast.success("Comment Successfully Added !");

      return data.comments;
    } catch (error) {
      console.log(error);
      toast.error("Comment Failed!");
    }
  }

   async function addPosts(formData) {
    try {
      let { data } = await axios.post(
        `https://linked-posts.routemisr.com/posts`,
        formData,
        { headers }
      );
      toast.success("Post Successfully Added !");
console.log(data);

      
    } catch (error) {
      console.log(error);
      toast.error("Post Failed!");
    }
  }

     async function deletePost(id) {
    try {
      let { data } = await axios.delete(
        `https://linked-posts.routemisr.com/posts/${id}`,
       
        { headers }
      );
      toast.success("Post Deleted Successfully !");
console.log(data);

      // return data.comments;
    } catch (error) {
      console.log(error);
      toast.error("Post deletion Failed!");
    }
  }

  return (
    <PostContext.Provider
      value={{
        // getAllPosts,
        getUserData,
        getUserPost,
        getSinglePost,
        addComment,
        addPosts,
        deletePost,
        UserData,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
