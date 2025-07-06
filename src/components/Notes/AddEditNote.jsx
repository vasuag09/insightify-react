import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import "./AddEditNote.css";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addEditNote, fetchNotes } from "../../utils/http";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../UI/LoadingIndicator";
import { useState } from "react";
export default function AddEditNote() {
  const { noteId } = useParams();
  const navigate = useNavigate()
  const {
    data: noteData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(noteId),
  });
  const [markdown, setMarkdown] = useState("");
  const { mutate } = useMutation({
    mutationFn: addEditNote,
    onSuccess: ()=>{
      navigate(-1)
    }
  });
  if (isLoading) {
    <LoadingIndicator />;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());
    const method = "POST";
    if (noteId) {
      method = "PUT";
      mutate({ method, noteData: formData, noteId });
      return;
    }
    mutate({ method, noteData: formData });
  }
  return (
    <motion.div
      className="note-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form className="note-form" onSubmit={handleSubmit}>
        <h2>Add Note</h2>

        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={noteData?.title || ""}
            placeholder="Enter note title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated):</label>
          <input
            id="tags"
            name="tags"
            defaultValue={noteData?.tags || ""}
            type="text"
            placeholder="e.g., work, urgent"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Note Content:</label>
          <textarea
            id="content"
            name="content"
            rows="6"
            onChange={(e) => setMarkdown(e.target.value)}
            value={markdown}
            placeholder="Write your note here..."
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Add/Edit Note</button>
        </div>
      </form>
      <div className="markdown-preview">
        <h3>Markdown Preview</h3>
        <div className="markdown-guide">
          <h3>Markdown Guide 🧾</h3>
          <ul>
            <li>
              <strong>Headings:</strong> <code># H1</code>, <code>## H2</code>,{" "}
              <code>### H3</code>
            </li>
            <li>
              <strong>Bold:</strong> <code>**bold text**</code>
            </li>
            <li>
              <strong>Italic:</strong> <code>*italic text*</code>
            </li>
            <li>
              <strong>Lists:</strong> <code>- Item</code> or{" "}
              <code>1. Item</code>
            </li>
            <li>
              <strong>Links:</strong> <code>[text](url)</code>
            </li>
            <li>
              <strong>Images:</strong> <code>![alt](url)</code>
            </li>
            <li>
              <strong>Code:</strong> <code>`inline`</code> or triple backticks
              for block
            </li>
          </ul>
          <p
            style={{ fontSize: "0.9rem", marginTop: "1rem", color: "#6b7280" }}
          >
            📌 To embed images, use direct links to image files (e.g. hosted on
            Imgur or Unsplash). Ensure they end in `.jpg`, `.png`, etc.
          </p>
        </div>
        <div className="preview-content">
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),
              img: ({ node, ...props }) => (
                <img
                  {...props}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    margin: "1rem 0",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                  alt="Markdown image"
                />
              ),
            }}
            remarkPlugins={[remarkGfm, remarkBreaks]} // <- Add remarkBreaks here
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
