import { useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { ArrowIcon } from "./assets/icons/ArrowIcon";
import axios from "axios";

function App() {
    const [selected, setSelected] = useState("SK");
    const [selectedSecond, setSelectedSecond] = useState("UA");
    const [value, setValue] = useState(1 );
    const [currencyEUR, setCurrencyEUR] = useState(0);
    const [resultValue, setResultValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(event.currentTarget.value);

        setValue(inputValue);
        setResultValue(inputValue * currencyEUR);
    };



    async function getCurrency() {
        try {
            const { data } = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
            const valueEUR = data.find((el: { r030: number; }) => el.r030 === 978);

            setCurrencyEUR(valueEUR.rate);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getCurrency()
        setResultValue(value * currencyEUR);
    }, [value, currencyEUR]);


    return (
        <div className="min-h-screen flex justify-center items-center h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500">
            <div className="bg-white justify-center dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl w-3/5 h-auto">
                <div className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">Currency Converter</div>
                <div className="w-fit mb-6 text-lg font-normal my-8 mx-auto text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    <h2>Choose currency</h2>
                    <div className="w-auto flex justify-center flex-row mt-3">
                        <div className="mr-5">
                            <ReactFlagsSelect
                                selected={selected}
                                onSelect={(code) => setSelected(code)}
                                countries={["US", "GB", "FR", "DE", "IT", "SK", "UA"]}
                                customLabels={{ US: "EN-US", GB: "EN-GB", FR: "FR", DE: "DE", IT: "IT", SK: "EUR", UA: "UAH" }}
                                placeholder="Select currency"
                            />
                            <div className="mb-6">
                                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Input value</label>
                                <input
                                    type="text"
                                    id="default-input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={value}
                                    onChange={(e) => handleChange(e)}
                                />

                            </div>
                        </div>
                        <div className="mr-5 mt-2">
                            <ArrowIcon />
                        </div>
                        <div className="">
                            <ReactFlagsSelect
                                selected={selectedSecond}
                                onSelect={(code) => setSelectedSecond(code)}
                                countries={["US", "GB", "FR", "DE", "IT", "UA"]}
                                customLabels={{ US: "EN-US", GB: "EN-GB", FR: "FR", DE: "DE", IT: "IT", UA: "UAH" }}
                                placeholder="Select currency"
                            />
                            <div className="mt-8">
                                <a className="text-2xl font-bold underline decoration-pink-500">{resultValue.toFixed(0)}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
