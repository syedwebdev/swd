export interface SystemItem {
  name: string;
  slug: string;
  description: string;
  tags: string[];
}

export interface SystemCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
  description: string;
  icon: string;
  systems: SystemItem[];
}

const generateDescription = (name: string): string => {
  return `Complete ${name.toLowerCase()} solution with modern UI, API integration, and scalable architecture.`;
};

const toSlug = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const buildSystems = (names: string[], tags: string[]): SystemItem[] =>
  names.map(name => ({
    name,
    slug: toSlug(name),
    description: generateDescription(name),
    tags: [tags[0], tags[Math.floor(Math.random() * tags.length)]],
  }));

export const categories: SystemCategory[] = [
  {
    id: 'business',
    name: 'Business & SaaS Platforms',
    slug: 'business-saas',
    count: 100,
    description: 'Core business management systems like CRM, ERP, dashboards, automation, HR, and operations tools.',
    icon: '🏢',
    systems: buildSystems([
      'CRM System','ERP System','Helpdesk System','HR Management System','Payroll System','Accounting System','Invoice Generator','Expense Manager','Project Management System','Task Management System','Document Management System','Appointment Booking System','SaaS Subscription Platform','Multi-tenant SaaS System','Company Management System','Sales Management System','Order Management System','Customer Portal','Client Onboarding System','Employee Portal','Business Dashboard','Workflow Automation System','Inventory Management System','Asset Management System','Vendor Management System','Procurement System','Time Tracking System','Attendance System','Leave Management System','Performance Management System','OKR Tracking System','Knowledge Base System','Internal Communication Tool','Collaboration Platform','Team Chat System','File Sharing System','Contract Management System','Compliance System','Risk Management System','Audit System','Business Intelligence Dashboard','Data Management Platform','Reporting System','KPI Dashboard','Operations Dashboard','Admin Panel System','Role Management System','Access Control System','API Management System','Integration Platform','Notification System','Email System','Messaging System','Ticketing System','Feedback System','Survey System','Form Builder','Workflow Builder','Automation Builder','SaaS Admin Panel','Subscription Management System','Usage Tracking System','Billing Dashboard','Customer Analytics System','User Management System','Organization Management System','Multi-branch System','Franchise Management System','POS System','Retail Management System','Wholesale Management System','Distributor System','Logistics Management System','Supply Chain System','Fleet Management System','Delivery Management System','Warehouse Management System','Manufacturing System','Production Planning System','Quality Control System','Maintenance System','Service Management System','Field Service System','Job Management System','Resource Planning System','Budget Management System','Cost Management System','Revenue Management System','Profit Analysis System','Forecasting System','Strategic Planning System','Business Process Management System','Digital Transformation System','Enterprise Dashboard','Multi-org Dashboard','SaaS Analytics Platform','Ops Automation System','Vendor Portal','Client Dashboard','Staff Portal'
    ], ['Business', 'SaaS', 'Enterprise', 'Management', 'Automation']),
  },
  {
    id: 'ecommerce',
    name: 'E-commerce ',
    slug: 'ecommerce',
    count: 100,
    description: 'Online store systems including marketplaces, single stores, dropshipping, and digital product platforms.',
    icon: '🛒',
    systems: buildSystems([
      'Multi Vendor Marketplace','Single Vendor Store','Dropshipping Platform','Digital Products Store','Subscription Commerce System','B2B Marketplace','B2C Store','C2C Marketplace','Auction Platform','Classified Ads System','Grocery Delivery Platform','Pharmacy Store','Fashion Store','Electronics Store','Furniture Store','Food Ordering System','Restaurant Ordering System','Online Menu System','QR Ordering System','POS Ecommerce Integration','Payment Gateway Integration System','Shipping Management System','Order Tracking System','Return Management System','Refund Management System','Coupon System','Discount Engine','Loyalty Program System','Wishlist System','Cart System','Checkout System','Product Management System','Category Management System','Review System','Rating System','Inventory Sync System','Multi-language Store','Multi-currency Store','Affiliate Ecommerce System','Vendor Dashboard','Seller Panel','Buyer Panel','Ecommerce Analytics Dashboard','Sales Dashboard','Revenue Dashboard','Customer Dashboard','Admin Ecommerce Panel','Warehouse Ecommerce System','Dropshipping Automation Tool','Product Import Tool','Product Scraper Tool','Bulk Product Upload Tool','Digital Download Manager','License Key System','SaaS Ecommerce Builder','Store Builder','Landing Page Builder','Funnel Builder','Upsell System','Cross-sell System','Subscription Box System','Membership Ecommerce System','Course Selling Platform','Ticket Selling Platform','Event Selling Platform','NFT Marketplace','Crypto Ecommerce','Print-on-demand System','Booking Ecommerce System','Service Ecommerce Platform','Freelancer Marketplace','Gig Marketplace','Job Marketplace','Resume Marketplace','Template Marketplace','Theme Marketplace','Plugin Marketplace','App Marketplace','SaaS Marketplace','White-label Ecommerce Platform','Headless Ecommerce System','API Ecommerce Platform','Mobile Ecommerce App','PWA Ecommerce System','Chat Commerce System','Voice Commerce System','AI Ecommerce System','Recommendation Engine','Personalization Engine','Smart Pricing Engine','Dynamic Pricing System','Flash Sale System','Deal Platform','Group Buy System','Cashback System','Gift Card System','Wishlist Aggregator','Social Commerce Platform','Live Shopping Platform'
    ], ['E-commerce', 'Marketplace', 'Store', 'Shopping', 'Payments']),
  },
  {
    id: 'ai-saas',
    name: 'AI SaaS ',
    slug: 'ai-saas',
    count: 100,
    description: 'AI-powered tools like chatbots, content generators, image tools, automation AI, and productivity AI systems.',
    icon: '🤖',
    systems: buildSystems([
      'AI Chatbot Platform','AI Content Generator','AI Image Generator','AI Voice Generator','AI Video Generator','AI Code Generator','AI Website Builder','AI Landing Page Generator','AI SEO Tool','AI Copywriting Tool','AI Email Generator','AI Social Media Tool','AI Ad Generator','AI Resume Builder','AI Cover Letter Generator','AI Business Plan Generator','AI Marketing Tool','AI Analytics Tool','AI Data Analysis Platform','AI Dashboard Generator','AI Automation Tool','AI Workflow Builder','AI Chat Assistant','AI Customer Support Bot','AI Sales Assistant','AI CRM Assistant','AI HR Assistant','AI Finance Assistant','AI Legal Assistant','AI Medical Assistant','AI Education Platform','AI Tutor','AI Quiz Generator','AI Course Generator','AI Note Generator','AI Summarizer','AI Translator','AI Speech to Text','AI Text to Speech','AI Meeting Assistant','AI Transcription Tool','AI Knowledge Base Generator','AI FAQ Generator','AI Chat Training System','AI Personal Assistant','AI Productivity Tool','AI Time Management Tool','AI Task Manager','AI Calendar Assistant','AI Reminder System','AI Project Assistant','AI Developer Tool','AI API Platform','AI Model Hosting Platform','AI SaaS Builder','AI Prompt Generator','AI Prompt Marketplace','AI Image Editor','AI Video Editor','AI Audio Editor','AI Design Tool','AI Logo Generator','AI Branding Tool','AI UI Generator','AI UX Analyzer','AI CRO Tool','AI Heatmap Tool','AI A/B Testing Tool','AI Funnel Analyzer','AI Growth Tool','AI Customer Insights Tool','AI Behavior Analysis Tool','AI Recommendation Engine','AI Personalization Engine','AI Fraud Detection System','AI Security System','AI Monitoring Tool','AI DevOps Tool','AI Testing Tool','AI Bug Detection Tool','AI Code Review Tool','AI Documentation Generator','AI Knowledge Graph','AI Search Engine','AI Voice Assistant Platform','AI Chat Platform','AI Messaging Platform','AI Collaboration Tool','AI Whiteboard Tool','AI Idea Generator','AI Brainstorm Tool','AI Research Assistant','AI Content Planner','AI Campaign Manager','AI Automation Platform','AI Prediction Tool','AI Sentiment Analyzer','AI Data Scraper','AI Report Generator'
    ], ['AI', 'Machine Learning', 'Automation', 'SaaS', 'Productivity']),
  },
  {
    id: 'social',
    name: 'Social & Community Platforms',
    slug: 'social-community',
    count: 80,
    description: 'Social networks, forums, chat apps, community platforms, and engagement systems.',
    icon: '💬',
    systems: buildSystems([
      'Social Networking Platform','Community Forum','Discussion Board','Q&A Platform','Chat Application','Messaging Platform','Group Chat System','Video Chat Platform','Live Streaming Platform','Social Feed System','Microblogging Platform','Blogging Community Platform','Creator Platform','Influencer Platform','Subscription Community Platform','Membership Community System','Private Community Platform','Public Community Platform','Event Community Platform','Gaming Community Platform','Niche Community Platform','Professional Network Platform','Alumni Network Platform','Dating Platform','Matchmaking System','Friend Finder System','User Profile System','Activity Feed System','Notification Feed System','Comment System','Reaction System','Like/Dislike System','Share System','Follow System','Follower Management System','Group Management System','Community Moderation System','Content Moderation System','Spam Detection System','User Verification System','Identity System','Chat Moderation System','Voice Chat System','Video Calling System','Screen Sharing Platform','Collaboration Community Tool','Community Marketplace','Content Sharing Platform','Media Sharing Platform','Photo Sharing Platform','Video Sharing Platform','File Sharing Community','Poll System','Survey Community Tool','Feedback Community Platform','Reputation System','Points System','Gamification Platform','Badge System','Leaderboard System','Social Analytics Dashboard','Engagement Tracking System','Community Insights Tool','Community CRM','Social Scheduler','Social Automation Tool','Comment Automation Tool','DM Automation Tool','Social Ads Platform','Creator Monetization System','Subscription Monetization Tool','Donation Platform','Crowdfunding Platform','Fan Engagement Platform','Fan Club System','Creator Dashboard','Social API Platform','Social Integration System','White-label Social Platform','Social Commerce Plugin'
    ], ['Social', 'Community', 'Chat', 'Engagement', 'Platform']),
  },
  {
    id: 'education',
    name: 'Education Platforms',
    slug: 'education',
    count: 80,
    description: 'Learning management systems, course platforms, quiz systems, and educational tools.',
    icon: '📚',
    systems: buildSystems([
      'Learning Management System','Course Platform','Online School System','Virtual Classroom','Live Class Platform','Recorded Course Platform','Course Builder','Quiz System','Exam System','Test Series Platform','Certification System','Student Management System','Teacher Management System','Attendance System','Homework System','Assignment System','Grading System','Result System','Report Card System','Parent Portal','Student Portal','Teacher Portal','School ERP','College ERP','Coaching Management System','Training Platform','Skill Development Platform','EdTech SaaS Platform','Webinar Platform','Workshop Platform','Course Marketplace','Tutor Marketplace','Mentorship Platform','One-on-One Teaching Platform','Group Class Platform','Video Learning Platform','Audio Learning Platform','Ebook Platform','Notes Sharing Platform','Knowledge Base Platform','Study Planner Tool','Revision Tool','Flashcard System','Gamified Learning Platform','Interactive Learning Platform','AI Tutor','AI Quiz Generator','AI Course Generator','AI Study Assistant','AI Notes Generator','Language Learning Platform','Coding Learning Platform','Interview Prep Platform','Mock Interview System','Placement System','Job Training Platform','Internship Platform','Certification Marketplace','Assessment Platform','Feedback System','Student Analytics Dashboard','Learning Analytics System','Progress Tracking System','Goal Tracking System','Productivity Tracker','Focus Timer Tool','Study Timer Tool','Classroom Chat System','Collaboration Tool','Whiteboard Tool','Screen Sharing Tool','Lecture Recording System','Video Hosting Platform','Content Management System','Course Subscription System','Payment Integration System','Affiliate Course System','Referral System','Education CRM','Alumni Tracking System'
    ], ['Education', 'LMS', 'E-learning', 'Course', 'Training']),
  },
  {
    id: 'healthcare',
    name: 'Healthcare Systems',
    slug: 'healthcare',
    count: 70,
    description: 'Hospital systems, appointment booking, patient management, and medical platforms.',
    icon: '🏥',
    systems: buildSystems([
      'Hospital Management System','Clinic Management System','Patient Management System','Doctor Management System','Appointment Booking System','Telemedicine Platform','Online Consultation Platform','EHR System','EMR System','Medical Records System','Prescription Management System','Pharmacy Management System','Lab Management System','Diagnostic System','Radiology System','Insurance Management System','Billing System','Medical Billing System','Claims Management System','Patient Portal','Doctor Portal','Staff Management System','Nurse Management System','Ward Management System','Bed Management System','ICU Management System','Emergency Management System','Ambulance Management System','Blood Bank System','Organ Donation System','Health Monitoring System','Wearable Integration Platform','Fitness Tracking System','Diet Management System','Nutrition Planner','Mental Health Platform','Therapy Platform','Counseling Platform','Appointment Reminder System','Notification System','SMS Reminder System','Email Reminder System','Patient Feedback System','Review System','Complaint Management System','Healthcare CRM','Medical Analytics Dashboard','Health Insights Platform','Disease Tracking System','Epidemic Monitoring System','Vaccine Management System','Immunization Tracking System','Health Survey System','Clinical Trial System','Research Platform','Medical Knowledge Base','Healthcare API Platform','Integration System','Secure Data System','HIPAA Compliance System','Access Control System','Audit System','Risk Management System','Compliance Tracking System','Healthcare Automation System','AI Diagnosis System','AI Health Assistant','Wellness Platform','Rehab Management System','Elderly Care System'
    ], ['Healthcare', 'Medical', 'Hospital', 'Patient', 'Telemedicine']),
  },
  {
    id: 'booking',
    name: 'Booking & On-Demand Platforms',
    slug: 'booking-on-demand',
    count: 80,
    description: 'Taxi apps, food delivery, service booking, rental platforms, and on-demand systems.',
    icon: '📅',
    systems: buildSystems([
      'Taxi Booking App','Ride Sharing Platform','Car Rental System','Bike Rental System','Scooter Rental Platform','Truck Booking Platform','Logistics Booking System','Delivery Platform','Food Delivery System','Grocery Delivery System','Medicine Delivery System','Parcel Delivery System','Courier Booking System','Home Service Booking Platform','Salon Booking System','Spa Booking Platform','Doctor Booking Platform','Hotel Booking System','Hostel Booking Platform','Vacation Rental Platform','Airbnb Clone System','Event Booking Platform','Ticket Booking System','Movie Ticket System','Flight Booking System','Bus Booking System','Train Booking System','Cab Aggregator Platform','Service Marketplace','Freelancer Booking Platform','Gig Booking Platform','Repair Service Platform','Cleaning Service Platform','Plumbing Service Platform','Electrician Booking Platform','Tutor Booking Platform','Trainer Booking Platform','Fitness Class Booking Platform','Gym Booking System','Sports Booking Platform','Court Booking System','Venue Booking Platform','Meeting Room Booking System','Workspace Booking Platform','Co-working Booking System','Appointment Scheduling System','Calendar Booking System','Time Slot Booking System','Queue Management System','Waitlist System','Reservation System','Order Booking System','Subscription Booking Platform','Membership Booking System','Package Booking Platform','Tour Booking Platform','Travel Booking Platform','Travel Planner System','Tour Guide Booking Platform','Driver Booking Platform','Rental Marketplace','Equipment Rental System','Tool Rental Platform','Property Rental System','Real Estate Booking Platform','Parking Booking System','EV Charging Booking Platform','Laundry Booking System','Pickup Scheduling System','Drop Scheduling System','Dispatch System','Fleet Dispatch Platform','Route Optimization System','Driver Management System','Customer Booking Dashboard','Admin Booking Panel','Vendor Booking Panel','Pet Service Booking','Nanny Booking Platform','Catering Booking System'
    ], ['Booking', 'On-Demand', 'Rental', 'Delivery', 'Scheduling']),
  },
  {
    id: 'finance',
    name: 'Finance & Payment',
    slug: 'finance-payment',
    count: 80,
    description: 'Billing, invoicing, accounting, expense tracking, subscription billing, and fintech systems.',
    icon: '💰',
    systems: buildSystems([
      'Billing System','Invoice System','Accounting System','Expense Tracker','Income Tracker','Budget Planner','Financial Dashboard','Revenue Dashboard','Profit & Loss System','Balance Sheet System','Tax Management System','GST System','VAT System','Audit System','Compliance System','Payroll System','Salary Management System','Payslip Generator','Subscription Billing System','Recurring Billing Platform','SaaS Billing System','Usage-based Billing System','Payment Gateway Integration','Payment Processing System','Payment Tracking System','Transaction Management System','Refund System','Chargeback System','Wallet System','Digital Wallet','Crypto Wallet','Payment Link Generator','QR Payment System','POS System','Retail POS','Mobile POS','Online Payment System','Checkout System','Split Payment System','Escrow System','Affiliate Commission System','Commission Tracking System','Revenue Sharing System','Marketplace Payments System','Vendor Payout System','Settlement System','Bank Integration System','Open Banking API','Financial API Platform','Investment Tracking System','Portfolio Management System','Stock Tracking System','Crypto Trading Platform','Trading Dashboard','Loan Management System','EMI System','Credit Management System','Debt Tracking System','Risk Management System','Fraud Detection System','KYC System','Identity Verification System','Financial Analytics System','Expense Analytics System','Revenue Forecasting System','Cash Flow System','Treasury Management System','Budget Forecasting System','Financial Planning Tool','Billing Automation System','Payment Reminder System','Invoice Automation System','Accounting Automation System','Finance CRM','Customer Billing Portal','Admin Finance Panel','Wealth Management System','Insurance Billing System','Micro-lending Platform','P2P Lending System'
    ], ['Finance', 'Payments', 'Billing', 'Accounting', 'Fintech']),
  },
  {
    id: 'marketing',
    name: 'Marketing & SEO Tools',
    slug: 'marketing-seo',
    count: 80,
    description: 'Email marketing, SEO tools, lead generation, automation, and analytics platforms.',
    icon: '📈',
    systems: buildSystems([
      'Email Marketing Tool','Bulk Email Sender','Newsletter System','Campaign Manager','Marketing Automation Platform','Lead Generation System','Lead Capture Form Builder','Landing Page Builder','Funnel Builder','Sales Funnel System','CRM Marketing Tool','Marketing CRM','Social Media Scheduler','Social Media Automation Tool','Social Posting Tool','Content Planner','Content Calendar System','Blog Management System','SEO Tool','Keyword Research Tool','Rank Tracking Tool','Backlink Analyzer','Site Audit Tool','Technical SEO Tool','On-page SEO Tool','Off-page SEO Tool','Competitor Analysis Tool','Traffic Analytics Tool','Web Analytics Platform','Conversion Tracking Tool','CRO Tool','A/B Testing Tool','Heatmap Tool','User Behavior Analytics','Click Tracking System','Scroll Tracking Tool','Session Recording Tool','Marketing Dashboard','Campaign Analytics Dashboard','ROI Tracking System','Ad Management Platform','PPC Tool','Google Ads Tool','Facebook Ads Tool','Ads Automation Platform','Retargeting System','Affiliate Marketing Platform','Referral System','Influencer Marketing Platform','Outreach Tool','Cold Email Tool','Lead Nurturing System','Marketing Chatbot','Chat Automation Tool','SMS Marketing System','WhatsApp Marketing Tool','Push Notification System','Notification Automation Tool','Review Management System','Reputation Management System','Feedback Tool','Survey Tool','Poll System','Contest System','Giveaway System','Loyalty Program System','Rewards System','Coupon System','Discount Engine','Personalization Engine','Recommendation Engine','Marketing AI Tool','AI Copywriting Tool','AI SEO Tool','AI Ad Generator','Growth Hacking Tool','Viral Marketing Tool','Community Marketing Tool','Event Marketing Platform','Webinar Marketing Tool'
    ], ['Marketing', 'SEO', 'Analytics', 'Automation', 'Ads']),
  },
  {
    id: 'utility',
    name: 'Utility & Online Tools',
    slug: 'utility-tools',
    count: 80,
    description: 'File tools, converters, generators, productivity tools, and online utilities.',
    icon: '🔧',
    systems: buildSystems([
      'File Converter','Image Converter','Video Converter','Audio Converter','Document Converter','PDF Tool','PDF Editor','PDF Merger','PDF Splitter','Image Editor','Video Editor','Audio Editor','Screenshot Tool','Screen Recorder','File Compressor','Image Compressor','Video Compressor','URL Shortener','QR Code Generator','Barcode Generator','Password Generator','Password Manager','Encryption Tool','Decryption Tool','Hash Generator','Base64 Tool','JSON Formatter','XML Formatter','Code Formatter','Code Beautifier','Code Minifier','HTML Editor','CSS Editor','JS Editor','Online IDE','Compiler Tool','Debugging Tool','API Testing Tool','Postman Clone Tool','Database Manager','SQL Editor','Data Converter Tool','CSV Tool','Excel Tool','Spreadsheet Tool','Note Taking Tool','Todo App','Task Manager Tool','Reminder Tool','Calendar Tool','Time Zone Converter','Unit Converter','Currency Converter','Age Calculator','Date Calculator','Random Generator Tool','Name Generator Tool','Text Generator Tool','Lorem Ipsum Generator','Markdown Editor','Rich Text Editor','Whiteboard Tool','Diagram Tool','Flowchart Builder','Mind Map Tool','Resume Builder','Cover Letter Builder','Portfolio Builder','Website Builder','Form Builder','Survey Builder','Poll Builder','Quiz Builder','Chat Tool','Messaging Tool','Notification Tool','File Sharing Tool','Cloud Storage Tool','Backup Tool','Restore Tool'
    ], ['Utility', 'Tools', 'Converter', 'Generator', 'Productivity']),
  },
  {
    id: 'core-business',
    name: 'Core Business / Enterprise Systems',
    slug: 'core-business-enterprise',
    count: 10,
    description: 'Foundational enterprise platforms covering ERP, CRM, HR, accounting, billing, payroll, and workflow management.',
    icon: '🏛️',
    systems: buildSystems([
      'ERP (Enterprise Resource Planning)','CRM (Customer Relationship Management)','HR Management','Accounting Management','Billing & Invoicing','Payroll Management','Project Management','Task Management','Document Management','Workflow Management'
    ], ['Enterprise', 'ERP', 'CRM', 'Management', 'Business']),
  },
  {
    id: 'education-systems',
    name: 'Education Systems',
    slug: 'education-systems',
    count: 10,
    description: 'School, college, and coaching management platforms with LMS, exams, attendance, library, and hostel systems.',
    icon: '🎓',
    systems: buildSystems([
      'School Management','College Management','University Management','Coaching Institute Management','Learning Management System (LMS)','Online Course Platform','Exam Management','Student Attendance System','Library Management','Hostel Management'
    ], ['Education', 'School', 'LMS', 'University', 'Management']),
  },
  {
    id: 'healthcare-systems',
    name: 'Healthcare Systems',
    slug: 'healthcare-systems-extended',
    count: 10,
    description: 'Hospital, clinic, pharmacy, lab, EHR, telemedicine, and specialized healthcare management platforms.',
    icon: '🩺',
    systems: buildSystems([
      'Hospital Management','Clinic Management','Patient Record System','Pharmacy Management','Lab Management','Medical Appointment System','Telemedicine Platform','Electronic Health Records (EHR)','Dental Clinic Management','Blood Bank Management'
    ], ['Healthcare', 'Hospital', 'EHR', 'Pharmacy', 'Telemedicine']),
  },
  {
    id: 'retail-commerce',
    name: 'Retail & Commerce Systems',
    slug: 'retail-commerce',
    count: 10,
    description: 'Inventory, warehouse, POS, supplier, procurement, and order management for retail and franchise operations.',
    icon: '🏪',
    systems: buildSystems([
      'Inventory Management','Warehouse Management','POS System','Supplier Management','Procurement System','Order Management','Product Catalog Management','Vendor Management','Retail Chain Management','Franchise Management'
    ], ['Retail', 'Inventory', 'POS', 'Commerce', 'Warehouse']),
  },
  {
    id: 'hospitality-travel',
    name: 'Hospitality & Travel Systems',
    slug: 'hospitality-travel',
    count: 10,
    description: 'Hotel, restaurant, travel, tour, flight, and event reservation platforms for the hospitality industry.',
    icon: '🏨',
    systems: buildSystems([
      'Hotel Management','Hostel Management','Restaurant Management','Food Delivery Management','Travel Agency Management','Tour Booking System','Flight Booking System','Event Ticket Booking','Reservation Management','Catering Management'
    ], ['Hospitality', 'Travel', 'Hotel', 'Booking', 'Restaurant']),
  },
  {
    id: 'fitness-lifestyle',
    name: 'Fitness & Lifestyle Systems',
    slug: 'fitness-lifestyle',
    count: 10,
    description: 'Gym, yoga, spa, salon, sports club, and membership management for fitness and lifestyle businesses.',
    icon: '💪',
    systems: buildSystems([
      'Gym Management','Yoga Studio Management','Personal Trainer Management','Spa & Salon Management','Beauty Clinic Management','Membership Management','Sports Club Management','Swimming Pool Management','Dance Academy Management','Fitness Class Scheduling'
    ], ['Fitness', 'Lifestyle', 'Gym', 'Wellness', 'Membership']),
  },
  {
    id: 'corporate-office',
    name: 'Corporate & Office Systems',
    slug: 'corporate-office',
    count: 10,
    description: 'Meeting rooms, attendance, IT helpdesk, knowledge base, ticketing, and team collaboration tools.',
    icon: '🏢',
    systems: buildSystems([
      'Meeting Room Booking','Employee Attendance','Office Asset Management','Internal Communication Platform','Knowledge Base System','IT Helpdesk System','Support Ticket System','Bug Tracking System','Team Collaboration System','OKR / Performance Management'
    ], ['Corporate', 'Office', 'Helpdesk', 'Collaboration', 'Productivity']),
  },
  {
    id: 'logistics-transport',
    name: 'Logistics & Transport Systems',
    slug: 'logistics-transport',
    count: 10,
    description: 'Fleet, courier, shipment, taxi, bus, truck dispatch, and parking management platforms.',
    icon: '🚚',
    systems: buildSystems([
      'Fleet Management','Logistics Management','Delivery Tracking','Courier Management','Warehouse Logistics','Shipment Tracking','Taxi Booking System','Bus Reservation System','Truck Dispatch System','Parking Management'
    ], ['Logistics', 'Transport', 'Fleet', 'Delivery', 'Tracking']),
  },
  {
    id: 'real-estate',
    name: 'Real Estate & Property Systems',
    slug: 'real-estate-property',
    count: 10,
    description: 'Property, rental, tenant, listings, building maintenance, HOA, and smart facility management.',
    icon: '🏘️',
    systems: buildSystems([
      'Property Management','Rental Management','Apartment Management','Real Estate CRM','Tenant Management','Property Listing System','Building Maintenance System','Smart Facility Management','HOA Management','Property Booking System'
    ], ['Real Estate', 'Property', 'Rental', 'CRM', 'Facility']),
  },
  {
    id: 'finance-banking',
    name: 'Finance & Banking Systems',
    slug: 'finance-banking',
    count: 10,
    description: 'Loan, microfinance, investment, expense, budget, crypto, payment gateway, and donation platforms.',
    icon: '🏦',
    systems: buildSystems([
      'Loan Management','Microfinance Management','Investment Portfolio Management','Expense Tracking','Budget Management','Financial Reporting System','Crypto Portfolio Tracker','Payment Gateway System','Subscription Billing System','Donation Management'
    ], ['Finance', 'Banking', 'Investment', 'Crypto', 'Payments']),
  },
  {
    id: 'content-media',
    name: 'Content & Media Systems',
    slug: 'content-media',
    count: 10,
    description: 'CMS, digital asset, media library, video streaming, podcast, blogging, and community platforms.',
    icon: '🎬',
    systems: buildSystems([
      'Content Management System','Digital Asset Management','Media Library System','Publishing Management','Video Streaming Platform','Podcast Management','Newsletter System','Blog Platform','Community Forum','Membership Site'
    ], ['Content', 'Media', 'Streaming', 'CMS', 'Publishing']),
  },
  {
    id: 'specialized-industry',
    name: 'Specialized Industry Systems',
    slug: 'specialized-industry',
    count: 10,
    description: 'Construction, manufacturing, agriculture, veterinary, legal, NGO, mosque, and government service platforms.',
    icon: '⚙️',
    systems: buildSystems([
      'Construction Management','Manufacturing ERP','Agriculture Farm Management','Veterinary Clinic Management','Laboratory Research Management','Legal Case Management','Court Management System','NGO Management','Mosque Management','Government Service Management'
    ], ['Industry', 'Specialized', 'Manufacturing', 'Legal', 'Agriculture']),
  },
];

export const planTemplates = {
  generateMessage: (planName: string, amount: string, dueDate: string, paymentLink: string) =>
    `Plan: ${planName}\nAmount: ${amount}\nDue Date: ${dueDate}\nPayment Link: ${paymentLink}`,
};
