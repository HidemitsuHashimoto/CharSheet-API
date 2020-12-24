export interface AttributeToCreate {
    id: number;
    attributeId: number;
    value: number;
}

export interface AttributeResponse {
    success: boolean;
    message: string;
    sample: string;
}