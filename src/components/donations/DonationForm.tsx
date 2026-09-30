import React, { useState } from "react";
import { Check, Copy, ArrowLeft } from "lucide-react";
import { createPixSchema } from "@/schemas";

export default function DonationForm() {
  const [amountCents, setAmountCents] = useState<number>(5000); // R$ 50,00 padrão
  const [frequency, setFrequency] = useState<"one_time" | "monthly">("one_time");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [pixPayload, setPixPayload] = useState<{
    pixCopyPaste: string;
    expiresAt: string;
    svgString: string;
  } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const presets = [
    { label: "R$ 30", cents: 3000 },
    { label: "R$ 50", cents: 5000 },
    { label: "R$ 100", cents: 10000 },
    { label: "R$ 150", cents: 15000 },
    { label: "R$ 500", cents: 50000 },
  ];

  const handleCreatePix = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const inputData = {
      amountCents,
      frequency,
      donorEmail: donorEmail.trim() || undefined,
      turnstileToken: "cf-dummy-token",
    };

    const parsed = createPixSchema.safeParse(inputData);
    if (!parsed.success) {
      setErrorMessage(parsed.error.errors[0]?.message || "Valor inválido.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/donations/create-pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (res.ok) {
        const data = await res.json();
        const pixCopyPaste = data.pixCopyPaste;
        const expiresAt = data.expiresAt;

        // Geração dinâmica de QR Code local sem imagem base64 do servidor (§7.1)
        const qr = await import("qrcode");
        const svg = await qr.toString(pixCopyPaste, {
          type: "svg",
          errorCorrectionLevel: "M",
          margin: 1,
          width: 260,
        });

        setPixPayload({
          pixCopyPaste,
          expiresAt,
          svgString: svg,
        });
      } else {
        const errData = await res.json().catch(() => ({}));
        setErrorMessage(errData.message || "Não foi possível gerar a chave PIX no momento. Por favor, tente novamente mais tarde.");
      }
    } catch {
      setErrorMessage("Erro de conexão ao comunicar com o servidor de cobrança. Verifique sua rede e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (pixPayload?.pixCopyPaste) {
      navigator.clipboard.writeText(pixPayload.pixCopyPaste);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (pixPayload) {
    return (
      <div className="bg-white border border-[#044A82]/40 rounded-xs p-8 sm:p-12 text-center max-w-lg mx-auto shadow-[0_20px_50px_-10px_rgba(4,74,130,0.18)] animate-[fade-up_0.45s_cubic-bezier(0.16,1,0.3,1)_both]">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#044A82]/10 text-[#044A82] text-xs font-bold font-montserrat uppercase tracking-wider mb-3">
          <Check className="w-3.5 h-3.5 text-[#044A82] stroke-[3]" />
          Pix Gerado com Sucesso
        </span>
        <h3 className="font-ruda font-bold text-2xl sm:text-3xl text-[#1C2530] mb-2">
          Valor: R$ {(amountCents / 100).toFixed(2).replace(".", ",")}
        </h3>
        <p className="font-montserrat text-xs text-[#575757] mb-6 max-w-sm mx-auto leading-relaxed">
          Abra o aplicativo do seu banco, escolha a opção <strong>Pix Copia e Cola</strong> ou aponte a câmera para o QR Code abaixo.
        </p>

        {/* QR Code dinâmico renderizado com moldura e sombra suave */}
        <div className="mx-auto w-64 h-64 p-3.5 border border-[#DEDEDE] bg-white rounded-xs flex items-center justify-center mb-6 shadow-xs hover:shadow-md transition-shadow duration-300">
          <div
            className="w-full h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: pixPayload.svgString }}
          />
        </div>

        <div className="mb-6">
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full py-3.5 px-6 rounded-xs text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              copied
                ? "bg-[#1D6F42] text-white shadow-md scale-[1.02]"
                : "btn-primary shadow-xs hover:shadow-md hover:-translate-y-0.5"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                Chave Pix Copiada com Sucesso!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar Chave Pix Copia e Cola
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setPixPayload(null)}
          className="font-montserrat text-xs text-[#575757] hover:text-[#044A82] underline inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Gerar outra doação ou alterar valor
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleCreatePix}
      className="bg-white border border-[#DEDEDE] hover:border-[#044A82]/30 rounded-xs p-8 sm:p-10 max-w-xl mx-auto shadow-xs hover:shadow-md transition-all duration-500"
    >
      <div className="mb-8 border-b border-[#DEDEDE] pb-6">
        <span className="font-montserrat text-xs uppercase tracking-widest text-[#044A82] font-bold block mb-1">
          Apoie este Ministério
        </span>
        <h3 className="font-ruda font-bold text-2xl text-[#1C2530]">
          Doação via Pix Oficial
        </h3>
        <p className="font-montserrat text-[#575757] text-xs mt-1">
          Contribuição instantânea sem taxas bancárias abusivas e com destinação 100% ministerial.
        </p>
      </div>

      {errorMessage && (
        <div role="alert" aria-live="assertive" className="p-3 mb-6 bg-red-50 border border-red-200 text-red-700 text-xs font-montserrat rounded-xs">
          {errorMessage}
        </div>
      )}

      {/* Frequência com Segmented Control Moderno */}
      <div className="mb-6">
        <span className="form-label mb-2">Frequência da Contribuição</span>
        <div className="flex p-1 bg-[#F5F2EC] rounded-xs border border-[#DEDEDE]">
          <button
            type="button"
            onClick={() => setFrequency("one_time")}
            className={`flex-1 py-2.5 px-4 text-xs font-bold uppercase tracking-wider font-montserrat rounded-xs transition-all duration-300 cursor-pointer ${
              frequency === "one_time"
                ? "bg-[#044A82] text-white shadow-xs"
                : "text-[#575757] hover:text-[#1C2530] hover:bg-white/60"
            }`}
          >
            Doação Única
          </button>
          <button
            type="button"
            onClick={() => setFrequency("monthly")}
            className={`flex-1 py-2.5 px-4 text-xs font-bold uppercase tracking-wider font-montserrat rounded-xs transition-all duration-300 cursor-pointer ${
              frequency === "monthly"
                ? "bg-[#044A82] text-white shadow-xs"
                : "text-[#575757] hover:text-[#1C2530] hover:bg-white/60"
            }`}
          >
            Apoio Mensal Recorrente
          </button>
        </div>
      </div>

      {/* Presets de Valores com Animação e Micro-interação */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="form-label mb-0">Selecione o Valor</span>
          <span className="text-[0.7rem] text-[#727272] font-montserrat">Em Reais (BRL)</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-4">
          {presets.map((p) => {
            const isSelected = amountCents === p.cents;
            return (
              <button
                key={p.cents}
                type="button"
                onClick={() => setAmountCents(p.cents)}
                className={`py-3 px-2 text-xs font-bold font-montserrat rounded-xs border transition-all duration-300 flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                  isSelected
                    ? "bg-[#044A82] text-white border-[#044A82] shadow-sm -translate-y-0.5 ring-2 ring-[#044A82]/20"
                    : "bg-white text-[#1C2530] border-[#DEDEDE] hover:border-[#044A82]/50 hover:bg-[#F5F2EC]/50 hover:-translate-y-0.5 hover:shadow-2xs active:translate-y-0"
                }`}
              >
                <span>{p.label}</span>
                {p.cents === 5000 && (
                  <span className={`text-[0.6rem] font-semibold uppercase tracking-wider ${isSelected ? "text-[#C1BDA6]" : "text-[#044A82]"}`}>
                    Sugerido
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div>
          <label htmlFor="custom-amount" className="form-label text-[0.7rem] text-[#575757] mb-1">
            Ou digite outro valor personalizado (Mínimo R$ 5,00)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sm font-bold font-montserrat text-[#727272]">
              R$
            </div>
            <input
              id="custom-amount"
              type="number"
              min="5"
              max="50000"
              step="1"
              value={amountCents / 100}
              onChange={(e) => {
                const val = Math.round(Number(e.target.value) * 100);
                setAmountCents(isNaN(val) ? 0 : val);
              }}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#DEDEDE] hover:border-[#044A82]/50 rounded-xs font-ruda font-bold text-lg text-[#044A82] transition-all duration-300 focus:border-[#044A82] focus:ring-2 focus:ring-[#044A82]/20 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* E-mail Opcional do Doador */}
      <div className="mb-6">
        <label htmlFor="donor-email" className="form-label mb-1">
          Seu E-mail (Opcional — para envio do comprovante pastoral)
        </label>
        <input
          id="donor-email"
          type="email"
          autoComplete="email"
          value={donorEmail}
          onChange={(e) => setDonorEmail(e.target.value)}
          placeholder="seu@email.com"
          className="form-input hover:border-[#044A82]/50 focus:ring-2 focus:ring-[#044A82]/20 transition-all duration-300"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full text-center py-4 text-xs font-bold tracking-wider transition-all duration-300 hover:shadow-lg disabled:opacity-60 cursor-pointer"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            Gerando Pix Seguro...
          </span>
        ) : (
          "Gerar Código Pix Instantâneo"
        )}
      </button>
    </form>
  );
}
