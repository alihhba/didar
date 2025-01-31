import * as React from "react"

import {cn} from "@/lib/utils"
import {useFormFieldContext} from "@/components/form/FormField.jsx";

const Input = React.forwardRef(
    ({ className, type, ...props }, ref) => {
        const { error } = useFormFieldContext();

        return (
            <input
                type={type}
                className={cn(
                    "flex h-12 w-full rounded-md border border-black bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50  md:text-sm", error ? "border-red-600" : '',
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
