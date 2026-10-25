export default function EmergencyBanner() {
  return (
    <div role="region" aria-label="Emergency notice"
      className="border-b border-red-200/70 bg-red-50 text-red-900 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-200">
      <div className="mx-auto max-w-6xl px-4 py-2 text-sm flex items-center gap-2">
        <span aria-hidden className="pill bg-red-600 text-white">Emergency</span>
        <span>Call <a href="tel:995" className="font-semibold underline underline-offset-2">995</a> or go to the nearest A&E. Do not delay emergency care based on wait times shown here.</span>
      </div>
    </div>
  );
}
