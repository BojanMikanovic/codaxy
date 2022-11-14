import { computable } from 'cx/ui';
import { DataProxy, Icon } from 'cx/widgets';

export const KPI = ({ title, value, unit, icon, iconClass, change, className }) => (
   <cx>
      <div class="flex-col bg-zinc-100 border p-6 rounded justify-center " className={className}>
         <Icon name={icon} class="p-2 rounded-full w-10 h-10 justify-center" className={iconClass} />
         <div class="my-2">{title}</div>
         <div class="text-3xl font-bold leading-none" ws>
            <span text={value} /> <span class="text-sm" text={unit} />
         </div>
         <DataProxy data={{ $change: change }}>
            <div
               class="mt-2  flex items-center"
               className={{
                  'text-green-400': { expr: '{$change} >= 0' },
                  'text-red-600': { expr: '{$change} < 0' },
               }}
            >
               <Icon name={computable('$change', (change) => (change >= 0 ? 'arrow-up' : 'arrow-down'))} class="mr-2" />
               <span text-tpl="{$change:p;2}" />
            </div>
         </DataProxy>
      </div>
   </cx>
);
