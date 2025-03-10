
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ChevronRight, 
  Search,
  BookOpen,
  Trophy,
  GraduationCap,
  Globe,
  ArrowRight,
  MessageSquare,
  MapPin
} from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// News articles data
const newsArticles = [
  {
    id: 1,
    title: "University Receives $5 Million Grant for STEM Research",
    excerpt: "The National Science Foundation has awarded our university a $5 million grant to advance research in artificial intelligence and machine learning.",
    date: "October 15, 2023",
    author: "Dr. James Wilson",
    category: "Research",
    readTime: "4 min read",
    image: "/assets/research-grant.jpg"
  },
  {
    id: 2,
    title: "Business School Launches New Entrepreneurship Program",
    excerpt: "Our business school has partnered with local startups to create a hands-on entrepreneurship program for undergraduate students.",
    date: "October 10, 2023",
    author: "Prof. Sarah Johnson",
    category: "Academics",
    readTime: "3 min read",
    image: "/assets/entrepreneurship.jpg"
  },
  {
    id: 3,
    title: "Women's Soccer Team Advances to National Championship",
    excerpt: "After an undefeated season, our women's soccer team has secured a spot in the national championship tournament.",
    date: "October 8, 2023",
    author: "Michael Rodriguez",
    category: "Sports",
    readTime: "2 min read",
    image: "/assets/womens-soccer.jpg"
  },
  {
    id: 4,
    title: "Annual Arts Festival Attracts Record Attendance",
    excerpt: "This year's campus arts festival drew over 5,000 visitors, showcasing student and faculty work in visual arts, music, and theater.",
    date: "October 2, 2023",
    author: "Emily Chen",
    category: "Events",
    readTime: "3 min read",
    image: "/assets/arts-festival.jpg"
  },
  {
    id: 5,
    title: "Computer Science Department Celebrates 25th Anniversary",
    excerpt: "The Computer Science Department marked its 25th anniversary with a symposium featuring alumni working at leading tech companies.",
    date: "September 28, 2023",
    author: "Dr. Robert Lee",
    category: "Academics",
    readTime: "5 min read",
    image: "/assets/cs-anniversary.jpg"
  },
  {
    id: 6,
    title: "University Partners with Local Hospital for Medical Research",
    excerpt: "A new partnership with Memorial Hospital will expand opportunities for medical students and faculty to conduct clinical research.",
    date: "September 20, 2023",
    author: "Dr. Patricia Garcia",
    category: "Research",
    readTime: "4 min read",
    image: "/assets/medical-research.jpg"
  }
];

// Events data
const upcomingEvents = [
  {
    title: "Guest Lecture: Artificial Intelligence Ethics",
    date: "October 20, 2023",
    time: "2:00 PM - 4:00 PM",
    location: "Smith Hall, Room 103"
  },
  {
    title: "Alumni Networking Mixer",
    date: "October 22, 2023",
    time: "6:00 PM - 8:00 PM",
    location: "Student Center, Great Hall"
  },
  {
    title: "Fall Jazz Concert",
    date: "October 28, 2023",
    time: "7:30 PM - 9:30 PM",
    location: "Performing Arts Center"
  }
];

// Featured categories
const categories = [
  { name: "Research", icon: <BookOpen className="h-4 w-4" /> },
  { name: "Academics", icon: <GraduationCap className="h-4 w-4" /> },
  { name: "Sports", icon: <Trophy className="h-4 w-4" /> },
  { name: "Events", icon: <Calendar className="h-4 w-4" /> },
  { name: "Global", icon: <Globe className="h-4 w-4" /> }
];

const News = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter articles based on search query and active tab
  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === "all" || article.category.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-college-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Events</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Stay informed about the latest happenings, achievements, and upcoming events at our university.
          </p>
        </div>
      </section>
      
      {/* Search and Filter Section */}
      <section className="py-8 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search news articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-3 md:grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="academics">Academics</TabsTrigger>
                <TabsTrigger value="sports">Sports</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="global">Global</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* News Articles - 2/3 width on desktop */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Latest News</h2>
              
              {filteredArticles.length > 0 ? (
                <div className="space-y-8">
                  {filteredArticles.map((article) => (
                    <Card key={article.id} className="overflow-hidden card-hover transition-all">
                      <div className="md:flex">
                        <div className="md:w-1/3 bg-secondary h-48 md:h-auto flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-muted-foreground/30" />
                        </div>
                        <div className="md:w-2/3">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <Badge variant="outline" className="mb-2">{article.category}</Badge>
                              <div className="flex items-center text-muted-foreground text-sm">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{article.readTime}</span>
                              </div>
                            </div>
                            <CardTitle className="text-xl">{article.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-muted-foreground">{article.excerpt}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <User className="h-3 w-3 mr-1" />
                              <span>{article.author}</span>
                              <span className="mx-2">•</span>
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{article.date}</span>
                            </div>
                            <Button variant="ghost" className="p-0 h-auto text-college-600">
                              Read more <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-secondary/50 rounded-lg">
                  <p className="text-muted-foreground">No articles found matching your search criteria.</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchQuery("");
                      setActiveTab("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
              
              {filteredArticles.length > 0 && (
                <div className="mt-8 text-center">
                  <Button variant="outline">Load More Articles</Button>
                </div>
              )}
            </div>
            
            {/* Sidebar - 1/3 width on desktop */}
            <div className="space-y-8">
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Upcoming Events</CardTitle>
                  <CardDescription>What's happening on campus</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="pb-3 border-b last:border-b-0 last:pb-0">
                      <h4 className="font-medium mb-1">{event.title}</h4>
                      <div className="text-sm text-muted-foreground flex items-center mb-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {event.date}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center mb-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.time}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Full Calendar</Button>
                </CardFooter>
              </Card>
              
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Categories</CardTitle>
                  <CardDescription>Browse news by topic</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category, index) => (
                    <Button 
                      key={index} 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab(category.name.toLowerCase())}
                    >
                      <div className="flex items-center">
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </Button>
                  ))}
                </CardContent>
              </Card>
              
              {/* Newsletter Signup */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Stay Updated</CardTitle>
                  <CardDescription>Subscribe to our newsletter</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input 
                      type="email" 
                      placeholder="Your email address" 
                    />
                    <Button className="w-full bg-college-600 hover:bg-college-700">Subscribe</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Story */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Featured Story</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Highlighting exceptional achievements and stories from our university community.
            </p>
          </div>
          
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 h-64 md:h-auto bg-secondary flex items-center justify-center">
                <Trophy className="h-24 w-24 text-muted-foreground/30" />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className="mb-4 bg-college-600 hover:bg-college-600">Featured</Badge>
                <h3 className="text-2xl font-bold mb-4">Student Researcher Wins Prestigious National Award</h3>
                <p className="text-muted-foreground mb-6">
                  Senior biology major Emma Thompson has been awarded the prestigious National Science Award for her groundbreaking research on plant genetics. Her work, conducted under the guidance of Dr. Robert Chen, has significant implications for sustainable agriculture and food security.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-3 w-3 mr-1" />
                    <span>Dr. Patricia Moore</span>
                    <span className="mx-2">•</span>
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>October 1, 2023</span>
                  </div>
                  <Button className="bg-college-600 hover:bg-college-700">
                    Read Full Story
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-college-700 text-white rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Have a Story to Share?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              We're looking for stories about student achievements, faculty research, and campus initiatives.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-white text-college-700 hover:bg-white/90">
                Submit a Story <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Media Relations <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default News;
