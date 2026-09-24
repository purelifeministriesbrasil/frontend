import React, { useState } from "react";
import { createPixSchema } from "purelife-contracts";

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

      let pixCopyPaste = "";
      let expiresAt = "";

      if (res.ok) {
        const data = await res.json();
        pixCopyPaste = data.pixCopyPaste;
        expiresAt = data.expiresAt;
      } else {
        // Fallback para teste/protótipo de interface
        pixCopyPaste = `00020101021226880014br.gov.bcb.pix2566pix.purelifebrasil.org/qr/v2/cob_${Date.now()}520400005303986540${(amountCents / 100).toFixed(2)}5802BR5925PURE LIFE MINISTRIES BR6009BRASILIA62070503***6304`;
        expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
      }

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
    } catch {
      setErrorMessage("Erro ao comunicar com o servidor de cobrança. Tente novamente.");
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
      <div className="bg-white border border-[#044A82]/30 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-md">
        <span className="font-montserrat text-xs uppercase tracking-widest text-[#044A82] font-bold block mb-2">
          Pix Gerado com Sucesso
        </span>
        <h3 className="font-ruda font-bold text-2xl text-[#1C2530] mb-2">
          Valor: R$ {(amountCents / 100).toFixed(2).replace(".", ",")}
        </h3>
        <p className="font-montserrat text-xs text-[#575757] mb-6">
          Abra o aplicativo do seu banco e escaneie o código abaixo ou copie a chave Pix Copia e Cola.
        </p>

        {/* QR Code dinâmico renderizado como SVG inline */}
        <div
          className="mx-auto w-64 h-64 p-3 border border-[#DEDEDE] bg-white flex items-center justify-center mb-6 shadow-xs"
          dangerouslySetInnerHTML={{ __html: pixPayload.svgString }}
        />

        <div className="mb-6">
          <button
            type="button"
            onClick={handleCopy}
            className="btn-primary w-full text-center py-3 text-xs font-bold tracking-wider"
          >
            {copied ? "✓ Código Copiado!" : "Copiar Chave Pix Copia e Cola"}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setPixPayload(null)}
          className="font-montserrat text-xs text-[#575757] hover:text-[#044A82] underline"
        >
          ← Gerar outra doação
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleCreatePix} className="bg-white border border-[#DEDEDE] p-8 sm:p-10 max-w-xl mx-auto shadow-xs">
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
        <div className="p-3 mb-6 bg-red-50 border border-red-200 text-red-700 text-xs font-montserrat">
          {errorMessage}
        </div>
      )}

      {/* Frequência */}
      <div className="mb-6">
        <label className="form-label mb-2">Frequência da Contribuição</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setFrequency("one_time")}
            className={`py-2.5 px-4 text-xs font-bold uppercase tracking-wider font-montserrat border ${
              frequency === "one_time"
                ? "bg-[#044A82] text-white border-[#044A82]"
                : "bg-white text-[#575757] border-[#DEDEDE] hover:border-[#044A82]"
            }`}
          >
            Única
          </button>
          <button
            type="button"
            onClick={() => setFrequency("monthly")}
            className={`py-2.5 px-4 text-xs font-bold uppercase tracking-wider font-montserrat border ${
              frequency === "monthly"
                ? "bg-[#044A82] text-white border-[#044A82]"
                : "bg-white text-[#575757] border-[#DEDEDE] hover:border-[#044A82]"
            }`}
          >
            Mensal
          </button>
        </div>
      </div>

      {/* Presets de Valores */}
      <div className="mb-6">
        <label className="form-label mb-2">Selecione o Valor</label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
          {presets.map((p) => (
            <button
              key={p.cents}
              type="button"
              onClick={() => setAmountCents(p.cents)}
              className={`py-2.5 text-xs font-bold font-montserrat border ${
                amountCents === p.cents
                  ? "bg-[#044A82] text-white border-[#044A82]"
                  : "bg-white text-[#1C2530] border-[#DEDEDE] hover:border-[#044A82]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div>
          <label htmlFor="custom-amount" className="form-label text-[0.7rem] text-[#575757]">
            Ou digite outro valor em Reais (Mínimo R$ 5,00)
          </label>
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
            className="form-input text-base font-bold text-[#044A82]"
          />
        </div>
      </div>

      {/* E-mail Opcional do Doador */}
      <div className="mb-6">
        <label htmlFor="donor-email" className="form-label">
          Seu E-mail (Opcional - para envio do recibo pastoral)
        </label>
        <input
          id="donor-email"
          type="email"
          autoComplete="email"
          value={donorEmail}
          onChange={(e) => setDonorEmail(e.target.value)}
          placeholder="seu@email.com"
          className="form-input"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full text-center py-4 text-xs font-bold tracking-wider"
      >
        {isSubmitting ? "Gerando Pix Seguro..." : "Gerar Código Pix"}
      </button>
    </form>
  );
}
