import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSceleton from "../components/PizzaBlock/PizzaSkeleton";
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'


const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
    const {categoryId, sort, currentPage} = useSelector((state) => state.filter)
    const {searchValue} = React.useContext(SearchContext)
    const [isLoading, setIsLoading] = React.useState(true);
    const [items, setItems] = React.useState([])

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const fetchPizzas = async () => { //делаем главную функцию async, чтобы использовать await
        setIsLoading(true);

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId === 0 ? '' : `category=${categoryId}`
        const search = searchValue ? `&search=${searchValue}` : ''


            //await говорит, подожди, пока код внутри тебя выполнится
        await axios
            .get(`https://639727ea77359127a02e9f2c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => {
                setItems(res.data)
                setIsLoading(false)
            })
             
    }

    React.useEffect(() => {
        if(isMounted.current){ //при самом первом рендере у нас будет фолс, и мы не зайдём и не будем вшивать параметы в адрес
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })
    
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage])

    //если был первый рендер, то проверяем юрл-параметры и сохраняем в редаксе
    React.useEffect(() => {
        if(window.location.search){
            const params = qs.parse(window.location.search.substring(1))
            
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
            
            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            )

            isSearch.current = true //если нам нужно делать поиск, то заданее делаем true
        }
        fetchPizzas()
    }, [])


    //если был первый рендер, запрашиваем пиццы
    React.useEffect(() => {  // useEffect позволяет отлавливать действия в компоненте
        window.scrollTo(0,0)
        if(!isSearch.current){
            fetchPizzas()
        }
        isSearch.current = false
        
    }, [categoryId, sort.sortProperty, searchValue, currentPage]); //массив зависимостей, юзэеффект следит за их изменениями, когда изменяются он выполняет свой код


    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />) // {...obj} - спред оператор
    const skeletons = [... new Array(6)].map((_, index) => <PizzaSceleton key={index} />)

    return (
        <div className="container">
            <div className="content__top"> 
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Пицца</h2>
            <div className="content__items">
                {
                //если идёт загрузка, содаём массив из 6 фейковых элементов и заменяем их на скелетоны
                isLoading ? skeletons : pizzas 
                } 
            </div>   
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />         
        </div>
    )
}

export default Home