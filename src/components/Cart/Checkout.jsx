import React, { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
    
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalcode: true
    });
    
    const isEmpty = value => value.trim() === '';
    const isFiveCharacters = value => value.trim().length === 5;
    
    
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();
    
    const confirmHandler = (event) => {
        event.preventDefault();
        
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveCharacters(enteredPostalCode);
        
        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalcode: enteredPostalCodeIsValid
        });
        
        const formIsValid = enteredNameIsValid && 
        enteredStreetIsValid && 
        enteredPostalCodeIsValid && 
        enteredCityIsValid
    
        if (!formIsValid) {
            //form not valid return error
            return;
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalcode: enteredPostalCode
        });
    };
    
  return (
    <form onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name:</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>please enter a name</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
        <label htmlFor='street'>Your Street:</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>please enter a valid street</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.postalcode ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code:</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsValidity.postalcode && <p>please enter a valid postal code</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
        <label htmlFor='city'>City:</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>Cancel</button>
        <button>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout