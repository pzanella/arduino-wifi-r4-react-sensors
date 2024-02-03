export type SensorsType = {
    temperature: ISensors;
    humidity: ISensors;
};

export interface ISensors {
    value: number;
    unitOfMeasure: string;
};