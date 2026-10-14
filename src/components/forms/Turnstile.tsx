import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { siteConfig } from "@/lib/site-config";

interface TurnstileApi {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      action?: string;
      language?: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    }
  ): string;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  scriptPromise ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile_unavailable")));
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("turnstile_load_failed"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export interface TurnstileHandle {
  /** Tokens são de uso único: chame após qualquer resposta do servidor para obter um novo. */
  reset(): void;
}

interface Props {
  action: string;
  onToken: (token: string | null) => void;
}

/**
 * Widget Cloudflare Turnstile (render explícito). Sem `PUBLIC_TURNSTILE_SITE_KEY` exibe aviso
 * e não emite token — o backend recusa o envio (fail-closed).
 */
const Turnstile = forwardRef<TurnstileHandle, Props>(function Turnstile({ action, onToken }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useImperativeHandle(ref, () => ({
    reset() {
      onTokenRef.current(null);
      if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current);
    },
  }));

  useEffect(() => {
    const siteKey = siteConfig.turnstileSiteKey;
    if (!siteKey || !containerRef.current) return;
    let cancelled = false;

    loadTurnstile()
      .then((api) => {
        if (cancelled || !containerRef.current) return;
        widgetIdRef.current = api.render(containerRef.current, {
          sitekey: siteKey,
          action,
          language: "pt-br",
          callback: (token) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(null),
          "error-callback": () => onTokenRef.current(null),
        });
      })
      .catch(() => onTokenRef.current(null));

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [action]);

  if (!siteConfig.turnstileSiteKey) {
    return (
      <p role="alert" className="field-error">
        Verificação de segurança indisponível. Entre em contato pelo e-mail {siteConfig.contact.email}.
      </p>
    );
  }

  return <div ref={containerRef} className="min-h-[65px]" aria-label="Verificação de segurança" />;
});

export default Turnstile;
