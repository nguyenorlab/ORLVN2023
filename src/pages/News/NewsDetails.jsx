import React from 'react'


const NewsDetail = (props) => {
  const post = props.location.state.post;

  const postId = props.match.params.id;
  const postFromURL = allPostData.find(post => post.id === Number(postId));

  if (!post) {
    return <Redirect to="/" />;  // Redirect to the list page if the post is not found
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default NewsDetail;