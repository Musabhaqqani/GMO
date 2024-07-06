import React from 'react'
import Grid from './grid'
import DepartmentList from './departmentList';
import { data } from './checkboxData';

const SecondPage: React.FC = () => {
    return (
        <div>
            <Grid />
            <DepartmentList departments={data} />
        </div>
    )
}
export default SecondPage