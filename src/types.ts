export interface User {
  name: string;
  employeeId: string;
  designation: string;
  department: string;
  phone: string;
  isLoggedIn: boolean;
  avatarUrl?: string;
  email?: string;
  isAdmin?: boolean;
}

export interface Course {
  id: string;
  title: string;
  category: string; // Governance, Finance, IT & Digital, Public Policy, Disaster Management
  subcategory?: string;
  badges: string[];
  description: string;
  longDescription?: string[];
  prerequisites: string;
  duration: string;
  faculty: string;
  facultyTitle?: string;
  facultyAvatar?: string;
  deadline: string;
  image: string;
  location?: string;
  objectives?: string[];
}

export interface Application {
  id: string;
  courseId: string;
  courseTitle: string;
  fullName: string;
  employeeId: string;
  designation: string;
  department: string;
  phone: string;
  statement: string;
  submittedAt: string;
  status: 'Pending Review' | 'Approved' | 'Requires NOC';
}

export interface CustomRequest {
  id: string;
  trainingTopic: string;
  department: string;
  expectedParticipants: number;
  description: string;
  proposedDate?: string;
  submittedAt: string;
  status: 'Submitted' | 'Under Review';
}

export interface CompletedTraining {
  id: string;
  title: string;
  completionDate: string;
  details: string;
  image: string;
  participantsCount: number;
  duration: string;
  department: string;
  tags: string[];
}

