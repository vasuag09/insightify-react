import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../utils/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorIndicator";
import { motion } from "framer-motion";
import "./ViewNotes.css";

export default function ViewNotes() {
  const { userId } = useParams();
  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes", userId],
    queryFn: fetchNotes,
  });

  if (isLoading) return <LoadingIndicator />;
  if (isError)
    return (
      <ErrorBlock
        title="Failed to fetch notes"
        message={error.info?.message || "Try again later"}
      />
    );

  return (
    <motion.div
      className="notes-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="no-notes">
        <Link to={`/${userId}/dashboard/notes/addnote`}>
          <motion.button whileHover={{ scale: 1.05 }} className="button">
            + Add Note
          </motion.button>
        </Link>
      </div>
      <h2 className="notes-title">Your Notes</h2>

      {notes.length === 0 ? (
        <div className="no-notes">
          <p>No notes found.</p>
        </div>
      ) : (
        <>
          <div className="notes-grid">
            {notes.map((note, index) => (
              <motion.div
                key={note._id}
                className="note-card"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3>{note.title}</h3>
                <p className="note-snippet">{note.content.slice(0, 100)}...</p>
                <div className="note-tags-list">
                  {note.tags?.map((tag, i) => (
                    <span key={i} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link to={`/${userId}/dashboard/notes/${note._id}/viewnote`}>
                  <motion.button whileHover={{ scale: 1.05 }}>
                    View Note
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
