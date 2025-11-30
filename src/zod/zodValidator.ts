/* eslint-disable @typescript-eslint/no-explicit-any */
export const zodValidator = (payload: any, schema: any) => {
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.errors[0].message,
            field: parsed.error.errors[0].path[0]
        };
    }
    return { success: true, data: parsed.data };
};
