import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchSavedResumes, parseResume } from "../../utils/http";
import { useRef, useState } from "react";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorIndicator";
import { motion } from "framer-motion";
import "./ResumeParser.css";
import ResumeViewer from "./ResumeViewer";
import { useParams } from "react-router-dom";

export default function ResumeParser() {
  const { userId } = useParams();
  const fileInputRef = useRef();
  const [parsedResult, setParsedResult] = useState(null);
  const {
    data: resumeData,
    isLoading: isFetching,
    isError: isFetchError,
    error: fetchError,
  } = useQuery({
    queryKey: ["resume", userId],
    queryFn: fetchSavedResumes,
  });
  const {
    mutate,
    isPending: isParsing,
    isError: isParseError,
    error: parseError,
  } = useMutation({
    mutationFn: parseResume,
    onSuccess: (data) => {
      setParsedResult(data);
    },
  });
  function handleUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", fileInputRef.current.files[0]);
    mutate(formData);
  }

  let parsedData = null;
  try {
    if (parsedResult?.summary) {
      const cleanSummary = parsedResult.summary
        .replace(/```json|```/g, "")
        .trim();
      parsedData = JSON.parse(cleanSummary);
    } else if (resumeData) {
      parsedData = resumeData
    }
  } catch (err) {
    console.error("Failed to parse resume JSON", err);
  }

  // 🧾 5. Render
  return (
    <motion.div
      className="resume-parser-wrapper"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2
        className="resume-title"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Resume Parser
      </motion.h2>

      {(isFetching || isParsing) && <LoadingIndicator />}

      {isFetchError && !parsedData && (
        <p>No resumes available to fetch. Add one.</p>
      )}

      {isParseError && (
        <ErrorBlock
          title="Error parsing resume"
          message={parseError.info?.message}
        />
      )}

      {!parsedData && !isFetching && (
        <>
          <form onSubmit={handleUpload} className="resume-form">
            <input type="file" ref={fileInputRef} accept=".pdf" required />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Parse Resume
            </motion.button>
          </form>
        </>
      )}

      {parsedData && (
        <motion.div
          className="parsed-output"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Parsed Resume:</h3>
          <ResumeViewer data={parsedData} />
        </motion.div>
      )}
    </motion.div>
  );
}
