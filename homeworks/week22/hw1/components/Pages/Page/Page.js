/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPost } from '../../../WebAPI';

const Root = styled.div`
  margin: 0 auto;
  width: 80%;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid grey;
  padding: 20px;
`;

const PostTitle = styled.div`
  font-size: 20px;
  text-decoration: none;
  color: #2d3142;
`;

const PostTime = styled.div`
  color: #4f5d75;
`;

const PostContent = styled.div`
  padding: 20px;
  color: #4f5d75;
  line-height: 2em;
  word-break: break-all;
  white-space: break-spaces;
`;

function App() {
  const [post, setPost] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getPost(id).then(data => setPost(data));
  }, [id]);

  return (
    <Root>
      <PostContainer>
        <PostTitle>{post.title}</PostTitle>
        <PostTime>{new Date(post.createdAt).toLocaleString()}</PostTime>
      </PostContainer>
      <PostContent>{post.body}</PostContent>
    </Root>
  );
}

export default App;
