import "./App.css";
import { Advertisement } from "./components/Advertisement";
import { Card } from "./components/Card";
import { CardList } from "./components/CardList";
import { CurrencyItem } from "./components/CurrencyItem";
import { CurrencyList } from "./components/CurrencyList";
import { NewsHeader } from "./components/NewsHeader";
import { NewsItem } from "./components/NewsItem";
import { NewsList } from "./components/NewsList";
import { Search } from "./components/Search";

function App() {
  return (
    <>
      <NewsHeader
        categories={["Сейчас в СМИ", "В Германии", "Рекомендуем"]}
        activeCategory="Сейчас в СМИ"
      />
      <NewsList>
        <NewsItem link="" title="Путин упростил получение номеров" />
        <NewsItem link="" title="В команде Зеленского раскрыли план реформ" />
      </NewsList>
      <CurrencyList>
        <CurrencyItem currency="USD" market="MOEX" rate={30} change="-5" />
        <CurrencyItem currency="EUR" market="MOEX" rate={40} change="+3" />
      </CurrencyList>
      <Search />
      <Advertisement />
      <CardList>
        <Card title="Погода" />
        <Card title="Телепрограмма" />
      </CardList>
    </>
  );
}

export default App;
