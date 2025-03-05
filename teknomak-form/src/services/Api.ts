export const fetchComments = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  return response.json();
};

export const fetchCommentById = async (id: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments/${id}`
  );
  return response.json();
};
