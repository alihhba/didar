import React, {useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {Command, CommandEmpty, CommandGroup, CommandItem, CommandList,} from "./ui/Command";
import {Popover, PopoverContent, PopoverTrigger,} from "./ui/Popover";
import {useController, useFormContext} from "react-hook-form";
import {useFormFieldContext} from "@/components/form/FormField.jsx";

export function FormSelect({
                               options = [],
                               placeholder = "Select an option...",
                               triggerClassName,
                               contentClassName,
                               optionClassName,
                               filter,
                               search,
                               disabled,
                               children,
                               triggerChildren = ()=>{},
                               ...props
                           }) {
    const {control} = useFormContext();
    const {name , error} = useFormFieldContext();
    const [triggerWidth, setTriggerWidth] = useState(null);
    const triggerRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const {
        field: {value, onChange},
    } = useController({name, control});

    useEffect(() => {
        if (triggerRef.current) {
            setTriggerWidth(triggerRef.current.offsetWidth);
        }
    }, [triggerRef, options]);


    if (!name) {
        console.error("FormSelect requires a 'name' prop.");
        return null;
    }


    const filteredData = options
        .filter(
            (item) =>
                (item.label?.toString().toLowerCase() || "").includes(searchValue.toLowerCase()) ||
                (item.slug?.toString().toLowerCase() || "").includes(searchValue.toLowerCase())
        )
        .filter((item) => (filter ? filter(item) : true));

    const optionValueObject = options?.find((item) => item?.id === value);

    return (
        <Popover open={open} onOpenChange={disabled ? null : setOpen} {...props}>
            <PopoverTrigger asChild ref={triggerRef}>
                <div  className={'relative w-full flex items-center justify-center'}>
                    <div
                        className={cn(
                            "focus:border-primary-500 focus:bg-green-500/10 bg-greyScale-50 dark:bg-dark-dark2 dark:text-white-500 drop-shadow-sm rounded-2xl px-5 h-14 items-center flex my-auto placeholder:text-greyScale-500 placeholder:text-md  font-medium placeholder:font-normal w-full ", error ? "border-red-600" : '',
                            triggerClassName, value ? '' : 'text-greyScale-500'
                        )}
                    >
                        {value
                            ?  React.isValidElement(triggerChildren(optionValueObject))  ? triggerChildren(optionValueObject) :  options.find((option) => option.value === value)?.label
                            : placeholder}
                    </div>

                    {/*<div className={cn('absolute flex items-center justify-center w-fit bottom-5 end-5' )}>*/}
                    {/*    <Icon icon={Icons.Arrow_Down_2_Bold}*/}
                    {/*          className={cn('text-greyScale-500 w-5 h-5', value && 'text-black-500 dark:text-white-500')}/>*/}
                    {/*</div>*/}
                </div>
            </PopoverTrigger>
            <PopoverContent
                style={{width: `${triggerWidth}px`}}
                className={cn("h-full bg-white-500 dark:bg-dark-dark2 dark:text-white-500 p-0 dark:border-dark-dark3", contentClassName)}>
                <Command>
                {search ? (

                            <input
                                placeholder="Search..."
                                value={searchValue}
                                className={"flex h-11 ps-3  w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:border-none"}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        )
                        : null}
                    <CommandList className={''}>
                        <CommandEmpty>No options found.</CommandEmpty>
                        <CommandGroup>
                            {filteredData.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={() => {
                                        onChange(item.value);
                                        setOpen(false);
                                    }}
                                    className={cn(optionClassName)}
                                >
                                    {children ? children(item) : item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
