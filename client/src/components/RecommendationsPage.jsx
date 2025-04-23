import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RecommendationsPage() {
  // eslint-disable-next-line 
  const navigate = useNavigate();

  const [userPreferences, setUserPreferences] = useState({
    job_title: [],
    location: [],
    skills: [],
    industry: [],
    values: [], // new field for the value step
  });

  const [currentStep, setCurrentStep] = useState(2);
  const [recommendations, setRecommendations] = useState([]);
  // eslint-disable-next-line 
  const [loading, setLoading] = useState(false);

  const handleNextStep = async () => {
    if (currentStep === 1) {
      setCurrentStep(2); // New step: value selection
    } else if (currentStep === 2) {
      setCurrentStep(3); // Job titles
    } else if (currentStep === 3) {
      setCurrentStep(4); // Locations
    } else if (currentStep === 4) {
      setCurrentStep(5); // Skills
    } else if (currentStep === 5) {
      setCurrentStep(6); // Industries
    } else if (currentStep === 6) {
      await fetchRecommendations();
      setCurrentStep(7); // Final step: Recommendations
    }
  };
// eslint-disable-next-line
  const handleChange = (e, category) => {
    const { value, checked } = e.target;
    setUserPreferences((prevState) => {
      let updatedCategory = [...prevState[category]];
      if (checked) {
        updatedCategory.push(value);
      } else {
        updatedCategory = updatedCategory.filter((item) => item !== value);
      }
      return { ...prevState, [category]: updatedCategory };
    });
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    setRecommendations([]);

    try {
        const { values, ...userPreferencesWithoutValues } = userPreferences;
      const res = await axios.post(
        "http://localhost:5000/api/recommend/recommend",
        userPreferencesWithoutValues
      );
      setRecommendations(res.data.recommendations);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    }

    setLoading(false);
  };
  

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>

      {currentStep === 1 && (
        <div>
          <h3>Tell me about yourself</h3>
          <p>We'll ask you a few questions to help you find the best job recommendations!</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}></div>
        </div>
      )}

      {currentStep === 2 && (
        <><div>
          <h3>Tell me about yourself</h3>
          <p>We'll ask you a few questions to help you find the best job recommendations!</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}></div>
        </div><div>
            <h2 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "10px" }}>Let's get started!</h2>
            <h3 style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "5px" }}>What do you value in a new role?</h3>
            <p style={{ marginBottom: "20px" }}>Select up to 3</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
              {[
                "Diversity & inclusion",
                "Impactful work",
                "Independence & autonomy",
                "Innovative product & tech",
                "Mentorship & career development",
                "Progressive leadership",
                "Recognition & reward",
                "Role mobility",
                "Social responsibility & sustainability",
                "Transparency & communication",
                "Work-life balance"
              ].map((item) => {
                const selected = userPreferences.values.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => {
                      setUserPreferences((prev) => {
                        let values = prev.values || [];
                        if (values.includes(item)) {
                          values = values.filter((val) => val !== item);
                        } else if (values.length < 3) {
                          values = [...values, item];
                        }
                        return { ...prev, values };
                      });
                    } }
                    style={{
                      padding: "10px 16px",
                      borderRadius: "20px",
                      border: selected ? "1px solid #0a66c2" : "1px solid #ccc",
                      backgroundColor: selected ? "#e6f0fa" : "#fff",
                      color: selected ? "#0a66c2" : "#000",
                      cursor: "pointer"
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <button onClick={handleNextStep} style={{ padding: 10, width: "100%", backgroundColor: "#0a66c2", color: "white", border: "none", borderRadius: "6px" }}>
              Save and Continue →
            </button>
          </div></>
      )}

    {currentStep === 3 && (
        <div>
          <h2 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "10px" }}>Let's get started!</h2>
          <h3 style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "5px" }}>What are your preferred Job Titles</h3>
          <p style={{ marginBottom: "20px" }}>Select up to 4</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
            {[
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UX/UI Designer",
  "Backend Developer",
  "Frontend Developer",
  "DevOps Engineer",
  "Cybersecurity Analyst",
  "QA Engineer",
  "Machine Learning Engineer",
  "AI Researcher",
  "Mobile App Developer",
  "Cloud Architect",
  "Game Developer",
  "Full Stack Developer",
  "Data Analyst",
  "Business Analyst",
  "Systems Administrator",
  "IT Support Specialist",
  "Solutions Architect",
  "Technical Writer",
  "Blockchain Developer",
  "Network Engineer",
  "Scrum Master",
  "Embedded Systems Engineer",
  "Database Administrator",
  "Robotics Engineer",
  "Digital Marketing Manager",
  "SEO Specialist",
  "Salesforce Administrator",
  "HR Specialist",
  "Project Manager",
  "Customer Success Manager",
  "Financial Analyst"
]
.map((item) => {
              const selected = userPreferences.job_title.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => {
                    setUserPreferences((prev) => {
                      let job_title = prev.job_title || [];
                      if (job_title.includes(item)) {
                        job_title = job_title.filter((val) => val !== item);
                      } else if (job_title.length < 4) {
                        job_title = [...job_title, item];
                      }
                      return { ...prev, job_title };
                    });
                  }}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "20px",
                    border: selected ? "1px solid #0a66c2" : "1px solid #ccc",
                    backgroundColor: selected ? "#e6f0fa" : "#fff",
                    color: selected ? "#0a66c2" : "#000",
                    cursor: "pointer"
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <button onClick={handleNextStep} style={{ padding: 10, width: "100%", backgroundColor: "#0a66c2", color: "white", border: "none", borderRadius: "6px" }}>
            Save and Continue →
          </button>
        </div>
      )}

    {currentStep === 4 && (
        <div>
          <h2 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "10px" }}>Let's get started!</h2>
          <h3 style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "5px" }}>What are your preferred Job Locations</h3>
          <p style={{ marginBottom: "20px" }}>Select up to 3</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
            {[
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "India",
  "Australia",
  "Brazil",
  "Japan",
  "China",
  "Netherlands",
  "Sweden",
  "Spain",
  "Italy",
  "South Korea",
  "Singapore",
  "United Arab Emirates",
  "Mexico",
  "South Africa",
  "Switzerland",
  "Ireland",
  "New Zealand",
  "Belgium",
  "Norway",
  "Finland",
  "Denmark",
  "Israel",
  "Poland",
  "Argentina",
  "Indonesia",
  "Malaysia",
  "Philippines"
]
.map((item) => {
              const selected = userPreferences.location.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => {
                    setUserPreferences((prev) => {
                      let location = prev.location || [];
                      if (location.includes(item)) {
                        location = location.filter((val) => val !== item);
                      } else if (location.length < 3) {
                        location = [...location, item];
                      }
                      return { ...prev, location };
                    });
                  }}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "20px",
                    border: selected ? "1px solid #0a66c2" : "1px solid #ccc",
                    backgroundColor: selected ? "#e6f0fa" : "#fff",
                    color: selected ? "#0a66c2" : "#000",
                    cursor: "pointer"
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <button onClick={handleNextStep} style={{ padding: 10, width: "100%", backgroundColor: "#0a66c2", color: "white", border: "none", borderRadius: "6px" }}>
            Save and Continue →
          </button>
        </div>
      )}

    {currentStep === 5 && (
        <div>
          <h2 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "10px" }}>Let's get started!</h2>
          <h3 style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "5px" }}>What are your Skills</h3>
          <p style={{ marginBottom: "20px" }}>Select up to 6</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
            {[
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "SQL",
  "HTML/CSS",
  "React",
  "Node.js",
  "Django",
  "Flask",
  "Machine Learning",
  "Deep Learning",
  "Data Visualization",
  "Natural Language Processing",
  "Cloud Computing",
  "AWS",
  "Azure",
  "GCP",
  "Docker",
  "Kubernetes",
  "Git",
  "CI/CD",
  "Agile Methodology",
  "Scrum",
  "Figma",
  "Adobe XD",
  "TensorFlow",
  "PyTorch",
  "Cybersecurity",
  "REST APIs",
  "Linux"
]
.map((item) => {
              const selected = userPreferences.skills.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => {
                    setUserPreferences((prev) => {
                      let skills = prev.skills || [];
                      if (skills.includes(item)) {
                        skills = skills.filter((val) => val !== item);
                      } else if (skills.length < 6) {
                        skills = [...skills, item];
                      }
                      return { ...prev, skills };
                    });
                  }}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "20px",
                    border: selected ? "1px solid #0a66c2" : "1px solid #ccc",
                    backgroundColor: selected ? "#e6f0fa" : "#fff",
                    color: selected ? "#0a66c2" : "#000",
                    cursor: "pointer"
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <button onClick={handleNextStep} style={{ padding: 10, width: "100%", backgroundColor: "#0a66c2", color: "white", border: "none", borderRadius: "6px" }}>
            Save and Continue →
          </button>
        </div>
      )}

    {currentStep === 6 && (
        <div>
          <h2 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "10px" }}>Let's get started!</h2>
          <h3 style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "5px" }}>What are your Preferred Industries</h3>
          <p style={{ marginBottom: "20px" }}>Select up to 4</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
            {[
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "E-commerce",
  "Automotive",
  "Retail",
  "Real Estate",
  "Telecommunications",
  "Media & Entertainment",
  "Energy",
  "Manufacturing",
  "Logistics & Supply Chain",
  "Hospitality",
  "Travel & Tourism",
  "Legal",
  "Aerospace",
  "Agriculture",
  "Food & Beverage",
  "Pharmaceuticals",
  "Biotechnology",
  "Insurance",
  "Consulting",
  "Public Sector",
  "Nonprofit",
  "Construction",
  "Gaming",
  "Fashion",
  "Fitness & Wellness",
  "Cybersecurity",
  "Environmental Services"
]
.map((item) => {
              const selected = userPreferences.industry.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => {
                    setUserPreferences((prev) => {
                      let industry = prev.industry || [];
                      if (industry.includes(item)) {
                        industry = industry.filter((val) => val !== item);
                      } else if (industry.length < 6) {
                        industry = [...industry, item];
                      }
                      return { ...prev, industry };
                    });
                  }}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "20px",
                    border: selected ? "1px solid #0a66c2" : "1px solid #ccc",
                    backgroundColor: selected ? "#e6f0fa" : "#fff",
                    color: selected ? "#0a66c2" : "#000",
                    cursor: "pointer"
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <button onClick={handleNextStep} style={{ padding: 10, width: "100%", backgroundColor: "#0a66c2", color: "white", border: "none", borderRadius: "6px" }}>
            Save and Continue →
          </button>
        </div>
      )}

{currentStep === 7 && (
  <div>
    {recommendations.length > 0 && <h2 style={{ color: "white", fontWeight: "bold" }}>Recommended Jobs:</h2>}
    <ul>
      {recommendations.map((job, index) => {
        console.log(job); // Log job data to ensure it is present
        return (
          <li key={index} style={{ marginBottom: 20 }}>
            <h3>{job.job_title}</h3>
            <p>
              {job.employer_name} - {job.job_country}
            </p>
            <p>
              <strong>Description:</strong> {job.job_description?.slice(0, 200)}...
            </p>
            <a href={job.job_apply_link} target="_blank" rel="noreferrer">
              Apply Now
            </a>
            <hr />
          </li>
        );
      })}
    </ul>
  </div>
)}

    </div>
  );
}

export default RecommendationsPage;
