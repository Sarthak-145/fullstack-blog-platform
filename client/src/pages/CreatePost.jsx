import { useState } from 'react';
import { createPost } from '../services/posts.service';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createPost({ title, content });
      alert('Post is created successfully!!');
      navigate('/home');
    } catch (err) {
      setError(err.msg || 'Error creating post');
    } finally {
      setLoading(false);
    }
  };

  const gotoHome = () => {
    navigate('/home');
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1324] to-[#020617] px-4">
      <div
        className="w-full max-w-2xl rounded-xl bg-[#020617]/80 backdrop-blur
               border border-cyan-400/20 shadow-[0_0_40px_rgba(0,255,255,0.08)]
               p-8"
      >
        <h2 className="text-center text-2xl font-semibold tracking-wide text-cyan-400 mb-8">
          Create a new post
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-200">Title</label>
            <input
              required
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
              rows={8}
              required
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
                     hover:bg-cyan-400/10 transition cursor-pointer"
              onClick={gotoHome}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-cyan-400 text-[#020617]
                     px-6 py-2 font-medium tracking-wide
                     hover:bg-cyan-300 active:scale-[0.98]
                     transition cursor-pointer"
              disabled={loading}
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
