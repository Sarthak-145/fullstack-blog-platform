import { useContext, useEffect, useState } from 'react';
import { getPostsMe, deletePost } from '../services/posts.service';
import { Link, useNavigate } from 'react-router-dom';
import { timeAgo } from '../utils/timeAgo';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    getPostsMe()
      .then((res) => {
        setPosts(res.data.posts || []);
        setLoading(false);
      })

      .catch((err) => {
        setError('Oops! error showing your posts!');
        setLoading(false);
      });
  }, []);

  if (loading) return <h3>loading your posts...</h3>;

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
      setPosts((prev) => prev.filter((p) => p.post_id !== id));
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  return (
    <div className="min-h-screen px-10 mx-20">
      <div className="flex items-center justify-between m-6">
        <h2 className="text-3xl font-semibold text-cyan-400">Your Dashboard</h2>

        <button
          className="rounded-md bg-cyan-400 text-[#020617]
                 px-5 py-2 font-medium tracking-wide
                 hover:bg-cyan-300 active:scale-[0.98]
                 transition cursor-pointer"
          onClick={() => navigate('/post/new')}
        >
          + New Post
        </button>
        {user && (
          <button
            onClick={logout}
            className="px-3 py-1.5 text-sm text-red-400
               hover:text-red-600
               transition-colors cursor-pointer border border-red-500/50 cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <div
            className="rounded-lg border border-cyan-500/20
                 bg-slate-900 h-64 p-4
                 flex flex-col justify-between
                 shadow"
            key={post.post_id}
          >
            <Link to={`/post/${post.post_id}`}>
              <div>
                <h4 className="text-xl font-medium text-cyan-300 mb-2">
                  {post.title}
                </h4>

                <p className="text-slate-300 leading-relaxed line-clamp-4">
                  {post.content}
                </p>
              </div>
            </Link>
            <div className="flex items-center justify-between pt-4">
              <small className="text-sm text-cyan-500">
                {timeAgo(post.created_at)}
              </small>

              <div className="flex gap-3">
                <button
                  className="text-sm text-cyan-300 hover:text-cyan-200 transition cursor-pointer"
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </button>

                <button
                  className="text-sm text-red-400 hover:text-red-300 transition cursor-pointer"
                  onClick={() => handleDelete(post.post_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
