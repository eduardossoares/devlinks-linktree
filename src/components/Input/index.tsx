import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export function Input(props: InputProps) {
    return (
        <input className="w-[100%] p-2 rounded-sm outline-none border-none" {...props} />
    )
} 