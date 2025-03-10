
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CheckCircle2, 
  XCircle, 
  Clipboard, 
  GraduationCap, 
  Users, 
  Calendar, 
  FileCheck, 
  ClipboardCheck,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Validation schema for eligibility checker
const eligibilitySchema = z.object({
  program: z.string().min(1, { message: 'Please select a program' }),
  degree: z.string().min(1, { message: 'Please select your previous degree' }),
  gpa: z.string().min(1, { message: 'Please enter your GPA' })
    .refine((val) => !isNaN(parseFloat(val)), { message: 'GPA must be a number' })
    .refine((val) => parseFloat(val) >= 0 && parseFloat(val) <= 4.0, { message: 'GPA must be between 0 and 4.0' }),
  hasRecommendations: z.string().min(1, { message: 'Please select an option' }),
});

// Application form schema
const applicationSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  program: z.string().min(1, { message: 'Please select a program' }),
  term: z.string().min(1, { message: 'Please select a term' }),
});

// Program requirements data
const programRequirements = {
  "undergraduate": {
    "Business Administration": {
      minGPA: 2.5,
      recommendationsRequired: true,
      description: "Our Business Administration program prepares students for careers in management, finance, marketing, and entrepreneurship.",
      requirements: [
        "High school diploma or equivalent",
        "Minimum GPA of 2.5",
        "Two letters of recommendation",
        "Statement of purpose"
      ]
    },
    "Computer Science": {
      minGPA: 3.0,
      recommendationsRequired: true,
      description: "The Computer Science program focuses on programming, algorithms, data structures, and software development.",
      requirements: [
        "High school diploma or equivalent",
        "Minimum GPA of 3.0",
        "Completion of pre-calculus or equivalent",
        "Two letters of recommendation"
      ]
    },
    "Psychology": {
      minGPA: 2.7,
      recommendationsRequired: true,
      description: "Our Psychology program explores human behavior and mental processes through theory, research, and practical applications.",
      requirements: [
        "High school diploma or equivalent",
        "Minimum GPA of 2.7",
        "Two letters of recommendation",
        "Personal statement"
      ]
    }
  },
  "graduate": {
    "MBA": {
      minGPA: 3.0,
      recommendationsRequired: true,
      description: "The MBA program develops advanced business knowledge and leadership skills for executive positions and entrepreneurial ventures.",
      requirements: [
        "Bachelor's degree in any field",
        "Minimum GPA of 3.0",
        "Three letters of recommendation",
        "Statement of purpose",
        "Resume/CV with work experience"
      ]
    },
    "Computer Science": {
      minGPA: 3.2,
      recommendationsRequired: true,
      description: "This program provides advanced knowledge in specialized areas such as AI, data science, and cybersecurity.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "Minimum GPA of 3.2",
        "Programming experience",
        "Three letters of recommendation",
        "Statement of research interests"
      ]
    },
    "Psychology": {
      minGPA: 3.3,
      recommendationsRequired: true,
      description: "The graduate program in Psychology provides advanced training for clinical practice or academic research.",
      requirements: [
        "Bachelor's degree in Psychology or related field",
        "Minimum GPA of 3.3",
        "Research experience preferred",
        "Three letters of recommendation",
        "Personal statement"
      ]
    }
  }
};

// Application steps
const applicationSteps = [
  {
    title: "Research Programs",
    description: "Explore our diverse range of undergraduate and graduate programs to find the best fit for your academic and career goals.",
    icon: <Clipboard className="h-12 w-12 text-college-600" />
  },
  {
    title: "Check Eligibility",
    description: "Review the admission requirements for your chosen program and use our eligibility checker to determine your qualification status.",
    icon: <CheckCircle2 className="h-12 w-12 text-college-600" />
  },
  {
    title: "Prepare Documents",
    description: "Gather required documents, including transcripts, recommendation letters, personal statements, and test scores.",
    icon: <FileCheck className="h-12 w-12 text-college-600" />
  },
  {
    title: "Submit Application",
    description: "Complete the online application form, upload your documents, and pay the application fee by the deadline.",
    icon: <ClipboardCheck className="h-12 w-12 text-college-600" />
  },
  {
    title: "Track Application",
    description: "Monitor the status of your application through our student portal and respond to any additional requests for information.",
    icon: <Clock className="h-12 w-12 text-college-600" />
  },
  {
    title: "Admission Decision",
    description: "Receive your admission decision and, if accepted, follow the instructions to confirm your enrollment.",
    icon: <GraduationCap className="h-12 w-12 text-college-600" />
  }
];

