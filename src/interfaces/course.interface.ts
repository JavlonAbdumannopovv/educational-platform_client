export interface CourseType {
  slug: string;
  previewImage: string;
  title: string;
  lessonCount: number;
  totalHour: number;
  level: string;
  price: number;
  reviewAvg: number;
  reviewCount: number;
  author: AuthorType;
  tags: string[];
  requirements: string[];
  learn: string[];
  exerpt: string;
  description: string;
  category: string;
  _id: string;
  language: string;
  isActive: boolean;
  updatedAt: Date;
  allStudents: number;
}
export interface AuthorType {
  fullName: string;
  avatar: string;
  job: string;
  students: string[];
}

export interface ReviewType {
  course: string;
  author: string;
  rating: number;
  summary: string;
}

export interface GetUserByDto {
  course: string;
  author: string;
}

export interface EditReviewDto {
  rating: number;
  summary: string;
}
