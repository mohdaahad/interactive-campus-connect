
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Users, 
  GraduationCap, 
  HelpCircle,
  Building,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight
} from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  inquiryType: z.string().min(1, { message: "Please select an inquiry type" }),
});

// Department contact info
const departmentContacts = [
  {
    name: "Admissions Office",
    email: "admissions@campusconnect.edu",
    phone: "(123) 456-7890",
    hours: "Monday-Friday: 9:00 AM - 5:00 PM",
    icon: <Users className="h-10 w-10 text-college-600" />
  },
  {
    name: "Academic Affairs",
    email: "academics@campusconnect.edu",
    phone: "(123) 456-7891",
    hours: "Monday-Friday: 8:30 AM - 4:30 PM",
    icon: <GraduationCap className="h-10 w-10 text-college-600" />
  },
  {
    name: "Student Services",
    email: "studentservices@campusconnect.edu",
    phone: "(123) 456-7892",
    hours: "Monday-Friday: 9:00 AM - 6:00 PM",
    icon: <HelpCircle className="h-10 w-10 text-college-600" />
  },
  {
    name: "Financial Aid",
    email: "finaid@campusconnect.edu",
    phone: "(123) 456-7893",
    hours: "Monday-Friday: 9:00 AM - 4:00 PM",
    icon: <Building className="h-10 w-10 text-college-600" />
  }
];

// Campus locations
const campusLocations = [
  {
    name: "Main Campus",
    address: "123 University Ave, College Town, CT 12345",
    phone: "(123) 456-7800",
    email: "info@campusconnect.edu"
  },
  {
    name: "Downtown Center",
    address: "456 Main Street, College Town, CT 12345",
    phone: "(123) 456-7801",
    email: "downtown@campusconnect.edu"
  },
  {
    name: "Science & Technology Complex",
    address: "789 Innovation Drive, College Town, CT 12345",
    phone: "(123) 456-7802",
    email: "tech@campusconnect.edu"
  }
];

// FAQs
const faqs = [
  {
    question: "How do I apply for admission?",
    answer: "Visit our Admissions page for detailed instructions on how to apply. You can submit your application online through our portal or contact the Admissions Office for assistance."
  },
  {
    question: "What financial aid options are available?",
    answer: "We offer various financial aid options including scholarships, grants, loans, and work-study programs. Visit the Financial Aid office or website for more information on eligibility and application processes."
  },
  {
    question: "How can I schedule a campus tour?",
    answer: "Campus tours can be scheduled through our website's Visit Us page, or by contacting the Admissions Office directly. Tours are available Monday through Friday, with select Saturday availability."
  },
  {
    question: "Where can I find information about housing?",
    answer: "Information about on-campus housing options, application processes, and deadlines can be found on the Housing page of our website or by contacting the Housing Office directly."
  }
];

// Social media links
const socialLinks = [
  { name: "Facebook", icon: <Facebook className="h-5 w-5" />, url: "https://facebook.com/campusconnect" },
  { name: "Twitter", icon: <Twitter className="h-5 w-5" />, url: "https://twitter.com/campusconnect" },
  { name: "Instagram", icon: <Instagram className="h-5 w-5" />, url: "https://instagram.com/campusconnect" },
  { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, url: "https://linkedin.com/school/campusconnect" },
  { name: "YouTube", icon: <Youtube className="h-5 w-5" />, url: "https://youtube.com/campusconnect" }
];

const Contact = () => {
  const { toast } = useToast();
  
  // Initialize form
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: ""
    }
  });
  
  // Handle form submission
  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    console.log("Form data:", data);
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you shortly.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-college-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            We're here to help. Reach out with questions, feedback, or inquiries, and our team will be happy to assist you.
          </p>
        </div>
      </section>
      
      {/* Main Contact Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="inquiryType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Inquiry Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="admission" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Admission Inquiry
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="academic" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Academic Question
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="financial" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Financial Aid
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="other" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Other
                                  </FormLabel>
                                </FormItem>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Subject of your message" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Type your message here" 
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full bg-college-600 hover:bg-college-700">Send Message</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Get in touch through any of the following methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-college-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-muted-foreground">Main: (123) 456-7890</p>
                      <p className="text-muted-foreground">Toll-free: 1-800-123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-college-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-muted-foreground">General Information: info@campusconnect.edu</p>
                      <p className="text-muted-foreground">Support: support@campusconnect.edu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-college-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-muted-foreground">123 University Avenue</p>
                      <p className="text-muted-foreground">College Town, CT 12345</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-college-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Hours of Operation</h4>
                      <p className="text-muted-foreground">Monday-Friday: 8:00 AM - 5:00 PM</p>
                      <p className="text-muted-foreground">Saturday: 9:00 AM - 1:00 PM (Admissions Only)</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Connect With Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((social, index) => (
                      <Button key={index} variant="outline" size="icon" asChild>
                        <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                          {social.icon}
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-secondary p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-6 w-6 text-college-600 mr-2" />
                  <h3 className="text-lg font-semibold">Need Immediate Assistance?</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Our support team is available for live chat during regular business hours.
                </p>
                <Button className="bg-college-600 hover:bg-college-700 w-full">
                  Start Live Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Department Contacts */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Department Contacts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect directly with specific departments for specialized assistance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {departmentContacts.map((dept, index) => (
              <Card key={index} className="text-center h-full card-hover transition-all">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4">
                    {dept.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{dept.name}</h3>
                  <div className="text-sm text-muted-foreground space-y-1 mb-4">
                    <p className="flex items-center justify-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {dept.email}
                    </p>
                    <p className="flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {dept.phone}
                    </p>
                    <p className="flex items-center justify-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {dept.hours}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Contact</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Campus Locations */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Our Campuses</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visit us at one of our convenient campus locations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {campusLocations.map((campus, index) => (
              <Card key={index} className="overflow-hidden h-full card-hover transition-all">
                <div className="h-48 bg-secondary flex items-center justify-center">
                  <MapPin className="h-16 w-16 text-muted-foreground/30" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{campus.name}</h3>
                  <div className="text-sm text-muted-foreground space-y-1 mb-4">
                    <p className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{campus.address}</span>
                    </p>
                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {campus.phone}
                    </p>
                    <p className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {campus.email}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">Directions</Button>
                    <Button variant="outline" size="sm" className="flex-1">Virtual Tour</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQs */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="h-full card-hover transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start mb-2">
                    <HelpCircle className="h-5 w-5 text-college-600 mr-2 mt-0.5" />
                    <h3 className="font-semibold">{faq.question}</h3>
                  </div>
                  <p className="text-muted-foreground pl-7">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Don't see your question here? Contact our support team for assistance.
            </p>
            <Button className="bg-college-600 hover:bg-college-700">
              View All FAQs <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Map */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Find Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              View our campus location on the map.
            </p>
          </div>
          
          <Card className="overflow-hidden">
            <div className="h-96 bg-secondary flex flex-col items-center justify-center p-8 text-center">
              <Globe className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                This is a placeholder for the Google Maps integration. In a real implementation, an interactive Google Map would be displayed here.
              </p>
              <Button>Open in Google Maps</Button>
            </div>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
