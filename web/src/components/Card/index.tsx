import { FC } from "react";

interface ICard {
    title: string;
    value?: string | number;
    unitOfMeasure?: string;
}

const Card: FC<ICard> = ({ title, value = 0, unitOfMeasure }) => {
    const size: number = 100;
    const strokeWidth: number = 4;
    const center = size / 2;
    const progressValue: number = +value;
    const radius: number = center - strokeWidth;
    const strokeDashArray: number = 2 * Math.PI * radius;
    const strokeDashoffset: number = strokeDashArray * ((100 - progressValue) / 100);

    return (
        <div className="flex flex-col justify-center items-center text-center text-neutral-400 border border-gray-400 rounded-lg w-3/4 p-4">
            <h2 className="text-xl">{title}</h2>

            <div className="relative h-50 w-50 p-2">
                <svg className="h-full w-full" width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
                    <circle cx={center} cy={center} r={radius} fill="none" className="stroke-current text-gray-700" strokeWidth={strokeWidth}></circle>
                    <g className="origin-center -rotate-90 transform">
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            fill="none"
                            className="stroke-current transition-all duration-1000"
                            strokeWidth={strokeWidth}
                            strokeDasharray={strokeDashArray}
                            strokeDashoffset={strokeDashoffset}
                        ></circle>
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