// Important dates
const importantDates = {
  fall: [
    { event: "Application Opens", date: "January 15, 2024" },
    { event: "Application Deadline", date: "May 1, 2024" },
    { event: "Document Submission Deadline", date: "May 15, 2024" },
    { event: "Admission Decisions", date: "June 15, 2024" },
    { event: "Enrollment Confirmation", date: "July 1, 2024" },
    { event: "Orientation", date: "August 20-22, 2024" },
    { event: "Classes Begin", date: "August 28, 2024" }
  ],
  spring: [
    { event: "Application Opens", date: "August 1, 2023" },
    { event: "Application Deadline", date: "November 1, 2023" },
    { event: "Document Submission Deadline", date: "November 15, 2023" },
    { event: "Admission Decisions", date: "December 1, 2023" },
    { event: "Enrollment Confirmation", date: "December 15, 2023" },
    { event: "Orientation", date: "January 10-12, 2024" },
    { event: "Classes Begin", date: "January 16, 2024" }
  ],
  summer: [
    { event: "Application Opens", date: "February 1, 2024" },
    { event: "Application Deadline", date: "April 1, 2024" },
    { event: "Document Submission Deadline", date: "April 15, 2024" },
    { event: "Admission Decisions", date: "May 1, 2024" },
    { event: "Enrollment Confirmation", date: "May 15, 2024" },
    { event: "Classes Begin", date: "June 10, 2024" }
  ]
};

// FAQs data
const faqData = [
  {
    question: "What are the general admission requirements?",
    answer: "General admission requirements vary by program and level of study. For undergraduate programs, we typically require a high school diploma or equivalent, a minimum GPA, and sometimes letters of recommendation. For graduate programs, a bachelor's degree in a relevant field, a competitive GPA, and letters of recommendation are usually required. Some programs may have additional requirements such as standardized test scores, portfolios, or interviews."
  },
  {
    question: "How do I apply for financial aid?",
    answer: "To apply for financial aid, you'll need to complete the Free Application for Federal Student Aid (FAFSA) and the university's financial aid application. Our Financial Aid Office can assist you with the process and provide information about scholarships, grants, loans, and work-study opportunities. We recommend applying early as some aid is distributed on a first-come, first-served basis."
  },
  {
    question: "Can international students apply?",
    answer: "Yes, we welcome applications from international students. In addition to the standard admission requirements, international students must demonstrate English language proficiency through tests like TOEFL or IELTS, provide translated and evaluated transcripts, and show proof of financial support for their studies. Our International Student Office can assist with visa information and other specific requirements."
  },
  {
    question: "What is the application fee?",
    answer: "The application fee is $60 for undergraduate applications and $75 for graduate applications. Fee waivers may be available for eligible students demonstrating financial need. The application fee is non-refundable and must be paid at the time of submission."
  },
  {
    question: "How long does it take to receive an admission decision?",
    answer: "For regular admission cycles, decisions are typically sent within 4-6 weeks after we receive a complete application package. During peak periods, the process may take longer. Early decision and some graduate program applications may have different timelines. You can always check the status of your application through our online portal."
  },
  {
    question: "Is on-campus housing guaranteed for first-year students?",
    answer: "On-campus housing is guaranteed for first-year undergraduate students who submit their housing application and deposit by the priority deadline. Transfer and graduate students may apply for on-campus housing, but it is not guaranteed and is offered based on availability. Our Housing Office can assist with finding off-campus housing options as well."
  }
];

