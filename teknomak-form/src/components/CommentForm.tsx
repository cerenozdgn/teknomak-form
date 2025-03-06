import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from "primereact/card";
import CommentModal from "./CommentModal";
import { Comment } from "../types/Index";
import { InputNumber } from "primereact/inputnumber";

const CommentForm = () => {
  const [formData, setFormData] = useState<Partial<Comment>>({ postId: 1 });
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [modalType, setModalType] = useState<"id" | "name" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedComments = localStorage.getItem("comments");
    if (cachedComments) {
      setComments(JSON.parse(cachedComments));
      setLoading(false);
    } else {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((res) => res.json())
        .then((data) => {
          setComments(data);
          localStorage.setItem("comments", JSON.stringify(data));
          setLoading(false);
        });
    }
  }, []);

  const handleIdEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const selected = comments.find((c) => c.id === Number(formData.id));
      if (selected) {
        setFormData(selected);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className='p-d-flex p-jc-center p-ai-center'
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Card
        style={{
          width: "40%",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* HEADER */}
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Teknomak Comments Form
        </h2>
        <div className='p-4'>
          {/* Post ID */}
          <div className='p-field p-mb-4'>
            <label style={{ fontWeight: "bold", fontSize: "14px" }}>
              Post ID
            </label>
            <InputNumber
              value={formData.postId}
              readOnly
              style={{ width: "100%", height: "40px" }}
            />
          </div>

          {/* ID Input and Button */}
          <div className='p-field p-mb-4 p-d-flex p-ai-center'>
            <label
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                width: "25%",
                marginBottom: "8px",
              }}
            >
              ID
            </label>
            <div
              className='p-field p-mb-4'
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <InputNumber
                value={formData.id || null}
                onChange={(e) =>
                  setFormData({ ...formData, id: e.value || undefined })
                }
                onKeyDown={handleIdEnter}
                style={{ width: "100%", height: "40px" }}
              />
              <Button
                icon='pi pi-search'
                severity='success'
                onClick={() => {
                  setModalVisible(true);
                  setModalType("id");
                }}
                style={{ height: "40px", width: "20%" }}
              />
            </div>
          </div>

          {/* Name Input and Button */}
          <div className='p-field p-mb-4 p-d-flex p-ai-center'>
            <label
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                width: "25%",
                marginBottom: "8px",
              }}
            >
              Name
            </label>
            <div
              className='p-field p-mb-4'
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <InputText
                value={formData.name || ""}
                readOnly
                style={{ width: "100%", height: "40px" }}
              />
              <Button
                icon='pi pi-search'
                severity='success'
                aria-label='Search'
                onClick={() => {
                  setModalVisible(true);
                  setModalType("name");
                }}
                style={{ height: "40px", width: "20%" }}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className='p-field p-mb-4'>
            <label style={{ fontWeight: "bold", fontSize: "14px" }}>
              Email
            </label>
            <InputText
              value={formData.email || ""}
              readOnly
              style={{ width: "100%", height: "40px" }}
            />
          </div>

          {/* Body Input */}
          <div className='p-field p-mb-4'>
            <label style={{ fontWeight: "bold", fontSize: "14px" }}>Body</label>
            <InputTextarea
              autoResize
              value={formData.body || ""}
              readOnly
              style={{ width: "100%", height: "80px" }}
            />
          </div>

          {/* Conditionally render the CommentModal */}
          {modalType && (
            <CommentModal
              visible={modalVisible}
              comments={comments}
              onClose={() => setModalVisible(false)}
              onSelect={(comment) => {
                if (modalType === "id") {
                  setFormData({
                    ...formData,
                    postId: comment.postId,
                    id: comment.id,
                    name: "",
                    email: "",
                    body: "",
                  });
                } else if (modalType === "name") {
                  setFormData({
                    ...formData,
                    name: comment.name,
                    email: comment.email,
                    body: "",
                  });
                }
                setModalVisible(false);
              }}
              modalType={modalType}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default CommentForm;
