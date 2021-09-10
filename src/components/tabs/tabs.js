import React                from 'react'
import { Link }             from 'react-router-dom'
import                      './tabs.css'

const Tabs =  ({ keys, page }) => {
    const link = item => {
        const cls = page === item ? 'active' : '' 

        return (
            <li className={ cls } key={ `tab-${item}` }>
                <Link to = { `/${item}` }>
                    { item.toUpperCase() }
                </Link>
            </li>
        )
    }

    return (
        <div className="header d-flex">
            <ul className="d-flex">
                { keys.map(item => link(item)) }
            </ul>
        </div>
    )
}

export default Tabs;