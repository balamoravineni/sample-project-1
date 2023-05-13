import React, { useState, useEffect } from 'react';
import Post from './Post';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  // const comments = [
  //   {
  //     "postId": 1,
  //     "id": 1,
  //     "body": "first comment on post one"
  //   },
  //   {
  //     "postId": 1,
  //     "id": 2,
  //     "commentId": 1,
  //     "body": "first reply to the first comment on post one"
  //   },
  //   {
  //     "postId": 1,
  //     "id": 3,
  //     "commentId": 1,
  //     "body": "second reply to the first comment on post one"
  //   },
  //   {
  //     "postId": 1,
  //     "id": 4,
  //     "body": "second comment on post one"
  //   },
  //   {
  //     "postId": 1,
  //     "id": 5,
  //     "commentId": 4,
  //     "body": "first reply to second comment on post one"
  //   },
  //   {
  //     "postId": 2,
  //     "id": 6,
  //     "body": "first comment on post two"
  //   },
  //   {
  //     "postId": 2,
  //     "id": 7,
  //     "commentId": 6,
  //     "body": "first reply to first comment on post two"
  //   },
  //   {
  //     "postId": 2,
  //     "id": 8,
  //     "commentId": 7,
  //     "body": "first reply to first reply of first comment on post two"
  //   },
  //   {
  //     "postId": 2,
  //     "id": 9,
  //     "commentId": 8,
  //     "body": "first reply to first reply of first reply of first comment on post two"
  //   },
  //   {
  //     "postId": 2,
  //     "id": 10,
  //     "commentId": 7,
  //     "body": "second reply to first reply of first comment on post two"
  //   },
  //   {
  //     "postId": 3,
  //     "id": 11,
  //     "body": "first comment on post three"
  //   },
  // ];
  const [comments, setComments] = useState(null);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    setIsPostsLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;
    
    setTimeout(()=> {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        signal: signal
      })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setPosts(data);
        setIsPostsLoading(false);
      })
      .catch(err => {
        if(err.name === 'AbortError') {
          console.log('Sucessfully Aborted');
        } else {
          console.err(err);
        }
      })
      
    }, 1000)

    return (() => {
      controller.abort();
    })
    
  }, [])

  const getAllComments = () => {
    setIsCommentsLoading(true);
    setTimeout(()=> {

      fetch('https://jsonplaceholder.typicode.com/comments')
      .then(res => res.json())
      .then(data => {
        setComments(data);
        setIsCommentsLoading(false);
      })
      
    }, 1000)
  }


  const filterPosts = () => {
    const filteredPosts = posts.filter(post => post.id <= 20)
    setPosts(filteredPosts);
  }

  const onShowAllCommentsClick = () => {
    if(!showAllComments && !comments) {
      getAllComments();
    }
    setShowAllComments(!showAllComments);
  }

  return (
    <div className='App'>
      <h1>Feed</h1>
      { isPostsLoading ? <p>Loading...</p> :(
        <>
          <button onClick={filterPosts}>Filter Posts</button>
          <h2> Number of Posts: {posts.length}</h2>
          <button onClick={onShowAllCommentsClick}> {showAllComments?'Hide Comments': 'Show Comments'} </button>   
          {posts.map(post => {
            return (
              <Post key={post.id} post={post} showAllComments={showAllComments} comments={comments?comments.filter(comment => comment.postId===post.id):null} isCommentsLoading={isCommentsLoading}/>
            )
          })}
        </>
      )}
    </div>
  );
}
