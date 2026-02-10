import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'valentine-website'
  );

  return (
    <footer className="relative z-10 py-8 px-4 border-t border-rose-200 dark:border-rose-900 bg-gradient-to-b from-transparent to-rose-50/30 dark:to-rose-950/10">
      <div className="max-w-6xl mx-auto text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Made with{' '}
          <Heart className="inline w-4 h-4 text-rose-500 fill-rose-500 mx-1" />
          for someone special
        </p>
        <p className="text-xs text-muted-foreground">
          Built with{' '}
          <Heart className="inline w-3 h-3 text-rose-500 fill-rose-500 mx-1" />
          {' '}using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-600 dark:text-rose-400 hover:underline font-medium"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
