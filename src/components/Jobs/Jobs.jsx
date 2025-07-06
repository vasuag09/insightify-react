import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchJob, fetchJobs, queryClient } from "../../utils/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorIndicator";
import "./Jobs.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { text } from "framer-motion/client";

export default function Jobs() {
  const user = useSelector((state) => state.user.user);
  const [searchTerm, setSearchTerm] = useState("");
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }
  const {
    data: fetchedJobs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["jobs", user._id],
    queryFn: fetchJobs,
  });
  const { mutate } = useMutation({
    mutationFn: fetchJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
  if (isLoading) return <LoadingIndicator />;

  if (isError)
    return (
      <ErrorBlock
        title="Error fetching jobs"
        message={error.info?.message || "Please try again later."}
      />
    );
  const filteredJobs = fetchedJobs.filter((job) => {
    return (
      job.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <motion.div
      className="job-layout"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <h2>Your Saved Jobs</h2>
      <Link to={"jobform"}>
        <motion.button
          className="add-job"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Add a Job
        </motion.button>
      </Link>
      {fetchedJobs.length !== 0 && (
        <div className="search-bar">
          <input
            type="text"
            name="search"
            id="search"
            onChange={handleChange}
            placeholder="Search jobs..."
            value={searchTerm}
          />
        </div>
      )}
      <div className="jobs">
        {fetchedJobs.length === 0 ? (
          <>
            <p className="no-jobs">🧐 You haven't saved any jobs yet.</p>
          </>
        ) : (
          filteredJobs.map((job) => (
            <motion.div
              className="job-card"
              key={job._id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <h3>{job.title}</h3>
              <p className="company">{job.company}</p>
              <p className="tags">{job.tags?.join(", ")}</p>
              <p className="description">{job.content?.slice(0, 100)}...</p>
              <div className="job-actions">
                <Link to={`${job._id}/jobform`}>
                  <button>Edit</button>
                </Link>
                <button
                  className="danger"
                  onClick={() => mutate({ jobId: job._id, method: "DELETE" })}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
