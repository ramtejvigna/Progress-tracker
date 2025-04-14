"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Award, BarChart3, Calendar, CheckCircle2, ChevronRight, Clock, FlameIcon, GraduationCap, LayoutDashboard, LogIn, Menu, Star, Trophy, Users, X } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for parallax effects and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Update active section based on scroll position
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { id: "home", label: "Home", icon: LayoutDashboard },
    { id: "features", label: "Features", icon: Star },
    { id: "how-it-works", label: "How It Works", icon: CheckCircle2 },
    { id: "stats", label: "Stats", icon: BarChart3 },
    { id: "get-started", label: "Get Started", icon: ArrowRight }
  ];

  // Scroll to section
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <SidebarProvider>
      {/* Desktop Sidebar */}
      <Sidebar variant="floating" className="hidden lg:flex">
        <SidebarHeader className="flex items-center justify-center py-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">LabTrack</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={activeSection === item.id}
                  onClick={() => scrollToSection(item.id)}
                  tooltip={item.label}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex justify-between items-center">
            <ThemeToggle />
            <Button asChild size="sm">
              <Link href="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b lg:hidden">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">LabTrack</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background lg:hidden pt-16"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container p-4">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => scrollToSection(item.id)}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.label}
                  </Button>
                ))}
                <div className="h-px bg-border my-4" />
                <Button asChild>
                  <Link href="/login">
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/register">
                    <Users className="h-5 w-5 mr-2" />
                    Register
                  </Link>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col *:relative min-h-screen">
        {/* Main Content */}
        <main className="min-h-screen p-8 pt-16 lg:pt-0">
          {/* Hero Section */}
          <section
            id="home"
            className="relative min-h-[calc(100vh-4rem)] lg:min-h-screen flex items-center"
          >
            <div
              className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none"
              style={{
                backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `translateY(${scrollY * 0.1}px)`
              }}
            />
            <div className="container px-4 py-16 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="flex flex-col gap-6"
                >
                  <motion.div variants={fadeIn}>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                      Student Lab Attendance System
                    </span>
                  </motion.div>
                  <motion.h1
                    variants={fadeIn}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                  >
                    Track Your Progress
                  </motion.h1>
                  <motion.p
                    variants={fadeIn}
                    className="text-lg text-muted-foreground"
                  >
                    Boost student engagement and track lab attendance with our innovative gamification system. Earn points, maintain streaks, and unlock badges.
                  </motion.p>
                  <motion.div
                    variants={fadeIn}
                    className="flex flex-col sm:flex-row gap-4 mt-4"
                  >
                    <Button size="lg" asChild>
                      <Link href="/register">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/login">
                        <LogIn className="mr-2 h-5 w-5" />
                        Login
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative"
                >
                  <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 shadow-xl">
                    <div className="absolute -top-3 -right-3 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                      Live Demo
                    </div>
                    <div className="bg-card rounded-xl shadow-sm p-4 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Today's Lab Session</h3>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>4:30 PM - 7:00 PM</span>
                      </div>
                      <Button className="w-full">Check In</Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-card rounded-lg p-3 text-center">
                        <div className="flex justify-center mb-1">
                          <Star className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div className="font-bold">250</div>
                        <div className="text-xs text-muted-foreground">Points</div>
                      </div>
                      <div className="bg-card rounded-lg p-3 text-center">
                        <div className="flex justify-center mb-1">
                          <FlameIcon className="h-5 w-5 text-orange-500" />
                        </div>
                        <div className="font-bold">7</div>
                        <div className="text-xs text-muted-foreground">Day Streak</div>
                      </div>
                      <div className="bg-card rounded-lg p-3 text-center">
                        <div className="flex justify-center mb-1">
                          <Trophy className="h-5 w-5 text-purple-500" />
                        </div>
                        <div className="font-bold">5</div>
                        <div className="text-xs text-muted-foreground">Badges</div>
                      </div>
                    </div>
                    <div className="bg-card rounded-xl p-3">
                      <h4 className="font-medium text-sm mb-2">Recent Activity</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-xs">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                          </div>
                          <span>Checked in at 4:32 PM</span>
                          <span className="ml-auto text-muted-foreground">Today</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                            <Award className="h-3 w-3 text-blue-600" />
                          </div>
                          <span>Earned "Consistent Learner" badge</span>
                          <span className="ml-auto text-muted-foreground">Yesterday</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                  <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20">
            <div className="container px-4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="text-center max-w-3xl mx-auto mb-16"
              >
                <motion.h2
                  variants={fadeIn}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Powerful Features
                </motion.h2>
                <motion.p
                  variants={fadeIn}
                  className="text-lg text-muted-foreground"
                >
                  Our lab attendance system combines powerful tracking with engaging gamification elements to boost student participation.
                </motion.p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: CheckCircle2,
                    title: "Easy Check-in/out",
                    description: "Simple one-click check-in and check-out process for lab sessions.",
                    color: "bg-green-500"
                  },
                  {
                    icon: FlameIcon,
                    title: "Streak Tracking",
                    description: "Maintain attendance streaks that don't break on holidays.",
                    color: "bg-orange-500"
                  },
                  {
                    icon: Trophy,
                    title: "Achievement Badges",
                    description: "Earn badges for consistent attendance and participation.",
                    color: "bg-purple-500"
                  },
                  {
                    icon: Star,
                    title: "Points System",
                    description: "Accumulate points based on attendance duration and consistency.",
                    color: "bg-yellow-500"
                  },
                  {
                    icon: Users,
                    title: "Leaderboard",
                    description: "Compete with peers on the leaderboard for top positions.",
                    color: "bg-blue-500"
                  },
                  {
                    icon: BarChart3,
                    title: "Analytics Dashboard",
                    description: "Comprehensive analytics for students and administrators.",
                    color: "bg-red-500"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: index * 0.1 }
                      }
                    }}
                  >
                    <Card className="h-full overflow-hidden group hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-lg ${feature.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="py-20">
            <div className="container px-4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="text-center max-w-3xl mx-auto mb-16"
              >
                <motion.h2
                  variants={fadeIn}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  How It Works
                </motion.h2>
                <motion.p
                  variants={fadeIn}
                  className="text-lg text-muted-foreground"
                >
                  Our system is designed to be simple and engaging for both students and administrators.
                </motion.p>
              </motion.div>

              <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-border hidden md:block" />

                {[
                  {
                    title: "Register and Verify",
                    description: "Create an account and verify your email with a one-time password.",
                    icon: Users
                  },
                  {
                    title: "Attend Lab Sessions",
                    description: "Check in when you arrive at the lab and check out when you leave.",
                    icon: Calendar
                  },
                  {
                    title: "Earn Points and Streaks",
                    description: "Accumulate points based on attendance duration and maintain daily streaks.",
                    icon: Star
                  },
                  {
                    title: "Unlock Badges",
                    description: "Earn achievement badges as you reach attendance milestones.",
                    icon: Award
                  },
                  {
                    title: "Track Progress",
                    description: "Monitor your attendance history, points, and badges on your dashboard.",
                    icon: BarChart3
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                      hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.6, delay: index * 0.1 }
                      }
                    }}
                    className={`flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className={`hidden md:flex items-center justify-center w-1/2 ${index % 2 === 0 ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
                      <div className="bg-primary/10 p-6 rounded-2xl max-w-sm">
                        <div className="bg-card rounded-xl p-4 shadow-sm">
                          <div className="flex items-center mb-3">
                            <step.icon className="h-5 w-5 text-primary mr-2" />
                            <h4 className="font-medium">{step.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-center md:w-0 md:h-0">
                      <div className="z-10 w-10 h-10 p-2 rounded-full bg-primary text-white flex items-center justify-center shadow-md">

                      </div>
                    </div>

                    <div className="md:hidden ml-4 flex-1">
                      <h4 className="font-medium text-lg">{step.title}</h4>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section id="stats" className="py-20">
            <div className="container px-4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="text-center max-w-3xl mx-auto mb-16"
              >
                <motion.h2
                  variants={fadeIn}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Impact and Results
                </motion.h2>
                <motion.p
                  variants={fadeIn}
                  className="text-lg text-muted-foreground"
                >
                  Our gamified attendance system has shown significant improvements in student engagement and participation.
                </motion.p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {[
                  { value: "92%", label: "Attendance Rate", icon: CheckCircle2 },
                  { value: "85%", label: "Student Engagement", icon: Users },
                  { value: "78%", label: "Streak Maintenance", icon: FlameIcon },
                  { value: "250+", label: "Badges Awarded", icon: Award }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.5, delay: index * 0.1 }
                      }
                    }}
                  >
                    <Card className="text-center h-full">
                      <CardContent className="pt-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                          <stat.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-3xl font-bold mb-1">{stat.value}</div>
                        <div className="text-muted-foreground">{stat.label}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="bg-card p-8"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">What Students Say</h3>
                    <div className="space-y-6">
                      {[
                        {
                          quote: "The gamification elements make attending lab sessions much more engaging. I love competing on the leaderboard!",
                          name: "Alex Johnson",
                          role: "Computer Science Student"
                        },
                        {
                          quote: "Tracking my attendance streak has motivated me to be more consistent with my lab participation.",
                          name: "Sarah Williams",
                          role: "Engineering Student"
                        }
                      ].map((testimonial, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.2 + index * 0.2 }}
                          className="bg-muted/50 p-4 rounded-lg"
                        >
                          <p className="italic mb-3">"{testimonial.quote}"</p>
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                              <Users className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{testimonial.name}</div>
                              <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl -rotate-3 transform-gpu" />
                    <div className="relative bg-card rounded-xl p-6 shadow-sm rotate-3 transform-gpu">
                      <h4 className="font-semibold mb-4">Top Performers This Month</h4>
                      <div className="space-y-4">
                        {[
                          { name: "Emma Davis", points: 450, streak: 15, rank: 1 },
                          { name: "Michael Chen", points: 425, streak: 12, rank: 2 },
                          { name: "Olivia Smith", points: 410, streak: 14, rank: 3 }
                        ].map((student, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 font-bold text-primary">
                              {student.rank}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {student.points} points • {student.streak} day streak
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Trophy className="h-5 w-5 text-yellow-500 mr-1" />
                              <span className="font-semibold">{student.points}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t">
                        <h4 className="font-semibold mb-3">Recently Earned Badges</h4>
                        <div className="flex flex-wrap gap-2">
                          {["Perfect Attendance", "Streak Master", "Early Bird", "Lab Champion", "Consistent Learner"].map((badge, index) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              <Award className="h-3 w-3 mr-1" />
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Get Started Section */}
          <section id="get-started" className="py-20 relative overflow-hidden">
            <div
              className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none"
              style={{
                backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `translateY(${scrollY * -0.05}px)`
              }}
            />
            <div className="container px-4 relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="max-w-3xl mx-auto text-center"
              >
                <motion.h2
                  variants={fadeIn}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Ready to Transform Lab Attendance?
                </motion.h2>
                <motion.p
                  variants={fadeIn}
                  className="text-lg text-muted-foreground mb-8"
                >
                  Join thousands of students and educators who are already benefiting from our gamified lab attendance system.
                </motion.p>
                <motion.div
                  variants={fadeIn}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button size="lg" asChild>
                    <Link href="/register">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/login">
                      <LogIn className="mr-2 h-5 w-5" />
                      Login
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-16 grid md:grid-cols-3 gap-8"
              >
                {[
                  {
                    icon: Users,
                    title: "For Students",
                    description: "Track your lab attendance, earn points, and compete with peers.",
                    link: "/register?role=student"
                  },
                  {
                    icon: GraduationCap,
                    title: "For Educators",
                    description: "Monitor student attendance and engagement with powerful analytics.",
                    link: "/register?role=educator"
                  },
                  {
                    icon: LayoutDashboard,
                    title: "For Institutions",
                    description: "Implement a campus-wide solution for tracking lab attendance.",
                    link: "/contact"
                  }
                ].map((card, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <card.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                      <p className="text-muted-foreground mb-4">{card.description}</p>
                      <Link
                        href={card.link}
                        className="inline-flex items-center text-primary font-medium group-hover:text-primary/80"
                      >
                        Learn more
                        <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-muted py-12">
          <div className="container px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span className="font-bold text-xl">LabTrack</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Transforming lab attendance with gamification and engagement.
                </p>
                <div className="flex space-x-4">
                  {["Twitter", "LinkedIn", "GitHub", "Instagram"].map((social, index) => (
                    <Button key={index} variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <span className="sr-only">{social}</span>
                      <Users className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  {["Features", "Pricing", "Testimonials", "FAQ", "Support"].map((item, index) => (
                    <li key={index}>
                      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  {["About", "Team", "Careers", "Press", "Contact"].map((item, index) => (
                    <li key={index}>
                      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  {["Terms", "Privacy", "Cookies", "Licenses", "Settings"].map((item, index) => (
                    <li key={index}>
                      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} LabTrack. All rights reserved.
              </p>
              <div className="flex items-center mt-4 md:mt-0">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SidebarProvider>
  );
}