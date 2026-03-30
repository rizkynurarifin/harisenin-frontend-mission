import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ControlButton } from './ControlButton';

interface ControlDropdownProps {
    triggerIcon: React.ReactNode;
    children: React.ReactNode;
    width?: string;
    alignOffset?: number;
}

export const ControlDropdown = ({ triggerIcon, children, width = "w-[200px]", alignOffset = 0 }: ControlDropdownProps) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <ControlButton>
                    {triggerIcon}
                </ControlButton>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    side='top'
                    align="end"
                    sideOffset={20}
                    alignOffset={alignOffset}
                    className={`
                        ${width} bg-other-paper text-text-light-primary 
                        rounded-lg shadow-md z-50 overflow-hidden 
                        data-[state=open]:animate-in data-[state=open]:fade-in-0 
                        data-[state=open]:zoom-in-95 duration-100
                    `}
                >
                    {children}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};