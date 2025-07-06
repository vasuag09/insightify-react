import { useMutation, useQuery } from "@tanstack/react-query";
import { jobAddEdit, fetchJob, queryClient } from "../../utils/http";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorIndicator";
import { motion } from "framer-motion";
import "./JobForm.css";

export default function JobForm() {
  const { userId, jobId } = useParams();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const isEditing = jobId ? true : false;

  const {
    data: jobData,
    isLoading: isFetching,
    isError: isFetchError,
    error: fetchError,
  } = useQuery({
    enabled: isEditing,
    queryKey: ["job", userId, jobId],
    queryFn: () => fetchJob({jobId, method: "GET"}),
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: jobAddEdit,
    onSuccess: () => navigate(`/${userId}/dashboard/jobs`),
  });

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jobData = Object.fromEntries(formData.entries());
    jobData.tags = jobData.tags.split(",").map((tag) => tag.trim());
    jobData.userId = user._id;
    if (!isEditing) {
      mutate({ method: "POST", jobData: jobData });
    } else {
      mutate({ method: "PUT", jobData, jobId });
    }
    queryClient.invalidateQueries(["jobs"]);
  }

  if (isFetching || isPending) return <LoadingIndicator />;
  if (isFetchError || isError)
    return (
      <ErrorBlock
        title="Error"
        message={
          fetchError?.info?.message ||
          error?.info?.message ||
          "Something went wrong"
        }
      />
    );

  return (
    <motion.form
      className="job-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <h2>{isEditing ? "Edit Job" : "Add Job"}</h2>

      <div className="form-group">
        <label htmlFor="title">Job Title:</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={jobData?.title || ""}
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">Company:</label>
        <input
          id="company"
          name="company"
          type="text"
          required
          defaultValue={jobData?.company || ""}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags (comma-separated):</label>
        <input
          id="tags"
          name="tags"
          type="text"
          placeholder="e.g., remote, frontend"
          defaultValue={jobData?.tags?.join(", ") || ""}
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          defaultValue={jobData?.status || "applied"}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
          <option value="accepted">Accepted</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="content">Description / Notes:</label>
        <textarea
          id="content"
          name="content"
          rows="5"
          defaultValue={jobData?.content || ""}
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        {isEditing ? "Update Job" : "Save Job"}
      </motion.button>
    </motion.form>
  );
}
