import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { valentineContent } from '../../content/valentineContent';

export default function LoveLetterSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-rose-50/50 to-transparent dark:via-rose-950/10">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-2xl border-rose-200 dark:border-rose-900 bg-card/95 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-8 duration-700">
          <CardHeader className="text-center space-y-2 pb-8">
            <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-600 dark:text-rose-400">
              {valentineContent.loveLetter.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="whitespace-pre-line text-foreground/90 leading-relaxed font-serif text-base sm:text-lg">
                {valentineContent.loveLetter.body}
              </div>
            </div>
            <div className="text-right pt-8">
              <p className="text-rose-600 dark:text-rose-400 font-semibold text-lg italic">
                {valentineContent.loveLetter.signature}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