const Admissions = () => {
  const { toast } = useToast();
  const [eligibilityResult, setEligibilityResult] = useState<null | { eligible: boolean; message: string }>(null);
  const [selectedLevel, setSelectedLevel] = useState("undergraduate");
  const [selectedProgram, setSelectedProgram] = useState("");
  
  // Eligibility checker form
  const eligibilityForm = useForm<z.infer<typeof eligibilitySchema>>({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      program: "",
      degree: "",
      gpa: "",
      hasRecommendations: ""
    }
  });

  // Application form
  const applicationForm = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      program: "",
      term: ""
    }
  });

  // Check eligibility
  const checkEligibility = (data: z.infer<typeof eligibilitySchema>) => {
    const [level, program] = data.program.split("|");
    const requirements = programRequirements[level as keyof typeof programRequirements][program as keyof (typeof programRequirements)[keyof typeof programRequirements]];
    
    const gpa = parseFloat(data.gpa);
    const hasRecommendations = data.hasRecommendations === "yes";
    
    const isEligible = gpa >= requirements.minGPA && (!requirements.recommendationsRequired || hasRecommendations);
    
    setEligibilityResult({
      eligible: isEligible,
      message: isEligible 
        ? "Congratulations! Based on the information provided, you meet the minimum eligibility requirements for this program. We encourage you to apply."
        : "Based on the information provided, you do not currently meet all eligibility requirements for this program. You may want to consider other programs or address the areas where you don't meet the requirements."
    });
  };

  // Submit application
  const onSubmitApplication = (data: z.infer<typeof applicationSchema>) => {
    console.log("Application submitted:", data);
    toast({
      title: "Application Submitted",
      description: "Thank you for your application. You will receive a confirmation email shortly.",
    });
    applicationForm.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-college-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Admissions</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Take the first step toward your future. Explore our programs, check your eligibility, and apply to become part of our vibrant academic community.
          </p>
        </div>
      </section>
      
      {/* Application Process Steps */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Application Process</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Follow these steps to complete your application successfully. Our admissions team is here to assist you at every stage.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applicationSteps.map((step, index) => (
              <Card key={index} className="card-hover transition-all">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      <span className="inline-block w-8 h-8 rounded-full bg-college-600 text-white mr-2 text-sm leading-8">{index + 1}</span>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Eligibility Checker and Apply Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="eligibility">
            <div className="text-center mb-8">
              <TabsList className="inline-flex">
                <TabsTrigger value="eligibility">Check Eligibility</TabsTrigger>
                <TabsTrigger value="apply">Apply Now</TabsTrigger>
              </TabsList>
            </div>
            
            {/* Eligibility Checker */}
            <TabsContent value="eligibility">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Eligibility Checker</CardTitle>
                      <CardDescription>
                        Use our tool to check if you meet the basic requirements for your program of interest.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...eligibilityForm}>
                        <form onSubmit={eligibilityForm.handleSubmit(checkEligibility)} className="space-y-6">
                          <FormField
                            control={eligibilityForm.control}
                            name="program"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Program of Interest</FormLabel>
                                <Select 
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    const [level, program] = value.split("|");
                                    setSelectedLevel(level);
                                    setSelectedProgram(program);
                                  }}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a program" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="undergraduate|Business Administration">Undergraduate - Business Administration</SelectItem>
                                    <SelectItem value="undergraduate|Computer Science">Undergraduate - Computer Science</SelectItem>
                                    <SelectItem value="undergraduate|Psychology">Undergraduate - Psychology</SelectItem>
                                    <SelectItem value="graduate|MBA">Graduate - MBA</SelectItem>
                                    <SelectItem value="graduate|Computer Science">Graduate - Computer Science</SelectItem>
                                    <SelectItem value="graduate|Psychology">Graduate - Psychology</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={eligibilityForm.control}
                            name="degree"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Previous Degree</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select your degree" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {selectedLevel === "undergraduate" ? (
                                      <>
                                        <SelectItem value="high_school">High School Diploma</SelectItem>
                                        <SelectItem value="ged">GED</SelectItem>
                                        <SelectItem value="international">International Equivalent</SelectItem>
                                      </>
                                    ) : (
                                      <>
                                        <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                                        <SelectItem value="masters">Master's Degree</SelectItem>
                                        <SelectItem value="international">International Equivalent</SelectItem>
                                      </>
                                    )}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={eligibilityForm.control}
                            name="gpa"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>GPA (4.0 scale)</FormLabel>
                                <FormControl>
                                  <Input type="text" placeholder="e.g., 3.5" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Enter your GPA on a 4.0 scale. If your GPA is on a different scale, please convert it.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={eligibilityForm.control}
                            name="hasRecommendations"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Do you have letters of recommendation?</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="yes" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Yes
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="no" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        No
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit" className="w-full bg-college-600 hover:bg-college-700">
                            Check Eligibility
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-2">
                  {eligibilityResult ? (
                    <Card className={`h-full ${eligibilityResult.eligible ? 'border-green-500' : 'border-red-500'}`}>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          {eligibilityResult.eligible ? (
                            <CheckCircle2 className="mr-2 h-6 w-6 text-green-500" />
                          ) : (
                            <XCircle className="mr-2 h-6 w-6 text-red-500" />
                          )}
                          Eligibility Result
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-6 text-lg">{eligibilityResult.message}</p>
                        
                        {selectedProgram && programRequirements[selectedLevel as keyof typeof programRequirements][selectedProgram as keyof (typeof programRequirements)[keyof typeof programRequirements]] && (
                          <div>
                            <h3 className="text-xl font-semibold mb-4">Program Information</h3>
                            <p className="mb-4">
                              {programRequirements[selectedLevel as keyof typeof programRequirements][selectedProgram as keyof (typeof programRequirements)[keyof typeof programRequirements]].description}
                            </p>
                            
                            <h4 className="font-semibold mb-2">Requirements:</h4>
                            <ul className="list-disc pl-5 space-y-1 mb-6">
                              {programRequirements[selectedLevel as keyof typeof programRequirements][selectedProgram as keyof (typeof programRequirements)[keyof typeof programRequirements]].requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                            
                            {eligibilityResult.eligible && (
                              <Button className="bg-college-600 hover:bg-college-700" onClick={() => {
                                document.querySelector('[data-value="apply"]')?.scrollIntoView({ behavior: 'smooth' });
                                document.querySelector('[data-value="apply"]')?.dispatchEvent(new Event('click', { bubbles: true }));
                              }}>
                                Proceed to Application
                              </Button>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="h-full bg-muted/50">
                      <CardContent className="flex flex-col items-center justify-center h-full p-12 text-center">
                        <GraduationCap className="h-16 w-16 text-muted-foreground mb-6" />
                        <h3 className="text-xl font-semibold mb-2">Check Your Eligibility</h3>
                        <p className="text-muted-foreground max-w-md">
                          Fill out the form to see if you meet the basic requirements for your program of interest. This will help you determine if you should proceed with the application.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
            
            {/* Apply Now */}
            <TabsContent value="apply">
              <Card>
                <CardHeader>
                  <CardTitle>Application Form</CardTitle>
                  <CardDescription>
                    Complete the form below to start your application. You can save your progress and return later.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...applicationForm}>
                    <form onSubmit={applicationForm.handleSubmit(onSubmitApplication)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={applicationForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={applicationForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={applicationForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john.doe@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={applicationForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="(123) 456-7890" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={applicationForm.control}
                          name="program"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Program</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a program" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="undergraduate_business">Undergraduate - Business Administration</SelectItem>
                                  <SelectItem value="undergraduate_cs">Undergraduate - Computer Science</SelectItem>
                                  <SelectItem value="undergraduate_psych">Undergraduate - Psychology</SelectItem>
                                  <SelectItem value="graduate_mba">Graduate - MBA</SelectItem>
                                  <SelectItem value="graduate_cs">Graduate - Computer Science</SelectItem>
                                  <SelectItem value="graduate_psych">Graduate - Psychology</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={applicationForm.control}
                          name="term"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Term</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a term" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="fall_2024">Fall 2024</SelectItem>
                                  <SelectItem value="spring_2024">Spring 2024</SelectItem>
                                  <SelectItem value="summer_2024">Summer 2024</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-4 pt-4">
                        <Button type="button" variant="outline">Save Draft</Button>
                        <Button type="submit" className="bg-college-600 hover:bg-college-700">Submit Application</Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Important Dates */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Important Dates</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mark these key dates on your calendar to ensure you don't miss any important deadlines in the admissions process.
            </p>
          </div>
          
          <Tabs defaultValue="fall">
            <div className="text-center mb-8">
              <TabsList>
                <TabsTrigger value="fall">Fall 2024</TabsTrigger>
                <TabsTrigger value="spring">Spring 2024</TabsTrigger>
                <TabsTrigger value="summer">Summer 2024</TabsTrigger>
              </TabsList>
            </div>
            
            {Object.keys(importantDates).map((term) => (
              <TabsContent key={term} value={term}>
                <div className="rounded-lg overflow-hidden border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-secondary">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Event</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {importantDates[term as keyof typeof importantDates].map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-secondary/50'}>
                            <td className="px-6 py-4 text-sm">{item.event}</td>
                            <td className="px-6 py-4 text-sm">{item.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <a href="#" download className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Download Academic Calendar
              </a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* FAQs */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our admissions process. If you don't see your question here, please contact our admissions office.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-card rounded-lg border">
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold">{faq.question}</AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Still have questions? Contact our admissions office.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline" className="flex items-center justify-center">
                <a href="mailto:admissions@campusconnect.edu">
                  <Mail className="mr-2 h-4 w-4" />
                  admissions@campusconnect.edu
                </a>
              </Button>
              <Button asChild variant="outline" className="flex items-center justify-center">
                <a href="tel:+1234567890">
                  <Phone className="mr-2 h-4 w-4" />
                  (123) 456-7890
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-college-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Take the first step toward a transformative educational experience. Apply now or schedule a campus visit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-college-700 hover:bg-white/90">
              <a href="#eligibility" className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Check Eligibility
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <a href="/visit" className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
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

export default Admissions;
