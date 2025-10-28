import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const FAQ = () => {
  const faqs = [
    {
      question: 'Как забронировать билет?',
      answer: 'Выберите мероприятие на главной странице, выберите нужные места в зале, добавьте их в корзину и оформите заказ. После оплаты билеты придут на ваш email.'
    },
    {
      question: 'Можно ли вернуть билет?',
      answer: 'Да, возврат билетов возможен не позднее чем за 7 дней до начала мероприятия. Средства возвращаются в течение 5-10 рабочих дней на карту, с которой была произведена оплата.'
    },
    {
      question: 'Какие способы оплаты доступны?',
      answer: 'Мы принимаем оплату банковскими картами (Visa, MasterCard, МИР), электронными кошельками (ЮMoney, QIWI) и через систему быстрых платежей (СБП).'
    },
    {
      question: 'Как получить билеты?',
      answer: 'После оплаты электронные билеты автоматически отправляются на указанный email. Также вы можете скачать их в личном кабинете. На входе достаточно показать QR-код с билета.'
    },
    {
      question: 'Можно ли изменить данные после регистрации?',
      answer: 'Да, вы можете изменить свои данные в разделе "Профиль" личного кабинета. Обратите внимание, что email используется для входа и его смена требует подтверждения.'
    },
    {
      question: 'Что делать, если потерял билет?',
      answer: 'Не переживайте! Войдите в личный кабинет и скачайте билеты повторно. Также мы отправим дубликат на ваш email по запросу в службу поддержки.'
    },
    {
      question: 'Есть ли скидки для студентов и пенсионеров?',
      answer: 'Да, на многие мероприятия действуют специальные тарифы. Информация о скидках указана в описании каждого события. При входе необходимо предъявить подтверждающий документ.'
    },
    {
      question: 'Можно ли купить билеты на группу?',
      answer: 'Конечно! Вы можете выбрать несколько мест одновременно. Для групп от 10 человек возможны дополнительные скидки — обратитесь в службу поддержки.'
    },
    {
      question: 'Что делать, если мероприятие отменили?',
      answer: 'В случае отмены мероприятия мы оповестим всех участников по email и SMS. Средства будут автоматически возвращены в течение 5 рабочих дней, либо вы можете выбрать другое мероприятие.'
    },
    {
      question: 'Как связаться с поддержкой?',
      answer: 'Вы можете написать нам через форму обратной связи в разделе "Контакты", позвонить по телефону +7 (999) 123-45-67 или написать на email: support@eventhub.ru'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Частые вопросы
            </h1>
            <p className="text-xl text-muted-foreground">
              Ответы на самые популярные вопросы
            </p>
          </div>

          <Card className="p-6 animate-slide-up">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-primary">
                    <div className="flex items-start gap-3">
                      <Icon name="HelpCircle" size={20} className="text-primary mt-1 flex-shrink-0" />
                      <span className="font-semibold">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pl-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          <Card className="mt-6 p-6 animate-scale-in" style={{ animationDelay: '200ms' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="MessageCircle" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Не нашли ответ?</h3>
                <p className="text-muted-foreground mb-4">
                  Наша служба поддержки готова помочь вам 24/7
                </p>
                <div className="flex flex-wrap gap-2">
                  <a href="tel:+79991234567" className="text-primary hover:underline flex items-center gap-1">
                    <Icon name="Phone" size={16} />
                    +7 (999) 123-45-67
                  </a>
                  <span className="text-muted-foreground">•</span>
                  <a href="mailto:support@eventhub.ru" className="text-primary hover:underline flex items-center gap-1">
                    <Icon name="Mail" size={16} />
                    support@eventhub.ru
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
