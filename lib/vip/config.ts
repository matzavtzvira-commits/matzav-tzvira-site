// Addresses, URLs and limits shared by the VIP onboarding routes.
// Every external URL is env-overridable so a test harness can point it at a mock.
// (RESEND_BASE_URL is read by the resend SDK itself when it is imported.)

export const BUSINESS_EMAIL = "matzavtzvira@gmail.com";
export const FROM_SITE = "אתר מצב צבירה <noreply@matzavtzvira.co.il>";
export const FROM_RIVKY = "רבקי - מצב צבירה <rivky@matzavtzvira.co.il>";

export const OGEN_TO = "ogeninsurence@gmail.com";
export const OGEN_CC = "sg@ogen-sm.co.il";

export const MORTGAGE_GUIDE_URL = "https://matzavtzvira.co.il/guides/mashkanta-guide.pdf";

export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://matzavtzvira.co.il",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// File limits (Vercel caps a request body at 4.5MB).
export const MAX_FILES_PER_REQUEST = 6;
export const MAX_REQUEST_FILE_BYTES = 4.5 * 1024 * 1024;
export const MAX_LABEL_LENGTH = 120;
export const FILE_ID_PATTERN = /^[A-Za-z0-9_]{1,40}$/;

// Resend accepts up to 40MB per email after base64; keep the forward-ready Ogen email well below.
export const MAX_OGEN_ATTACHMENT_BYTES = 15 * 1024 * 1024;

// Resend: "Emails can be scheduled up to 30 days in advance." (docs, schedule-email).
export const RESEND_MAX_SCHEDULE_DAYS = 30;
export const TOKEN_TTL_DAYS = 30;

export const env = {
  intakeSecret: () => process.env.VIP_INTAKE_SECRET || "",
  syncUrl: () =>
    process.env.VIP_ONBOARDING_SYNC_URL || "https://tasks-dashboard-gamma.vercel.app/api/vip-onboarding-sync",
  intakeFileUrl: () =>
    process.env.VIP_INTAKE_FILE_URL || "https://tasks-dashboard-gamma.vercel.app/api/vip-intake-file",
  clientFilesUrl: () =>
    process.env.VIP_CLIENT_FILES_URL || "https://tasks-dashboard-gamma.vercel.app/api/vip-client-files",
  uploadBaseUrl: () => (process.env.VIP_UPLOAD_BASE_URL || "https://matzavtzvira.co.il").replace(/\/+$/, ""),
};
