import * as React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

const Handle = SortableHandle(() => <span className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-move">
    <svg viewBox="0 0 512 512">
        <path
            fill="currentColor"
            d="M332.8 76.8v25.6h76.8V0H307.2v102.4h25.6V76.8h25.6V51.2h-25.6v25.6h25.6-25.6zm-204.8 0v25.6h76.8V0H102.4v102.4H128V76.8h25.6V51.2H128v25.6h25.6H128zm204.8 204.8v25.6h76.8V204.8H307.2v102.4h25.6v-25.6h25.6V256h-25.6v25.6h25.6-25.6zm-204.8 0v25.6h76.8V204.8H102.4v102.4H128v-25.6h25.6V256H128v25.6h25.6H128zm204.8 204.8V512h76.8V409.6H307.2V512h25.6v-25.6h25.6v-25.6h-25.6v25.6h25.6-25.6zm-204.8 0V512h76.8V409.6H102.4V512H128v-25.6h25.6v-25.6H128v25.6h25.6H128z" />
    </svg>
</span>)

export default Handle
