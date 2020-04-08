import React, { FC, useState, useMemo } from 'react'
import useWindowSize from '../hooks/useWindowSize'
import CurrentScreenIcon from './CurrentScreenIcon';

interface Props {
    breakpoints?: Record<string, string>,
    startingPosition?: string,
    colorScheme?: string
}

const Breaky: FC<Props> = ({ breakpoints, startingPosition, colorScheme }) => {
    const { width } = useWindowSize();
    const [expanded, setExpanded] = useState<boolean>(false);

    /**
     * Convert the breakpoints to integers
     * example: 1024px => 1024
     */
    const mappedBreakpoints = useMemo(() => {
        let mappedScreens = {}
        Object.keys(breakpoints!).forEach(
            key => {
                mappedScreens = {
                    ...mappedScreens,
                    [key]: parseInt(breakpoints![key as keyof typeof breakpoints])
                };
            }
        )
        return mappedScreens
    }, [breakpoints]);

    /**
     * Sort mapped breakpoints based on its values
     */
    const sortedBreakpoints = useMemo(() => {
        return Object.keys(mappedBreakpoints).sort((a, b) => {
            if (mappedBreakpoints[a as keyof typeof mappedBreakpoints] < mappedBreakpoints[b as keyof typeof mappedBreakpoints]) {
                return -1
            }
            if (mappedBreakpoints[a as keyof typeof mappedBreakpoints] > mappedBreakpoints[b as keyof typeof mappedBreakpoints]) {
                return 1
            }
            return 0
        })
    }, [mappedBreakpoints])

    /**
     * Get the index of the current breakpoint based on the screen width
     */
    const foundBreakpoint = useMemo(() => {
        return sortedBreakpoints.findIndex(
            (key) => mappedBreakpoints[key as keyof typeof mappedBreakpoints] > width!
        )
    }, [sortedBreakpoints, mappedBreakpoints, width])

    /**
     * Evaluate the current breakpoint based on the
     * browser screen width
     */
    const currentBreakpoint = useMemo(() => {
        if (foundBreakpoint === 0) {
            return `< ${breakpoints![sortedBreakpoints[0] as keyof typeof breakpoints]}`
        }
        if (foundBreakpoint === -1) {
            return sortedBreakpoints[sortedBreakpoints.length - 1]
        }
        return sortedBreakpoints[foundBreakpoint - 1]
    }, [breakpoints, foundBreakpoint, sortedBreakpoints])

    /**
     * Get the index of the current active breakpoint
     */
    const selected = useMemo(() => {
      return sortedBreakpoints.findIndex(
        (bp) => bp === currentBreakpoint
      )
    }, [sortedBreakpoints, currentBreakpoint])

    return (
        <div className={`color-scheme-${colorScheme}`}>
            <div 
                className="card text-xs fixed flex p-2 z-50 shadow cursor-pointer antialiased font-bold tracking-wide flex-col transition-all duration-300 right-0 bottom-0 z-10"
                style={{
                    inset: 'auto 32px 24px auto'
                }}
                onClick={() => setExpanded(!expanded)}
            >
                { expanded &&
                    <div
                        className="pt-1 pb-2 relative"
                    >
                        {/* Selected Panel */}
                        { foundBreakpoint !== 0 && 
                            <span
                                className="absolute h-selected w-full bg-selected rounded-lg ease-out transition-transform duration-200"
                                style={{
                                    transform: `translateY(calc(100% * ${selected}))`,
                                    height: '34px'
                                }}
                            />
                        }
                        {/* END Selected Panel */}
                        <ul className="relative">
                            {
                                Object.keys(breakpoints!).map((key, index) => 
                                    <li
                                        key={index}
                                        className="flex justify-between py-2 px-4"
                                        // :class="{ 'opacity-50': selected !== index }"
                                    >
                                        <span>{key}</span>
                                        <span className="ml-5">{breakpoints![key]}</span>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                }

                <div className={`current-breakpoint transition duration-300 text-center border-2 py-2 px-4 rounded-full flex items-center justify-around ${expanded ? 'border-transparent' : 'border-opacity-30'}`}>
                    <CurrentScreenIcon screenWidth={width || 0} />
                    {currentBreakpoint} - {width}px
                </div>
            </div>
        </div>
    )
}

Breaky.defaultProps = {
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
    },
    startingPosition: 'bottomRight',
    colorScheme: 'auto'
}

export default Breaky
