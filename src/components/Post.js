import React, { useState, useEffect } from 'react';
import Comment from './Comment';

export default function Post(props) {

  const { post, showAllComments } = props;

  const [comments, setComments] = useState(props.comments);
  const [showComments, setShowComments] = useState(props.showAllComments);
  const [isLoading, setIsLoading] = useState(props.isCommentsLoading);

  useEffect(() => {
    setComments(props.comments);
  }, [props.comments])

  useEffect(() => {
    setShowComments(props.showAllComments);
  }, [props.showAllComments])

  useEffect(() => {
    setIsLoading(props.isCommentsLoading);
  }, [props.isCommentsLoading])

  const getComments = () => {
    setIsLoading(true);
    setTimeout(()=> {

      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setComments(data);
        setIsLoading(false);
      })
      
    }, 1000)
  }

  const onshowCommentsClick = () => {
    if(!(showAllComments || showComments) && !comments) {
      getComments();
    }
    setShowComments(!showComments);
  }

  const getTransformedComments = (comments) => {
    let queue = comments
      .filter(comment => comment.commentId == null)
      .map(comment => {
        return {
          id: comment.id,
          body: comment.body,
          margin: 1
        }
      });
    if (queue.length === comments.length) {
      return queue;
    }

    let transformedComments = [];
    while (queue.length !== 0) {
      let current = queue.shift();
      transformedComments.push(current);
      let childrenComments = comments
        .filter(comment => comment.commentId === current.id)
        .map(comment => {
          return {
            id: comment.id,
            body: comment.body,
            margin: current.margin + 1
          }
        });
      queue.unshift(...childrenComments);
    }
    return transformedComments;
  }

  return (
    <div className='card' key={post.id}>
      <h3 >{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={onshowCommentsClick}> {showComments?'Hide Comments': 'Show Comments'} </button>
      { isLoading ? <p>Loading...</p> : (
        showComments && comments && getTransformedComments(comments).map(comment => {
          return (
            <Comment key={comment.id} body={comment.body} margin={comment.margin} />
          )
        })
      )}
    </div>
  )
}