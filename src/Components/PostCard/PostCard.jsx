import { useContext, useEffect, useState } from "react";
import commentPic from "../../assets/defaultIcon.jpg";
import postPic from "../../assets/p1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { PostContext } from "../../Context/PostContext";
import moment from "moment";

export default function PostCard({
  post,
  callback,
  isProfile,
  autoOpenComments,
  showAllComments,
  isPostDetails,
}) {
  const [showComments, setShowComments] = useState(autoOpenComments || false);
  const [CommentVisibility, setCommentVisibility] = useState(
    showAllComments ? post.comments.length : 1
  );
  const [CommentContent, setCommentContent] = useState("");
  const [Comments, setComments] = useState([]);
  const [newBody, setNewBody] = useState(post?.body);
  const [newImage, setNewImage] = useState(null);
  const navigate = useNavigate();
  let { addComment, deletePost, updatePost } = useContext(PostContext);

  useEffect(() => {
    if (showAllComments) {
      setCommentVisibility(post.comments.length);
    }
  }, [post, showAllComments]);

  useEffect(() => {
    setComments(post.comments);
  }, []);

  async function handleAddComments(e) {
    e.preventDefault();
    let response = await addComment({
      content: CommentContent,
      post: post._id,
    });
    console.log(response);
    setComments(response);
  }

  async function DeletePost(id) {
    let response = await deletePost(id);
    console.log(response);
    callback();
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const updatedPost = await updatePost(post._id, {
      body: newBody,
      image: newImage,
    });
    console.log("Updated:", updatedPost);
    callback();
    document.getElementById(`edit_modal_${post._id}`).checked = false;
  }

  return (
    <div className=" w-1/2 card bg-base-100 drop-shadow-2xl  p-4 max-w-xl mx-auto my-8 max-sm:w-[95%] ">
      {isPostDetails && (
        <span className="border-b border-gray-400/50 block mb-3 pb-2 text-center">
          <div className="text-center relative  text-gray-500 font-bold">
            <button
              onClick={() => navigate(-1)}
              data-tip="back"
              className=" absolute left-0 top-1 cursor-pointer text-blue-700 hover:text-blue-600 transition duration-300 ease-in-out tooltip  "
            >
              <i className="fa-solid fa-arrow-left"> </i>
            </button>
            {post?.user?.name}'s post{" "}
          </div>
        </span>
      )}

      <input
        type="checkbox"
        id={`delte_modal_${post._id}`}
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">please confirm!</h3>
          <p className="py-4">Are You Sure You Want To Delete This Post ?</p>
          <div className="modal-action">
            <label htmlFor={`delte_modal_${post._id}`} className="btn">
              Cancel
            </label>
            <button
              onClick={() => DeletePost(post?._id)}
              className="btn btn-error hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <input
        type="checkbox"
        id={`edit_modal_${post._id}`}
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <span className="border-b border-gray-400/50 block mb-3 pb-2 text-center">
            <h3 className="font-bold text-lg">Edit Post</h3>
          </span>

          <form onSubmit={handleUpdate} className="flex flex-col gap-3">
            <input
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              className="input input-neutral w-full focus:outline-0 border-slate-400 my-2 rounded-4xl"
            />
            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="file-input file-input-bordered"
            />
            <div className="modal-action">
              <label
                type="button"
                htmlFor={`edit_modal_${post._id}`}
                className="btn btn-soft"
              >
                Cancel
              </label>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={post?.user?.photo} alt="User" />
          </div>
        </div>
        <div>
          <p className="font-bold">{post?.user?.name}</p>
          <p className="text-sm text-gray-400">
            {moment(post?.createdAt).calendar()}
          </p>
        </div>
        {isProfile && (
          <div className="dropdown dropdown-end absolute right-3">
            <div tabIndex={0} role="button" className="cursor-pointer m-1">
              <i className="fa-solid fa-ellipsis"></i>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <label
                  htmlFor={`edit_modal_${post._id}`}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:text-yellow-500 transition duration-300 ease-in-out"
                >
                  <i className="fa-solid fa-pen"></i>
                  <span className="font-bold">Edit Post</span>
                </label>
              </li>
              <span className="border-b border-gray-400/50 block text-center"></span>
              <li>
                <label
                  htmlFor={`delte_modal_${post._id}`}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:text-red-500 transition duration-300 ease-in-out"
                >
                  <i className="fa-solid fa-trash-can"></i>
                  <span className="font-bold">Delete Post</span>
                </label>
              </li>
            </ul>
          </div>
        )}
      </div>
      <Link to={`/postDetails/${post?._id}`}>
        <p className="mb-3">{post?.body}</p>
        <img
          src={post?.image ? post?.image : postPic}
          className="rounded-lg mb-4 w-full h-[400px]"
          alt="Post"
        />
      </Link>
      <div className="flex gap-3 text-sm text-gray-500 relative justify-between">
        <button className="btn btn-ghost btn-sm">👍 Like</button>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setShowComments(!showComments)}
        >
          💬 Comment ({Comments?.length})
        </button>
        <button className="btn btn-ghost btn-sm">↪️ Share</button>
      </div>

      {/* Toggle Comments Section */}
      {showComments && (
        <div className="mt-4">
          {/* Existing Comments */}

          {Comments?.slice(0, CommentVisibility).map((comment) => (
            <div key={comment?._id}>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Commenter photo"
                      src={
                        comment?.commentCreator?.photo.includes("undefined")
                          ? commentPic
                          : comment?.commentCreator?.photo
                      }
                    />
                  </div>
                </div>
                <div className="chat-header font-bold">
                  {comment?.commentCreator.name}
                  <time className="text-xs opacity-50">
                    {" "}
                    {moment(comment?.createdAt).calendar()}
                  </time>
                </div>
                <div className="chat-bubble">{comment?.content}</div>
              </div>
              <div className="chat chat-end"></div>
            </div>
          ))}
          {Comments?.length > CommentVisibility && (
            <div className="text-center my-2">
              <button
                onClick={() => setCommentVisibility(CommentVisibility + 2)}
                className="btn btn-transparent"
              >
                Load more comments
              </button>
            </div>
          )}

          {/* New Comment Input */}
          <form
            onSubmit={(e) => handleAddComments(e)}
            className="flex  gap-5 content-between items-center"
          >
            <input
              type="text"
              name="content"
              value={CommentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write a comment..."
              className="input input-bordered w-full"
            />
            <button className="px-3 py-2 bg-blue-800 text-white rounded-xl hover:bg-blue-500  transition duration-300 ease-in-out cursor-pointer">
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
