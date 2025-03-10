
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Search, ExternalLink, Phone, BookOpen, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Dummy faculty data
const facultyData = {
  business: [
    {
      id: 1,
      name: "Dr. Robert Thompson",
      title: "Professor of Business Administration",
      department: "Business",
      email: "r.thompson@campusconnect.edu",
      phone: "(123) 456-7890",
      bio: "Dr. Thompson has over 15 years of experience in business management and strategy. His research focuses on organizational behavior and leadership development.",
      education: ["Ph.D. in Business Administration, Harvard University", "MBA, Stanford University", "B.Com, University of Chicago"],
      research: ["Organizational Leadership", "Strategic Management", "Corporate Social Responsibility"],
      publications: [
        "Thompson, R. (2022). Strategic Leadership in the Digital Age. Journal of Business Management, 45(2), 112-128.",
        "Thompson, R. & Johnson, A. (2021). Corporate Culture and Organizational Performance. Harvard Business Review, 15(4), 78-92."
      ],
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    },
    {
      id: 2,
      name: "Dr. Sarah Williams",
      title: "Associate Professor of Marketing",
      department: "Business",
      email: "s.williams@campusconnect.edu",
      phone: "(123) 456-7891",
      bio: "Dr. Williams specializes in consumer behavior and digital marketing strategies. She has collaborated with several Fortune 500 companies on marketing research projects.",
      education: ["Ph.D. in Marketing, University of Pennsylvania", "M.Sc. in Marketing, London School of Economics", "B.B.A, University of Texas"],
      research: ["Consumer Behavior", "Digital Marketing", "Brand Management"],
      publications: [
        "Williams, S. (2022). Digital Consumer Engagement Strategies. Journal of Marketing Research, 33(1), 45-62.",
        "Williams, S. & Brown, D. (2020). Social Media Marketing Effectiveness. Marketing Science, 28(3), 112-130."
      ],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    }
  ],
  computer_science: [
    {
      id: 3,
      name: "Dr. Michael Chen",
      title: "Professor of Computer Science",
      department: "Computer Science",
      email: "m.chen@campusconnect.edu",
      phone: "(123) 456-7892",
      bio: "Dr. Chen is an expert in artificial intelligence and machine learning algorithms. He has developed several patented technologies in the field of data science.",
      education: ["Ph.D. in Computer Science, MIT", "M.S. in Computer Engineering, Stanford University", "B.S. in Computer Science, UC Berkeley"],
      research: ["Artificial Intelligence", "Machine Learning", "Neural Networks"],
      publications: [
        "Chen, M. (2023). Advanced Neural Network Architectures. Journal of Artificial Intelligence, 56(2), 78-95.",
        "Chen, M. & Smith, J. (2021). Machine Learning Applications in Healthcare. IEEE Transactions on AI, 42(3), 156-172."
      ],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    },
    {
      id: 4,
      name: "Dr. Rebecca Zhang",
      title: "Assistant Professor of Data Science",
      department: "Computer Science",
      email: "r.zhang@campusconnect.edu",
      phone: "(123) 456-7893",
      bio: "Dr. Zhang's research focuses on big data analytics and statistical modeling. She has developed innovative algorithms for predictive analytics in various industries.",
      education: ["Ph.D. in Statistics, University of Cambridge", "M.S. in Data Science, ETH Zurich", "B.S. in Mathematics, Peking University"],
      research: ["Big Data Analytics", "Statistical Modeling", "Predictive Analytics"],
      publications: [
        "Zhang, R. (2022). Predictive Modeling for Financial Markets. Journal of Data Science, 38(4), 201-218.",
        "Zhang, R. & Johnson, K. (2021). Big Data Applications in Healthcare. IEEE Data Science Review, 15(2), 89-104."
      ],
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    }
  ],
  arts: [
    {
      id: 5,
      name: "Dr. Emily Carter",
      title: "Professor of English Literature",
      department: "Arts & Humanities",
      email: "e.carter@campusconnect.edu",
      phone: "(123) 456-7894",
      bio: "Dr. Carter specializes in 19th century British literature and feminist literary criticism. She has authored several books on Victorian literature and gender studies.",
      education: ["Ph.D. in English Literature, Oxford University", "M.A. in Comparative Literature, Columbia University", "B.A. in English, Yale University"],
      research: ["Victorian Literature", "Feminist Literary Criticism", "Cultural Studies"],
      publications: [
        "Carter, E. (2022). Gender Dynamics in Victorian Novels. Oxford University Press.",
        "Carter, E. (2020). Feminist Perspectives in 19th Century Literature. Journal of Literary Studies, 42(3), 112-130."
      ],
      image: "https://images.unsplash.com/photo-1581368087157-6165a201802f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    }
  ],
  science: [
    {
      id: 6,
      name: "Dr. James Wilson",
      title: "Professor of Physics",
      department: "Science & Engineering",
      email: "j.wilson@campusconnect.edu",
      phone: "(123) 456-7895",
      bio: "Dr. Wilson's research focuses on theoretical physics and quantum mechanics. He has made significant contributions to the field of particle physics and quantum field theory.",
      education: ["Ph.D. in Physics, California Institute of Technology", "M.S. in Physics, Princeton University", "B.S. in Physics, University of Chicago"],
      research: ["Quantum Mechanics", "Particle Physics", "Theoretical Physics"],
      publications: [
        "Wilson, J. (2023). Quantum Field Theory Applications. Physical Review Letters, 128(15), 152301.",
        "Wilson, J. & Brown, A. (2021). Advances in Particle Physics. Journal of Physics, 56(4), 345-362."
      ],
      image: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    }
  ],
  health: [
    {
      id: 7,
      name: "Dr. Maria Rodriguez",
      title: "Professor of Nursing",
      department: "Health Sciences",
      email: "m.rodriguez@campusconnect.edu",
      phone: "(123) 456-7896",
      bio: "Dr. Rodriguez has extensive experience in healthcare management and nursing education. Her research focuses on patient care outcomes and healthcare policy.",
      education: ["Ph.D. in Nursing, Johns Hopkins University", "M.S.N., University of Pennsylvania", "B.S.N., New York University"],
      research: ["Healthcare Policy", "Patient Care Outcomes", "Nursing Education"],
      publications: [
        "Rodriguez, M. (2022). Improving Patient Care Outcomes. Journal of Nursing Research, 45(3), 201-215.",
        "Rodriguez, M. & Smith, K. (2021). Healthcare Policy Reforms. Health Policy Review, 33(2), 112-128."
      ],
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    }
  ],
  education: [
    {
      id: 8,
      name: "Dr. David Johnson",
      title: "Professor of Education",
      department: "Education & Social Sciences",
      email: "d.johnson@campusconnect.edu",
      phone: "(123) 456-7897",
      bio: "Dr. Johnson specializes in educational psychology and teaching methodologies. He has developed innovative approaches to classroom management and student engagement.",
      education: ["Ph.D. in Education, Stanford University", "M.Ed., Harvard University", "B.A. in Psychology, University of Michigan"],
      research: ["Educational Psychology", "Teaching Methodologies", "Classroom Management"],
      publications: [
        "Johnson, D. (2022). Effective Teaching Strategies for Diverse Classrooms. Journal of Educational Research, 56(4), 301-318.",
        "Johnson, D. & Williams, L. (2021). Student Engagement in Higher Education. Educational Psychology Review, 42(3), 178-195."
      ],
      image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    }
  ]
};

const Faculty = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const allFaculty = Object.values(facultyData).flat();
  
  const filterFaculty = (faculty) => {
    if (!searchQuery) return faculty;
    
    return faculty.filter(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.research.some(area => area.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-college-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Distinguished Faculty</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Meet our world-class faculty members dedicated to excellence in teaching, research, and innovation in their respective fields.
          </p>
        </div>
      </section>
      
      {/* Search */}
      <section className="py-10 bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search faculty by name, department, or research area..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>
      
      {/* Faculty Directory */}
      <section className="py-12 bg-background flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Faculty</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="computer_science">Computer Science</TabsTrigger>
              <TabsTrigger value="arts">Arts & Humanities</TabsTrigger>
              <TabsTrigger value="science">Science & Engineering</TabsTrigger>
              <TabsTrigger value="health">Health Sciences</TabsTrigger>
              <TabsTrigger value="education">Education & Social Sciences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <FacultyGrid faculty={filterFaculty(allFaculty)} />
            </TabsContent>
            
            <TabsContent value="business">
              <FacultyGrid faculty={filterFaculty(facultyData.business)} />
            </TabsContent>
            
            <TabsContent value="computer_science">
              <FacultyGrid faculty={filterFaculty(facultyData.computer_science)} />
            </TabsContent>
            
            <TabsContent value="arts">
              <FacultyGrid faculty={filterFaculty(facultyData.arts)} />
            </TabsContent>
            
            <TabsContent value="science">
              <FacultyGrid faculty={filterFaculty(facultyData.science)} />
            </TabsContent>
            
            <TabsContent value="health">
              <FacultyGrid faculty={filterFaculty(facultyData.health)} />
            </TabsContent>
            
            <TabsContent value="education">
              <FacultyGrid faculty={filterFaculty(facultyData.education)} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

const FacultyGrid = ({ faculty }) => {
  if (faculty.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No faculty members found matching your search criteria.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {faculty.map((member) => (
        <FacultyCard key={member.id} member={member} />
      ))}
    </div>
  );
};

const FacultyCard = ({ member }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className="overflow-hidden card-hover transition-all">
      <CardContent className="p-0">
        <div className="aspect-w-1 aspect-h-1 relative overflow-hidden h-64">
          <img
            src={member.image}
            alt={member.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-bold text-lg">{member.name}</h3>
            <p className="text-sm opacity-90">{member.title}</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <a href={`mailto:${member.email}`} className="text-college-600 hover:underline">{member.email}</a>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{member.phone}</span>
            </div>
            
            <div className="pt-2">
              <p className={`text-muted-foreground ${expanded ? '' : 'line-clamp-3'}`}>
                {member.bio}
              </p>
              {member.bio.length > 150 && (
                <Button 
                  variant="link" 
                  className="p-0 h-auto mt-1 text-college-600" 
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? 'Read less' : 'Read more'}
                </Button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {member.research.slice(0, 3).map((area, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                  {area}
                </span>
              ))}
            </div>
            
            <div className="pt-4">
              <Button asChild variant="outline" className="w-full text-sm">
                <a href={`/faculty/${member.id}`} className="flex items-center justify-center">
                  View Full Profile <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Faculty;
