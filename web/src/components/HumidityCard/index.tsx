import { FC, Fragment } from "react";
import { MotionConfig, motion } from "framer-motion";

import { ISensors } from "../../model";
import { useGauge } from "use-gauge";

const Humidity: FC<ISensors> = ({ value, unitOfMeasure }) => {
    const gauge = useGauge({
        domain: [0, 100],
        startAngle: 90,
        endAngle: 270,
        numTicks: 21,
        diameter: 240,
    });

    const needle = gauge.getNeedleProps({
        value,
        baseRadius: 8,
        tipRadius: 1,
    });

    return (
        <div className="flex flex-col justify-center items-center text-center text-neutral-400 border border-gray-400 rounded-lg p-4 w-full sm:w-72">
            <h2 className="text-2xl pb-4">Humidity</h2>

            <svg className="w-full overflow-visible p-2" {...gauge.getSVGProps()}>
                <g id="ticks">
                    {gauge.ticks.map((angle) => {
                        const asValue = gauge.angleToValue(angle);
                        const showText = asValue % 20 === 0;

                        return (
                            <Fragment key={`tick-group-${angle}`}>
                                <line
                                    className="stroke-white"
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
                    <motion.line
                        className="stroke-gray-500"
                        strokeLinecap="round"
                        strokeWidth={2}
                        animate={{
                            x1: isNaN(needle.base.cx) ? 0 : needle.base.cx,
                            x2: isNaN(needle.tip.cx) ? 0 : needle.tip.cx,
                            y1: isNaN(needle.base.cy) ? 0 : needle.base.cy,
                            y2: isNaN(needle.tip.cy) ? 0 : needle.tip.cy,
                        }}
                    />
                    <circle className="fill-white" cx={String(needle.base.cx)} cy={String(needle.base.cy)} r={String(4)} />
                </g>
            </svg>

            {(!value || isNaN(value)) && <span className="text-center text-2xl font-bold text-gray-400 pt-4">-</span>}
            {(value || !isNaN(value)) && (
                <span className="text-center text-2xl font-bold text-gray-400 pt-4">
                    {value} {unitOfMeasure}
                </span>
            )}
        </div>
    );
};

export const HumidityCard: FC<ISensors> = ({ value, unitOfMeasure }) => {
    return (
        <MotionConfig transition={{ type: "tween", ease: "linear" }}>
            <Humidity value={value} unitOfMeasure={unitOfMeasure} />
        </MotionConfig>
    );
};
