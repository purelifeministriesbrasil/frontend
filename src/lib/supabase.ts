import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase com inicialização segura.
 * Se as variáveis de ambiente não estiverem configuradas (ex: durante build inicial),
 * retorna uma instância nula segura para não quebrar a compilação do Astro.
 */
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    })
  : null;
