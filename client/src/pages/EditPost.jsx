import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById } from '../services/posts.service';
import { editPost } from '../services/posts.service';

export const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingput, setLoadingput] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await getPostById(id);
        setTitle(res.data.post.title);
        setContent(res.data.post.content);
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingput(true);
    setError(null);
    console.log('req sent');

    try {
      await editPost(id, { title, content });
      alert('Your post is updated :)');
      navigate('/dashboard');
    } catch (err) {
      setError('Error updating post :(');
    } finally {
      setLoadingput(false);
    }
  };

  const gotoDashboard = () => {
    navigate('/dashboard');
  };

  if (!title && !content && loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1324] to-[#020617] px-4">
      <div
        className="w-full max-w-2xl rounded-xl bg-[#020617]/80 backdrop-blur
               border border-cyan-400/20 shadow-[0_0_40px_rgba(0,255,255,0.08)]
               p-8"
      >
        <h2 className="text-center text-2xl font-semibold tracking-wide text-cyan-400 mb-8">
          Update post
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-200">Title</label>
            <input
              value={title}
              type="text"
              placeholder="Post title"
              className="rounded-md bg-transparent border border-cyan-400/40
                     px-4 py-2 text-slate-100 placeholder-slate-500
                     focus:outline-none focus:ring-2 focus:ring-cyan-400/60
                     focus:border-cyan-400 transition"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-200">Content</label>
            <textarea
              value={content}
              rows={8}
              placeholder="Write your thoughts here..."
              className="rounded-md bg-transparent border border-cyan-400/40
                     px-4 py-3 text-slate-100 placeholder-slate-500 resize-none
                     focus:outline-none focus:ring-2 focus:ring-cyan-400/60
                     focus:border-cyan-400 transition"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              className="rounded-md border border-cyan-400/40 text-cyan-300
                     px-5 py-2 text-sm
                     hover:bg-cyan-400/10 transition"
              onClick={gotoDashboard}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-cyan-400 text-[#020617]
                     px-6 py-2 font-medium tracking-wide
                     hover:bg-cyan-300 active:scale-[0.98]
                     transition"
              disabled={loadingput}
            >
              {!loadingput ? 'Update' : 'Updating...'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
