import { getDatabase, onValue, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { HumidityCard } from "./components/HumidityCard";
import { TemperatureCard } from "./components/TemperatureCard";
import { DataType } from "./model";

const App = () => {
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const [data, setData] = useState<DataType>();

    useEffect(() => {
        const dbRef = query(ref(db, "/"));

        return onValue(
            dbRef,
            (snapshot) => {
                const values: DataType = snapshot.val();
                setData(values);
            },
            (error) => {
                console.error(`An error occured! ${error}`);
            },
        );
    }, [db]);

    return (
        <div className="flex flex-col min-h-screen bg-zinc-900 p-8">
            <main className="flex flex-col flex-grow justify-center items-center gap-y-10">
                <TemperatureCard value={Number(data?.sensors.temperature.value)} unitOfMeasure={String(data?.sensors.temperature.unitOfMeasure)} />
                <HumidityCard value={Number(data?.sensors.humidity.value)} unitOfMeasure={String(data?.sensors.humidity.unitOfMeasure)} />
            </main>
            <footer>
                <div className="pt-8 text-center text-neutral-600">
                    © 2024 Copyright&nbsp;
                    <a className="text-neutral-400" href="https://github.com/pzanella">
                        Pietro Zanella
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default App;
