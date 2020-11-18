import React, { useContext } from 'react';

import BlockchainContext from './BlockchainContext';

function ChildComponent() {
    const { accounts } = useContext(BlockchainContext);
    console.log(accounts);

    return <></>;
}

export default ChildComponent;
