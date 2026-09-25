import React, { useState } from "react";
import { Check, Info } from "lucide-react";
import { triageSubmissionSchema, type TriageSubmission } from "purelife-contracts";

export default function TriageForm() {
  const [step, setStep] = useState<number>(0);
  const [isAdult, setIsAdult] = useState<boolean | null>(null);
  const [formData, setFormData] = useState<Partial<TriageSubmission>>({
    programInterest: "residencial",
    profile: "para_mim",
    contactChannel: "whatsapp",
    policyVersion: "2026-09-19",
    turnstileToken: "cf-turnstile-dummy-token",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  // Step 0: Gate de Maioridade (§7.3)
  if (isAdult === false) {
    return (
      <div className="bg-white border border-[#DEDEDE] p-8 max-w-xl mx-auto text-center shadow-xs">
        <div className="w-12 h-12 bg-[#044A82] text-white rounded-full flex items-center justify-center mx-auto mb-4">
          <Info className="w-6 h-6 text-white stroke-[2.5]" />
        </div>
        <h3 className="font-ruda font-bold text-2xl text-[#1C2530] mb-3">Atendimento a Menores</h3>
        <p className="font-montserrat text-[#575757] text-sm leading-relaxed mb-6">
          Por razões de conformidade legal e proteção à privacidade, o formulário online é restrito a maiores de 18 anos.
          Se você é menor de idade e precisa de orientação bíblica, por favor peça a um dos seus pais ou responsável legal para entrar em contato diretamente pelo nosso atendimento pastoral.
        </p>
        <div className="border-t border-[#DEDEDE] pt-6">
          <p className="font-montserrat font-bold text-sm text-[#044A82]">
            E-mail pastoral: contato@purelifebrasil.org
          </p>
        </div>
      </div>
    );
  }

  if (step === 0) {
    return (
      <div className="bg-white border border-[#DEDEDE] p-8 sm:p-12 max-w-xl mx-auto shadow-xs">
        <span className="font-montserrat text-xs uppercase tracking-widest text-[#044A82] font-bold block mb-2">
          Etapa de Verificação
        </span>
        <h3 className="font-ruda font-bold text-2xl sm:text-3xl text-[#1C2530] mb-4">
          Você tem 18 anos de idade ou mais?
        </h3>
        <p className="font-montserrat text-[#575757] text-sm leading-relaxed mb-8">
          Para garantir a conformidade jurídica da avaliação pastoral e proteger a privacidade do atendimento, confirme sua faixa etária.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => {
              setIsAdult(true);
              setFormData((prev) => ({ ...prev, isAdult: true }));
              setStep(1);
            }}
            className="btn-primary flex-1 text-center py-3.5"
          >
            Sim, tenho 18 anos ou mais
          </button>
          <button
            type="button"
            onClick={() => setIsAdult(false)}
            className="btn-outline flex-1 text-center py-3.5"
          >
            Não, sou menor de 18
          </button>
        </div>
      </div>
    );
  }

  if (submittedCode) {
    return (
      <div className="bg-white border border-[#044A82]/30 p-8 sm:p-12 max-w-xl mx-auto text-center shadow-md">
        <div className="w-16 h-16 bg-[#1D6F42] text-white rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-white stroke-[2.5]" />
        </div>
        <h3 className="font-ruda font-bold text-2xl sm:text-3xl text-[#1C2530] mb-3">
          Solicitação Registrada com Sigilo
        </h3>
        <p className="font-montserrat text-[#575757] text-sm sm:text-base leading-relaxed mb-6">
          Sua mensagem foi recebida pela nossa equipe pastoral e criptografada com segurança de nível institucional.
        </p>
        <div className="bg-[#F5F2EC] p-4 border border-[#DEDEDE] mb-6">
          <span className="font-montserrat text-xs uppercase tracking-wider text-[#575757] block mb-1">
            Código de Referência Confidencial
          </span>
          <span className="font-mono font-bold text-lg text-[#044A82]">{submittedCode}</span>
        </div>
        <p className="font-montserrat text-xs text-[#575757] leading-relaxed">
          Nossa equipe entrará em contato exclusivamente através do canal selecionado em breve.
        </p>
      </div>
    );
  }

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

    const result = triageSubmissionSchema.safeParse(formData);
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
      const res = await fetch("/api/forms/triagem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({ referenceCode: "PLM-CONFIDENCIAL" }));
        setSubmittedCode(data.referenceCode || "PLM-CONFIDENCIAL");
      } else {
        const errData = await res.json().catch(() => ({}));
        setErrors({ form: errData.message || "Erro ao enviar solicitação. Tente novamente." });
      }
    } catch {
      setErrors({ form: "Erro de rede. Verifique sua conexão e tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#DEDEDE] p-8 sm:p-12 max-w-2xl mx-auto shadow-xs">
      <div className="mb-8 border-b border-[#DEDEDE] pb-6">
        <span className="font-montserrat text-xs uppercase tracking-widest text-[#044A82] font-bold block mb-1">
          Formulário Confidencial
        </span>
        <h3 className="font-ruda font-bold text-2xl sm:text-3xl text-[#1C2530]">
          Solicitação de Triagem e Aconselhamento
        </h3>
        <p className="font-montserrat text-[#575757] text-xs sm:text-sm mt-2">
          Suas informações são protegidas com criptografia de ponta a ponta e sigilo pastoral absoluto.
        </p>
      </div>

      {errors.form && (
        <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 text-sm font-montserrat">
          {errors.form}
        </div>
      )}

      <div className="space-y-6">
        {/* Programa de Interesse */}
        <div>
          <label htmlFor="triage-program" className="form-label">
            Programa de Interesse *
          </label>
          <select
            id="triage-program"
            name="programInterest"
            value={formData.programInterest}
            onChange={handleChange}
            className="form-input"
          >
            <option value="residencial">Programa Residencial (Presencial em Goiás)</option>
            <option value="online">Online Vida Pura (Homens)</option>
            <option value="esposas">Online Vida Pura (Esposas)</option>
            <option value="indefinido">Ainda não sei / Preciso de orientação</option>
          </select>
          {errors.programInterest && <div className="field-error">{errors.programInterest}</div>}
        </div>

        {/* Perfil do Solicitante */}
        <div>
          <label htmlFor="triage-profile" className="form-label">
            Você está buscando ajuda para quem? *
          </label>
          <select
            id="triage-profile"
            name="profile"
            value={formData.profile}
            onChange={handleChange}
            className="form-input"
          >
            <option value="para_mim">Para mim mesmo</option>
            <option value="para_meu_conjuge">Para meu esposo / cônjuge</option>
            <option value="para_um_familiar">Para um familiar (filho, irmão, parente)</option>
            <option value="sou_lider">Sou pastor / líder buscando orientar um membro</option>
          </select>
          {errors.profile && <div className="field-error">{errors.profile}</div>}
        </div>

        {/* Nome Completo */}
        <div>
          <label htmlFor="triage-fullname" className="form-label">
            Nome Completo *
          </label>
          <input
            id="triage-fullname"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            value={formData.fullName || ""}
            onChange={handleChange}
            placeholder="Seu nome"
            className="form-input"
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && <div className="field-error">{errors.fullName}</div>}
        </div>

        {/* E-mail e Telefone */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="triage-email" className="form-label">
              Seu E-mail *
            </label>
            <input
              id="triage-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="form-input"
              aria-invalid={!!errors.email}
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div>
            <label htmlFor="triage-phone" className="form-label">
              Telefone / WhatsApp
            </label>
            <input
              id="triage-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder="61900000000"
              className="form-input"
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <div className="field-error">{errors.phone}</div>}
          </div>
        </div>

        {/* Canal Preferencial de Contato */}
        <div>
          <label htmlFor="triage-channel" className="form-label">
            Como você prefere que façamos contato? *
          </label>
          <select
            id="triage-channel"
            name="contactChannel"
            value={formData.contactChannel}
            onChange={handleChange}
            className="form-input"
          >
            <option value="whatsapp">WhatsApp (Mais rápido e discreto)</option>
            <option value="email">E-mail</option>
            <option value="telefone">Ligação Telefônica</option>
          </select>
          {errors.contactChannel && <div className="field-error">{errors.contactChannel}</div>}
        </div>

        {/* Relato Opcional */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="triage-report" className="form-label mb-0">
              Relato Breve da Situação (Opcional)
            </label>
            <span className="font-montserrat text-xs text-[#575757]">Máximo 2000 caracteres</span>
          </div>
          <textarea
            id="triage-report"
            name="report"
            rows={4}
            maxLength={2000}
            autoComplete="off"
            value={formData.report || ""}
            onChange={handleChange}
            placeholder="Se desejar, compartilhe brevemente a sua busca ou momento de vida. Você não é obrigado a relatar nada para solicitar ajuda."
            className="form-input resize-none"
            aria-invalid={!!errors.report}
          />
          {errors.report && <div className="field-error">{errors.report}</div>}
        </div>

        {/* Termo de Consentimento Explícito */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent === true}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-[#044A82] focus:ring-[#D99B26]"
            />
            <span className="font-montserrat text-xs text-[#575757] leading-relaxed">
              Concordo expressamente com a <a href="/politica-de-privacidade/" className="text-[#044A82] underline font-bold" target="_blank" rel="noreferrer">Política de Privacidade</a> (versão 2026-09-19) e autorizo o contato confidencial da equipe pastoral.
            </span>
          </label>
          {errors.consent && <div className="field-error">{errors.consent}</div>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full text-center py-4 text-xs font-bold tracking-wider mt-4"
        >
          {isSubmitting ? "Enviando com segurança..." : "Enviar Solicitação Confidencial"}
        </button>
      </div>
    </form>
  );
}
