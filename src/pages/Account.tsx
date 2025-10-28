import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

interface User {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  registeredAt: string;
}

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/register');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <Card className="p-8">
              <Icon name="UserX" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-4">Войдите в аккаунт</h2>
              <p className="text-muted-foreground mb-6">
                Для доступа к личному кабинету необходима регистрация
              </p>
              <Button onClick={() => navigate('/register')} size="lg" className="w-full">
                <Icon name="UserPlus" size={20} className="mr-2" />
                Зарегистрироваться
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const myEvents = [
    {
      id: '1',
      title: 'Концерт симфонического оркестра',
      date: '15 декабря 2024',
      seats: [{ row: 3, number: 7 }],
      total: 3000,
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'Stand-up шоу: Вечер юмора',
      date: '20 декабря 2024',
      seats: [{ row: 5, number: 12 }, { row: 5, number: 13 }],
      total: 3000,
      status: 'confirmed'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Личный кабинет
            </h1>
            <p className="text-xl text-muted-foreground">
              Управляйте своими мероприятиями и билетами
            </p>
          </div>

          <Tabs defaultValue="profile" className="animate-slide-up">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </TabsTrigger>
              <TabsTrigger value="events">
                <Icon name="Calendar" size={18} className="mr-2" />
                Мои мероприятия
              </TabsTrigger>
              <TabsTrigger value="tickets">
                <Icon name="Ticket" size={18} className="mr-2" />
                Билеты
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Icon name="User" size={24} />
                      Личные данные
                    </span>
                    <Button variant="outline" onClick={handleLogout} size="sm">
                      <Icon name="LogOut" size={16} className="mr-2" />
                      Выйти
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">ФИО</p>
                      <p className="font-medium text-lg">{user.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-medium text-lg">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Телефон</p>
                      <p className="font-medium text-lg">{user.phone}</p>
                    </div>
                    {user.company && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Компания</p>
                        <p className="font-medium text-lg">{user.company}</p>
                      </div>
                    )}
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Дата регистрации: {new Date(user.registeredAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="Award" size={24} className="text-primary" />
                    <h3 className="font-bold text-lg">Статистика</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-accent rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Посещено</p>
                      <p className="text-3xl font-bold text-primary">12</p>
                    </div>
                    <div className="p-4 bg-accent rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Запланировано</p>
                      <p className="text-3xl font-bold text-secondary">2</p>
                    </div>
                    <div className="p-4 bg-accent rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Потрачено</p>
                      <p className="text-3xl font-bold">6000₽</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events">
              <div className="space-y-4">
                {myEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="Calendar" size={16} />
                            <span>{event.date}</span>
                          </div>
                        </div>
                        <Badge className="bg-green-500">
                          {event.status === 'confirmed' ? 'Подтверждено' : 'В ожидании'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          Мест: {event.seats.length}
                        </div>
                        <div className="text-xl font-bold">{event.total} ₽</div>
                        <Button size="sm" variant="outline">
                          <Icon name="Download" size={16} className="mr-2" />
                          Скачать билеты
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tickets">
              <div className="space-y-4">
                {myEvents.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                          <Icon name="Ticket" size={32} className="text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-2">{event.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{event.date}</p>
                          <div className="space-y-2">
                            {event.seats.map((seat, idx) => (
                              <div 
                                key={idx}
                                className="inline-flex items-center gap-2 bg-accent px-3 py-1 rounded-lg mr-2"
                              >
                                <Icon name="Armchair" size={16} />
                                <span className="text-sm font-medium">
                                  Ряд {seat.row}, Место {seat.number}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Button variant="outline">
                          <Icon name="QrCode" size={20} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Card className="mt-6 animate-scale-in" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Icon name="HelpCircle" size={24} className="text-primary" />
                <div>
                  <h3 className="font-bold mb-2">Нужна помощь?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Обратитесь в службу поддержки или посетите раздел FAQ
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigate('/faq')}>
                      FAQ
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigate('/contacts')}>
                      Поддержка
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
