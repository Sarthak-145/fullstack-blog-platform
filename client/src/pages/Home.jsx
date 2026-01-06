import { useState, useEffect } from 'react';
import { getPosts } from '../services/posts.service';
import { timeAgo } from '../utils/timeAgo';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then((res) => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.log('API Error', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h3>Loading...</h3>;

  return (
    <>
      <div className="flex flex-col px-10 mx-20">
        <h2 className="text-3xl bg-surface font-semibold text-primary m-6">
          Posts to Read
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div
              key={post.post_id}
              className="rounded-lg border border-cyan-500/20 bg-slate-900 h-56 p-4 rounded-lg flex flex-col shadow"
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
                  <p className="text-sm text-cyan-500">by {post.username}</p>
                </div>{' '}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
