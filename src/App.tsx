import React, { useEffect, useState } from "react";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [isSorting, setSorting] = useState(false);
  const [datasource, setDatasource] = useState([]);

  const worker = new Worker(new URL("./app.worker.ts", import.meta.url));

  const sortWithWorker = () => {
    if (window.Worker) {
      setLoading(true);

      worker.postMessage([datasource, isSorting]);

      worker.addEventListener("message", (event) => {
        setDatasource(event.data);
        setSorting((prev) => !prev);
        setLoading(false);
      });
    } else {
      console.log("Браузер не поддерживает Workers");
    }
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((json) => {
        setDatasource(json);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <button onClick={sortWithWorker}>Сортировка с воркером</button>
      <div className="wrap">
        {isLoading ? (
          <div>Загрузка ...</div>
        ) : (
          datasource.slice(0, 10).map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <img src={item.thumbnailUrl} alt={item.title} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
