
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter, Search, Book, Clock, Users, Briefcase, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Dummy data for course listings
const coursesData = {
  undergraduate: [
    {
      id: 1,
      title: "Bachelor of Business Administration",
      department: "Business",
      duration: "4 years",
      credits: 120,
      description: "This program provides a comprehensive foundation in business principles and practices, preparing students for careers in management, marketing, finance, and entrepreneurship.",
      subjects: ["Business Ethics", "Marketing Fundamentals", "Financial Accounting", "Organizational Behavior", "Business Law", "Strategic Management"],
      careerPaths: ["Business Manager", "Marketing Specialist", "Financial Analyst", "Human Resources Manager"]
    },
    {
      id: 2,
      title: "Bachelor of Computer Science",
      department: "Computer Science",
      duration: "4 years",
      credits: 128,
      description: "The program focuses on the fundamentals of computer programming, algorithms, data structures, software development, and the theoretical aspects of computer science.",
      subjects: ["Programming Fundamentals", "Data Structures & Algorithms", "Database Systems", "Operating Systems", "Web Development", "Artificial Intelligence"],
      careerPaths: ["Software Developer", "Web Developer", "Systems Analyst", "Database Administrator"]
    },
    {
      id: 3,
      title: "Bachelor of Arts in Psychology",
      department: "Arts & Humanities",
      duration: "3 years",
      credits: 120,
      description: "This program explores human behavior and mental processes, providing a strong foundation in psychological theory, research methods, and practical applications.",
      subjects: ["Introduction to Psychology", "Cognitive Psychology", "Social Psychology", "Research Methods", "Abnormal Psychology", "Developmental Psychology"],
      careerPaths: ["Counselor", "Human Resources Specialist", "Market Research Analyst", "Social Service Manager"]
    },
    {
      id: 4,
      title: "Bachelor of Science in Engineering",
      department: "Science & Engineering",
      duration: "4 years",
      credits: 140,
      description: "The program provides a solid foundation in engineering principles, problem-solving skills, and technical expertise across various engineering disciplines.",
      subjects: ["Engineering Mathematics", "Physics", "Engineering Mechanics", "Thermodynamics", "Material Science", "Project Management"],
      careerPaths: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Project Manager"]
    },
    {
      id: 5,
      title: "Bachelor of Science in Nursing",
      department: "Health Sciences",
      duration: "4 years",
      credits: 130,
      description: "This program prepares students for careers in nursing, focusing on patient care, health assessment, medical procedures, and healthcare management.",
      subjects: ["Anatomy & Physiology", "Pharmacology", "Healthcare Ethics", "Medical-Surgical Nursing", "Pediatric Nursing", "Community Health"],
      careerPaths: ["Registered Nurse", "Clinical Nurse", "Healthcare Administrator", "Public Health Nurse"]
    },
    {
      id: 6,
      title: "Bachelor of Education",
      department: "Education & Social Sciences",
      duration: "4 years",
      credits: 120,
      description: "The program focuses on educational theory, teaching methodologies, curriculum development, and classroom management to prepare students for careers in education.",
      subjects: ["Educational Psychology", "Teaching Methods", "Curriculum Development", "Classroom Management", "Educational Technology", "Assessment & Evaluation"],
      careerPaths: ["Teacher", "Educational Consultant", "Curriculum Developer", "Educational Administrator"]
    }
  ],
  graduate: [
    {
      id: 7,
      title: "Master of Business Administration (MBA)",
      department: "Business",
      duration: "2 years",
      credits: 60,
      description: "The MBA program develops advanced business knowledge and leadership skills, preparing students for executive positions and entrepreneurial ventures.",
      subjects: ["Advanced Management Theory", "Strategic Leadership", "Corporate Finance", "Marketing Management", "Operations Management", "Business Analytics"],
      careerPaths: ["Business Executive", "Management Consultant", "Entrepreneur", "Financial Manager"]
    },
    {
      id: 8,
      title: "Master of Computer Science",
      department: "Computer Science",
      duration: "2 years",
      credits: 45,
      description: "This program provides advanced knowledge in computer science, focusing on specialized areas such as artificial intelligence, data science, and cybersecurity.",
      subjects: ["Advanced Algorithms", "Machine Learning", "Computer Networks", "Data Mining", "Cybersecurity", "Cloud Computing"],
      careerPaths: ["Software Architect", "Data Scientist", "AI Specialist", "Cybersecurity Analyst"]
    },
    {
      id: 9,
      title: "Master of Arts in Psychology",
      department: "Arts & Humanities",
      duration: "2 years",
      credits: 48,
      description: "The program provides advanced training in psychological theory, research methods, and practical applications, preparing students for careers in clinical practice or academia.",
      subjects: ["Advanced Research Methods", "Clinical Psychology", "Neuropsychology", "Psychotherapy", "Psychological Assessment", "Ethics in Psychology"],
      careerPaths: ["Clinical Psychologist", "Research Psychologist", "Psychology Professor", "Behavioral Analyst"]
    },
    {
      id: 10,
      title: "Master of Science in Engineering",
      department: "Science & Engineering",
      duration: "2 years",
      credits: 45,
      description: "This program develops advanced knowledge and skills in engineering principles, research methods, and practical applications in specialized engineering fields.",
      subjects: ["Advanced Engineering Mathematics", "Research Methodology", "Systems Engineering", "Engineering Project Management", "Advanced Mechanics", "Sustainable Engineering"],
      careerPaths: ["Senior Engineer", "Engineering Consultant", "Research Engineer", "Engineering Project Manager"]
    }
  ],
  certificates: [
    {
      id: 11,
      title: "Certificate in Digital Marketing",
      department: "Business",
      duration: "6 months",
      credits: 15,
      description: "This certificate program provides practical skills in digital marketing strategies, social media management, SEO, and analytics.",
      subjects: ["Social Media Marketing", "Search Engine Optimization", "Content Marketing", "Digital Analytics", "Email Marketing"],
      careerPaths: ["Digital Marketing Specialist", "Social Media Manager", "SEO Specialist", "Content Strategist"]
    },
    {
      id: 12,
      title: "Certificate in Cybersecurity",
      department: "Computer Science",
      duration: "6 months",
      credits: 18,
      description: "The program focuses on network security, ethical hacking, digital forensics, and security management.",
      subjects: ["Network Security", "Ethical Hacking", "Digital Forensics", "Security Management", "Cryptography"],
      careerPaths: ["Cybersecurity Specialist", "Security Analyst", "Network Security Engineer", "Security Consultant"]
    },
    {
      id: 13,
      title: "Certificate in TESOL",
      department: "Education & Social Sciences",
      duration: "4 months",
      credits: 12,
      description: "This program prepares students for teaching English to speakers of other languages in various educational settings.",
      subjects: ["Language Acquisition", "Teaching Methodologies", "Curriculum Design", "Assessment", "Classroom Management"],
      careerPaths: ["ESL Teacher", "Language Instructor", "Private Tutor", "Curriculum Developer"]
    }
  ]
};

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  
  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'Business', label: 'Business' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Arts & Humanities', label: 'Arts & Humanities' },
    { value: 'Science & Engineering', label: 'Science & Engineering' },
    { value: 'Health Sciences', label: 'Health Sciences' },
    { value: 'Education & Social Sciences', label: 'Education & Social Sciences' }
  ];
  
  const durations = [
    { value: 'all', label: 'All Durations' },
    { value: '4 months', label: '4 months' },
    { value: '6 months', label: '6 months' },
    { value: '1 year', label: '1 year' },
    { value: '2 years', label: '2 years' },
    { value: '3 years', label: '3 years' },
    { value: '4 years', label: '4 years' }
  ];
  
  const filterCourses = (courses) => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || course.department === selectedDepartment;
      const matchesDuration = selectedDuration === 'all' || course.duration === selectedDuration;
      
      return matchesSearch && matchesDepartment && matchesDuration;
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-college-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Academic Programs</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Discover our comprehensive range of undergraduate, graduate, and certificate programs designed to prepare you for success in your chosen field.
          </p>
        </div>
      </section>
      
      {/* Course Search & Filter */}
      <section className="py-10 bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-end">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium mb-1">Search Programs</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="search"
                  placeholder="Search by keyword..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <label htmlFor="department" className="block text-sm font-medium mb-1">Department</label>
              <select
                id="department"
                className="w-full border rounded-md p-2"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map((dept) => (
                  <option key={dept.value} value={dept.value}>{dept.label}</option>
                ))}
              </select>
            </div>
            
            <div className="w-full md:w-48">
              <label htmlFor="duration" className="block text-sm font-medium mb-1">Duration</label>
              <select
                id="duration"
                className="w-full border rounded-md p-2"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
              >
                {durations.map((duration) => (
                  <option key={duration.value} value={duration.value}>{duration.label}</option>
                ))}
              </select>
            </div>
            
            <Button variant="outline" className="md:mb-0 flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </div>
      </section>
      
      {/* Course Listings */}
      <section className="py-12 bg-background flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="undergraduate">
            <TabsList className="mb-8">
              <TabsTrigger value="undergraduate">Undergraduate</TabsTrigger>
              <TabsTrigger value="graduate">Graduate</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="undergraduate">
              <div className="space-y-6">
                {filterCourses(coursesData.undergraduate).length > 0 ? (
                  filterCourses(coursesData.undergraduate).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No courses found matching your criteria. Try adjusting your filters.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="graduate">
              <div className="space-y-6">
                {filterCourses(coursesData.graduate).length > 0 ? (
                  filterCourses(coursesData.graduate).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No courses found matching your criteria. Try adjusting your filters.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="certificates">
              <div className="space-y-6">
                {filterCourses(coursesData.certificates).length > 0 ? (
                  filterCourses(coursesData.certificates).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No courses found matching your criteria. Try adjusting your filters.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

const CourseCard = ({ course }) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Book className="h-4 w-4 mr-1" />
                {course.department}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {course.credits} Credits
              </div>
            </div>
            <p className="text-muted-foreground">{course.description}</p>
          </div>
          <div className="flex md:flex-col gap-2 md:ml-4">
            <Button className="text-sm bg-college-600 hover:bg-college-700 text-white">Apply Now</Button>
            <Button variant="outline" className="text-sm">Download Brochure</Button>
          </div>
        </div>
        
        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value={`course-details-${course.id}`}>
            <AccordionTrigger>Course Details</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Book className="h-4 w-4 mr-2 text-college-600" />
                    Key Subjects
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {course.subjects.map((subject, index) => (
                      <li key={index} className="text-muted-foreground">{subject}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-college-600" />
                    Career Opportunities
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {course.careerPaths.map((career, index) => (
                      <li key={index} className="text-muted-foreground">{career}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t flex justify-end">
                <Button variant="link" className="p-0 h-auto text-college-600">
                  View Full Course Details <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Courses;
