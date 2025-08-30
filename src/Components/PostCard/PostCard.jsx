import { useContext, useEffect, useState } from "react";
import commentPic from "../../assets/defaultIcon.jpg";
import postPic from "../../assets/p1.jpg";
import { Link } from "react-router-dom";
import { PostContext } from "../../Context/PostContext";
import moment from "moment";

export default function PostCard({ post, callback, isProfile }) {
  const [showComments, setShowComments] = useState(false);
  const [CommentVisibility, setCommentVisibility] = useState(1);
  const [CommentContent, setCommentContent] = useState("");
  const [Comments, setComments] = useState([]);
  let { addComment, deletePost } = useContext(PostContext);

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
  return (
    <div className="card bg-base-100 drop-shadow-2xl  p-4 max-w-xl mx-auto my-8 ">
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">please confirm!</h3>
          <p className="py-4">Are You Sure You Want To Delete This Post ?</p>
          <div className="modal-action">
            <form method="dialog">
              <button
                onSubmit={(e) => e.preventDefault()}
                className="btn btn-soft me-3"
              >
                Close
              </button>
              <button
                onClick={() => DeletePost(post?._id)}
                className="btn btn-error hover:bg-red-500"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>

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
          <button
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="text-blue-800 px-3 py-2 absolute right-0 cursor-pointer hover:text-red-500 transition duration-300 ease-in-out"
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
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
            <div key={comment._id}>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Commenter photo"
                      src={
                        comment.commentCreator.photo.includes("undefined")
                          ? commentPic
                          : comment.commentCreator.photo
                      }
                    />
                  </div>
                </div>
                <div className="chat-header font-bold">
                  {comment.commentCreator.name}
                  {/* <time className="text-xs opacity-50">12:45</time> */}
                </div>
                <div className="chat-bubble">{comment.content}</div>
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
