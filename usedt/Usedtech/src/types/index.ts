export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'seller' | 'admin';
  avatar?: string;
  location?: string;
  rating: number;
  totalSales: number;
  joinedDate: Date;
  verified: boolean;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  category: string;
  subcategory?: string;
  images: string[];
  seller: User;
  stock: number;
  ratings: Rating[];
  averageRating: number;
  specifications: Record<string, string>;
  tags: string[];
  featured: boolean;
  sold: boolean;
  views: number;
  location: string;
  contactInfo: ContactInfo;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  preferredContact: 'email' | 'phone' | 'both';
  meetupLocation?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  replies: Reply[];
  createdAt: Date;
}

export interface Reply {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  subcategories: Subcategory[];
  productCount: number;
  image: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
}

export interface Rating {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export interface ListingFormData {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  condition: string;
  category: string;
  subcategory: string;
  images: File[];
  specifications: Record<string, string>;
  tags: string[];
  location: string;
  contactInfo: ContactInfo;
}