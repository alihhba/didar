import {ReactSVG} from 'react-svg';
import {cn} from '@/lib/utils/index.jsx';


const Icon = ({
                  className,
                  icon,
                  width = "",
                  height = "",
                  hasDot = false,
                  ...props
              }) => {
    return (
        <div
            {...props}
            className={cn("w-4 h-4 flex items-center justify-center relative", className)}
        >
            {/*{hasDot ? (*/}
            {/*    <div className={'absolute z-10  -top-[1px] end-[1px] w-full h-full'}>*/}
            {/*        <Dot className={'w-1.5 h-1.5 min-w-1.5 min-h-1.5 bg-red-500'}/>*/}
            {/*    </div>*/}
            {/*) : null}*/}

            <ReactSVG
                src={icon}
                beforeInjection={(svg) => {
                    svg.setAttribute("width", width);
                    svg.setAttribute("height", height);
                }}
            />
        </div>
    );
};

export default Icon;
