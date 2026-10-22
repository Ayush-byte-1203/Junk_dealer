import * as React from "react"
import { cn } from "../../lib/utils"

const Sheet = ({ children, open, onOpenChange }) => {
    if (!open) return null
    return (
        <div className="fixed inset-0 z-50 bg-black/80" onClick={() => onOpenChange(false)}>
            {children}
        </div>
    )
}

const SheetTrigger = ({ asChild, children, ...props }) => {
    return children
}

const SheetContent = ({ side = "right", className, children, ...props }) => (
    <div
        className={cn(
            "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
            className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
    >
        {children}
    </div>
)

export { Sheet, SheetTrigger, SheetContent }
