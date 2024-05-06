import { useEffect, useRef, useState } from "react"
import { Tabs } from "flowbite-react";
import { Select } from "flowbite-react";
import { filterValues } from "../utils/FilterValues";
import '../styles/instaFilter.css'
import domtoimage from 'dom-to-image';
import CssFilter from "react-css-filter";


function FilterComponent({ imgUrl, setFilteredImg, handleNextImage, handleApplyFilter }) {

    const imgResultRef = useRef(null)

    const [filterClass, setFIlterClass] = useState("")

    const handleChange = (e) => setFIlterClass(e.target.value)

    const applyFilter = () => {
        console.log(imgResultRef)
        domtoimage.toBlob(imgResultRef.current)

            .then(function (blob) {
                setFilteredImg(blob);
                handleNextImage();
            })

            .catch(function (error) {
                console.error('ooops, something went wrong!', error)
            }); // Set filtered image in parent component

    };


    return (
        <div className="fixed bg-white top-0 left-0 right-0 bottom-0 z-30">
            <div className="fixed top-0 left-0 right-0 bottom-[120px] z-20">
                <h1 className="flex justify-center text-2xl font-bold mt-10 font-serif">Apply Filter</h1>
                <div className="flex ml-44 mt-10">
                    <div className="bg-gray-300 w-5/12 min-h-60 flex items-center justify-center cursor-pointer">
                        {/* <CssFilter image={imgUrl} filter={filterClass} ref={imgResultRef}/> */}
                        <img src={imgUrl} alt="" className={filterClass} ref={imgResultRef} />
                    </div>
                    <div className="ml-32">
                        <Tabs aria-label="Tabs with underline" style="underline" className="flex justify-between">
                            <Tabs.Item active title="Filters">
                                <div className="max-w-md">
                                    <Select
                                        onChange={handleChange}
                                        value={filterClass}
                                        className="w-64 border-2 border-myViolet rounded-lg"
                                    >
                                        {filterValues.map(filter => (
                                            <option className="" value={filter.class} key={filter.class}>{filter.name}</option>
                                        ))}
                                    </Select>
                                </div>
                            </Tabs.Item>
                        </Tabs>
                        <button onClick={applyFilter} className="border-2 border-myViolet w-64 h-10 rounded-lg mt-9 bg-slate-700 text-white">apply filter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterComponent
