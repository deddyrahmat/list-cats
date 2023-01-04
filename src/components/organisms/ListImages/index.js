import React, {useState, useEffect} from 'react';

import ApiCats from 'config/Endpoint/cats'
import Card from 'components/molecules/Card';
import Buttons from 'components/atoms/Buttons';

function ListImages() {
    
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [dataCats, setDataCats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const [statusSearch, setStatusSearch] = useState("");

    const handleKeyword = (e) => {
        setKeyword(e.target.value);
        console.log(e.target.value);
    }
    const handleKeywordKeydown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const handleSearch = async () => {
        setIsLoadingSearch(true);
        try {
            const response = await ApiCats.search(keyword);

            if (response.length > 0 ) {
                setDataCats(response);
                setIsLoadingSearch(false);
            }else{
                prosesList()
                setIsLoadingSearch(false)
                setStatusSearch("Cats Not Found")
            }
        } catch (error) {
            console.log("Your System ", error);
            setIsLoadingSearch(false);
        }
    }
    

    const prosesList = async () => {
        setIsLoading(true);
        try {
            const response = await ApiCats.limit(limit, page);

            if (response) {
                setDataCats(response);
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Your System ", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        prosesList();
    }, [limit]);

    const handleLimit = () => {
        setLimit(limit + 10)
    }

    

    // console.log('dataCats', dataCats)
  return (
    <>
        <div className="relative w-full h-[500px]">

            <img src="https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80" alt="background" className='object-cover object-center w-full h-full' />
            <div className="container mx-auto px-2 w-full lg:w-6/12 xl:w-5/12 absolute inset-1/2 -translate-y-2/4 -translate-x-2/4 flex justify-between align-center">
                <input type="text" className='px-2 py-1 w-10/12 mx-auto bg-white border h-12 md:rounded-lg shadow' onKeyDown={(event) => handleKeywordKeydown(event)} onChange={(event) => handleKeyword(event)} placeholder="Search name cat" />
                <Buttons isDisabled={isLoadingSearch} className={`text-white h-12 flex items-center md:rounded-lg text-lg px-5 font-semibold shadow ${isLoadingSearch ? 'bg-slate-400 pointer-events-none' : 'bg-sky-400'}`} onClick={() => handleSearch()}>
                    {
                        isLoadingSearch ? ("Loading..") : ("Search")
                    }
                </Buttons>
            </div>
        </div>
        <div className="container mx-auto my-10">
            {statusSearch && (
                <p className='text-red-600 text-xl font-bold mb-5'>{statusSearch}</p>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
                {
                    dataCats?.length > 0 && (
                        dataCats.map((cat, index) => 
                            <Card data={cat} key={index}/>
                        )
                    )
                }
            </div>
            {
                dataCats.length > 9 && (
                    <Buttons onClick={() => {handleLimit()}} isDisabled={isLoading} className={`mt-5 w-4/12 mx-auto block text-center flex-1 rounded-lg text-white py-2 text-xl font-bold ${isLoading ? 'bg-slate-400 pointer-events-none' : 'bg-sky-400'}`}>
                        {
                            isLoading ? (<p>Loading...</p>) : ("Load More")
                        }
                    </Buttons>
                ) 
            }
        </div>
    </>
  )
}

export default ListImages