import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./../../Context/PostContext";
import { Link } from "react-router-dom";

export default function AddPost({ callback }) {
  let { addPosts } = useContext(PostContext);
  const [IsLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  let { getUserData } = useContext(PostContext);
  let { UserData } = useContext(PostContext);

  async function getUserDataInAddPost() {
    let response2 = await getUserData();
    console.log(response2);
  }
  useEffect(() => {
    getUserDataInAddPost();
  }, []);
  async function handleAddPosts(e) {
    e.preventDefault();
    setIsLoading(true);
    let formData = new FormData();
    let body = e.target.body.value;
    let image = e.target.image.files[0];
    formData.append("body", body);
    formData.append("image", image);
    let response = await addPosts(formData);
    console.log(response);
    setPreview(null);
    callback();
    setIsLoading(false);
     document.getElementById("my_modal_6").checked = false;
  }
  return (
    <div className="w-1/3 mx-auto border-base-300 bg-base-200 border rounded-box p-7 mt-5 text-center max-sm:w-[90%] max-sm:relative">
      <form onSubmit={(e) => handleAddPosts(e)}>
        <span className="border-b border-gray-400/50 block mb-5 pb-4 text-center">
          <span className="text-blue-800 text-2xl font-bold  mb-2">
            Create Post
          </span>
        </span>

        <div className="flex justify-center">
          <Link to="/usersposts">
            <div className="avatar">
              <div className="w-14 h-14 border-2 border-accent-content rounded-full me-4">
                <img src={UserData.photo} alt="User picture" />
              </div>
            </div>
          </Link>
          <label
            htmlFor="my_modal_6"
            className=" file-input w-[80%] my-2 rounded-4xl bg-gray-700 hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            <p className="ms-2 font-bold text-gray-200">
              what's on your mind, {UserData?.name?.split(" ")[0]}?
            </p>
          </label>
        </div>

        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <div className="flex justify-center">
              <input
                name="body"
                type="text"
                placeholder="Type Your post..."
                className="input input-neutral w-full focus:outline-0 border-slate-400 my-2 rounded-4xl"
              />
             
              {/* hidden input */}
              <input
                name="image"
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file)); 
                  }
                }}
              />
              {/* label acts as the button */}
              <label
                htmlFor="fileInput"
                className="cursor-pointer p-3"
              >
                <i className=" text-blue-800  hover:text-blue-700 transition duration-300 ease-in-out text-2xl fa-solid fa-images">
                  <p className=" font-normal text-xs ">photo</p>
                </i>
              </label>
            </div>
            {preview && (
              <img
                src={preview}
                alt="Selected"
                className="w-80 h-80 object-cover rounded-lg  mx-auto"
              />
            )}

            {IsLoading ? (
              <button
                type="submit"
                className="bg-blue-800 text-white px-3 py-2  rounded-4xl cursor-pointer mt-3.5 hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-800 text-white px-3 py-2  rounded-4xl cursor-pointer mt-3.5 hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Add post
              </button>
            )}
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn">
                Close!
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
