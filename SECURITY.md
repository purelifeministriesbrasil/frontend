# Política de Segurança — purelife-web

## 1. Como relatar uma vulnerabilidade

Encontrou uma falha no site (XSS, injeção de HTML, quebra da CSP, segredo exposto no código publicado)?
**Não abra uma issue pública.** Envie o relato para:

- **E-mail:** `purelifeministriesbrasil1986@gmail.com`
- **Assunto:** `[Segurança Frontend] <resumo>`

Inclua a página afetada, os passos para reproduzir e o impacto. Responderemos o quanto antes e pedimos até
30 dias para corrigir antes de qualquer divulgação.

---

## 2. Regras de segurança do frontend

1. **Content Security Policy**
   - Scripts só de `'self'`, do Turnstile e scripts inline autorizados por *hash* no build.
   - É proibido inserir HTML não confiável (`set:html`, `dangerouslySetInnerHTML`).
2. **Nenhum segredo no navegador**
   - Toda variável com prefixo `PUBLIC_` vai para o código publicado. Chaves de banco, de criptografia, de
     webhook, da Resend ou a chave **secreta** do Turnstile pertencem só à API.
3. **Dados dos formulários**
   - Enviados apenas para a API oficial (`PUBLIC_API_URL`), nunca para terceiros.
   - Nunca guardados em `localStorage`, `sessionStorage`, cookies ou na URL.
