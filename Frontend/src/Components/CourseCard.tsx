import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Course, Topic, ContentFormat } from "../types";

export default function CourseDetail() {
  const { id } = useParams<{ id?: string }>();

  const [course, setCourse] = useState<Course | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<ContentFormat | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock course data
  const mockCourse: Course = {
    id: id || "1",
    title: "AI in Education",
    description: "Learn how AI is transforming modern education.",
    instructor: "Dr. John Smith",
    duration: 10,
    difficulty: "intermediate", // ✅ lowercase
    rating: 4.5,
    studentsCount: 1500,
    thumbnail: "https://via.placeholder.com/600x300",
    createdAt: new Date().toISOString(),
    topics: [
      {
        id: "t1",
        title: "Introduction to AI",
        description: "Basics of AI and its role in education.",
        order: 1,
        content: [
          { type: "text", content: "This is a text-based explanation.", available: true },
          { type: "video", content: "AI Basics Video", url: "https://example.com/video", available: true },
        ],
      },
    ],
  };

  useEffect(() => {
    const fetchCourse = async () => {
      await new Promise((res) => setTimeout(res, 1000)); // simulate API delay
      setCourse(mockCourse);
      setSelectedTopic(mockCourse.topics[0]);
      setSelectedFormat(mockCourse.topics[0].content[0]);
      setIsLoading(false);
    };
    fetchCourse();
  }, [id]);

  if (isLoading) return <p className="text-center">Loading course details...</p>;
  if (!course) return <p className="text-center text-red-500">Course not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-6 text-gray-700">{course.description}</p>

      {/* Topics */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">Topics</h2>
        <ul className="space-y-2">
          {course.topics.map((topic) => (
            <li
              key={topic.id}
              className={`p-3 border rounded cursor-pointer ${
                selectedTopic?.id === topic.id ? "bg-blue-100 border-blue-500" : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setSelectedTopic(topic);
                setSelectedFormat(topic.content[0]);
              }}
            >
              {topic.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Formats */}
      {selectedTopic && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-3">Content Formats</h2>
          <div className="flex gap-2 mb-4">
            {selectedTopic.content.map((format, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 rounded border ${
                  selectedFormat?.type === format.type ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedFormat(format)}
              >
                {format.type}
              </button>
            ))}
          </div>

          {/* Render content */}
          <div className="p-4 border rounded bg-gray-50">
            {selectedFormat?.type === "text" && <p>{selectedFormat.content}</p>}
            {selectedFormat?.type === "video" && selectedFormat.url && (
              <a href={selectedFormat.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                Watch Video
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
