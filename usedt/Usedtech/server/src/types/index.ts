export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'seller' | 'admin';
  avatar_url?: string;
  location?: string;
  rating: number;
  total_sales: number;
  verified: boolean;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  category_id: string;
  subcategory_id?: string;
  seller_id: string;
  stock: number;
  featured: boolean;
  sold: boolean;
  views: number;
  location: string;
  tags: string[];
  specifications: Record<string, string>;
  contact_info: ContactInfo;
  created_at: Date;
  updated_at: Date;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  preferred_contact: 'email' | 'phone' | 'both';
  meetup_location?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image_url?: string;
  product_count: number;
  created_at: Date;
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description?: string;
  product_count: number;
  created_at: Date;
}

export interface Comment {
  id: string;
  product_id: string;
  user_id: string;
  content: string;
  parent_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Order {
  id: string;
  buyer_id: string;
  seller_id: string;
  product_id: string;
  quantity: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address?: any;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface AuthRequest extends Request {
  user?: User;
}