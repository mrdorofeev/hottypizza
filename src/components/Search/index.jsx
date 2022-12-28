import React from 'react';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

import styles from './search.module.scss';

const Search = () => {
    const [value, setValue] = React.useState('')
    const {setSearchValue} = React.useContext(SearchContext) //юзконтекст создаёт обработчик на изменения нашего контекста, 
    const inputRef = React.useRef()                                                                    //или, проще, слушает изменения контекста и при его изменении
                                                                          //в тех местах, где сделали юзконтекст, те компоненты будут перерисовываться
    const onClickClear = () => {
        setSearchValue('')
        setValue('')
        inputRef.current.focus()
    }

    const updateSearchValue = React.useCallback( //этот блок сохраняет ссылку на функцию и делает её отложенной (с помощью debounce)
        debounce((str) => {
            setSearchValue(str)
        }, 700),
        []
    )

    const onChageInput = (event) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value) //вызов функции происходит при каждом изменении в поле, но функция отрабатывает с задержкой благодаря блоку с debounce
    }

    return (
        <div className={styles.root}>
            <svg 
            className={styles.icon}
            viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <title/>
                <g id="search">
                    <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z"/>
                </g>
            </svg>
            <input 
                ref={inputRef}
                value={value}
                onChange={onChageInput}
                className={styles.input}   
                placeholder='Найти' />

            {value && (
            <svg 
            onClick={onClickClear}
            className={styles.clearIcon}
            viewBox="0 0 32 32" 
            xmlns="http://www.w3.org/2000/svg">
                <title/>
                <g id="Layer_2">
                    <path d="M4,29a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l24-24a1,1,0,1,1,1.42,1.42l-24,24A1,1,0,0,1,4,29Z"/>
                    <path d="M28,29a1,1,0,0,1-.71-.29l-24-24A1,1,0,0,1,4.71,3.29l24,24a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z"/>
                </g>
            </svg>)}
        </div>
        

    )
}

export default Search