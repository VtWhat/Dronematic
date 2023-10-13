export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clientes: {
        Row: {
          cliente_id: number
          email: string
          inserted_at: string
          nome: string
          telefone: string
          user_id: string
        }
        Insert: {
          cliente_id?: number
          email: string
          inserted_at?: string
          nome: string
          telefone: string
          user_id: string
        }
        Update: {
          cliente_id?: number
          email?: string
          inserted_at?: string
          nome?: string
          telefone?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clientes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      servicos: {
        Row: {
          altura: string
          cliente_id: number
          id: number
          inserted_at: string
          local: string
          tipo_servico: string
          user_id: string
        }
        Insert: {
          altura: string
          cliente_id: number
          id?: number
          inserted_at?: string
          local: string
          tipo_servico: string
          user_id: string
        }
        Update: {
          altura?: string
          cliente_id?: number
          id?: number
          inserted_at?: string
          local?: string
          tipo_servico?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "servicos_cliente_id_fkey"
            columns: ["cliente_id"]
            referencedRelation: "clientes"
            referencedColumns: ["cliente_id"]
          },
          {
            foreignKeyName: "servicos_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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