import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { getCurrentUser, updateUserBalance } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

interface PurchaseModalProps {
  fuelName: string;
  price: number;
  onClose: () => void;
  onBalanceUpdate: () => void;
}

const PurchaseModal = ({ fuelName, price, onClose, onBalanceUpdate }: PurchaseModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile" | "balance" | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();
  const user = getCurrentUser();

  const handlePurchase = () => {
    if (!paymentMethod) {
      toast({
        title: "Выберите способ оплаты",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "balance") {
      if (!user || user.balance < price) {
        toast({
          title: "Недостаточно средств",
          description: "Пополните баланс для совершения покупки",
          variant: "destructive",
        });
        return;
      }
      updateUserBalance(user.balance - price);
      onBalanceUpdate();
    }

    toast({
      title: "Покупка успешна! 🎉",
      description: `Вы приобрели ${fuelName} за ${price} ₽`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-lg p-8 border-2 border-border bg-card animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gradient">Оформление покупки</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <Card className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 mb-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Товар</p>
              <p className="font-bold text-lg">{fuelName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Сумма</p>
              <p className="text-2xl font-black text-gradient">{price} ₽</p>
            </div>
          </div>
        </Card>

        {user && (
          <Card className="p-4 mb-6 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Wallet" className="text-primary" size={20} />
                <span className="text-sm text-muted-foreground">Ваш баланс</span>
              </div>
              <span className="text-lg font-bold">{user.balance.toFixed(2)} ₽</span>
            </div>
          </Card>
        )}

        <div className="space-y-4 mb-6">
          <h3 className="font-bold">Способ оплаты</h3>

          <Button
            variant={paymentMethod === "balance" ? "default" : "outline"}
            className={`w-full py-6 justify-start ${
              paymentMethod === "balance" ? "bg-gradient-to-r from-primary to-red-700" : ""
            }`}
            onClick={() => setPaymentMethod("balance")}
          >
            <Icon name="Wallet" className="mr-3" size={24} />
            <div className="text-left">
              <p className="font-bold">Пополнение счета</p>
              <p className="text-xs opacity-80">Оплата с вашего баланса</p>
            </div>
          </Button>

          <Button
            variant={paymentMethod === "card" ? "default" : "outline"}
            className={`w-full py-6 justify-start ${
              paymentMethod === "card" ? "bg-gradient-to-r from-primary to-red-700" : ""
            }`}
            onClick={() => setPaymentMethod("card")}
          >
            <Icon name="CreditCard" className="mr-3" size={24} />
            <div className="text-left">
              <p className="font-bold">Банковская карта</p>
              <p className="text-xs opacity-80">Visa, MasterCard, МИР</p>
            </div>
          </Button>

          {paymentMethod === "card" && (
            <div className="ml-4 space-y-2 animate-fade-in">
              <Label htmlFor="cardNumber">Номер карты</Label>
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="0000 0000 0000 0000"
                className="bg-background"
                maxLength={19}
              />
            </div>
          )}

          <Button
            variant={paymentMethod === "mobile" ? "default" : "outline"}
            className={`w-full py-6 justify-start ${
              paymentMethod === "mobile" ? "bg-gradient-to-r from-primary to-red-700" : ""
            }`}
            onClick={() => setPaymentMethod("mobile")}
          >
            <Icon name="Smartphone" className="mr-3" size={24} />
            <div className="text-left">
              <p className="font-bold">Мобильный платеж</p>
              <p className="text-xs opacity-80">Оплата через телефон</p>
            </div>
          </Button>

          {paymentMethod === "mobile" && (
            <div className="ml-4 space-y-2 animate-fade-in">
              <Label htmlFor="phoneNumber">Номер телефона</Label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+7 900 000 00 00"
                className="bg-background"
              />
            </div>
          )}
        </div>

        <Button
          onClick={handlePurchase}
          disabled={!paymentMethod}
          className="w-full py-6 text-lg font-bold bg-gradient-to-r from-secondary to-yellow-600 text-secondary-foreground hover:shadow-2xl transition-all duration-300"
        >
          <Icon name="ShoppingCart" className="mr-2" />
          Купить за {price} ₽
        </Button>
      </Card>
    </div>
  );
};

export default PurchaseModal;
