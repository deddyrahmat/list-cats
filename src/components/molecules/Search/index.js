import React from 'react'
import Buttons from 'components/atoms/Buttons';

function Search({handleKeywordKeydown,handleKeyword, handleSearch, isLoadingSearch}) {
  return (
    <div className="relative w-full h-[300px] lg:h-[500px]">
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
  )
}

export default Search