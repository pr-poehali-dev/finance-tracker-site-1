import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
  amount: number;
  budget: number;
  color: string;
  icon: string;
}

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  icon: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [categories] = useState<Category[]>([
    { id: "1", name: "Продукты", type: "expense", amount: 15420, budget: 20000, color: "#0EA5E9", icon: "ShoppingCart" },
    { id: "2", name: "Транспорт", type: "expense", amount: 4800, budget: 8000, color: "#33C3F0", icon: "Car" },
    { id: "3", name: "Развлечения", type: "expense", amount: 6200, budget: 10000, color: "#D3E4FD", icon: "Gamepad2" },
    { id: "4", name: "Зарплата", type: "income", amount: 85000, budget: 85000, color: "#0EA5E9", icon: "Wallet" },
    { id: "5", name: "Фриланс", type: "income", amount: 12000, budget: 15000, color: "#33C3F0", icon: "Laptop" },
  ]);

  const [goals] = useState<Goal[]>([
    { id: "1", name: "Отпуск", target: 150000, current: 67500, deadline: "2025-07-01", icon: "Palmtree" },
    { id: "2", name: "Новый ноутбук", target: 120000, current: 48000, deadline: "2025-12-01", icon: "Laptop" },
    { id: "3", name: "Экстренный фонд", target: 300000, current: 180000, deadline: "2026-01-01", icon: "Shield" },
  ]);

  const totalIncome = categories.filter(c => c.type === "income").reduce((sum, c) => sum + c.amount, 0);
  const totalExpense = categories.filter(c => c.type === "expense").reduce((sum, c) => sum + c.amount, 0);
  const balance = totalIncome - totalExpense;

  const expenseCategories = categories.filter(c => c.type === "expense");
  const incomeCategories = categories.filter(c => c.type === "income");

  const suggestedBudget = Math.round(totalIncome * 0.7);
  const savings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-primary">Финансы</h1>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">Управление личным бюджетом</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-14">
            <TabsTrigger value="home" className="text-base">
              <Icon name="Home" size={20} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="categories" className="text-base">
              <Icon name="LayoutGrid" size={20} className="mr-2" />
              Категории
            </TabsTrigger>
            <TabsTrigger value="goals" className="text-base">
              <Icon name="Target" size={20} className="mr-2" />
              Цели
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover-scale">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon name="TrendingUp" size={16} />
                    Доходы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {totalIncome.toLocaleString('ru-RU')} ₽
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon name="TrendingDown" size={16} />
                    Расходы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">
                    {totalExpense.toLocaleString('ru-RU')} ₽
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon name="Wallet" size={16} />
                    Баланс
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${balance >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    {balance.toLocaleString('ru-RU')} ₽
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="animate-scale-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Sparkles" size={24} />
                      Автоматическое планирование
                    </CardTitle>
                    <CardDescription className="mt-2">
                      На основе вашей истории трат
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary">
                    AI-прогноз
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <Icon name="PiggyBank" size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Рекомендуемый бюджет на месяц</p>
                        <p className="text-sm text-muted-foreground">70% от доходов</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-primary">
                      {suggestedBudget.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                        <Icon name="TrendingUp" size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Ваши накопления в этом месяце</p>
                        <p className="text-sm text-muted-foreground">Норма сбережений: {savingsRate}%</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-foreground">
                      {savings.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>

                {savings < totalIncome * 0.2 && (
                  <div className="p-4 bg-accent rounded-lg border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium text-sm">Совет по оптимизации</p>
                        <p className="text-sm text-muted-foreground">
                          Попробуйте сократить расходы на развлечения на 20% — это добавит{' '}
                          {Math.round(expenseCategories.find(c => c.name === "Развлечения")?.amount! * 0.2).toLocaleString('ru-RU')} ₽ к накоплениям
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Расходы по категориям</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {expenseCategories.map((cat) => {
                    const percentage = (cat.amount / cat.budget) * 100;
                    return (
                      <div key={cat.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon name={cat.icon as any} size={16} style={{ color: cat.color }} />
                            <span className="font-medium">{cat.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {cat.amount.toLocaleString('ru-RU')} / {cat.budget.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Источники дохода</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {incomeCategories.map((cat) => {
                    const percentage = (cat.amount / totalIncome) * 100;
                    return (
                      <div key={cat.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon name={cat.icon as any} size={16} style={{ color: cat.color }} />
                            <span className="font-medium">{cat.name}</span>
                          </div>
                          <span className="text-sm font-medium text-primary">
                            {cat.amount.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {percentage.toFixed(0)}% от общего дохода
                        </p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Управление категориями</CardTitle>
                    <CardDescription>Добавляйте и редактируйте категории расходов и доходов</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Icon name="Plus" size={16} />
                        Добавить категорию
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Новая категория</DialogTitle>
                        <DialogDescription>Создайте категорию для учёта финансов</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Название</Label>
                          <Input id="name" placeholder="Например: Кафе и рестораны" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Тип</Label>
                          <Select defaultValue="expense">
                            <SelectTrigger id="type">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="expense">Расход</SelectItem>
                              <SelectItem value="income">Доход</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget">Бюджет (₽)</Label>
                          <Input id="budget" type="number" placeholder="10000" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Создать</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Icon name="TrendingDown" size={20} className="text-foreground" />
                      Расходы
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {expenseCategories.map((cat) => {
                        const percentage = (cat.amount / cat.budget) * 100;
                        const remaining = cat.budget - cat.amount;
                        return (
                          <Card key={cat.id} className="hover-scale">
                            <CardContent className="pt-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${cat.color}20` }}>
                                    <Icon name={cat.icon as any} size={24} style={{ color: cat.color }} />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold">{cat.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Осталось: {remaining.toLocaleString('ru-RU')} ₽
                                    </p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon">
                                  <Icon name="MoreVertical" size={16} />
                                </Button>
                              </div>
                              <div className="space-y-2">
                                <Progress value={percentage} className="h-2" />
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">{percentage.toFixed(0)}% использовано</span>
                                  <span className="font-medium">{cat.amount.toLocaleString('ru-RU')} / {cat.budget.toLocaleString('ru-RU')} ₽</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Icon name="TrendingUp" size={20} className="text-primary" />
                      Доходы
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {incomeCategories.map((cat) => {
                        const percentage = (cat.amount / cat.budget) * 100;
                        return (
                          <Card key={cat.id} className="hover-scale">
                            <CardContent className="pt-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${cat.color}20` }}>
                                    <Icon name={cat.icon as any} size={24} style={{ color: cat.color }} />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold">{cat.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      План: {cat.budget.toLocaleString('ru-RU')} ₽
                                    </p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon">
                                  <Icon name="MoreVertical" size={16} />
                                </Button>
                              </div>
                              <div className="space-y-2">
                                <Progress value={percentage} className="h-2" />
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">{percentage.toFixed(0)}% от плана</span>
                                  <span className="font-medium text-primary">{cat.amount.toLocaleString('ru-RU')} ₽</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Финансовые цели</CardTitle>
                    <CardDescription>Ставьте цели и отслеживайте прогресс</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Icon name="Plus" size={16} />
                        Добавить цель
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Новая финансовая цель</DialogTitle>
                        <DialogDescription>Определите цель и сумму для накопления</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="goal-name">Название цели</Label>
                          <Input id="goal-name" placeholder="Например: Новый автомобиль" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="target">Целевая сумма (₽)</Label>
                          <Input id="target" type="number" placeholder="500000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="deadline">Срок достижения</Label>
                          <Input id="deadline" type="date" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Создать цель</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {goals.map((goal) => {
                    const percentage = (goal.current / goal.target) * 100;
                    const remaining = goal.target - goal.current;
                    const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                    const monthlyRequired = remaining / Math.max(1, Math.ceil(daysLeft / 30));

                    return (
                      <Card key={goal.id} className="hover-scale">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                                <Icon name={goal.icon as any} size={28} className="text-primary" />
                              </div>
                              <div>
                                <h4 className="font-bold text-lg">{goal.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(goal.deadline).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Icon name="MoreVertical" size={16} />
                            </Button>
                          </div>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Прогресс</span>
                                <span className="font-semibold">{percentage.toFixed(0)}%</span>
                              </div>
                              <Progress value={percentage} className="h-3" />
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{goal.current.toLocaleString('ru-RU')} ₽</span>
                                <span className="font-medium">{goal.target.toLocaleString('ru-RU')} ₽</span>
                              </div>
                            </div>

                            <div className="pt-4 border-t space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground flex items-center gap-2">
                                  <Icon name="Calendar" size={14} />
                                  Осталось дней
                                </span>
                                <span className="font-medium">{daysLeft}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground flex items-center gap-2">
                                  <Icon name="TrendingUp" size={14} />
                                  Нужно откладывать
                                </span>
                                <span className="font-medium text-primary">{monthlyRequired.toLocaleString('ru-RU')} ₽/мес</span>
                              </div>
                            </div>

                            <Button className="w-full gap-2" variant="outline">
                              <Icon name="Plus" size={16} />
                              Пополнить
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Lightbulb" size={24} className="text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-lg">Рекомендация по достижению целей</h4>
                    <p className="text-muted-foreground">
                      При текущей норме сбережений ({savingsRate}%) вы сможете достичь цели "{goals[0].name}" 
                      на {Math.round((savings * 12) / goals[0].target * 100)}% раньше запланированного срока. 
                      Продолжайте в том же духе!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;