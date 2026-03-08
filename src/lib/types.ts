export interface Workflow {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  videoUrl: string;
  createdAt: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}
