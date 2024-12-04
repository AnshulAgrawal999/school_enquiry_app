import EnquiriesTable from '@/components/EnquiriesTable'  ;

import Navbar from '@/components/Navbar'  ;


export default function EnquiriePage() {

    return (

      <div>

        <Navbar/>

        <EnquiriesTable initialFilters={ { limit: 10, page: 1 } } /> 

      </div>

    )  ;

}