import React from 'react';
import Navbar from './shared/Navbar';
//import { Navbar } from 'react-bootstrap';

const workshops = [
    
  {
    subject: "Artificial Intelligence",
    venue: "Room 101, Science Block",
    time: "10:00 AM - 1:00 PM",
    description: "Explore the fundamentals of AI, including machine learning, neural networks, and real-world applications.",
  },
  {
    subject: "Cybersecurity",
    venue: "Lab 202, IT Department",
    time: "2:00 PM - 5:00 PM",
    description: "Learn about cybersecurity basics, threats, and defenses in the digital world to protect data and privacy.",
  },
  {
    subject: "Web Development",
    venue: "Room 303, Engineering Block",
    time: "11:00 AM - 2:00 PM",
    description: "A comprehensive workshop on HTML, CSS, JavaScript, and modern web frameworks to build interactive websites.",
  },
  {
    subject: "Internet of Things",
    venue: "Room 401, Electronics Block",
    time: "9:00 AM - 12:00 PM",
    description: "Dive into IoT with practical applications and hands-on experience with sensors and microcontrollers.",
  },
  {
    subject: "Blockchain",
    venue: "Conference Hall, Main Building",
    time: "1:00 PM - 4:00 PM",
    description: "An introduction to blockchain technology, smart contracts, and how it’s transforming industries.",
  },
  {
    subject: "Data Science",
    venue: "Lab 305, Data Center",
    time: "3:00 PM - 6:00 PM",
    description: "Get started with data science concepts, data wrangling, and visualization using popular tools.",
  },
  {
    subject: "Cloud Computing",
    venue: "Room 105, Technology Block",
    time: "10:00 AM - 1:00 PM",
    description: "Learn about cloud infrastructure, deployment, and services like AWS and Azure for scalable solutions.",
  },
  {
    subject: "Machine Learning",
    venue: "Room 102, Science Block",
    time: "2:00 PM - 5:00 PM",
    description: "An intensive workshop on machine learning algorithms, data processing, and model training.",
  },
  {
    subject: "Augmented Reality",
    venue: "Lab 107, Media Block",
    time: "11:00 AM - 2:00 PM",
    description: "Explore AR technologies, tools, and how they are used in gaming, education, and training.",
  },
  {
    subject: "Big Data Analytics",
    venue: "Room 302, Data Science Block",
    time: "1:00 PM - 4:00 PM",
    description: "Understand big data, Hadoop, Spark, and data analytics to make sense of large datasets.",
  },
];

const WorkshopCard = ({ subject, venue, time, description }) => (
    
  <div style={{
    backgroundColor: "#f9fafb",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
    <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937" }}>{subject}</h2>
    <p style={{ color: "#4b5563", fontSize: "0.9rem", margin: "10px 0" }}>
      <strong>Venue:</strong> {venue}
    </p>
    <p style={{ color: "#4b5563", fontSize: "0.9rem", margin: "10px 0" }}>
      <strong>Time:</strong> {time}
    </p>
    <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>{description}</p>
    <button style={{
      marginTop: "15px",
      padding: "10px 20px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    }}>
      Register
    </button>
  </div>
);

const WorkshopsPage = () => {
    
  return (
    <div>
      <Navbar/>
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937", textAlign: "center", marginBottom: "1.5rem" }}>
        Upcoming Workshops
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {workshops.map((workshop, index) => (
          <WorkshopCard key={index} {...workshop} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default WorkshopsPage;