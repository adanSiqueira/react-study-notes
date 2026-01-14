import React, { useState } from 'react';

function MyComponent(){

    const [name, setName] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [payment, setPayment] = useState<string>("");
    const [shipping, setShipping] = useState<string>("Delivery");

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setName(event.target.value);
    }

    function handleQuantityChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setQuantity(Number(event.target.value));
    }

    function handleCommentChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        setComment(event.target.value);
    }

    function handlePaymentChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        setPayment(event.target.value);
    }

    function handleShippingChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setShipping(event.target.value);
    }

    return (
        <div>
            <input value={name} onChange={handleNameChange} />
            <p><b>Name:</b> {name} </p>

            <input value={quantity} onChange={handleQuantityChange} type="number" />
            <p><b>Quantity:</b> {quantity} </p>

            <textarea value={comment} onChange={handleCommentChange} 
            placeholder="Enter delivery instructions"/>
            <p><b>Comment:</b> {comment} </p>

            <p><b>Select payment method:</b> </p>
            <select value={payment} onChange={handlePaymentChange}>
                <option value="">Select</option>
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bitcoin">Bitcoin</option>
            </select>
            <p>Payment Method: {payment} </p>

            <p><b>Select shipping method:</b> </p>
            <label>
                <input
                    type="radio"
                    value="Pickup"
                    checked={shipping === "Pickup"}
                    onChange={handleShippingChange}/>
                Pickup
            </label><br/>
            <label>
                <input
                    type="radio"
                    value="Delivery"
                    checked={shipping === "Delivery"}
                    onChange={handleShippingChange}/>
                Delivery
            </label><br/>
            <p><b>Shipping Method:</b> {shipping} </p>
        </div>

    );
}

export default MyComponent;