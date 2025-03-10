
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Users, 
  Library, 
  Home, 
  Coffee, 
  Dumbbell, 
  Calendar, 
  MapPin,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Campus facilities data
const facilities = [
  {
    title: "Academic Buildings",
    description: "State-of-the-art classrooms, laboratories, and lecture halls designed for optimal learning experiences.",
    image: "/assets/academic-buildings.jpg",
    icon: <Building2 className="h-10 w-10 text-college-600" />
  },
  {
    title: "Student Housing",
    description: "Comfortable and modern dormitories with single and shared room options, all with high-speed internet access.",
    image: "/assets/student-housing.jpg",
    icon: <Home className="h-10 w-10 text-college-600" />
  },
  {
    title: "Library",
    description: "Extensive collection of books, journals, and digital resources with quiet study spaces and group collaboration rooms.",
    image: "/assets/library.jpg",
    icon: <Library className="h-10 w-10 text-college-600" />
  },
  {
    title: "Dining Halls",
    description: "Multiple dining options serving a variety of cuisines, including vegetarian, vegan, and international dishes.",
    image: "/assets/dining-hall.jpg",
    icon: <Coffee className="h-10 w-10 text-college-600" />
  },
  {
    title: "Athletic Facilities",
    description: "Modern gymnasium, swimming pool, tennis courts, and fields for various sports activities.",
    image: "/assets/athletic-facilities.jpg",
    icon: <Dumbbell className="h-10 w-10 text-college-600" />
  }
];

// Student clubs data
const studentClubs = [
  {
    name: "Robotics Club",
    description: "Design and build robots for competitions and research projects.",
    members: 45,
    category: "Technology"
  },
  {
    name: "Debate Society",
    description: "Participate in debate competitions and improve public speaking skills.",
    members: 32,
    category: "Academic"
  },
  {
    name: "Photography Club",
    description: "Learn photography techniques and showcase your work in campus exhibitions.",
    members: 28,
    category: "Art"
  },
  {
    name: "Environmental Club",
    description: "Engage in sustainability initiatives and environmental awareness campaigns.",
    members: 40,
    category: "Community Service"
  },
  {
    name: "Drama Club",
    description: "Perform in theatrical productions and develop acting skills.",
    members: 35,
    category: "Art"
  },
  {
    name: "Business Club",
    description: "Network with industry professionals and learn entrepreneurial skills.",
    members: 50,
    category: "Professional"
  }
];

// Upcoming events data
const upcomingEvents = [
  {
    title: "Annual Cultural Festival",
    date: "October 15-17, 2023",
    description: "Three days of music, dance, art, and cultural performances from students and guest artists.",
    location: "Main Campus Grounds"
  },
  {
    title: "Career Fair",
    date: "November 5, 2023",
    description: "Connect with over 50 employers from various industries for internship and job opportunities.",
    location: "Student Center"
  },
  {
    title: "Tech Symposium",
    date: "November 20, 2023",
    description: "Presentations and workshops on emerging technologies by industry experts and faculty researchers.",
    location: "Engineering Building"
  },
  {
    title: "Sports Tournament",
    date: "December 3-4, 2023",
    description: "Inter-college sports competition featuring basketball, volleyball, and soccer matches.",
    location: "Athletic Complex"
  }
];

// Virtual tour destinations
const tourDestinations = [
  {
    title: "Main Campus",
    description: "Explore our sprawling 50-acre main campus with its iconic architecture and beautiful landscapes.",
    image: "/assets/main-campus.jpg"
  },
  {
    title: "Science Complex",
    description: "Visit our state-of-the-art laboratories and research facilities in the Science Complex.",
    image: "/assets/science-complex.jpg"
  },
  {
    title: "Library",
    description: "Tour our extensive library with over 500,000 volumes and modern study spaces.",
    image: "/assets/library-interior.jpg"
  },
  {
    title: "Student Center",
    description: "Experience the heart of student life at our vibrant Student Center.",
    image: "/assets/student-center.jpg"
  }
];

