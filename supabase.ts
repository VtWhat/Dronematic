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
      config: {
        Row: {
          aspect_ratio: string | null
          auto_iso_limit: string | null
          camera: string
          color_mode: string | null
          config_id: number
          drone: string
          eis: string | null
          filter: string | null
          fov: string | null
          iso: string | null
          servico_id: number
          shutter: string | null
          user_id: string
          video_quality: string | null
          wb: string | null
        }
        Insert: {
          aspect_ratio?: string | null
          auto_iso_limit?: string | null
          camera: string
          color_mode?: string | null
          config_id?: never
          drone: string
          eis?: string | null
          filter?: string | null
          fov?: string | null
          iso?: string | null
          servico_id: number
          shutter?: string | null
          user_id: string
          video_quality?: string | null
          wb?: string | null
        }
        Update: {
          aspect_ratio?: string | null
          auto_iso_limit?: string | null
          camera?: string
          color_mode?: string | null
          config_id?: never
          drone?: string
          eis?: string | null
          filter?: string | null
          fov?: string | null
          iso?: string | null
          servico_id?: number
          shutter?: string | null
          user_id?: string
          video_quality?: string | null
          wb?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "config_servico_id_fkey"
            columns: ["servico_id"]
            referencedRelation: "servicos"
            referencedColumns: ["servico_id"]
          },
          {
            foreignKeyName: "config_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      servicos: {
        Row: {
          bairro: string
          categoria: string
          cep: string
          cidade: string
          cliente_id: number
          date: string
          description: string
          estado: string
          inserted_at: string
          numero: string
          route: string | null
          rua: string
          servico_id: number
          user_id: string
        }
        Insert: {
          bairro: string
          categoria: string
          cep: string
          cidade: string
          cliente_id: number
          date: string
          description: string
          estado: string
          inserted_at?: string
          numero: string
          route?: string | null
          rua: string
          servico_id?: number
          user_id: string
        }
        Update: {
          bairro?: string
          categoria?: string
          cep?: string
          cidade?: string
          cliente_id?: number
          date?: string
          description?: string
          estado?: string
          inserted_at?: string
          numero?: string
          route?: string | null
          rua?: string
          servico_id?: number
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
      userprofile: {
        Row: {
          endereco: string
          id: number
          inserted_at: string
          nome: string
          telefone: string
          user_id: string
          website: string | null
        }
        Insert: {
          endereco: string
          id?: number
          inserted_at?: string
          nome: string
          telefone: string
          user_id: string
          website?: string | null
        }
        Update: {
          endereco?: string
          id?: number
          inserted_at?: string
          nome?: string
          telefone?: string
          user_id?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "userprofile_user_id_fkey"
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