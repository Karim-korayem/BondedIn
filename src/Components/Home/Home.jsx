import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import { PostContext } from "../../Context/PostContext";
import PostCard from "../PostCard/PostCard";
import Loader from "../Loader/Loader";
import AddPost from "../AddPost/AddPost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  // const [allPosts, setAllPosts] = useState([]);
  // const [isLoading, setisLoading] = useState(true);
  // let { getAllPosts } = useContext(PostContext);

  // async function getPosts() {
  //   let response = await getAllPosts();
  //   // console.log(response);
  //   setAllPosts(response);
  //   setisLoading(false);
  // }
  // useEffect(() => {
  //   getPosts();
  // }, []);
  function getAllPosts() {
    let headers = { token: localStorage.getItem("userToken") };

    return axios.get(
      "https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt",
      {
        headers,
      }
    );
  }
  let { data, error, isError, isLoading } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,
    // staleTime:3000,
    refetchInterval: 3000,
    gcTime: 3000,
  });
  // console.log(data?.data?.posts);
  return (
    <>
      <div className="container mx-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <AddPost />{" "}
            {isError ? (
              <p className="text-red-500 text-center text-3xl mt-36">
                {error.message}
              </p>
            ) : (
              ""
            )}
            <div className="flex justify-center items-center ">
              <div className="w-full">
                {data?.data?.posts.map((post) => (
                  <PostCard key={post._id} post={post}></PostCard>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
