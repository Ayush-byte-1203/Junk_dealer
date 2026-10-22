import * as React from "react"
import { cn } from "../../lib/utils"

const DropdownMenu = ({ children }) => {
    const [open, setOpen] = React.useState(false)
    const dropdownRef = React.useRef(null)

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        if (open) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open])

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    // Pass open state and setter to children
                    return React.cloneElement(child, { open, setOpen })
                }
                return child
            })}
        </div>
    )
}

const DropdownMenuTrigger = ({ asChild, children, setOpen, ...props }) => {
    const handleClick = (e) => {
        e.stopPropagation()
        setOpen(prev => !prev)
    }

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, { onClick: handleClick })
    }

    return (
        <button onClick={handleClick} {...props}>
            {children}
        </button>
    )
}

const DropdownMenuContent = ({ align = "center", className, children, open, setOpen, ...props }) => {
    if (!open) return null

    return (
        <div
            className={cn(
                "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
                align === "end" ? "right-0" : "left-0",
                "mt-2",
                className
            )}
            {...props}
        >
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    // Pass setOpen to menu items so they can close the menu
                    return React.cloneElement(child, { setOpen })
                }
                return child
            })}
        </div>
    )
}

const DropdownMenuItem = ({ className, children, onClick, setOpen, ...props }) => {
    const handleClick = (e) => {
        if (onClick) {
            onClick(e)
        }
        // Close dropdown after clicking an item
        if (setOpen) {
            setOpen(false)
        }
    }

    return (
        <div
            className={cn(
                "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                className
            )}
            onClick={handleClick}
            {...props}
        >
            {children}
        </div>
    )
}

const DropdownMenuSeparator = ({ className, ...props }) => (
    <div
        className={cn("-mx-1 my-1 h-px bg-slate-200", className)}
        {...props}
    />
)

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
}
