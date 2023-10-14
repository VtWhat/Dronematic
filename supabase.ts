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
          bairro: string
          cep: string
          cidade: string
          cliente_id: number
          cpf: string
          email: string
          estado: string
          inserted_at: string
          nome: string
          numero: string
          rua: string
          sobrenome: string
          telefone_1: string
          telefone_2: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bairro: string
          cep: string
          cidade: string
          cliente_id?: number
          cpf: string
          email: string
          estado: string
          inserted_at?: string
          nome: string
          numero: string
          rua: string
          sobrenome: string
          telefone_1: string
          telefone_2?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bairro?: string
          cep?: string
          cidade?: string
          cliente_id?: number
          cpf?: string
          email?: string
          estado?: string
          inserted_at?: string
          nome?: string
          numero?: string
          rua?: string
          sobrenome?: string
          telefone_1?: string
          telefone_2?: string | null
          updated_at?: string | null
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