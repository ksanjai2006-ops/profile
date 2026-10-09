export interface SocialLinks {
  github?: string;
  linkedin?: string;
  instagram?: string;
}

export interface Profile {
  _id?: string;
  name: string;
  title: string;
  bio: string;
  about: string;
  profileImage: string;
  resume: string;
  email: string;
  location: string;
  socialLinks: SocialLinks;
}

export interface Project {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  problem?: string;
  solution?: string;
  features?: string[];
  image: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt?: string;
}

export interface Skill {
  _id?: string;
  name: string;
  category: string;
  icon: string;
  description?: string;
  proficiency: number;
  order: number;
}

export interface Education {
  _id?: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Certification {
  _id?: string;
  title: string;
  organization: string;
  date: string;
  credentialId?: string;
  certificateUrl?: string;
  image?: string;
}

export interface Experience {
  _id?: string;
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
  description?: string;
  technologies?: string[];
}

export interface Message {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string;
}
