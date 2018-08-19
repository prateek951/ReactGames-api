import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
const Price = ({price}) => {
    return(
        <span className={classnames("ui ribbon label",{
            'red' : price/100 < 40,
            'green' : price/100 >= 40
        })}>${price/100}</span>
    )
}

Price.propTypes = {
    price: PropTypes.number.isRequired
}

export default Price;