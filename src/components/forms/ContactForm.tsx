import React, { useState } from "react";
import { Check } from "lucide-react";
import { contactSubmissionSchema, type ContactSubmission } from "@/schemas";
import Checkbox from "../ui/Checkbox";

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
      const res = await fetch("/api/forms/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const errData = await res.json().catch(() => ({}));
        setErrors({ form: errData.message || "Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato pelo e-mail institucional." });
      }
    } catch {
      setErrors({ form: "Erro de conexão ao enviar. Verifique sua rede e tente novamente." });
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
        <div role="alert" aria-live="assertive" className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-montserrat">
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
          aria-required="true"
          value={formData.fullName || ""}
          onChange={handleChange}
          placeholder="Seu nome completo"
          className="form-input"
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "contact-error-fullname" : undefined}
        />
        {errors.fullName && (
          <div id="contact-error-fullname" role="alert" className="field-error">
            {errors.fullName}
          </div>
        )}
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
            aria-required="true"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="seu@email.com"
            className="form-input"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-error-email" : undefined}
          />
          {errors.email && (
            <div id="contact-error-email" role="alert" className="field-error">
              {errors.email}
            </div>
          )}
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
            aria-describedby={errors.phone ? "contact-error-phone" : undefined}
          />
          {errors.phone && (
            <div id="contact-error-phone" role="alert" className="field-error">
              {errors.phone}
            </div>
          )}
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
          aria-describedby={errors.subject ? "contact-error-subject" : undefined}
        >
          <option value="Geral">Informações Gerais</option>
          <option value="Programa Residencial">Dúvidas sobre o Programa Residencial</option>
          <option value="Online Vida Pura">Dúvidas sobre o Online Vida Pura</option>
          <option value="Conferência">Conferência Anual 2027</option>
          <option value="Editora">Editora e Livros</option>
          <option value="Visita ao Campus">Agendamento de Visita ao Campus</option>
          <option value="Viagem EUA">Viagem PLM aos EUA</option>
        </select>
        {errors.subject && (
          <div id="contact-error-subject" role="alert" className="field-error">
            {errors.subject}
          </div>
        )}
      </div>

      <div>
        <label className="form-label" htmlFor="contact-message">
          Mensagem *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          aria-required="true"
          rows={4}
          value={formData.message || ""}
          onChange={handleChange}
          placeholder="Como podemos auxiliá-lo?"
          className="form-input resize-none"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-error-message" : undefined}
        />
        {errors.message && (
          <div id="contact-error-message" role="alert" className="field-error">
            {errors.message}
          </div>
        )}
      </div>

      <div className="pt-1">
        <Checkbox
          name="consent"
          checked={formData.consent === true}
          onChange={(checked) => {
            setFormData((prev) => ({ ...prev, consent: checked }));
            if (errors.consent) {
              setErrors((prev) => {
                const next = { ...prev };
                delete next.consent;
                return next;
              });
            }
          }}
          aria-describedby={errors.consent ? "contact-error-consent" : undefined}
          label={
            <span>
              Concordo com a utilização dos meus dados para retorno do contato conforme a{" "}
              <a
                href="/politica-de-privacidade/"
                className="text-[#044A82] underline font-bold hover:text-[#033863] transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                Política de Privacidade
              </a>.
            </span>
          }
        />
        {errors.consent && (
          <div id="contact-error-consent" role="alert" className="field-error mt-2">
            {errors.consent}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full text-center py-3.5 text-xs font-bold tracking-wider mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span>Enviando Mensagem...</span>
          </>
        ) : (
          "Enviar Mensagem"
        )}
      </button>
    </form>
  );
}
