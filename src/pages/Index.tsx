import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  price: number;
  category: string;
  image: string;
  availableSeats: number;
}

interface Seat {
  id: string;
  row: number;
  number: number;
  status: 'available' | 'selected' | 'booked';
  price: number;
}

interface CartItem {
  eventId: string;
  eventTitle: string;
  seats: Seat[];
}

const Index = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const events: Event[] = [
    {
      id: '1',
      title: 'Концерт симфонического оркестра',
      date: '15 декабря 2024',
      time: '19:00',
      venue: 'Концертный зал им. Чайковского',
      price: 2500,
      category: 'Музыка',
      image: '/placeholder.svg',
      availableSeats: 120
    },
    {
      id: '2',
      title: 'Stand-up шоу: Вечер юмора',
      date: '20 декабря 2024',
      time: '20:00',
      venue: 'Театр комедии',
      price: 1500,
      category: 'Развлечения',
      image: '/placeholder.svg',
      availableSeats: 80
    },
    {
      id: '3',
      title: 'Мастер-класс по дизайну',
      date: '25 декабря 2024',
      time: '14:00',
      venue: 'Креативное пространство "Точка"',
      price: 3000,
      category: 'Образование',
      image: '/placeholder.svg',
      availableSeats: 50
    },
    {
      id: '4',
      title: 'Джазовый вечер',
      date: '28 декабря 2024',
      time: '21:00',
      venue: 'Джаз-клуб "Blue Note"',
      price: 1800,
      category: 'Музыка',
      image: '/placeholder.svg',
      availableSeats: 60
    },
    {
      id: '5',
      title: 'Театральная постановка "Гамлет"',
      date: '5 января 2025',
      time: '18:00',
      venue: 'Государственный драматический театр',
      price: 2200,
      category: 'Театр',
      image: '/placeholder.svg',
      availableSeats: 150
    },
    {
      id: '6',
      title: 'Фестиваль электронной музыки',
      date: '10 января 2025',
      time: '22:00',
      venue: 'Клуб "Космонавт"',
      price: 2000,
      category: 'Музыка',
      image: '/placeholder.svg',
      availableSeats: 200
    }
  ];

  const generateSeats = (eventId: string): Seat[] => {
    const seatLayout: Seat[] = [];
    const rows = 8;
    const seatsPerRow = 12;
    const bookedSeats = new Set(['1-5', '2-6', '3-7', '4-8']);

    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatId = `${row}-${seat}`;
        seatLayout.push({
          id: seatId,
          row,
          number: seat,
          status: bookedSeats.has(seatId) ? 'booked' : 'available',
          price: row <= 3 ? 3000 : row <= 5 ? 2500 : 2000
        });
      }
    }
    return seatLayout;
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setSeats(generateSeats(event.id));
  };

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked') return;

    setSeats(prev => prev.map(s => 
      s.id === seat.id 
        ? { ...s, status: s.status === 'selected' ? 'available' : 'selected' }
        : s
    ));
  };

  const handleAddToCart = () => {
    if (!selectedEvent) return;

    const selectedSeats = seats.filter(s => s.status === 'selected');
    if (selectedSeats.length === 0) {
      toast({
        title: 'Выберите места',
        description: 'Пожалуйста, выберите хотя бы одно место',
        variant: 'destructive'
      });
      return;
    }

    const existingCartItem = cart.find(item => item.eventId === selectedEvent.id);
    
    if (existingCartItem) {
      setCart(prev => prev.map(item => 
        item.eventId === selectedEvent.id
          ? { ...item, seats: [...item.seats, ...selectedSeats] }
          : item
      ));
    } else {
      setCart(prev => [...prev, {
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        seats: selectedSeats
      }]);
    }

    toast({
      title: 'Добавлено в корзину',
      description: `${selectedSeats.length} ${selectedSeats.length === 1 ? 'место' : 'мест'} добавлено`
    });

    setSeats(prev => prev.map(s => 
      s.status === 'selected' ? { ...s, status: 'booked' } : s
    ));
  };

  const removeFromCart = (eventId: string, seatId: string) => {
    setCart(prev => prev.map(item => 
      item.eventId === eventId
        ? { ...item, seats: item.seats.filter(s => s.id !== seatId) }
        : item
    ).filter(item => item.seats.length > 0));

    toast({
      title: 'Удалено из корзины',
      description: 'Место освобождено'
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => 
      total + item.seats.reduce((sum, seat) => sum + seat.price, 0), 0
    );
  };

  const getTotalSeats = () => {
    return cart.reduce((total, item) => total + item.seats.length, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center rotate-12 hover:rotate-0 transition-transform duration-300">
                <Icon name="Ticket" size={24} className="text-primary-foreground -rotate-12" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  EventHub
                </h1>
                <p className="text-xs text-muted-foreground">Билеты на лучшие события</p>
              </div>
            </div>

            <Button 
              onClick={() => setIsCartOpen(true)}
              variant="outline"
              className="relative hover:scale-105 transition-transform"
            >
              <Icon name="ShoppingCart" size={20} />
              {getTotalSeats() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold animate-scale-in">
                  {getTotalSeats()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Предстоящие события
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Выберите место и забронируйте билет на любимое мероприятие
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="music">Музыка</TabsTrigger>
            <TabsTrigger value="theater">Театр</TabsTrigger>
            <TabsTrigger value="education">Обучение</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Card 
              key={event.id}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden border-2 hover:border-primary animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleEventClick(event)}
            >
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary/90 backdrop-blur-sm">
                    {event.category}
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="Calendar" size={64} className="text-primary/30 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} />
                    <span>{event.date} в {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={16} />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Users" size={16} />
                    <span>Доступно мест: {event.availableSeats}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    от {event.price.toLocaleString()} ₽
                  </span>
                  <Button size="sm" className="group-hover:scale-110 transition-transform">
                    Выбрать места
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={selectedEvent !== null} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedEvent?.title}
            </DialogTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <Icon name="Calendar" size={16} />
                {selectedEvent?.date}
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={16} />
                {selectedEvent?.time}
              </div>
            </div>
          </DialogHeader>

          <div className="mt-6">
            <div className="flex items-center justify-center mb-6 gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded border-2 border-border bg-background" />
                <span className="text-sm">Доступно</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary" />
                <span className="text-sm">Выбрано</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-muted" />
                <span className="text-sm">Занято</span>
              </div>
            </div>

            <div className="mb-4 text-center">
              <div className="inline-block bg-muted px-8 py-2 rounded-t-full">
                <Icon name="Monitor" size={24} className="text-muted-foreground" />
                <p className="text-sm font-medium mt-1">СЦЕНА</p>
              </div>
            </div>

            <div className="space-y-2 bg-accent/30 p-6 rounded-2xl">
              {Array.from(new Set(seats.map(s => s.row))).map(row => (
                <div key={row} className="flex items-center gap-2">
                  <span className="text-sm font-medium w-8 text-muted-foreground">
                    Ряд {row}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {seats.filter(s => s.row === row).map(seat => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatClick(seat)}
                        disabled={seat.status === 'booked'}
                        className={`
                          w-10 h-10 rounded-lg font-medium text-sm transition-all duration-200
                          ${seat.status === 'available' 
                            ? 'border-2 border-border bg-background hover:border-primary hover:scale-110' 
                            : seat.status === 'selected'
                            ? 'bg-primary text-primary-foreground scale-110 shadow-lg'
                            : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                          }
                        `}
                      >
                        {seat.number}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between p-4 bg-accent rounded-xl">
              <div>
                <p className="text-sm text-muted-foreground">Выбрано мест:</p>
                <p className="text-2xl font-bold text-primary">
                  {seats.filter(s => s.status === 'selected').length}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Сумма:</p>
                <p className="text-2xl font-bold">
                  {seats.filter(s => s.status === 'selected')
                    .reduce((sum, seat) => sum + seat.price, 0)
                    .toLocaleString()} ₽
                </p>
              </div>
              <Button 
                onClick={handleAddToCart}
                size="lg"
                disabled={seats.filter(s => s.status === 'selected').length === 0}
                className="hover:scale-105 transition-transform"
              >
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Добавить в корзину
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Icon name="ShoppingCart" size={24} />
              Корзина
            </DialogTitle>
          </DialogHeader>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-xl font-medium text-muted-foreground">
                Корзина пуста
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Выберите мероприятие и места
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cart.map(item => (
                  <Card key={item.eventId}>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-3">{item.eventTitle}</h3>
                      <div className="space-y-2">
                        {item.seats.map(seat => (
                          <div 
                            key={seat.id}
                            className="flex items-center justify-between p-2 bg-accent rounded-lg"
                          >
                            <span className="text-sm">
                              Ряд {seat.row}, Место {seat.number}
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="font-medium">
                                {seat.price.toLocaleString()} ₽
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.eventId, seat.id)}
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 p-6 bg-primary/10 rounded-xl border-2 border-primary">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium">Всего мест:</span>
                  <span className="text-2xl font-bold">{getTotalSeats()}</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-medium">Итого:</span>
                  <span className="text-3xl font-bold text-primary">
                    {getTotalPrice().toLocaleString()} ₽
                  </span>
                </div>
                <Button 
                  size="lg" 
                  className="w-full hover:scale-105 transition-transform"
                  onClick={() => {
                    toast({
                      title: 'Заказ оформлен!',
                      description: `Вы забронировали ${getTotalSeats()} мест на сумму ${getTotalPrice().toLocaleString()} ₽`
                    });
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                >
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Оформить заказ
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
