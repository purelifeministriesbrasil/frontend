# Política de Segurança — purelife-web

## Segurança: Relato de Vulnerabilidades

Caso identifique vulnerabilidades no frontend (como riscos de Cross-Site Scripting - XSS, injeção de HTML, quebra de Content Security Policy ou vazamento acidental de tokens em bundles públicos), **NÃO abra uma issue pública**.

Envie o relatório imediatamente para:
- **E-mail de Segurança**: `seguranca@purelifebrasil.org`
- **Assunto**: `[Segurança Frontend] <Resumo>`

---

## Governança e Contribuição

Diretrizes de Segurança Frontend

1. **Content Security Policy (CSP)**:
   - Todo script deve ser originado de fontes confiáveis (`'self'`).
   - É terminantemente vedada a injeção não sanitizada de dados HTML no DOM (`set:html` ou `dangerouslySetInnerHTML`) sem uso de biblioteca de sanitização auditada.
2. **Zero Segredos no Cliente**:
   - Nenhuma variável privada (chaves de banco, chaves de webhook Asaas, chaves de criptografia AES) deve possuir o prefixo `PUBLIC_` ou ser embutida no bundle estático.
3. **Isolamento de Formulários**:
   - Dados de formulários sensíveis de triagem nunca devem ser enviados para URLs de terceiros ou armazenados em `localStorage` / `sessionStorage`.