const CampusLife = () => {
  const [activeTab, setActiveTab] = useState("facilities");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-20 bg-college-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Campus Life</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Discover a vibrant community where academics, extracurricular activities, and social events create an enriching college experience.
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full mb-8">
              <TabsTrigger value="facilities" className="text-sm md:text-base">Campus Facilities</TabsTrigger>
              <TabsTrigger value="clubs" className="text-sm md:text-base">Student Clubs</TabsTrigger>
              <TabsTrigger value="events" className="text-sm md:text-base">Events</TabsTrigger>
              <TabsTrigger value="tour" className="text-sm md:text-base">Virtual Tour</TabsTrigger>
            </TabsList>
            
            {/* Facilities Tab */}
            <TabsContent value="facilities" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {facilities.map((facility, index) => (
                  <Card key={index} className="overflow-hidden card-hover transition-all h-full">
                    <div className="h-48 overflow-hidden bg-secondary">
                      <div className="flex items-center justify-center h-full">
                        {facility.icon}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{facility.title}</h3>
                      <p className="text-muted-foreground mb-4">{facility.description}</p>
                      <Button variant="link" className="p-0 flex items-center text-college-600">
                        Learn more <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Student Clubs Tab */}
            <TabsContent value="clubs" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {studentClubs.map((club, index) => (
                  <Card key={index} className="card-hover transition-all h-full">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold">{club.name}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-college-100 text-college-800">
                          {club.category}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">{club.description}</p>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{club.members} members</span>
                      </div>
                      <Button variant="outline" className="w-full mt-4">Join Club</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-10">
                <Button className="bg-college-600 hover:bg-college-700">
                  Start Your Own Club <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            {/* Events Tab */}
            <TabsContent value="events" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="card-hover transition-all">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold">{event.title}</h3>
                        <div className="flex items-center mt-2 text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center mt-1 text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{event.description}</p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Learn More</Button>
                        <Button className="bg-college-600 hover:bg-college-700" size="sm">RSVP</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-10 bg-secondary rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">Looking for more events?</h3>
                <p className="text-muted-foreground mb-6">Check out our full calendar of academic, cultural, and athletic events happening on campus.</p>
                <Button className="bg-college-600 hover:bg-college-700">
                  View Full Calendar <Calendar className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            {/* Virtual Tour Tab */}
            <TabsContent value="tour" className="animate-fade-in">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold mb-4">Explore Our Campus Virtually</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Take a virtual tour of our campus from anywhere in the world. Get a glimpse of our facilities, architecture, and vibrant community spaces.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tourDestinations.map((destination, index) => (
                  <Card key={index} className="overflow-hidden card-hover transition-all">
                    <div className="h-56 bg-secondary flex items-center justify-center">
                      <Building2 className="h-20 w-20 text-muted-foreground/50" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{destination.title}</h3>
                      <p className="text-muted-foreground mb-4">{destination.description}</p>
                      <Button className="w-full bg-college-600 hover:bg-college-700">
                        Start Tour
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-10 p-6 border rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Want to visit in person?</h3>
                <p className="mb-6 text-muted-foreground">Nothing beats experiencing our campus in person. Schedule a visit today!</p>
                <Button variant="outline">Schedule Campus Visit</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Student Life Highlight */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Student Life Highlights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From academic achievements to community service, our students make the most of their college experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center card-hover transition-all">
              <CardContent className="p-6">
                <div className="rounded-full w-16 h-16 bg-college-100 text-college-600 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">50+ Student Organizations</h3>
                <p className="text-muted-foreground">
                  Join clubs and organizations that match your interests and help you develop leadership skills.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center card-hover transition-all">
              <CardContent className="p-6">
                <div className="rounded-full w-16 h-16 bg-college-100 text-college-600 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">200+ Annual Events</h3>
                <p className="text-muted-foreground">
                  Participate in a wide range of academic, cultural, and recreational events throughout the year.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center card-hover transition-all">
              <CardContent className="p-6">
                <div className="rounded-full w-16 h-16 bg-college-100 text-college-600 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">15+ Sports Teams</h3>
                <p className="text-muted-foreground">
                  Compete at various levels or support our athletics programs as part of our vibrant community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-college-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Campus Life Firsthand</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Ready to become part of our vibrant campus community? Schedule a visit or apply today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-college-700 hover:bg-white/90">
              <a href="/admissions" className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Apply Now
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <a href="#" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Visit
              </a>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CampusLife;
