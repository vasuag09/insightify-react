import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./ViewNote.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { aiSuggestion, deleteNote, fetchNotes } from "../../utils/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorIndicator";
import { useState } from "react";

export default function ViewNote() {
  const { noteId, userId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: currentNote,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes", noteId],
    queryFn: () => fetchNotes({ noteId }),
  });
  const [suggestion, setSuggestion] = useState("");
  const { mutate: mutateAi, isPending } = useMutation({
    mutationFn: aiSuggestion,
    onSuccess: ({ suggestion }) => {
      setSuggestion(suggestion);
      console.log(suggestion);
    },
  });
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      navigate(`/${userId}/dashboard/notes`);
    },
  });

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this note?")) {
      mutate(noteId);
    }
  }

  if (isLoading) return <LoadingIndicator />;
  if (isError)
    return (
      <ErrorBlock
        title="Failed to load note"
        message={error?.info?.message || "Something went wrong."}
      />
    );

  return (
    <motion.div
      className="view-note"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>{currentNote.title}</h2>

      {currentNote.tags?.length > 0 && (
        <p className="note-tags">
          {currentNote.tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
        </p>
      )}

      <div className="note-content">
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
                alt="Markdown"
              />
            ),
          }}
          remarkPlugins={[remarkGfm, remarkBreaks]}
        >
          {currentNote.content}
        </ReactMarkdown>
      </div>

      <div className="note-actions">
        <motion.button
          className="danger"
          onClick={handleDelete}
          whileHover={{ scale: 1.05 }}
        >
          Delete
        </motion.button>
        <motion.button
          onClick={() => mutateAi(currentNote.content)}
          whileHover={{ scale: 1.05 }}
          disabled={isPending}
        >
          AI Suggestion
        </motion.button>
      </div>
      {isPending && <LoadingIndicator />}
      {suggestion && (
        <motion.div
          className="ai-suggestion"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
                  alt="Markdown"
                />
              ),
            }}
            remarkPlugins={[remarkGfm, remarkBreaks]}
          >
            {suggestion}
          </ReactMarkdown>
          {suggestion}
        </motion.div>
      )}
    </motion.div>
  );
}
