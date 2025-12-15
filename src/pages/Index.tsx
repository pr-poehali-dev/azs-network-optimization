import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  const prices = [
    {
      volume: "1 литр",
      price: "50 ₽",
      icon: "Droplet",
      gradient: "from-red-600 to-orange-500",
    },
    {
      volume: "50 литров",
      price: "709 ₽",
      icon: "Fuel",
      gradient: "from-yellow-500 to-amber-400",
      popular: true,
    },
  ];

  const features = [
    {
      icon: "Clock",
      title: "24/7",
      desc: "Круглосуточно",
    },
    {
      icon: "ShieldCheck",
      title: "Качество",
      desc: "Сертифицировано",
    },
    {
      icon: "Zap",
      title: "Быстро",
      desc: "Экспресс-заправка",
    },
    {
      icon: "CreditCard",
      title: "Оплата",
      desc: "Любые карты",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 animate-pulse" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-block">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center animate-glow-pulse">
                  <Icon name="Fuel" className="text-white" size={32} />
                </div>
              </div>
              <h1 className="text-6xl md:text-7xl font-black mb-4">
                <span className="text-gradient glow-red">ЗАПРАВКА</span>
              </h1>
              <h2 className="text-5xl md:text-6xl font-bold text-gradient glow-gold">
                БЕНЗИНА
              </h2>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              Премиальное топливо по честным ценам
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-red-700 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105">
                <Icon name="MapPin" className="mr-2" />
                Найти АЗС
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-secondary text-secondary hover:bg-secondary/10 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300">
                <Icon name="Phone" className="mr-2" />
                Связаться
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Стоимость топлива
          </h2>
          <p className="text-muted-foreground text-lg">Прозрачные цены без переплат</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {prices.map((item, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden p-8 border-2 transition-all duration-500 hover:scale-105 animate-scale-in ${
                item.popular
                  ? "border-secondary bg-gradient-to-br from-secondary/10 to-transparent shadow-2xl shadow-secondary/20"
                  : "border-primary/50 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary hover:shadow-xl hover:shadow-primary/20"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {item.popular && (
                <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-bold animate-glow-pulse">
                  ВЫГОДНО
                </div>
              )}

              <div className="flex flex-col items-center text-center space-y-6">
                <div className={`w-24 h-24 bg-gradient-to-br ${item.gradient} rounded-3xl flex items-center justify-center shadow-2xl animate-float`}>
                  <Icon name={item.icon} className="text-white" size={48} />
                </div>

                <div>
                  <h3 className="text-3xl font-bold mb-2 text-foreground">{item.volume}</h3>
                  <div className="text-5xl md:text-6xl font-black text-gradient glow-gold">
                    {item.price}
                  </div>
                </div>

                <Button 
                  className={`w-full py-6 text-lg font-bold bg-gradient-to-r ${item.gradient} hover:shadow-2xl transition-all duration-300`}
                >
                  Заправиться
                  <Icon name="ArrowRight" className="ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-card to-background rounded-3xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 text-center border border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl mb-4">
                <Icon name={feature.icon} className="text-primary" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-1 text-gradient">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <footer className="container mx-auto px-4 py-12 text-center border-t border-border/50 mt-20">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <Icon name="Fuel" className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold text-gradient">ЗАПРАВКА БЕНЗИНА</span>
        </div>
        <p className="text-muted-foreground">© 2024 Все права защищены</p>
      </footer>
    </div>
  );
};

export default Index;