import { useMemo, useState } from "react";
import { PostContext } from "./PostContext";

export const PostProvider = ({ children }) => {
  const [ posts, setPosts ] = useState([]);
  const [ curPost, setCurPost ] = useState();

  const defaultProps = useMemo(
      () => ({
        posts,
        setPosts,
        curPost,
        setCurPost
      }),
      [posts, curPost],
  );

  return (
      <PostContext.Provider value={defaultProps}>
          {children}
      </PostContext.Provider>
  );
};
