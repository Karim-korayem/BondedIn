import React, { useContext, useEffect, useState } from "react";
import styles from "./UsersPosts.module.css";
import { PostContext } from "../../Context/PostContext";
import Loader from "../Loader/Loader";
import AddPost from "../AddPost/AddPost";
import PostCard from "../PostCard/PostCard";


export default function UsersPosts() {
  let { getUserData, getUserPost } = useContext(PostContext);
  let { UserData } = useContext(PostContext);
  const [UserPosts, setUserPosts] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  async function getUserPostData() {
    let response = await getUserData();
    let data = await getUserPost(response._id);
    console.log(data);
    let sortedPosts = [...data].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setUserPosts(sortedPosts);
    setisLoading(false);
  }
  useEffect(() => {
    getUserPostData();
  }, []);
  return (
    <>
      <div className="container mx-auto relative ">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <AddPost callback={getUserPostData} />
            <div className="flex justify-center items-center ">
              <div className="w-full">
                {UserPosts?.length <= 0 ? (
                  <p className="text-blue-800 text-xl font-bold text-center mt-40 ">
                    no posts yet
                  </p>
                ) : null}
                <div className="card card-border bg-base-100 w-96 mx-auto mt-8">
                  <div className="card-body text-center font-bold text-blue-800">
                    <span className="border-b border-gray-400/50 block mb-5 pb-4 text-center">
                      <img
                        src={UserData.photo}
                        alt={UserData.name}
                        className=" w-28 h-28 rounded-full shadow-md mb-3 mx-auto"
                      />
                    </span>
                    {/* <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div> */}
                    <div className="overflow-x-auto">
                      <table className="table">
                        <tbody>
                          {/* row 1 */}
                          <tr>
                            <td>
                              <i className="fa-regular fa-user"></i> name
                            </td>
                            <td>{UserData.name}</td>
                          </tr>
                          {/* row 2 */}
                          <tr>
                            <td>
                              <i className="fa-solid fa-mars"></i> gender
                            </td>
                            <td> {UserData.gender}</td>
                          </tr>
                          {/* row 3 */}
                          <tr>
                            <td className="ps-3">
                              <i className="fa-solid fa-cake-candles"></i>
                              birthday
                            </td>
                            <td>{UserData.dateOfBirth}</td>
                          </tr>
                          <tr>
                            <td>
                              <i className="fa-regular fa-envelope"></i> email
                            </td>
                            <td>{UserData.email}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {UserPosts?.map((post) => (
                  <PostCard
                    callback={getUserPostData}
                    key={post._id}
                    post={post}
                    isProfile={true}
                  ></PostCard>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
