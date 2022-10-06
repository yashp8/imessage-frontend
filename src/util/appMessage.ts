import toast, {ToastPosition} from "react-hot-toast";

export class AppMessage {
    constructor(
        message: any,
        code: number,
        position: ToastPosition = "top-right",
        duration: number = 5000
    ) {
        if (code === 1) {
            toast.success(message, {
                position: position,
                duration: duration,
            });
        }
        if (code === 0) {
            toast.error(message, {
                position: position,
                duration: duration,
            });
        }
    }
}