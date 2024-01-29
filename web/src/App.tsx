import Card from "./components/Card";

function App() {
    const list = [{
        title: "Temperature",
        value: 28.0,
        unitOfMeasure: "°C",
    }, {
        title: "Humidity",
        value: 70,
        unitOfMeasure: "%",
    }];

    return (
        <div className="flex flex-col min-h-screen bg-zinc-900 p-8">
            <main className="flex flex-col flex-grow justify-center items-center gap-y-10">
                <Card title={list[0].title} value={list[0].value} unitOfMeasure={list[0].unitOfMeasure} />
                <Card title={list[1].title} value={list[1].value} unitOfMeasure={list[1].unitOfMeasure} />
            </main>
            <footer>
                <div className="pt-8 text-center text-neutral-600">
                    © 2024 Copyright&nbsp;
                    <a className="text-neutral-400" href="https://github.com/pzanella">Pietro Zanella</a>
                </div>
            </footer>
        </div>
    );
}

export default App;
