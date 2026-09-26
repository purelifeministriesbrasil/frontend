/**
 * Progressive Enhancement for Newsletter Form
 * Intercepts form submit if JS is active, otherwise native HTTP POST handles it.
 * Transfer budget <= 1 KB.
 */
export function initNewsletterEnhancement() {
  const form = document.querySelector(".newsletter-form") as HTMLFormElement | null;
  if (!form) return;

  const feedbackContainer = document.getElementById("newsletter-feedback");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector("button[type='submit']") as HTMLButtonElement | null;
    const emailInput = form.querySelector("input[name='email']") as HTMLInputElement | null;
    const websiteInput = form.querySelector("input[name='website']") as HTMLInputElement | null;
    const policyVersionInput = form.querySelector("input[name='policyVersion']") as HTMLInputElement | null;

    if (!emailInput || !submitBtn) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    try {
      const payload = {
        email: emailInput.value,
        website: websiteInput?.value || undefined,
        policyVersion: policyVersionInput?.value || "2026-09-19",
      };

      let success = false;
      try {
        const { supabase } = await import("@/lib/supabase");
        if (supabase) {
          if (!websiteInput?.value) {
            const { error } = await supabase.from("newsletter").insert({
              email: emailInput.value,
            });
            success = !error || (error as any).code === "23505";
          } else {
            success = true; // honeypot
          }
        } else {
          const res = await fetch(form.action || "/api/forms/newsletter", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          });
          success = res.ok;
        }
      } catch {
        success = false;
      }

      if (feedbackContainer) {
        feedbackContainer.classList.remove("hidden");
        if (success) {
          form.classList.add("hidden");
          feedbackContainer.innerHTML = `
            <div class="border border-[#C1BDA6]/40 bg-[#1C2530]/60 p-4 text-[#C1BDA6] font-montserrat text-sm flex items-center gap-2">
              <svg class="w-4 h-4 text-[#C1BDA6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Se o endereço informado puder receber mensagens, você receberá uma confirmação em breve.</span>
            </div>
          `;
        } else {
          feedbackContainer.innerHTML = `
            <div class="border border-[#B42318]/40 bg-[#1C2530]/60 p-4 text-[#FF8E8E] font-montserrat text-sm">
              Ocorreu um erro ao processar. Por favor, tente novamente ou entre em contato.
            </div>
          `;
          submitBtn.disabled = false;
          submitBtn.textContent = "Inscrever-se";
        }
      }
    } catch {
      if (feedbackContainer) {
        feedbackContainer.classList.remove("hidden");
        feedbackContainer.innerHTML = `
          <div class="border border-[#B42318]/40 bg-[#1C2530]/60 p-4 text-[#FF8E8E] font-montserrat text-sm">
            Erro de conexão. Verifique sua rede e tente novamente.
          </div>
        `;
      }
      submitBtn.disabled = false;
      submitBtn.textContent = "Inscrever-se";
    }
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNewsletterEnhancement);
  } else {
    initNewsletterEnhancement();
  }
}
