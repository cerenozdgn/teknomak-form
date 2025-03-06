import { useState } from "react";
import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip"; 
import { Comment } from "../types/Index";

interface CommentModalProps {
  visible: boolean;
  comments: Comment[];
  onClose: () => void;
  onSelect: (comment: Comment) => void;
  modalType: "id" | "name";
}

const CommentModal: React.FC<CommentModalProps> = ({
  visible,
  comments,
  onClose,
  onSelect,
}) => {
  const [search, setSearch] = useState("");
  const locales = ["tr", "TR", "tr-TR", "tr-u-co-search", "tr-x-turkish"];

  const filteredComments = comments.filter(
    (c) =>
      c.name
        .toLocaleLowerCase(locales)
        .includes(search.toLocaleLowerCase(locales)) ||
      c.email
        .toLocaleLowerCase(locales)
        .includes(search.toLocaleLowerCase(locales)) ||
      c.body
        .toLocaleLowerCase(locales)
        .includes(search.toLocaleLowerCase(locales))
  );

  return (
    <Dialog
      visible={visible}
      onHide={onClose}
      style={{
        width: "auto", 
        maxWidth: "90vw", 
        maxHeight: "90vh", 
        overflow: "auto", 
      }}
      position='center'
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "1rem",
          fontSize: "1.6rem",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Comment Modal
      </h2>
      <InputText
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Ara...'
        className='p-mb-2'
      />

      <DataTable
        value={filteredComments}
        selectionMode='single'
        tableStyle={{ minWidth: "10rem" }}
        onRowSelect={(e) => onSelect(e.data)}
        paginator
        rows={5}
        rowsPerPageOptions={[5,10,20]}
      >
        <Column field='id' header='ID' style={{ width: "10%" }} sortable />
        <Column field='name' header='Name' style={{ width: "20%" }} sortable />
        <Column
          field='email'
          header='Email'
          style={{ width: "20%" }}
          sortable
        />

        
        <Column
          field='body'
          header='Body'
          style={{ width: "40%" }}
          sortable
          body={(rowData) => (
            <div>
              <span
                data-pr-tooltip={rowData.body} 
                data-pr-position='left'
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "block",
                  width: "300px",
                }}
              >
                {rowData.body.length > 100
                  ? rowData.body.substring(0, 100) + "..."
                  : rowData.body}
              </span>
              <Tooltip target='[data-pr-tooltip]' />
            </div>
          )}
        />
      </DataTable>
    </Dialog>
  );
};

export default CommentModal;
