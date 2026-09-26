-- ==============================================================================
-- PURE LIFE MINISTRIES BRASIL - ESQUEMA SUPABASE POSTGRESQL
-- ==============================================================================
-- Execute este script no SQL Editor do painel do Supabase (https://app.supabase.com)
-- Ele criará as tabelas com integridade, timestamps, RLS e índices otimizados.
-- ==============================================================================

-- 1. TABELA DE SOLICITAÇÕES DE TRIAGEM CONFIDENCIAL
CREATE TABLE IF NOT EXISTS public.triagens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_code TEXT UNIQUE,
    program_interest TEXT NOT NULL DEFAULT 'residencial', -- 'residencial' | 'online' | 'esposas' | 'indefinido'
    profile TEXT NOT NULL DEFAULT 'para_mim',             -- 'para_mim' | 'para_meu_conjuge' | 'para_um_familiar' | 'sou_lider'
    is_adult BOOLEAN NOT NULL DEFAULT true,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    city TEXT,
    state TEXT,
    contact_channel TEXT NOT NULL DEFAULT 'whatsapp',     -- 'whatsapp' | 'email' | 'telefone'
    report TEXT,                                         -- Relato pastoral confidencial
    status TEXT NOT NULL DEFAULT 'recebido',             -- 'recebido' | 'em_avaliacao' | 'atendido' | 'arquivado'
    policy_version TEXT DEFAULT '2026-09-19',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABELA DE MENSAGENS DE CONTATO GERAL
CREATE TABLE IF NOT EXISTS public.contatos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT,
    assunto TEXT NOT NULL DEFAULT 'Geral',
    mensagem TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'novo',                  -- 'novo' | 'respondido' | 'arquivado'
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. TABELA DE INSCRIÇÕES NA NEWSLETTER
CREATE TABLE IF NOT EXISTS public.newsletter (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'ativo',                 -- 'ativo' | 'cancelado'
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. TABELA DE INTENÇÕES DE DOAÇÃO (PIX / TRANSFERÊNCIA)
CREATE TABLE IF NOT EXISTS public.doacoes_intencoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    valor_cents INTEGER NOT NULL,                         -- Ex: 5000 para R$ 50,00
    frequencia TEXT NOT NULL DEFAULT 'one_time',         -- 'one_time' | 'monthly'
    doador_email TEXT,
    status TEXT NOT NULL DEFAULT 'gerado',               -- 'gerado' | 'confirmado' | 'cancelado'
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- SEGURANÇA E POLÍTICAS DE ACESSO (Row Level Security - RLS)
-- ==============================================================================

ALTER TABLE public.triagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doacoes_intencoes ENABLE ROW LEVEL SECURITY;

-- Permissão para o público enviar novas triagens pelo site (apenas INSERT)
CREATE POLICY "Permitir submissão pública de triagem"
    ON public.triagens
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Permissão para o público enviar mensagens de contato (apenas INSERT)
CREATE POLICY "Permitir submissão pública de contato"
    ON public.contatos
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Permissão para inscrição pública na newsletter (apenas INSERT)
CREATE POLICY "Permitir inscrição pública na newsletter"
    ON public.newsletter
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Permissão para registro de intenções de doação (apenas INSERT)
CREATE POLICY "Permitir registro público de doação"
    ON public.doacoes_intencoes
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Índices de consulta rápida no painel
CREATE INDEX IF NOT EXISTS idx_triagens_status_data ON public.triagens(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contatos_status_data ON public.contatos(status, created_at DESC);
