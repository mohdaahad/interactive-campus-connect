
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CalendarDays, Book, Users, GraduationCap, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-college-900 to-college-700 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200" 
            alt="Campus" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to <span className="text-college-300">CampusConnect</span> University
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90 animate-slide-in">
            Empowering minds, inspiring innovation, and building tomorrow's leaders. Join our community of thinkers and doers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-in" style={{ animationDelay: "0.2s" }}>
            <Button asChild size="lg" className="bg-college-600 hover:bg-college-700 text-white">
              <Link to="/admissions">Explore Admissions</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30">
              <Link to="/virtual-tour">Virtual Campus Tour</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight size={30} className="rotate-90 text-white/70" />
        </div>
      </section>

      {/* Programs Highlights */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Academic Excellence</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our comprehensive range of undergraduate and graduate programs designed to prepare you for success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Business Administration",
                description: "Develop essential skills in management, finance, marketing, and entrepreneurship.",
                icon: <Award className="h-10 w-10 text-college-600" />,
                courses: 12,
                link: "/courses/business"
              },
              {
                title: "Computer Science & IT",
                description: "Explore cutting-edge technology, programming, artificial intelligence, and data science.",
                icon: <Book className="h-10 w-10 text-college-600" />,
                courses: 18,
                link: "/courses/computer-science"
              },
              {
                title: "Arts & Humanities",
                description: "Engage with literature, history, philosophy, and cultural studies.",
                icon: <Users className="h-10 w-10 text-college-600" />,
                courses: 15,
                link: "/courses/arts"
              },
              {
                title: "Science & Engineering",
                description: "Discover principles of physics, chemistry, biology, and engineering disciplines.",
                icon: <GraduationCap className="h-10 w-10 text-college-600" />,
                courses: 20,
                link: "/courses/science"
              },
              {
                title: "Health Sciences",
                description: "Prepare for careers in healthcare, nutrition, psychology, and medical research.",
                icon: <Award className="h-10 w-10 text-college-600" />,
                courses: 14,
                link: "/courses/health"
              },
              {
                title: "Education & Social Sciences",
                description: "Study teaching methodologies, social work, economics, and political science.",
                icon: <Book className="h-10 w-10 text-college-600" />,
                courses: 16,
                link: "/courses/education"
              }
            ].map((program, index) => (
              <Card key={index} className="card-hover border-border">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">{program.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                    <p className="text-muted-foreground mb-4">{program.description}</p>
                    <div className="text-sm text-muted-foreground mb-4">{program.courses} Courses Available</div>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={program.link} className="flex items-center justify-center">
                        Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="default" size="lg" className="bg-college-600 hover:bg-college-700 text-white">
              <Link to="/courses">View All Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Campus Life */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Campus Life</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Immerse yourself in a vibrant community where learning extends beyond the classroom. From student clubs to athletics, arts to community service, there's something for everyone.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "30+ Student Clubs & Organizations",
                  "State-of-the-art Recreation Center",
                  "Cultural Events & Performances",
                  "Competitive Athletics Programs",
                  "Community Service Opportunities"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-college-600 mr-3"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Button asChild variant="default" className="bg-college-600 hover:bg-college-700 text-white">
                <Link to="/campus">Explore Campus Life</Link>
              </Button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
                alt="Campus Activity"
                className="rounded-lg object-cover h-48 shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
                alt="Campus Activity"
                className="rounded-lg object-cover h-48 shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
                alt="Campus Activity"
                className="rounded-lg object-cover h-48 shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
                alt="Campus Activity"
                className="rounded-lg object-cover h-48 shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events & News */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events & News</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest happenings, events, and news from our campus community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Annual Science Fair",
                date: "October 15, 2023",
                description: "Showcasing innovative student projects in science, technology, and engineering.",
                image: "https://images.unsplash.com/photo-1561489401-fc2876ced162?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
              },
              {
                title: "Guest Lecture: AI Ethics",
                date: "October 22, 2023",
                description: "Join Dr. Sarah Johnson for a thought-provoking discussion on ethical considerations in AI development.",
                image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
              },
              {
                title: "Fall Concert Series",
                date: "November 5, 2023",
                description: "Experience an evening of musical performances by our talented students and faculty.",
                image: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
              }
            ].map((event, index) => (
              <Card key={index} className="overflow-hidden card-hover">
                <div className="h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  <Button variant="link" className="p-0 h-auto text-college-600 hover:text-college-700">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-college-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Success Stories</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Hear from our students and alumni about their experiences at CampusConnect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Emily Richards",
                program: "Business Administration, 2022",
                quote: "My experience at CampusConnect provided me with not just theoretical knowledge, but practical skills that made me job-ready from day one.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
              },
              {
                name: "David Chen",
                program: "Computer Science, 2021",
                quote: "The mentorship I received from faculty members was invaluable. They went above and beyond to help me achieve my career goals.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
              },
              {
                name: "Sophia Martinez",
                program: "Psychology, 2023",
                quote: "The diverse and inclusive community at CampusConnect broadened my perspectives and helped me grow both personally and professionally.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-white/30">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mb-4 italic">"{testimonial.quote}"</p>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm opacity-80">{testimonial.program}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Begin Your Academic Journey</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Take the first step toward a transformative educational experience. Apply now or schedule a campus visit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-college-600 hover:bg-college-700 text-white">
              <Link to="/apply">Apply Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/visit">Schedule a Visit</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
