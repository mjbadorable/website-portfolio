export function CertificationLogo({ id }: { id: string }) {
  switch (id) {
    case "ai-fundamentals":
      return (
        <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
          <rect x="3" y="8" width="26" height="2.4" rx="1" fill="#0F62FE" />
          <rect x="3" y="12.5" width="26" height="2.4" rx="1" fill="#0F62FE" />
          <rect x="3" y="17" width="26" height="2.4" rx="1" fill="#0F62FE" />
          <rect x="3" y="21.5" width="26" height="2.4" rx="1" fill="#0F62FE" />
          <text
            x="16"
            y="19.5"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="10"
            fontWeight="800"
            letterSpacing="0.8"
          >
            IBM
          </text>
        </svg>
      );

    case "devops-on-aws":
      return (
        <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
          <text
            x="16"
            y="16"
            textAnchor="middle"
            fill="currentColor"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize="10.5"
            fontWeight="800"
            letterSpacing="-0.3"
          >
            AWS
          </text>
          <path
            d="M6 20.5c5.5 3.6 13.5 3.6 19.5.3"
            fill="none"
            stroke="#FF9900"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M23.2 19.2l3.1 1.1-1.2 3"
            fill="none"
            stroke="#FF9900"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "linux-for-developers":
      return (
        <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
          <path
            d="M7 7h10v4H11v10h6v4H7V7zm18 18H15v-4h6V11h-6V7h10v18z"
            fill="#0099D5"
          />
        </svg>
      );

    case "software-testing-automation":
    case "html-css-js-web-developers":
      return (
        <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
          <path
            d="M16 6a10 10 0 1 0 7.9 16.1l-3.2-2.5A6 6 0 1 1 20.7 12l3.2-2.5A10 10 0 0 0 16 6z"
            fill="#0056D2"
          />
        </svg>
      );

    case "google-certified-educator-l2":
    case "google-it-support":
    case "google-workspace-admin":
      return (
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path
            d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 0 1-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.5z"
            fill="#4285F4"
          />
          <path
            d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.6c-.9.6-2.1 1-3.4 1-2.6 0-4.9-1.8-5.7-4.2H2.9v2.7A10 10 0 0 0 12 22z"
            fill="#34A853"
          />
          <path
            d="M6.3 13.8A6 6 0 0 1 6 12c0-.6.1-1.2.3-1.8V7.5H2.9A10 10 0 0 0 2 12c0 1.6.4 3.1 1 4.5l3.3-2.7z"
            fill="#FBBC05"
          />
          <path
            d="M12 6c1.5 0 2.8.5 3.9 1.5l2.9-2.9A10 10 0 0 0 12 2 10 10 0 0 0 2.9 7.5l3.4 2.7C7.1 7.8 9.4 6 12 6z"
            fill="#EA4335"
          />
        </svg>
      );

    default:
      return (
        <span className="font-mono text-xs font-semibold text-fg-2">
          CERT
        </span>
      );
  }
}
