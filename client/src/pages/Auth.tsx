import React from 'react'
import { useAuthQuery } from '../generated/graphql';

interface Props {

}

export const Auth: React.FC<Props> = () => {
    const { data, loading, error } = useAuthQuery();

    if(loading) {
        return <div>Loading...</div>
    }

    if(error) {
        console.log(error);
        return <div>Error</div>;
    }

    if(!data) {
        return <div>No Data</div>
    }

    return <div>{data.auth}</div>;
};