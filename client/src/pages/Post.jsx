import { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostById } from '../services/posts.service';
import { timeAgo } from '../utils/timeAgo';
import { AuthContext } from '../contexts/AuthContext';
import { deletePost } from '../services/posts.service';

export const Post = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(id)
      .then((res) => {
        setPost(res.data.post);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const handleEdit = (post) => {
    navigate(`/post/${post.post_id}/edit`);
  };

  const handleDelete = async (id) => {
    const sure = window.confirm(
      "Are you sure you want to delete this post, this can't be undone"
    );
    if (!sure) return;

    try {
      await deletePost(id);
      alert('post is deleted');
      navigate('/home');
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h3 className="text-cyan-400 text-lg">Loading post...</h3>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <h3 className="text-red-400 text-lg mb-4">Post not found</h3>
        <Link to="/" className="text-cyan-400 hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  const canEdit = user && post && Number(user.user_id) === Number(post.user_id);

  return (
    <div className="flex justify-center px-6 py-10">
      <div className="w-full max-w-3xl bg-slate-900 border border-cyan-500/20 rounded-lg shadow p-6">
        <h1 className="text-3xl font-semibold text-cyan-300 mb-4">
          {post.title}
        </h1>

        <div className="flex items-center justify-between mb-6 text-sm text-slate-400">
          <span>By {post.username}</span>
          <span>{timeAgo(post.created_at)}</span>
        </div>

        <div className="text-slate-300 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

        {canEdit && (
          <div className="flex gap-4 mt-8">
            <button
              className="px-4 py-2 rounded bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600/30 transition"
              onClick={() => handleEdit(post)}
            >
              Edit
            </button>

            <button
              className="px-4 py-2 rounded bg-red-600/20 text-red-400 hover:bg-red-600/30 transition"
              onClick={() => handleDelete(post.post_id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
