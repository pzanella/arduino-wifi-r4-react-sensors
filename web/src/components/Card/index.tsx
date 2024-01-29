import { FC } from "react";

interface ICard {
    title: string;
    value: string | number;
    unitOfMeasure?: string;
}

const Card: FC<ICard> = ({ title, value, unitOfMeasure }) => {
    const progressValue: number = 100 - +value;

    return (
        <div className="flex flex-col justify-center items-center text-center text-neutral-400 border border-gray-400 rounded-lg w-3/4 p-4">
            <h2 className="text-xl">{title}</h2>
            <div className="relative h-40 w-40 p-2">
                <svg className="h-full w-full" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="none" className="stroke-current text-gray-700" stroke-width="2"></circle>
                    <g className="origin-center -rotate-90 transform">
                        <circle cx="20" cy="20" r="18" fill="none" className="stroke-current" stroke-width="2" stroke-dasharray="100" stroke-dashoffset={progressValue}></circle>
                    </g>
                </svg>
                <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <span className="text-center text-2xl font-bold text-gray-400">
                        {value}
                        {unitOfMeasure ? unitOfMeasure : null}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card;
