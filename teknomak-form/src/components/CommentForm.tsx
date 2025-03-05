import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Textarea } from "primereact/textarea";
import { fetchCommentById } from "../api";
import CommentModal from "./CommentModal";
import { Comment } from "../types/Index";

// 📌 Form doğrulama şeması
const schema = yup.object().shape({
  id: yup.number().required("ID gerekli"),
  name: yup.string().required("İsim gerekli"),
  email: yup.string().email("Geçerli bir email girin").required("Email gerekli"),
  body: yup.string().required("Body boş olamaz"),
});

// 📌 Tipleri düzgün eşleştiriyoruz
interface FormData {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const CommentForm = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema), // Schema'yı doğru şekilde kullanıyoruz
    defaultValues: {
      postId: 1, // readonly alanı olduğu için default olarak 1 alacak
      id: 0,
      name: "",
      email: "",
      body: "",
    },
  });

  // 📌 ID Enter ile formu doldurma
  const handleIdEnter = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const id = Number(watch("id"));
      if (id) {
        const data = await fetchCommentById(id);
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("body", data.body);
      }
    }
  };

  const handleSelectComment = (comment: Comment) => {
    setValue("id", comment.id);
    setValue("name", comment.name);
    setValue("email", comment.email);
    setValue("body", comment.body);
  };

  return (
    <form onSubmit={handleSubmit((data) => console.log("Gönderilen Veri:", data))} className="p-4">
      {/* Post ID (Readonly) */}
      <div className="p-field">
        <label>Post ID</label>
        <InputText {...register("postId")} readOnly />
      </div>

      {/* ID Alanı + Modal Butonu */}
      <div className="p-field">
        <label>ID</label>
        <div className="flex">
          <InputText {...register("id")} onKeyDown={handleIdEnter} />
          <Button label="Seç" onClick={() => setModalVisible(true)} />
        </div>
        {errors.id && <p className="error">{errors.id.message}</p>}
      </div>

      {/* Name Alanı (Modal ile Seçilebilir) */}
      <div className="p-field">
        <label>Name</label>
        <InputText {...register("name")} readOnly />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      {/* Email Alanı (Otomatik Doldurulacak) */}
      <div className="p-field">
        <label>Email</label>
        <InputText {...register("email")} readOnly />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      {/* Body Alanı (Otomatik Doldurulacak) */}
      <div className="p-field">
        <label>Body</label>
        <Textarea {...register("body")} readOnly />
        {errors.body && <p className="error">{errors.body.message}</p>}
      </div>

      <Button type="submit" label="Kaydet" />
      <CommentModal visible={modalVisible} onHide={() => setModalVisible(false)} onSelect={handleSelectComment} />
    </form>
  );
};

export default CommentForm;
