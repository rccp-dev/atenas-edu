import { error as toastError } from "@/lib/ui/toast";

export function requireValue(
    value: unknown,
    message: string,
): boolean {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        toastError(message);
        return false;
    }

    return true;
}