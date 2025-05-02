export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      case_studies: {
        Row: {
          created_at: string
          date: string | null
          enabled: boolean | null
          hero_image: string | null
          id: number
          order: number | null
          tag: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          enabled?: boolean | null
          hero_image?: string | null
          id?: number
          order?: number | null
          tag?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          enabled?: boolean | null
          hero_image?: string | null
          id?: number
          order?: number | null
          tag?: string | null
          title?: string | null
        }
        Relationships: []
      }
      work: {
        Row: {
          company: string | null
          created_at: string
          enabled: boolean | null
          hero_image: string | null
          id: number
          imageURL: string | null
          impact: string | null
          industry: string | null
          link: Json | null
          order: number | null
          press: Json[] | null
          projectdate: string | null
          role: string | null
          selection_title: string | null
          tag: string | null
          tech: string | null
          title: string | null
          url2: string | null
          url3: string | null
          what: string | null
          why: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          enabled?: boolean | null
          hero_image?: string | null
          id?: number
          imageURL?: string | null
          impact?: string | null
          industry?: string | null
          link?: Json | null
          order?: number | null
          press?: Json[] | null
          projectdate?: string | null
          role?: string | null
          selection_title?: string | null
          tag?: string | null
          tech?: string | null
          title?: string | null
          url2?: string | null
          url3?: string | null
          what?: string | null
          why?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          enabled?: boolean | null
          hero_image?: string | null
          id?: number
          imageURL?: string | null
          impact?: string | null
          industry?: string | null
          link?: Json | null
          order?: number | null
          press?: Json[] | null
          projectdate?: string | null
          role?: string | null
          selection_title?: string | null
          tag?: string | null
          tech?: string | null
          title?: string | null
          url2?: string | null
          url3?: string | null
          what?: string | null
          why?: string | null
        }
        Relationships: []
      }
      work_v2: {
        Row: {
          company: string | null
          created_at: string
          date: string | null
          enabled: boolean | null
          hero_image: string | null
          id: number
          impact: string | null
          industry: string | null
          link: Json | null
          mainmedia_url: string | null
          order: number | null
          press: Json[] | null
          role: string | null
          selection_title: string | null
          tag: string | null
          tech: string | null
          title: string | null
          url1: string | null
          url2: string | null
          url3: string | null
          what: string | null
          why: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          date?: string | null
          enabled?: boolean | null
          hero_image?: string | null
          id?: number
          impact?: string | null
          industry?: string | null
          link?: Json | null
          mainmedia_url?: string | null
          order?: number | null
          press?: Json[] | null
          role?: string | null
          selection_title?: string | null
          tag?: string | null
          tech?: string | null
          title?: string | null
          url1?: string | null
          url2?: string | null
          url3?: string | null
          what?: string | null
          why?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          date?: string | null
          enabled?: boolean | null
          hero_image?: string | null
          id?: number
          impact?: string | null
          industry?: string | null
          link?: Json | null
          mainmedia_url?: string | null
          order?: number | null
          press?: Json[] | null
          role?: string | null
          selection_title?: string | null
          tag?: string | null
          tech?: string | null
          title?: string | null
          url1?: string | null
          url2?: string | null
          url3?: string | null
          what?: string | null
          why?: string | null
        }
        Relationships: []
      }
      work_v2_duplicate: {
        Row: {
          before: string | null
          company: string | null
          created_at: string
          date: string | null
          enabled: boolean | null
          hero_image: string | null
          HMW: string | null
          id: number
          impact: string | null
          industry: string | null
          introduction: string | null
          link: Json | null
          order: number | null
          press: Json[] | null
          problem: string | null
          processimage: string | null
          processone: string | null
          processtwo: string | null
          role: string | null
          tag: string | null
          tech: string | null
          title: string | null
          url1: string | null
          url2: string | null
          url3: string | null
          url4: string | null
          urlprocess1: string | null
          urlprocess2: string | null
          what: string | null
          why: string | null
        }
        Insert: {
          before?: string | null
          company?: string | null
          created_at?: string
          date?: string | null
          enabled?: boolean | null
          hero_image?: string | null
          HMW?: string | null
          id?: number
          impact?: string | null
          industry?: string | null
          introduction?: string | null
          link?: Json | null
          order?: number | null
          press?: Json[] | null
          problem?: string | null
          processimage?: string | null
          processone?: string | null
          processtwo?: string | null
          role?: string | null
          tag?: string | null
          tech?: string | null
          title?: string | null
          url1?: string | null
          url2?: string | null
          url3?: string | null
          url4?: string | null
          urlprocess1?: string | null
          urlprocess2?: string | null
          what?: string | null
          why?: string | null
        }
        Update: {
          before?: string | null
          company?: string | null
          created_at?: string
          date?: string | null
          enabled?: boolean | null
          hero_image?: string | null
          HMW?: string | null
          id?: number
          impact?: string | null
          industry?: string | null
          introduction?: string | null
          link?: Json | null
          order?: number | null
          press?: Json[] | null
          problem?: string | null
          processimage?: string | null
          processone?: string | null
          processtwo?: string | null
          role?: string | null
          tag?: string | null
          tech?: string | null
          title?: string | null
          url1?: string | null
          url2?: string | null
          url3?: string | null
          url4?: string | null
          urlprocess1?: string | null
          urlprocess2?: string | null
          what?: string | null
          why?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
