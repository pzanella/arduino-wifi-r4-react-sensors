import { FC, Fragment } from "react";

import cc from "classcat";
import { useGauge } from "use-gauge";

interface TemperatureCard {
    value: number;
    unitOfMeasure: string;
}

export const TemperatureCard: FC<TemperatureCard> = ({ value, unitOfMeasure }) => {
    const gauge = useGauge({
        domain: [-40, 80],
        startAngle: 90,
        endAngle: 270,
        numTicks: 40,
        diameter: 240,
    });

    const needle = gauge.getNeedleProps({
        value,
        baseRadius: 8,
        tipRadius: 1,
    });

    return (
        <div className="flex flex-col justify-center items-center text-center text-neutral-400 border border-gray-400 rounded-lg p-4">
            <h2 className="text-xl pb-4">Temperature</h2>

            <svg className="w-full overflow-visible p-2" {...gauge.getSVGProps()}>
                <g id="ticks">
                    {gauge.ticks.map((angle) => {
                        const asValue = gauge.angleToValue(angle);
                        const showText = asValue % 8 === 0;

                        return (
                            <Fragment key={`tick-group-${angle}`}>
                                <line
                                    className={cc([
                                        {
                                            "stroke-sky-400": asValue < 0,
                                            "stroke-white": asValue >= 0 && asValue <= 30,
                                            "stroke-red-400": asValue >= 30,
                                        },
                                    ])}
                                    strokeWidth={4}
                                    {...gauge.getTickProps({
                                        angle,
                                        length: 12,
                                    })}
                                />
                                {showText && (
                                    <text className="text-xl fill-gray-400 font-medium" {...gauge.getLabelProps({ angle, offset: 24 })}>
                                        {asValue}
                                    </text>
                                )}
                            </Fragment>
                        );
                    })}
                </g>
                <g id="needle">
                    <circle className="fill-gray-300" cx={String(needle.base.cx)} cy={String(needle.base.cy)} r={String(12)} />
                    <circle className="fill-gray-700" cx={String(needle.base.cx)} cy={String(needle.base.cy)} r={String(needle.base.r)} />
                    {!isNaN(needle.tip.cx) && !isNaN(needle.tip.cy) && <circle className="fill-gray-700" cx={String(needle.tip.cx)} cy={String(needle.tip.cy)} r={String(needle.tip.r)} />}
                    {!needle.points.includes("NaN") && <polyline className="fill-gray-700" points={needle.points} />}
                    <circle className="fill-white" cx={String(needle.base.cx)} cy={String(needle.base.cy)} r={String(4)} />
                </g>
            </svg>

            <span className="text-center text-3xl font-bold text-gray-400 pt-4">
                {value} {unitOfMeasure}
            </span>
        </div>
    );
};
