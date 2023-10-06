import * as React from 'react';
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '../../../node_modules/@mui/material/index';


interface MonthData {
  name: string;
  requested: number;
  staffed: number;
  open: number;
}

interface RoleType {
  name: string;
  roleGroup: string;
  months: MonthData[];
}

interface RoleData {
  roleType: RoleType;
}

interface DataTableProps {
  data: RoleData[];
}

function getMonthData(roleType:RoleType,monthName:string,param:string){
    console.log(roleType.months)
    return (
       <TableCell colSpan={1}>
        
{
roleType.months.filter((month)=>month.name===monthName).map(filteredMonth=>{
    if (param === 'open') {
       return  filteredMonth.open;
    }else if (param === 'requested') {
        return  filteredMonth.requested;
    } else if (param === 'staffed') {
        return  filteredMonth.staffed;
    }else{
    return 0;
    }
   
})
}
       </TableCell>
      );
   
}


const DataTable: React.FC<DataTableProps> = ({ data }) => {
 

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer>
            <Table stickyHeader aria-label="sticky table">
    <TableHead>
        <TableCell colSpan={2}>Role Type</TableCell>
        <TableCell colSpan={3}>Jan</TableCell>
        <TableCell  colSpan={3}>Feb</TableCell>
        <TableCell  colSpan={3}>Mar</TableCell>
        <TableCell  colSpan={3}>Apr</TableCell>
        <TableCell  colSpan={3}>May</TableCell>
        <TableCell  colSpan={3}>Jun</TableCell>
        <TableCell  colSpan={3}>Jul</TableCell>
        <TableCell  colSpan={3}>Aug</TableCell>
        <TableCell  colSpan={3}>Sep</TableCell>
        <TableCell  colSpan={3}>Oct</TableCell>
        <TableCell  colSpan={3}>Nov</TableCell>
        <TableCell  colSpan={3}>Dec</TableCell>
     </TableHead>
      <TableHead>
        <TableCell colSpan={2}></TableCell>
        <TableCell colSpan={1}> Open</TableCell>
        <TableCell colSpan={1}> Staffed</TableCell>
        <TableCell colSpan={1}> Requested</TableCell>
        <TableCell colSpan={1}> Open</TableCell>
        <TableCell colSpan={1}> Staffed</TableCell>
        <TableCell colSpan={1}> Requested</TableCell>
        <TableCell colSpan={1}> Open</TableCell>
        <TableCell colSpan={1}> Staffed</TableCell>
        <TableCell colSpan={1}> Requested</TableCell>
        <TableCell colSpan={1}> Open</TableCell>
        <TableCell colSpan={1}> Staffed</TableCell>
        <TableCell colSpan={1}> Requested</TableCell>
        <TableCell colSpan={1}> Open</TableCell>
        <TableCell colSpan={1}> Staffed</TableCell>
        <TableCell colSpan={1}> Requested</TableCell>
        <TableCell colSpan={1}> Open</TableCell>
        <TableCell colSpan={1}> Staffed</TableCell>
        <TableCell colSpan={1}> Requested</TableCell>
        <TableCell colSpan={1}> Open</TableCell>
        <TableCell colSpan={1}> Staffed</TableCell>
        <TableCell colSpan={1}> Requested</TableCell>
        <TableCell colSpan={1}> Open</TableCell>
        <TableCell colSpan={1}> Staffed</TableCell>
        <TableCell colSpan={1}> Requested</TableCell>
        <TableCell colSpan={1}> Open</TableCell>
        <TableCell colSpan={1}> Staffed</TableCell>
        <TableCell colSpan={1}> Requested</TableCell>
        <TableCell colSpan={1}> Open</TableCell>
        <TableCell colSpan={1}> Staffed</TableCell>
        <TableCell colSpan={1}> Requested</TableCell>
        <TableCell colSpan={1}> Open</TableCell>
        <TableCell colSpan={1}> Staffed</TableCell>
        <TableCell colSpan={1}> Requested</TableCell>
        <TableCell colSpan={1}> Open</TableCell>
        <TableCell colSpan={1}> Staffed</TableCell>
        <TableCell colSpan={1}> Requested</TableCell>
     </TableHead>
     {
data.map(role=>(
<TableRow> 
    <TableCell colSpan={2}>{role.roleType.name} </TableCell>
    
            { getMonthData(role.roleType,'Jan','open')}
            { getMonthData(role.roleType,'Jan','staffed')}
            { getMonthData(role.roleType,'Jan','requested')}

            { getMonthData(role.roleType,'Feb','open')}
            { getMonthData(role.roleType,'Feb','staffed')}
            { getMonthData(role.roleType,'Feb','requested')}

            { getMonthData(role.roleType,'Mar','open')}
            { getMonthData(role.roleType,'Mar','staffed')}
            { getMonthData(role.roleType,'Mar','requested')}
        
           
            { getMonthData(role.roleType,'Apr','open')}
            { getMonthData(role.roleType,'Apr','staffed')}
            { getMonthData(role.roleType,'Apr','requested')}

            { getMonthData(role.roleType,'May','open')}
            { getMonthData(role.roleType,'May','staffed')}
            { getMonthData(role.roleType,'May','requested')}


            { getMonthData(role.roleType,'Jun','open')}
            { getMonthData(role.roleType,'Jun','staffed')}
            { getMonthData(role.roleType,'Jun','requested')}

            { getMonthData(role.roleType,'Jul','open')}
            { getMonthData(role.roleType,'Jul','staffed')}
            { getMonthData(role.roleType,'Jul','requested')}

            { getMonthData(role.roleType,'Aug','open')}
            { getMonthData(role.roleType,'Aug','staffed')}
            { getMonthData(role.roleType,'Aug','requested')}


            { getMonthData(role.roleType,'Sep','open')}
            { getMonthData(role.roleType,'Sep','staffed')}
            { getMonthData(role.roleType,'Sep','requested')}

            { getMonthData(role.roleType,'Oct','open')}
            { getMonthData(role.roleType,'Oct','staffed')}
            { getMonthData(role.roleType,'Oct','requested')}

            { getMonthData(role.roleType,'Nov','open')}
            { getMonthData(role.roleType,'Nov','staffed')}
            { getMonthData(role.roleType,'Nov','requested')}

            { getMonthData(role.roleType,'Dec','open')}
            { getMonthData(role.roleType,'Dec','staffed')}
            { getMonthData(role.roleType,'Dec','requested')}

    
        
      
       
        
   
        
</TableRow>
))

     }


    </Table>
    </TableContainer>
    </Paper>
            
            
            )
};

export default DataTable;
