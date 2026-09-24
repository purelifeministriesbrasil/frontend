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

      const res = await fetch(form.action || "/api/forms/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (feedbackContainer) {
        feedbackContainer.classList.remove("hidden");
        if (res.ok) {
          form.classList.add("hidden");
          feedbackContainer.innerHTML = `
            <div class="border border-[#C1BDA6]/40 bg-[#1C2530]/60 p-4 text-[#C1BDA6] font-montserrat text-sm">
              ✓ Se o endereço informado puder receber mensagens, você receberá uma confirmação em breve.
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
