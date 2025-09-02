import React, { useContext, useEffect, useState } from "react";
import styles from "./PostDetails.module.css";
import { useParams } from "react-router-dom";
import { PostContext } from "../../Context/PostContext";
import PostCard from "../PostCard/PostCard";
import Loader from "../Loader/Loader";

export default function PostDetails() {
  let { id } = useParams();
  let { getSinglePost } = useContext(PostContext);
  const [SinglePost, setSinglePost] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  async function getPostDetails(id) {
    let response = await getSinglePost(id);
    setSinglePost(response);
    setisLoading(false);
  }

  useEffect(() => {
    getPostDetails(id);
  }, []);
  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex">
          <PostCard
            post={SinglePost}
            isPostDetails={true}
            autoOpenComments={true}
            showAllComments={true}
          ></PostCard>
        </div>
      )}
    </div>
  );
}
