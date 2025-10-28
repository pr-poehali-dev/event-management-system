import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const team = [
    { name: 'Анна Петрова', role: 'Директор мероприятий', avatar: '👩‍💼' },
    { name: 'Иван Сидоров', role: 'Технический директор', avatar: '👨‍💻' },
    { name: 'Мария Козлова', role: 'PR-менеджер', avatar: '👩‍💼' },
    { name: 'Дмитрий Волков', role: 'Event-координатор', avatar: '👨‍💼' }
  ];

  const partners = [
    { name: 'TechCorp', category: 'Генеральный партнёр' },
    { name: 'DigitalHub', category: 'Технологический партнёр' },
    { name: 'EventSpace', category: 'Партнёр по площадкам' },
    { name: 'MediaGroup', category: 'Информационный партнёр' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-background py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            О нас
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Создаём незабываемые события и объединяем людей
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <Card className="p-8 animate-slide-up">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                <Icon name="Target" size={32} className="text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Наша история</h2>
                <p className="text-muted-foreground">С 2020 года создаём лучшие события</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed mb-4">
              EventHub начал свою работу в 2020 году с миссией сделать мероприятия доступными и удобными для каждого. 
              Мы верим, что качественные события способны вдохновлять, обучать и объединять людей.
            </p>
            <p className="text-lg leading-relaxed">
              За годы работы мы организовали более 500 мероприятий, собрав аудиторию более 100 000 человек. 
              Наша платформа упрощает процесс бронирования билетов и делает участие в событиях максимально комфортным.
            </p>
          </Card>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card 
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-center mb-12">Наши партнёры</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {partners.map((partner, index) => (
              <Card 
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{partner.name}</h3>
                    <Badge variant="outline">{partner.category}</Badge>
                  </div>
                  <Icon name="Handshake" size={40} className="text-primary" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
