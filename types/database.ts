export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: 'game' | 'mobile' | 'web';
          status: string;
          role: string | null;
          description: string | null;
          long_description: string | null;
          image_url: string | null;
          tags: string[];
          platforms: string[];
          genre: string | null;
          engine: string | null;
          mechanics: string[];
          tech_stack: string[];
          features: string[];
          systems: string[];
          roadmap: string[];
          screenshots: string[];
          gallery: string[];
          links: Json;
          is_visible: boolean;
          sort_order: number;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      shikai_collections: {
        Row: {
          id: string;
          title: string;
          series: string | null;
          freq: string | null;
          lore: string | null;
          folder: string | null;
          is_new: boolean;
          is_visible: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['shikai_collections']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['shikai_collections']['Insert']>;
      };
      shikai_images: {
        Row: {
          id: string;
          collection_id: string;
          file_url: string;
          prompt: string | null;
          sort_order: number;
        };
        Insert: Omit<Database['public']['Tables']['shikai_images']['Row'], 'id'> & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['shikai_images']['Insert']>;
      };
      experiences: {
        Row: {
          id: string;
          title: string;
          company: string;
          period: string;
          description: string[];
          is_visible: boolean;
          sort_order: number;
        };
        Insert: Omit<Database['public']['Tables']['experiences']['Row'], 'id'> & { id?: string };
        Update: Partial<Database['public']['Tables']['experiences']['Insert']>;
      };
      certifications: {
        Row: {
          id: string;
          title: string;
          issuer: string;
          icon: string | null;
          rarity: string | null;
          url: string | null;
          is_visible: boolean;
          sort_order: number;
        };
        Insert: Omit<Database['public']['Tables']['certifications']['Row'], 'id'> & { id?: string };
        Update: Partial<Database['public']['Tables']['certifications']['Insert']>;
      };
      references_list: {
        Row: {
          id: string;
          name: string;
          role: string | null;
          text: string | null;
          avatar_url: string | null;
          linkedin: string | null;
          is_visible: boolean;
          sort_order: number;
        };
        Insert: Omit<Database['public']['Tables']['references_list']['Row'], 'id'> & { id?: string };
        Update: Partial<Database['public']['Tables']['references_list']['Insert']>;
      };
      stats: {
        Row: {
          id: string;
          name: string;
          value: number;
          icon: string | null;
          description: string | null;
          color: string | null;
          sort_order: number;
        };
        Insert: Omit<Database['public']['Tables']['stats']['Row'], 'id'> & { id?: string };
        Update: Partial<Database['public']['Tables']['stats']['Insert']>;
      };
    };
  };
}

// Convenience type aliases
export type Project = Database['public']['Tables']['projects']['Row'];
export type ShikaiCollection = Database['public']['Tables']['shikai_collections']['Row'];
export type ShikaiImage = Database['public']['Tables']['shikai_images']['Row'];
export type Experience = Database['public']['Tables']['experiences']['Row'];
export type Certification = Database['public']['Tables']['certifications']['Row'];
export type Reference = Database['public']['Tables']['references_list']['Row'];
export type Stat = Database['public']['Tables']['stats']['Row'];
