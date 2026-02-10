import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { valentineContent } from '../../content/valentineContent';
import { Heart } from 'lucide-react';

export default function ReasonsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-center mb-4">
            <img 
              src="/assets/generated/valentine-icons.dim_512x512.png" 
              alt="" 
              className="w-16 h-16 opacity-60"
            />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-rose-600 dark:text-rose-400">
            Reasons I Love You
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Just a few of the countless reasons why you mean everything to me
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valentineContent.reasons.map((reason, index) => (
            <Card 
              key={reason.id}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-rose-200 dark:border-rose-900 bg-card/80 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-rose-500 fill-rose-500 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl text-rose-600 dark:text-rose-400">
                    {reason.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {reason.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
