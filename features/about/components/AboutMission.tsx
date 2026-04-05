import { aboutMessages } from "@/messages";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { H2 } from "@/shared/ui/typography";

export function AboutMission() {
  return (
    <section id="missao" className="scroll-mt-24 space-y-4">
      <H2>{aboutMessages.mission.title}</H2>
      <div className="grid gap-4 md:grid-cols-3">
        {aboutMessages.mission.cards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {card.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
