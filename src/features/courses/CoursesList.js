import { useMemo } from "react";
import { useGetCoursesQuery } from "./coursesApiSlice";
import { Link } from "react-router-dom";
import Table from "../../components/Table";

const CoursesList = () => {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCoursesQuery()


    const tableData = useMemo(() => {
        if (isSuccess) {
            return data.data.slice()
        }
    }, [isSuccess, data])        
        
    const columns = useMemo(//() => {
    //     if (isSuccess) {
    //         const [firstElement] = data.data
    //         const columns = Object.keys(firstElement).map(key => {
    //             if (typeof firstElement[key] !== 'object') return { Header: key, accessor: key }
    //             return Object.keys(firstElement[key]).map(innerKey => {
    //                 return { Header: innerKey, accessor: `${key}.${innerKey}` }
    //             })
    //         }).flat()      
    //         return columns      
    //     }
    // }, [isSuccess, data]
        () => [
        {
            Header: 'Id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'Title',
            accessor: 'attributes.title', // accessor is the "key" in the data
        },
        ],
        []
    )

    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        // content = (
        //     <section className="courses">
        //         <h1>Courses List</h1>
        //         <ul>
        //             {data.data.map((course) => {
        //                 return <li key={course.id}>{course.attributes.title}</li>
        //             })}
        //         </ul>
        //         <Link to='/'>Back to Welcome</Link>
        //     </section>
        // )

        content = <Table columns={columns} data={tableData} />
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>
    }

    return content
}

export default CoursesList