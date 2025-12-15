import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import LoginForm from "@/components/LoginForm";
import AdminPanel from "@/components/AdminPanel";
import PurchaseModal from "@/components/PurchaseModal";
import { getCurrentUser, logout, type User } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedFuel, setSelectedFuel] = useState<{ name: string; price: number } | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLoginSuccess = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const handleBalanceUpdate = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  };

  const handlePurchaseClick = (fuelName: string, price: string) => {
    const numPrice = parseFloat(price.replace(/[^\d.]/g, ""));
    setSelectedFuel({ name: fuelName, price: numPrice });
    setShowPurchaseModal(true);
  };

  const whatsappNumber = "+79011506959";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  if (!user) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }
  const fuelTypes = [
    {
      name: "АИ-92",
      price1L: "50 ₽",
      price50L: "2 450 ₽",
      icon: "Droplet",
      gradient: "from-green-600 to-emerald-500",
      desc: "Базовый бензин",
    },
    {
      name: "АИ-95",
      price1L: "54 ₽",
      price50L: "2 650 ₽",
      icon: "Fuel",
      gradient: "from-blue-600 to-cyan-500",
      desc: "Стандарт качества",
      popular: true,
    },
    {
      name: "АИ-98",
      price1L: "62 ₽",
      price50L: "3 050 ₽",
      icon: "Flame",
      gradient: "from-red-600 to-orange-500",
      desc: "Премиум класс",
    },
    {
      name: "ДТ",
      price1L: "56 ₽",
      price50L: "2 750 ₽",
      icon: "Truck",
      gradient: "from-yellow-600 to-amber-500",
      desc: "Дизельное топливо",
    },
  ];

  const stations = [
    {
      name: "АЗС №1 Центральная",
      address: "ул. Ленина, 45",
      hours: "Круглосуточно",
      services: ["Мойка", "Кафе", "Магазин"],
    },
    {
      name: "АЗС №2 Южная",
      address: "Южное шоссе, 12",
      hours: "06:00 - 23:00",
      services: ["Мойка", "Шиномонтаж"],
    },
    {
      name: "АЗС №3 Северная",
      address: "Северный проспект, 78",
      hours: "Круглосуточно",
      services: ["Кафе", "Магазин", "Банкомат"],
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
    <>
      <Toaster />
      
      {showAdminPanel && (
        <AdminPanel
          onClose={() => setShowAdminPanel(false)}
          onBalanceUpdate={handleBalanceUpdate}
        />
      )}

      {showPurchaseModal && selectedFuel && (
        <PurchaseModal
          fuelName={selectedFuel.name}
          price={selectedFuel.price}
          onClose={() => setShowPurchaseModal(false)}
          onBalanceUpdate={handleBalanceUpdate}
        />
      )}

      <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
        <nav className="container mx-auto px-4 py-6 flex items-center justify-between border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Icon name="Fuel" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black text-gradient">RGB</span>
          </div>

          <div className="flex items-center gap-4">
            <Card className="px-4 py-2 flex items-center gap-3 border-border bg-card/50">
              <Icon name="Wallet" className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Баланс</p>
                <p className="font-bold">{user.balance.toFixed(2)} ₽</p>
              </div>
            </Card>

            {user.isAdmin && (
              <Button
                onClick={() => setShowAdminPanel(true)}
                className="bg-gradient-to-r from-primary to-red-700 hover:shadow-xl"
              >
                <Icon name="Shield" className="mr-2" size={18} />
                Админ
              </Button>
            )}

            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" className="mr-2" size={18} />
              Выход
            </Button>
          </div>
        </nav>

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
              <h1 className="text-7xl md:text-8xl font-black mb-4">
                <span className="text-gradient glow-red">RGB</span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-muted-foreground">
                Премиум АЗС
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
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-secondary text-secondary hover:bg-secondary/10 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300"
                onClick={() => window.open(whatsappLink, "_blank")}
              >
                <Icon name="MessageCircle" className="mr-2" />
                Связаться в WhatsApp
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
          <p className="text-muted-foreground text-lg">Актуальные цены на все виды топлива</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {fuelTypes.map((fuel, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden p-6 border-2 transition-all duration-500 hover:scale-105 animate-scale-in ${
                fuel.popular
                  ? "border-secondary bg-gradient-to-br from-secondary/10 to-transparent shadow-2xl shadow-secondary/20"
                  : "border-border bg-gradient-to-br from-card to-transparent hover:border-primary hover:shadow-xl hover:shadow-primary/10"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {fuel.popular && (
                <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold">
                  ХИТ
                </div>
              )}

              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${fuel.gradient} rounded-2xl flex items-center justify-center shadow-lg animate-float`}>
                  <Icon name={fuel.icon} className="text-white" size={32} />
                </div>

                <div>
                  <h3 className="text-2xl font-black mb-1 text-gradient">{fuel.name}</h3>
                  <p className="text-xs text-muted-foreground">{fuel.desc}</p>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">1 литр</span>
                    <span className="text-xl font-bold text-foreground">{fuel.price1L}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">50 литров</span>
                    <span className="text-2xl font-black text-gradient glow-gold">{fuel.price50L}</span>
                  </div>
                </div>

                <Button 
                  className={`w-full py-3 text-sm font-bold bg-gradient-to-r ${fuel.gradient} hover:shadow-2xl transition-all duration-300`}
                  onClick={() => handlePurchaseClick(`${fuel.name} - 50 литров`, fuel.price50L)}
                >
                  Заправиться
                  <Icon name="ArrowRight" className="ml-2" size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Наши АЗС
          </h2>
          <p className="text-muted-foreground text-lg">Выберите ближайшую станцию</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {stations.map((station, index) => (
            <Card
              key={index}
              className="p-6 border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 text-gradient">{station.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{station.address}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span>{station.hours}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {station.services.map((service, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-red-700 hover:shadow-xl transition-all duration-300">
                <Icon name="Navigation" className="mr-2" size={16} />
                Построить маршрут
              </Button>
            </Card>
          ))}
        </div>

        <Card className="p-8 border-2 border-border bg-gradient-to-br from-card to-background max-w-7xl mx-auto animate-scale-in">
          <div className="aspect-video w-full bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto animate-float">
                <Icon name="Map" className="text-white" size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gradient mb-2">Интерактивная карта</h3>
                <p className="text-muted-foreground">Все наши АЗС на карте города</p>
              </div>
            </div>
          </div>
        </Card>
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
          <span className="text-xl font-bold text-gradient">RGB</span>
        </div>
        <p className="text-muted-foreground mb-4">© 2024 Все права защищены</p>
        <Button
          variant="outline"
          className="border-secondary text-secondary hover:bg-secondary/10"
          onClick={() => window.open(whatsappLink, "_blank")}
        >
          <Icon name="MessageCircle" className="mr-2" size={18} />
          Связаться в WhatsApp
        </Button>
      </footer>
    </div>
    </>
  );
};

export default Index;