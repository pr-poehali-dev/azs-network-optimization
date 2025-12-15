import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { addToBalance, getCurrentUser } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

interface AdminPanelProps {
  onClose: () => void;
  onBalanceUpdate: () => void;
}

const AdminPanel = ({ onClose, onBalanceUpdate }: AdminPanelProps) => {
  const [amount, setAmount] = useState("");
  const { toast } = useToast();
  const user = getCurrentUser();

  const handleAddMoney = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      toast({
        title: "Ошибка",
        description: "Введите корректную сумму",
        variant: "destructive",
      });
      return;
    }

    addToBalance(value);
    onBalanceUpdate();
    toast({
      title: "Успешно",
      description: `Баланс пополнен на ${value} ₽`,
    });
    setAmount("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-2xl p-8 border-2 border-primary bg-card animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Icon name="Shield" className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gradient">Админ-панель</h2>
              <p className="text-sm text-muted-foreground">Управление системой</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Icon name="User" className="text-primary" size={20} />
                Администратор
              </h3>
              <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-bold rounded-full">
                ADMIN
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Логин</p>
                <p className="font-bold">{user?.username}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Текущий баланс</p>
                <p className="text-2xl font-black text-gradient">{user?.balance.toFixed(2)} ₽</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-border">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Icon name="Wallet" className="text-secondary" size={20} />
              Выдать деньги
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Сумма пополнения (₽)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Введите сумму"
                  className="bg-background border-border mt-2"
                  min="0"
                  step="0.01"
                />
              </div>
              <Button
                onClick={handleAddMoney}
                className="w-full py-4 bg-gradient-to-r from-secondary to-yellow-600 text-secondary-foreground hover:shadow-xl"
              >
                <Icon name="Plus" className="mr-2" />
                Пополнить баланс
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 text-center border border-border">
              <Icon name="BarChart3" className="mx-auto mb-2 text-primary" size={32} />
              <p className="text-sm text-muted-foreground mb-1">Всего транзакций</p>
              <p className="text-xl font-bold">0</p>
            </Card>
            <Card className="p-4 text-center border border-border">
              <Icon name="Users" className="mx-auto mb-2 text-secondary" size={32} />
              <p className="text-sm text-muted-foreground mb-1">Активных сессий</p>
              <p className="text-xl font-bold">1</p>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminPanel;
