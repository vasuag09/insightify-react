import { QueryClient } from "@tanstack/react-query";

const url = "https://insightify-react-backend.onrender.com/api";
export const queryClient = new QueryClient();
export async function signUpUser({ userData }) {
  const fetchUrl = url + "/auth/signup";
  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const error = new Error("An error occured while signing up.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const resData = await response.json();
  const token = resData.token;
  const user = resData.user;
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("user", JSON.stringify(user));
  return resData.user;
}
export async function loginUser({ userData }) {
  const fetchUrl = url + "/auth/login";
  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const error = new Error("An error occured while logging in.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const resData = await response.json();
  const token = resData.token;
  const user = resData.user;
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("user", JSON.stringify(user));
  return resData.user;
}
export async function fetchJobs() {
  const fetchUrl = url + "/jobs";
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await fetch(fetchUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = new Error("An error occured while fetching jobs.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const resData = await response.json();
  return resData;
}
export async function jobAddEdit({ method, jobData, jobId }) {
  let fetchUrl = url + "/jobs";
  if (method === "PUT") {
    fetchUrl += `/${jobId}`;
  }

  const token = JSON.parse(localStorage.getItem("token"));
  const response = await fetch(fetchUrl, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while adding/editing jobs.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const resData = await response.json();
  return resData;
}

export async function fetchJob({ jobId, method }) {
  console.log("Deletin");
  const fetchUrl = url + `/jobs/${jobId}`;
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await fetch(fetchUrl, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = new Error("An error occured while fetching job.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const resData = await response.json();
  console.log(resData);
  return resData;
}
// utils/http.js
export async function parseResume(formData) {
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await fetch("https://insightify-react-backend.onrender.com/api/resume/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = new Error("Failed to parse resume");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return await response.json();
}

export async function saveParsedResume(resumeData) {
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await fetch("https://insightify-react-backend.onrender.com/api/resume/save", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resumeData),
  });

  if (!response.ok) {
    const error = new Error("Failed to save resume");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return await response.json();
}

export async function fetchSavedResumes() {
  const token = JSON.parse(localStorage.getItem("token"));

  const response = await fetch("https://insightify-react-backend.onrender.com/api/resume", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error("Failed to fetch saved resumes");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }
  const resData = await response.json();
  console.log(resData[0].data);
  return resData[0].data;
}

export async function fetchNotes({ noteId }) {
  const token = JSON.parse(localStorage.getItem("token"));
  let fetchUrl = url + "/notes";
  if (noteId) {
    fetchUrl += `/${noteId}`;
  }
  const response = await fetch(fetchUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error("Failed to fetch saved notes");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }
  const resData = await response.json();
  return resData;
}

export async function addEditNote({ method, noteData, noteId }) {
  const token = JSON.parse(localStorage.getItem("token"));
  const fetchUrl = url + "/notes";
  if (method === "PUT") {
    fetchUrl += `/${noteId}`;
  }
  const response = await fetch(fetchUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(noteData),
  });

  if (!response.ok) {
    const error = new Error("Failed to fetch add/edit notes");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }
  const resData = await response.json();
  return resData;
}
// export async function fetchNoteById(noteId) {
//   const token = JSON.parse(localStorage.getItem("token"));
//   const response = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     const error = new Error("Failed to fetch note");
//     error.info = await response.json();
//     throw error;
//   }

//   return await response.json();
// }

export async function deleteNote(noteId) {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await fetch(`https://insightify-react-backend.onrender.com/api/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error("Failed to delete note");
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}

export async function aiSuggestion(content) {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await fetch(`https://insightify-react-backend.onrender.com/api/notes/ai/suggest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({content}),
  });

  if (!response.ok) {
    const error = new Error("Failed to delete note");
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}
