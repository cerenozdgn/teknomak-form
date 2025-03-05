// CommentModal.tsx
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { fetchComments } from "../services/Api";

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface CommentModalProps {
  visible: boolean;
  onHide: () => void;
  onSelect: (comment: Comment) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  visible,
  onHide,
  onSelect,
}) => {
  const [search, setSearch] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments().then(setComments);
  }, []);

  const filteredComments = comments.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog
      header='Yorum Seç'
      visible={visible}
      onHide={onHide}
      style={{ width: "50vw" }}
    >
      <InputText
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Name veya Email ile ara...'
        className='p-mb-3 w-full'
      />
      <ul>
        {filteredComments.map((comment) => (
          <li key={comment.id} className='p-mb-2 p-p-2 border-round border-1'>
            <Button
              label={`${comment.id} - ${comment.name}`}
              onClick={() => {
                onSelect(comment);
                onHide();
              }}
              className='w-full'
            />
          </li>
        ))}
      </ul>
    </Dialog>
  );
};

export default CommentModal;
