import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { saveParsedResume } from "../../utils/http";
export default function ResumeViewer({ data }) {
  if (!data) return <p>No resume data to display.</p>;
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: saveParsedResume,
  });
  useEffect(() => {
    if (data) {
      mutate(data);
    }
  }, [data]);
  return (
    <div className="resume-viewer">
      <h1>{data.name}</h1>
      <p>
        📧 {data.email} | 📍 {data.location}
      </p>
      <p>
        🔗{" "}
        <a href={`https://${data.linkedin}`} target="_blank">
          LinkedIn
        </a>{" "}
        | 💻{" "}
        <a href={`https://${data.github}`} target="_blank">
          GitHub
        </a>
      </p>

      <section>
        <h2>🎓 Education</h2>
        <ul>
          {data.education.map((edu, idx) => (
            <li key={idx}>
              <strong>{edu.degree}</strong> – {edu.institution} ({edu.years})
              <br />
              CGPA: {edu.cgpa}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>💼 Skills</h2>
        <ul>
          {Object.entries(data.skills).map(([key, value]) => (
            <li key={key}>
              <strong>{key.replaceAll("_", " ")}:</strong> {value.join(", ")}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>🚀 Projects</h2>
        <ul>
          {data.projects.map((proj, idx) => (
            <li key={idx}>
              <strong>{proj.name}</strong> ({proj.tech_stack.join(", ")})<br />
              {proj.description}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>🏆 Certifications</h2>
        <ul>
          {data.certifications.map((cert, idx) => (
            <li key={idx}>{cert}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>🎯 Activities & Leadership</h2>
        <ul>
          {data.activities_and_leadership.map((act, idx) => (
            <li key={idx}>{act}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
