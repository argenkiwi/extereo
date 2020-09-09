import * as React from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import './Handle.css';

const Handle = SortableHandle(() => <span className="Handle" />)

export default Handle
