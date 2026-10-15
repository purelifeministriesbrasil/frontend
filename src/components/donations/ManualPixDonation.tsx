import { useState } from "react";
import { Check, Copy, MessageCircle } from "lucide-react";
import { siteConfig, whatsappUrl } from "@/lib/site-config";

type CopyState = "idle" | "copied" | "failed";

const { donation, contact } = siteConfig;
/** Bancos aceitam a chave CNPJ só com dígitos; a versão formatada fica apenas para leitura. */
const pixKeyDigits = donation.manualPixKey.replace(/\D/g, "");
const receiptUrl = whatsappUrl(
  contact.whatsapp.number,
  "Olá! Fiz uma doação via PIX para a Pure Life Ministries Brasil e gostaria de enviar o comprovante."
);

/**
 * Doação direta pela chave PIX institucional (CNPJ). Exibida enquanto o gateway de PIX dinâmico
 * está desligado (PUBLIC_ENABLE_PIX_GATEWAY diferente de "true").
 */
export default function ManualPixDonation() {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixKeyDigits);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 3000);
    } catch {
      // Clipboard API indisponível (contexto inseguro ou permissão negada): orienta a cópia manual.
      setCopyState("failed");
    }
  };

  return (
    <div className="bg-white border border-[#DEDEDE] rounded-xs p-8 sm:p-10 max-w-xl mx-auto shadow-xs">
      <div className="mb-8 border-b border-[#DEDEDE] pb-6">
        <span className="font-montserrat text-xs uppercase tracking-widest text-[#044A82] font-bold block mb-1">
          Apoie este Ministério
        </span>
        <h3 className="font-ruda font-bold text-2xl text-[#1C2530]">Doação Direta via Chave PIX</h3>
        <p className="font-montserrat text-[#575757] text-sm mt-2 leading-relaxed">
          Abra o aplicativo do seu banco, escolha <strong>Pix → Pagar com chave</strong> e use a chave CNPJ
          institucional abaixo. Confira o nome do recebedor antes de confirmar.
        </p>
      </div>

      <dl className="bg-[#F5F2EC] border border-[#DEDEDE] p-5 mb-6 space-y-3">
        <div>
          <dt className="font-montserrat text-[0.7rem] uppercase tracking-widest text-[#575757] font-bold">
            Chave PIX ({donation.manualPixType})
          </dt>
          <dd className="font-mono font-bold text-xl text-[#044A82] select-all break-all">{donation.manualPixKey}</dd>
        </div>
        <div>
          <dt className="font-montserrat text-[0.7rem] uppercase tracking-widest text-[#575757] font-bold">Recebedor</dt>
          <dd className="font-montserrat text-sm text-[#1C2530]">{donation.accountHolder}</dd>
        </div>
      </dl>

      <div className="flex flex-col sm:flex-row gap-3">
        <button type="button" onClick={handleCopy} className="btn-primary flex-1 inline-flex items-center justify-center gap-2 py-3.5">
          {copyState === "copied" ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
          {copyState === "copied" ? "Chave copiada!" : "Copiar Chave PIX"}
        </button>
        <a
          href={receiptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline flex-1 inline-flex items-center justify-center gap-2 py-3.5"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          Enviar comprovante
          <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
        </a>
      </div>

      <p role="status" aria-live="polite" className="font-montserrat text-xs text-[#575757] mt-4 min-h-4">
        {copyState === "copied" && `Chave ${pixKeyDigits} copiada para a área de transferência.`}
        {copyState === "failed" && "Não foi possível copiar automaticamente. Selecione a chave acima e copie manualmente."}
      </p>

      <p className="font-montserrat text-xs text-[#575757] leading-relaxed mt-2">
        O comprovante pode ser enviado pelo WhatsApp {contact.whatsapp.display}. Sua contribuição tem destinação
        100% ministerial.
      </p>
    </div>
  );
}
