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
          aspect_ratio: string
          auto_iso_limit: string | null
          batteries: string | null
          camera: string
          color_mode: string
          config_id: number
          drone: string
          eis: string
          ev: string | null
          filter: string | null
          fov: string
          iso: string | null
          lens: string | null
          servico_id: number
          shutter: string | null
          user_id: string
          video_quality: string
          wb: string | null
        }
        Insert: {
          aspect_ratio: string
          auto_iso_limit?: string | null
          batteries?: string | null
          camera: string
          color_mode: string
          config_id?: never
          drone: string
          eis: string
          ev?: string | null
          filter?: string | null
          fov: string
          iso?: string | null
          lens?: string | null
          servico_id: number
          shutter?: string | null
          user_id: string
          video_quality: string
          wb?: string | null
        }
        Update: {
          aspect_ratio?: string
          auto_iso_limit?: string | null
          batteries?: string | null
          camera?: string
          color_mode?: string
          config_id?: never
          drone?: string
          eis?: string
          ev?: string | null
          filter?: string | null
          fov?: string
          iso?: string | null
          lens?: string | null
          servico_id?: number
          shutter?: string | null
          user_id?: string
          video_quality?: string
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
          cidade: string
          cliente_id: number
          date: string
          description: string
          estado: string
          height: string | null
          inserted_at: string
          numero: string
          route: string | null
          rua: string
          servico_id: number
          target: string
          user_id: string
        }
        Insert: {
          bairro: string
          categoria: string
          cidade: string
          cliente_id: number
          date: string
          description: string
          estado: string
          height?: string | null
          inserted_at?: string
          numero: string
          route?: string | null
          rua: string
          servico_id?: number
          target: string
          user_id: string
        }
        Update: {
          bairro?: string
          categoria?: string
          cidade?: string
          cliente_id?: number
          date?: string
          description?: string
          estado?: string
          height?: string | null
          inserted_at?: string
          numero?: string
          route?: string | null
          rua?: string
          servico_id?: number
          target?: string
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