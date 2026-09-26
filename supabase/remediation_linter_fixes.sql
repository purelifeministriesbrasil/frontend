-- ==============================================================================
-- CORREÇÃO DE WARNINGS DO LINTER DE SEGURANÇA DO SUPABASE
-- Execute este script no SQL Editor do Supabase (https://app.supabase.com)
-- Corrige os 4 avisos de RLS (0024_permissive_rls_policy) e os 2 de SECURITY DEFINER (0028/0029)
-- ==============================================================================

-- 1. CORREÇÃO RLS: triagens
DROP POLICY IF EXISTS "Permitir submissão pública de triagem" ON public.triagens;
CREATE POLICY "Permitir submissão pública de triagem"
    ON public.triagens
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        full_name IS NOT NULL AND length(trim(full_name)) >= 2 AND
        email IS NOT NULL AND length(trim(email)) >= 5
    );

-- 2. CORREÇÃO RLS: contatos
DROP POLICY IF EXISTS "Permitir submissão pública de contato" ON public.contatos;
CREATE POLICY "Permitir submissão pública de contato"
    ON public.contatos
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        nome IS NOT NULL AND length(trim(nome)) >= 2 AND
        email IS NOT NULL AND length(trim(email)) >= 5 AND
        mensagem IS NOT NULL AND length(trim(mensagem)) >= 5
    );

-- 3. CORREÇÃO RLS: newsletter
DROP POLICY IF EXISTS "Permitir inscrição pública na newsletter" ON public.newsletter;
CREATE POLICY "Permitir inscrição pública na newsletter"
    ON public.newsletter
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        email IS NOT NULL AND length(trim(email)) >= 5
    );

-- 4. CORREÇÃO RLS: doacoes_intencoes
DROP POLICY IF EXISTS "Permitir registro público de doação" ON public.doacoes_intencoes;
CREATE POLICY "Permitir registro público de doação"
    ON public.doacoes_intencoes
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        valor_cents > 0
    );

-- 5 & 6. CORREÇÃO SECURITY DEFINER: rls_auto_enable
-- Remove o event trigger e a função redundante do schema public (evita exposição como RPC PostgREST)
DROP EVENT TRIGGER IF EXISTS rls_auto_enable;
DROP EVENT TRIGGER IF EXISTS rls_auto_enable_trigger;
DROP FUNCTION IF EXISTS public.rls_auto_enable() CASCADE;
