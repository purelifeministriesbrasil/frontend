import React, { useState } from "react";
import { Check } from "lucide-react";
import { contactSubmissionSchema, type ContactSubmission } from "@/schemas";

export default function ContactForm() {
  const [formData, setFormData] = useState<Partial<ContactSubmission>>({
    subject: "Geral",
    policyVersion: "2026-09-19",
    turnstileToken: "dummy-turnstile-token",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSubmissionSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const path = err.path.join(".");
        fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { supabase } = await import("@/lib/supabase");
      if (supabase) {
        const { error } = await supabase.from("contatos").insert({
          nome: result.data.fullName,
          email: result.data.email,
          telefone: result.data.phone || null,
          assunto: result.data.subject,
          mensagem: result.data.message,
        });
        if (error) throw error;
        setSubmitted(true);
      } else {
        const res = await fetch("/api/forms/contato", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.data),
        });

        if (res.ok) {
          setSubmitted(true);
        } else {
          const errData = await res.json().catch(() => ({}));
          setErrors({ form: errData.message || "Erro ao enviar mensagem. Tente novamente." });
        }
      }
    } catch {
      setErrors({ form: "Erro de rede. Verifique sua conexão e tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-[#044A82]/30 p-10 text-center shadow-xs">
        <div className="w-14 h-14 bg-[#1D6F42] text-white rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-white stroke-[2.5]" />
        </div>
        <h3 className="font-ruda font-bold text-2xl text-[#1C2530] mb-3">Mensagem Enviada</h3>
        <p className="font-montserrat text-[#575757] text-sm leading-relaxed mb-6">
          Agradecemos pelo seu contato. Nossa equipe institucional responderá em breve através do e-mail informado.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              subject: "Geral",
              policyVersion: "2026-09-19",
              turnstileToken: "dummy-turnstile-token",
            });
          }}
          className="btn-outline text-xs px-5 py-2.5"
        >
          Enviar nova mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#DEDEDE] p-8 sm:p-10 flex flex-col gap-5 shadow-xs">
      <div>
        <h3 className="font-ruda font-bold text-[#1C2530] text-xl mb-1">Envie uma Mensagem</h3>
        <p className="font-montserrat text-[#575757] text-xs">
          Preencha o formulário abaixo para tirar dúvidas ou solicitar informações gerais.
        </p>
      </div>

      {errors.form && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-montserrat">
          {errors.form}
        </div>
      )}

      <div>
        <label className="form-label" htmlFor="contact-fullname">
          Nome Completo *
        </label>
        <input
          id="contact-fullname"
          name="fullName"
          autoComplete="name"
          type="text"
          required
          value={formData.fullName || ""}
          onChange={handleChange}
          placeholder="Seu nome completo"
          className="form-input"
          aria-invalid={!!errors.fullName}
        />
        {errors.fullName && <div className="field-error">{errors.fullName}</div>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label" htmlFor="contact-email">
            E-mail *
          </label>
          <input
            id="contact-email"
            name="email"
            autoComplete="email"
            type="email"
            required
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="seu@email.com"
            className="form-input"
            aria-invalid={!!errors.email}
          />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </div>

        <div>
          <label className="form-label" htmlFor="contact-phone">
            Telefone
          </label>
          <input
            id="contact-phone"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            type="tel"
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder="(61) 90000-0000"
            className="form-input"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <div className="field-error">{errors.phone}</div>}
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor="contact-subject">
          Assunto *
        </label>
        <select
          id="contact-subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="form-input"
        >
          <option value="Geral">Informações Gerais</option>
          <option value="Programa Residencial">Dúvidas sobre o Programa Residencial</option>
          <option value="Online Vida Pura">Dúvidas sobre o Online Vida Pura</option>
          <option value="Conferência">Conferência Anual 2027</option>
          <option value="Editora">Editora e Livros</option>
          <option value="Visita ao Campus">Agendamento de Visita ao Campus</option>
          <option value="Viagem EUA">Viagem PLM aos EUA</option>
        </select>
        {errors.subject && <div className="field-error">{errors.subject}</div>}
      </div>

      <div>
        <label className="form-label" htmlFor="contact-message">
          Mensagem *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          value={formData.message || ""}
          onChange={handleChange}
          placeholder="Como podemos auxiliá-lo?"
          className="form-input resize-none"
          aria-invalid={!!errors.message}
        />
        {errors.message && <div className="field-error">{errors.message}</div>}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent === true}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#044A82] focus:ring-[#D99B26]"
          />
          <span className="font-montserrat text-xs text-[#575757] leading-relaxed">
            Concordo com a utilização dos meus dados para retorno do contato conforme a{" "}
            <a href="/politica-de-privacidade/" className="text-[#044A82] underline font-bold" target="_blank" rel="noreferrer">
              Política de Privacidade
            </a>.
          </span>
        </label>
        {errors.consent && <div className="field-error">{errors.consent}</div>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full text-center py-3.5 text-xs font-bold tracking-wider mt-2"
      >
        {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
      </button>
    </form>
  );
}
